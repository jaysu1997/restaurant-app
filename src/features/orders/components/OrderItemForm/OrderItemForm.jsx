// 點餐功能表單
import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { prepareOrderItem } from "../../../../utils/orderHelpers";
import showToast from "../../../../utils/showToast";
import Note from "../../../../components/Note";
import CustomizationField from "./CustomizationField";
import Modal, {
  ModalContainer,
  ModalContent,
} from "../../../../components/modal/Modal";
import OrderItemFormHeader from "./OrderItemFormHeader";
import OrderItemFormFooter from "./OrderItemFormFooter";

const NoteGroup = styled.div`
  padding-top: 2.4rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const NoteLabel = styled.label`
  font-size: 1.8rem;
  font-weight: 600;
  color: #111827;
  width: fit-content;
`;

const NoteHint = styled.span`
  margin-bottom: 0.4rem;
  font-size: 1.3rem;
  color: #6b7280;
`;

function OrderItemForm({ orderDish, onClose, isEdit = false }) {
  const {
    state: { activeCustomizations, inventoryObj },
    dispatch,
  } = useOrderDraft();
  // 是否嘗試過提交訂單
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [servings, setServings] = useState(orderDish.servings || 1);

  const { name, customizations } = orderDish;
  // 初始化useReducer的activeCustomization(自訂項目的詳細數據)
  useEffect(() => {
    // 初始化customizations
    const initialCustomizations = isEdit
      ? customizations
      : customizations.map((cus) => ({
          ...cus,
          selectedOptions: [],
        }));

    dispatch({
      type: "customization/init",
      payload: initialCustomizations,
    });

    // 重置activeCustomizations，避免舊的數據殘留影響下次的OrderForm
    return () => {
      dispatch({ type: "customization/reset" });
    };
  }, [dispatch, customizations, isEdit]);

  // 第一個未完成的必填選項
  const unfinishedCus = activeCustomizations.find(
    ({ isRequired, selectedOptions }) =>
      isRequired && selectedOptions.length === 0,
  );
  // 自動滾動到第一個尚未完成填寫的必填選項
  function scrollToUnfinishedCus() {
    setSubmitAttempted(true);

    const element = document.querySelector(
      `[data-customization-id="${unfinishedCus.customizationId}"]`,
    );

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  const methods = useForm({
    defaultValues: orderDish,
  });

  const { handleSubmit } = methods;

  function onSubmit(data) {
    if (unfinishedCus) {
      scrollToUnfinishedCus();
      return;
    }

    const result = prepareOrderItem({
      orderDish: data,
      activeCustomizations,
      inventoryObj,
      servings,
      isEdit,
    });

    // 庫存食材不足或不存在
    if (!result.isAvailable) {
      showToast({
        type: "error",
        title: result.error.title,
        content: <p>{result.error.message}</p>,
      });

      return;
    }

    // 新增or編輯餐點
    dispatch({
      type: isEdit ? "items/update" : "items/add",
      payload: {
        ...result.data,
        customizations: activeCustomizations,
        servings,
      },
    });

    onClose();
  }

  return (
    <FormProvider {...methods}>
      <Modal
        onClose={onClose}
        title={isEdit ? "編輯餐點" : "新增餐點"}
        maxWidth={40}
      >
        <ModalContainer as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <OrderItemFormHeader orderDish={orderDish} />

            {activeCustomizations.map((customization) => (
              <CustomizationField
                customization={customization}
                submitAttempted={submitAttempted}
                key={customization.customizationId}
              />
            ))}

            <NoteGroup>
              <NoteLabel htmlFor={`${name}-note`}>餐點備註</NoteLabel>
              <NoteHint>例如：不要醬料、吐司去邊...</NoteHint>
              <Note id={`${name}-note`} maxLength={25} />
            </NoteGroup>
          </ModalContent>

          <OrderItemFormFooter
            isEdit={isEdit}
            servings={servings}
            setServings={setServings}
            disabled={false}
          />
        </ModalContainer>
      </Modal>
    </FormProvider>
  );
}

export default OrderItemForm;
