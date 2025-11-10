// 訂單詳情(編輯)
import OrderDishes from "./OrderDishes";
import { useOrder } from "../../context/OrderContext";
import { useForm } from "react-hook-form";
import DiningMethodSwitch from "../../ui-old/DiningMethodSwitch";
import ControlledSelect from "../../ui-old/ControlledSelect";
import { useEffect } from "react";
import Note from "../../ui-old/Note";
import OrderOperation from "./OrderOperation";
import { buildOrderData, formatCreatedTime } from "../../utils/orderHelpers";
import useUpdateOrder from "../../hooks/data/orders/useUpdateOrder";
import FormErrorsMessage from "../../ui-old/FormErrorsMessage";
import {
  generatePickupTimeOptions,
  formatToHourMinute,
} from "../../context/settingsHelpers";
import useGetInventory from "../../hooks/data/inventory/useGetInventory";
import QueryStatusFallback from "../../ui-old/QueryStatusFallback";
import { toOption } from "../../utils/selectHelpers";
import StyledHotToast from "../../ui-old/StyledHotToast";
import OrderCard from "./OrderCard";
import ContentContainer from "../../ui/ContentContainer";

function OrderSummaryEdit({ orderData, settingsData }) {
  const { updateOrder, updating } = useUpdateOrder();

  const {
    state: { dishes },
    dispatch,
  } = useOrder();

  const { inventoryIsPending, inventoryError, inventoryIsError } =
    useGetInventory(dispatch);

  useEffect(() => {
    dispatch({
      type: "order/edit",
      payload: orderData,
    });
  }, [dispatch, orderData]);

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
      tableNumber: toOption(tableNumber),
      pickupTime: toOption(pickupTime, formatToHourMinute(pickupTime)),
      status: toOption(status),
      paid: toOption(paid),
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
    console.log();
    updateOrder(orderData);
  }

  function onError(error) {
    console.log(error);
    StyledHotToast({ type: "error", title: "訂單更新失敗" });
  }

  return (
    <QueryStatusFallback
      isPending={inventoryIsPending}
      isError={inventoryIsError}
      error={inventoryError}
    >
      <ContentContainer>
        <OrderCard>
          <div>
            <label>建立時間：</label>
            <span>{formatCreatedTime(createdTime)}</span>
          </div>
          <div>
            <label>訂單編號：</label>
            <span>{orderUUID}</span>
          </div>

          <OrderDishes dishData={dishes} isEdit={true} />
        </OrderCard>
      </ContentContainer>

      <ContentContainer>
        <OrderCard>
          <div>
            <label>用餐方式：</label>
            <DiningMethodSwitch
              setValue={setValue}
              takeOut={takeOut}
              control={control}
              isDisabled={dishes.length === 0}
            />
          </div>
          <div>
            <label>{takeOut ? "取餐時間：" : "內用桌號："}</label>
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
                  : "非營業時間"
              }
              disabled={isDisabled}
              rules={{
                required: takeOut ? "請選擇取餐時間" : "請選擇內用桌號",
              }}
            />

            <FormErrorsMessage
              errors={takeOut ? errors?.pickupTime : errors?.tableNumber}
              gridColumn="2"
            />
          </div>

          <div>
            <label>付款狀態：</label>
            <ControlledSelect
              options={[
                { label: "已付款", value: "已付款" },
                { label: "未付款", value: "未付款" },
              ]}
              control={control}
              name="paid"
              creatable={false}
              placeholder="付款狀態"
              rules={{
                required: "請選擇付款狀態",
              }}
            />
          </div>

          <div>
            <label>訂單狀態：</label>
            <ControlledSelect
              options={[
                { label: "準備中", value: "準備中" },
                { label: "已完成", value: "已完成" },
              ]}
              control={control}
              name="status"
              creatable={false}
              placeholder="訂單狀態"
              rules={{
                required: "請選擇訂單狀態",
                validate: (value) => {
                  // 假設如果沒付款就不能選「已完成」
                  const paid = watch("paid")?.value;
                  if (value?.value === "已完成" && paid !== "已付款") {
                    return "訂單尚未付款";
                  }
                  return true;
                },
              }}
            />

            <FormErrorsMessage errors={errors?.status} gridColumn="2" />
          </div>
        </OrderCard>
      </ContentContainer>

      <ContentContainer>
        <Note register={register}>
          <label>訂單備註：</label>
        </Note>
      </ContentContainer>

      <OrderOperation
        isEdit={true}
        disabeldSubmit={dishes.length === 0 || updating}
        orderData={orderData}
        handleSubmit={handleSubmit(onSubmit, onError)}
      />
    </QueryStatusFallback>
  );
}

export default OrderSummaryEdit;
