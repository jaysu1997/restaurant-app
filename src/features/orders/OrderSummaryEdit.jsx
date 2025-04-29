// 訂單詳情(編輯)
import styled from "styled-components";
import {
  buildOrderData,
  formatCreatedTime,
  generatePickupTimes,
  generateTableNumbers,
} from "../../utils/helpers";
import OrderDishes from "./OrderDishes";
import { useOrder } from "../../context/OrderContext";
import { useForm } from "react-hook-form";
import OrderTypeSwitch from "../../ui/OrderTypeSwitch";
import ControlledSelect from "../../ui/ControlledSelect";
import { useState } from "react";
import OrderForm from "../menu/OrderForm";
import MiniMenu from "./MiniMenu";
import Note from "../../ui/Note";
import useGetInventory from "../inventory/useGetInventory";
import LoadingSpinner from "../../ui/LoadingSpinner";
import OrderOperation from "./OrderOperation";
import useUpdateOrder from "./useUpdateOrder";

const OrderInfo = styled.section`
  background-color: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.4rem 2.8rem;
  height: fit-content;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1.6rem;
  min-height: 3.8rem;
  align-items: center;

  &:last-child {
    grid-template-columns: 1fr;
  }

  div {
    overflow: hidden;
    overflow-wrap: break-word;
  }
`;

function OrderSummaryEdit({ orderData, isEdit }) {
  // 上傳看起來是可以沒問題，但食材計算的部分還需要檢查，另外或許還需要調整優化sql，然後應該就可以進入rechart
  const { updateOrder, updating, error } = useUpdateOrder();
  const { inventoryDataFetching } = useGetInventory(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    state: { order },
  } = useOrder();

  const { tableNumber, pickupTime, status, paid, createdTime, orderUUID } =
    orderData;

  const { register, control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      ...orderData,
      tableNumber: tableNumber
        ? {
            label: tableNumber,
            value: tableNumber,
          }
        : null,
      pickupTime: pickupTime
        ? {
            label: pickupTime,
            value: pickupTime,
          }
        : null,
      status: {
        label: status,
        value: status,
      },
      paid: {
        label: paid,
        value: paid,
      },
    },
  });

  const dineOption = watch("orderType") === "外帶";

  // 用餐方式的select選項
  const optionList = dineOption
    ? generatePickupTimes("10:00", "24:00")
    : generateTableNumbers(10);

  function onSubmit(data) {
    const orderData = buildOrderData(order, data);
    updateOrder(orderData);
  }

  function onError(error) {
    console.log(error);
  }

  if (inventoryDataFetching) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <OrderInfo>
        <Row>
          <div>建立時間：</div>
          <div>{formatCreatedTime(createdTime)}</div>
        </Row>
        <Row>
          <div>訂單編號：</div>
          <div>{orderUUID}</div>
        </Row>
        <Row>
          <div>訂購餐點：</div>
          {/* 這個按鈕的樣式需要修正 */}
          <button
            style={{ width: "fit-content" }}
            onClick={() => setIsOpenModal({ type: "MiniMenu", data: null })}
          >
            新增餐點
          </button>
        </Row>
        <OrderDishes dishData={order} isEdit={isEdit} />
      </OrderInfo>

      <OrderInfo>
        <Row>
          <div>用餐方式：</div>
          <div>
            <OrderTypeSwitch
              setValue={setValue}
              dineOption={dineOption}
              control={control}
              isDisabled={order.length === 0}
            />
          </div>
        </Row>
        <Row>
          <div>{dineOption ? "取餐時間：" : "內用桌號："}</div>
          <div>
            <ControlledSelect
              options={optionList}
              control={control}
              name={dineOption ? "pickupTime" : "tableNumber"}
              creatable={false}
              placeholder={dineOption ? "選擇時間" : "選擇桌號"}
              menuPlacement="top"
              rules={{
                required: dineOption ? "請選擇取餐時間" : "請選擇內用桌號",
              }}
              key={dineOption ? "外帶" : "內用"}
            />
          </div>
        </Row>
        <Row>
          <div>訂單狀態：</div>
          <div>
            <ControlledSelect
              options={[
                { label: "準備中", value: "準備中" },
                { label: "待取餐", value: "待取餐" },
                { label: "已交付", value: "已交付" },
              ]}
              control={control}
              name={"status"}
              creatable={false}
              menuPlacement="auto"
              placeholder="訂單製作狀態"
              rules={{
                required: "請選擇訂單製作狀態",
              }}
            />
          </div>
        </Row>
        <Row>
          <div>付款狀態：</div>
          <div>
            <ControlledSelect
              options={[
                { label: "已付款", value: "已付款" },
                { label: "未付款", value: "未付款" },
              ]}
              control={control}
              name={"paid"}
              creatable={false}
              menuPlacement="auto"
              placeholder={dineOption ? "取餐時間" : "桌號"}
              rules={{
                required: dineOption ? "請選擇取餐時間" : "請選擇內用桌號",
              }}
            />
          </div>
        </Row>
        <Row>
          <div>訂單備註：</div>
          <Note register={register} />
        </Row>
      </OrderInfo>

      <OrderOperation
        isEdit={true}
        disabeldSubmit={order.length === 0 || updating}
        orderData={orderData}
        handleSubmit={handleSubmit(onSubmit, onError)}
      />

      {isOpenModal.type === "MiniMenu" && (
        <MiniMenu setIsOpenModal={setIsOpenModal} />
      )}

      {isOpenModal.type === "OrderForm" && (
        <OrderForm
          dishData={isOpenModal.data}
          isEdit={false}
          onCloseModal={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
}

export default OrderSummaryEdit;
