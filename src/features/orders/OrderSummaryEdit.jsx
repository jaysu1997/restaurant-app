// 訂單詳情(編輯)
import styled from "styled-components";
import {
  formatCreatedTime,
  formatOrderNumber,
  generatePickupTimes,
  generateTableNumbers,
} from "../../utils/helpers";
import OrderDishes from "./OrderDishes";
import { useOrder } from "../../context/OrderContext";
import { useForm } from "react-hook-form";
import OrderTypeSwitch from "../../ui/OrderTypeSwitch";
import ControlledSelect from "../../ui/ControlledSelect";
import { useState } from "react";
import Modal from "../../ui/Modal";
import OrderForm from "../menu/OrderForm";
import MiniMenu from "./MiniMenu";
import Note from "../../ui/Note";
import useGetInventory from "../inventory/useGetInventory";
import LoadingSpinner from "../../ui/LoadingSpinner";

const OrderHeader = styled.header`
  background-color: #6366f1;
  color: #fff;
  padding: 1.6rem 3.6rem;
  font-size: 2.4rem;
  grid-column: 1 / -1;
  border-radius: 6px;
  font-weight: 600;
`;

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
  grid-template-columns: auto 1fr;
  gap: 1.6rem;
  min-height: 3.8rem;
  align-items: center;
`;

function OrderSummaryEdit({ data, isEdit }) {
  const { inventoryDataFetching } = useGetInventory(true);
  const [openModal, setOpenModal] = useState(false);

  const {
    state: { order },
  } = useOrder();

  const { register, control, watch, handleSubmit } = useForm({
    defaultValues: {
      ...data,
      tableNumber: data.tableNumber
        ? {
            label: data.tableNumber,
            value: data.tableNumber,
          }
        : null,
      pickupTime: data.pickupTime
        ? {
            label: data.pickupTime,
            value: data.pickupTime,
          }
        : null,
      status: {
        label: data.status,
        value: data.status,
      },
      paid: {
        label: data.paid,
        value: data.paid,
      },
    },
  });

  const dineOption = watch("dineOption");

  // 用餐方式的select選項
  const optionList = dineOption
    ? generatePickupTimes("10:00", "24:00")
    : generateTableNumbers(10);

  function onSubmit(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }

  if (inventoryDataFetching) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <OrderHeader>{`取餐號碼 ${formatOrderNumber(
        data.orderNumber
      )}`}</OrderHeader>
      <OrderInfo>
        <Row>
          <div>建立時間：</div>
          <div>{formatCreatedTime(data.createdTime)}</div>
        </Row>
        <Row>
          <div>訂單編號：</div>
          <div>{data.orderUUID}</div>
        </Row>
        <Row>
          <div>訂購餐點：</div>
          <button
            style={{ width: "fit-content" }}
            onClick={() => setOpenModal("openMenu")}
          >
            新增餐點
          </button>
        </Row>
        <OrderDishes
          dishData={order}
          isEdit={isEdit}
          setOpenModal={setOpenModal}
        />
      </OrderInfo>

      <OrderInfo>
        <Row>
          <div>用餐方式：</div>
          <div>
            <OrderTypeSwitch dineOption={dineOption} control={control} />
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
        </Row>

        <Note register={register} />
      </OrderInfo>

      {openModal && (
        <Modal
          onCloseModal={() => setOpenModal(false)}
          modalHeader={openModal === "openMenu" ? "菜單" : openModal.name}
          maxWidth={36}
        >
          {openModal === "openMenu" ? (
            <MiniMenu setOpenModal={setOpenModal} />
          ) : (
            <OrderForm
              dishData={openModal}
              onCloseModal={() => setOpenModal(false)}
              isEdit={openModal.uniqueId ? true : false}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default OrderSummaryEdit;
