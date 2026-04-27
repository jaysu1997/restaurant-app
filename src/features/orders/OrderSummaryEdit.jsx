// 訂單詳情(編輯)
import OrderDishes from "./OrderDishes";
import { FormProvider, useForm } from "react-hook-form";
import DiningMethodSegmented from "../../ui/DiningMethodSegmented";
import ControlledSelect from "../../ui/ControlledSelect";
import { useEffect } from "react";
import Note from "../../ui/Note";
import OrderOperation from "./OrderOperation";
import { buildOrderData, formatCreatedTime } from "../../utils/orderHelpers";
import useUpdateOrder from "../../hooks/data/orders/useUpdateOrder";
import useGetInventory from "../../hooks/data/inventory/useGetInventory";
import QueryStatusFallback from "../../ui/QueryStatusFallback";
import { toOption } from "../../utils/selectHelpers";
import StyledHotToast from "../../ui/StyledHotToast";
import OrderCard from "./OrderCard";
import ContentContainer from "../../ui/ContentContainer";
import FormFieldLayout from "../../ui/FormFieldLayout";
import { Navigate } from "react-router";
import {
  formatToHourMinute,
  generatePickupTimeOptions,
} from "../../context/settings/settingsHelpers";
import useOrderDraft from "../../context/orders/useOrderDraft";
import useSettings from "../../context/settings/useSettings";

// 這裡的樣式需要修正(整體布局都需要)
function OrderSummaryEdit({ orderData }) {
  const { updateOrder, isUpdatingOrder } = useUpdateOrder();
  const { todayOpenInfo, dineInTableOptions } = useSettings();

  const {
    state: { items },
    dispatch,
  } = useOrderDraft();

  const {
    inventory,
    inventoryObj,
    inventoryIsLoading,
    inventoryIsError,
    inventoryError,
  } = useGetInventory();

  useEffect(
    function () {
      if (!inventory) return;

      dispatch({
        type: "inventory/setAll",
        payload: inventoryObj,
      });
    },
    [dispatch, inventory, inventoryObj],
  );

  useEffect(() => {
    const draftData = orderData.items.map((item) => ({
      ...item,
      unitUsage: Object.fromEntries(
        item.unitUsage.map(({ uuid, name, quantity }) => [
          uuid,
          { name, quantity },
        ]),
      ),
    }));

    dispatch({
      type: "draft/loadFromOrder",
      payload: draftData,
    });
  }, [dispatch, orderData]);

  const { tableNumber, pickupTime, status, paid, createdAt, orderUUID } =
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

  const pickupTimeOptions = generatePickupTimeOptions(todayOpenInfo);

  const isOrderingAvailable =
    !todayOpenInfo.isBusinessDay || pickupTimeOptions.length === 0;

  function onSubmit(data) {
    const orderData = buildOrderData(items, data, inventory);
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
      status={{
        isLoading: inventoryIsLoading,
        isError: inventoryIsError,
      }}
      errorFallback={inventoryError}
    >
      <FormProvider control={control} setValue={setValue}>
        <ContentContainer>
          <OrderCard>
            <div>
              <label>建立時間：</label>
              <span>{formatCreatedTime(createdAt)}</span>
            </div>
            <div>
              <label>訂單編號：</label>
              <span>{orderUUID}</span>
            </div>

            <OrderDishes items={items} isEdit={true} />
          </OrderCard>
        </ContentContainer>

        <ContentContainer>
          <OrderCard>
            <div>
              <label>用餐方式：</label>
              <DiningMethodSegmented
                isDisabled={items.length === 0 || isOrderingAvailable}
              />
            </div>
            <div>
              <label>{takeOut ? "取餐時間：" : "內用桌號："}</label>
              <FormFieldLayout
                error={takeOut ? errors?.pickupTime : errors?.tableNumber}
              >
                <ControlledSelect
                  options={takeOut ? pickupTimeOptions : dineInTableOptions}
                  name={takeOut ? "pickupTime" : "tableNumber"}
                  creatable={false}
                  placeholder={takeOut ? "選擇取餐時間" : "選擇桌號"}
                  disabled={isOrderingAvailable}
                  rules={{
                    required: takeOut ? "請選擇取餐時間" : "請選擇內用桌號",
                  }}
                  key={takeOut ? "pickupTime" : "tableNumber"}
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
                  placeholder="請選擇付款狀態"
                  rules={{
                    required: "請選擇付款狀態",
                  }}
                  disabled={isOrderingAvailable}
                  key="paid"
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
                  disabled={isOrderingAvailable}
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
                  key="status"
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
          isUpdating={isUpdatingOrder}
          disabeldSubmit={items.length === 0}
          orderData={orderData}
          handleSubmit={handleSubmit(onSubmit, onError)}
        />
      </FormProvider>
    </QueryStatusFallback>
  );
}

export default OrderSummaryEdit;
