// 訂單詳情(編輯)
import styled from "styled-components";
import OrderDishes from "./OrderDishes";
import { useOrder } from "../../context/OrderContext";
import { useForm } from "react-hook-form";
import DiningMethodSwitch from "../../ui/DiningMethodSwitch";
import ControlledSelect from "../../ui/ControlledSelect";
import { useState } from "react";
import MiniMenu from "./MiniMenu";
import Note from "../../ui/Note";
import OrderOperation from "./OrderOperation";
import { buildOrderData, formatCreatedTime } from "../../utils/orderHelpers";
import OrderForm from "../../ui/OrderForm/OrderForm";
import useUpdateOrder from "../../hooks/data/orders/useUpdateOrder";
import FormErrorsMessage from "../../ui/FormErrorsMessage";
import {
  generatePickupTimeOptions,
  formatToHourMinute,
} from "../../context/settingsHelpers";

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
  column-gap: 1.6rem;
  min-height: 3.8rem;
  align-items: center;
  row-gap: 0.2rem;

  &:last-child {
    grid-template-columns: 1fr;
  }

  div {
    /* overflow: hidden; */
    overflow-wrap: break-word;
  }
`;

// 新增餐點的按鈕需要再調整樣式，以及在更新訂單和刪除訂單時，需要注意到底是否需要更新庫存(這樣的更新是否合理?)，以我目前的想法是，第一種是可以統一彈出視窗詢問是否要退回之前就訂單消耗的食材。第二種方法是根據狀態來自動判別，如果是準備中的餐點(那可以選擇自動退回，或是彈出視窗選擇)，如果是被標記為已交付，或是待交付，則按照邏輯來說，是一定不能退回來才對，所以不用問，也不用退
function OrderSummaryEdit({ orderData, isEdit, settingsData }) {
  const { updateOrder, updating } = useUpdateOrder();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    state: { dishes },
  } = useOrder();

  const { tableNumber, pickupTime, status, paid, createdTime, orderUUID } =
    orderData;

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
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
            label: formatToHourMinute(pickupTime),
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

  const takeOut = watch("diningMethod") === "外帶";

  const pickupTimeOptions = generatePickupTimeOptions(
    settingsData.todayOpenInfo
  );

  const isDisabled =
    !settingsData.todayOpenInfo.isBusinessDay || pickupTimeOptions.length === 0;

  function onSubmit(data) {
    const orderData = buildOrderData(dishes, data);
    console.log(orderData);
    updateOrder(orderData);
  }

  function onError(error) {
    console.log(error);
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
        <OrderDishes dishData={dishes} isEdit={isEdit} />
      </OrderInfo>

      <OrderInfo>
        <Row>
          <div>用餐方式：</div>
          <div>
            <DiningMethodSwitch
              setValue={setValue}
              takeOut={takeOut}
              control={control}
              isDisabled={dishes.length === 0}
            />
          </div>
        </Row>
        <Row>
          <div>{takeOut ? "取餐時間：" : "內用桌號："}</div>
          <div>
            <ControlledSelect
              options={
                takeOut ? pickupTimeOptions : settingsData.dineInTableOptions
              }
              control={control}
              name={takeOut ? "pickupTime" : "tableNumber"}
              creatable={false}
              placeholder={
                !isDisabled
                  ? takeOut
                    ? "選擇取餐時間"
                    : "選擇桌號"
                  : "非營業時間無法點餐"
              }
              disabled={isDisabled}
              rules={{
                required: takeOut ? "請選擇取餐時間" : "請選擇內用桌號",
              }}
            />
          </div>

          <FormErrorsMessage
            errors={takeOut ? errors?.pickupTime : errors?.tableNumber}
            gridColumn="2"
          />
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
              placeholder="付款狀態"
              rules={{
                required: "請選擇付款狀態",
              }}
            />
          </div>
        </Row>

        <Row>
          <div>訂單狀態：</div>
          <div>
            <ControlledSelect
              options={[
                { label: "準備中", value: "準備中" },
                { label: "已完成", value: "已完成" },
              ]}
              control={control}
              name={"status"}
              creatable={false}
              placeholder="訂單狀態"
              rules={{
                required: "請選擇訂單狀態",
                validate: (value) => {
                  // 假設如果沒付款就不能選「已完成」
                  const paid = watch("paid")?.value;
                  if (value?.value === "已完成" && paid !== "已付款") {
                    return "訂單未付款，不能標記訂單狀態為已完成";
                  }
                  return true;
                },
              }}
            />
          </div>

          <FormErrorsMessage errors={errors?.status} gridColumn="2" />
        </Row>

        <Row>
          <div>訂單備註：</div>
          <Note register={register} />
        </Row>
      </OrderInfo>

      <OrderOperation
        isEdit={true}
        disabeldSubmit={dishes.length === 0 || updating}
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
