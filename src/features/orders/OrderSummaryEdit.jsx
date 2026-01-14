// 訂單詳情(編輯)
import OrderDishes from "./OrderDishes";
import { useOrder } from "../../context/OrderContext";
import { FormProvider, useForm } from "react-hook-form";
import DiningMethodSwitch from "../../ui-old/DiningMethodSwitch";
import ControlledSelect from "../../ui-old/ControlledSelect";
import { useEffect } from "react";
import Note from "../../ui-old/Note";
import OrderOperation from "./OrderOperation";
import { buildOrderData, formatCreatedTime } from "../../utils/orderHelpers";
import useUpdateOrder from "../../hooks/data/orders/useUpdateOrder";
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
import FormFieldLayout from "../../ui/FormFieldLayout";
import { Navigate } from "react-router-dom";

// 這裡的樣式需要修正(整體布局都需要)
function OrderSummaryEdit({ orderData, settingsData }) {
  const { updateOrder, updating } = useUpdateOrder();

  const {
    state: { dishes },
    dispatch,
  } = useOrder();

  const {
    inventoryData,
    inventoryIsPending,
    inventoryError,
    inventoryIsError,
  } = useGetInventory(dispatch);

  useEffect(() => {
    dispatch({
      type: "order/edit",
      payload: orderData,
    });
  }, [dispatch, orderData]);

  const { tableNumber, pickupTime, status, paid, createdTime, orderUUID } =
    orderData;

  // 感覺toOption用處不大，或許可以刪除之類的，或是直接把函式放到這個檔案中就好，因為好像用到的地方很少
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
    const orderData = buildOrderData(dishes, data, inventoryData);

    updateOrder(orderData);
  }

  function onError(error) {
    console.log(error);
    const message = error?.status ? "訂單尚未付款，無法註記為已完成狀態" : "";
    StyledHotToast({ type: "error", title: "訂單更新失敗", content: message });
  }

  // 已完成訂單不可做編輯(自動轉到檢視頁面)
  if (orderData.status === "已完成") {
    return <Navigate to={`/order/${orderData.id}`} replace />;
  }

  return (
    <QueryStatusFallback
      isPending={inventoryIsPending}
      isError={inventoryIsError}
      error={inventoryError}
    >
      <FormProvider control={control} setValue={setValue}>
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

            <OrderDishes dishes={dishes} isEdit={true} />
          </OrderCard>
        </ContentContainer>

        <ContentContainer>
          <OrderCard>
            <div>
              <label>用餐方式：</label>
              <DiningMethodSwitch
                takeOut={takeOut}
                isDisabled={dishes.length === 0}
              />
            </div>
            <div>
              <label>{takeOut ? "取餐時間：" : "內用桌號："}</label>
              <FormFieldLayout
                error={takeOut ? errors?.pickupTime : errors?.tableNumber}
              >
                <ControlledSelect
                  options={
                    takeOut
                      ? pickupTimeOptions
                      : settingsData.dineInTableOptions
                  }
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
              </FormFieldLayout>
            </div>

            <div>
              <label>付款狀態：</label>
              <FormFieldLayout>
                <ControlledSelect
                  options={[
                    { label: "已付款", value: "已付款" },
                    { label: "未付款", value: "未付款" },
                  ]}
                  name="paid"
                  creatable={false}
                  placeholder="付款狀態"
                  rules={{
                    required: "請選擇付款狀態",
                  }}
                />
              </FormFieldLayout>
            </div>

            <div>
              <label>訂單狀態：</label>
              <FormFieldLayout error={errors?.status}>
                <ControlledSelect
                  options={[
                    { label: "準備中", value: "準備中" },
                    { label: "已完成", value: "已完成" },
                  ]}
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
              </FormFieldLayout>
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
          isUpdating={updating}
          disabeldSubmit={dishes.length === 0}
          orderData={orderData}
          handleSubmit={handleSubmit(onSubmit, onError)}
        />
      </FormProvider>
    </QueryStatusFallback>
  );
}

export default OrderSummaryEdit;
