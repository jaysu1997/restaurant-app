// 點餐功能表單
import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { prepareOrderItem } from "../../../../utils/orderHelpers";
import showToast from "../../../../utils/showToast";
import Note from "../../../../components/Note";
import CustomizationField from "./CustomizationField";
import {
  ModalContainer,
  ModalContent,
} from "../../../../components/modal/Modal";
import OrderDishHeader from "./OrderDishHeader";
import OrderFooter from "./OrderFooter";

const Divider = styled.hr`
  margin: 0;
  border: 0;
  border-top: 1px solid #e5e7eb;
`;

const NoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const NoteLabel = styled.label`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  width: fit-content;
`;

const NoteHint = styled.span`
  margin-bottom: 0.4rem;
  font-size: 1.3rem;
  color: #6b7280;
`;

function OrderForm({ orderDish, onClose, isEdit = false }) {
  const { name, customizations } = orderDish;

  const {
    state: { activeCustomizations, inventoryObj },
    dispatch,
  } = useOrderDraft();

  const [servings, setServings] = useState(orderDish.servings || 1);

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
  }, [dispatch, customizations, isEdit]);

  // 必填項目都完成填寫
  const isFormComplete = activeCustomizations.every(
    ({ isRequired, selectedOptions }) =>
      !isRequired || selectedOptions.length > 0,
  );

  const methods = useForm({
    defaultValues: orderDish,
  });

  const { handleSubmit } = methods;

  function onSubmit(data) {
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
      <ModalContainer as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <OrderDishHeader orderDish={orderDish} />

          <Divider />

          {activeCustomizations.map((customization) => (
            <Fragment key={customization.customizationId}>
              <CustomizationField customization={customization} />

              <Divider />
            </Fragment>
          ))}

          <NoteGroup>
            <NoteLabel htmlFor={`${name}-note`}>餐點備註</NoteLabel>
            <NoteHint>例如：不要醬料、吐司去邊...</NoteHint>
            <Note id={`${name}-note`} maxLength={25} />
          </NoteGroup>
        </ModalContent>

        <OrderFooter
          isEdit={isEdit}
          servings={servings}
          setServings={setServings}
          disabled={!isFormComplete}
        />
      </ModalContainer>
    </FormProvider>
  );
}

export default OrderForm;
