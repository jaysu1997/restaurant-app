// 點餐功能表單
import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { prepareOrderItem } from "../../../../utils/orderHelpers";
import showToast from "../../../../utils/showToast";
import Note from "../../../../components/Note";
import CustomizationField from "./CustomizationField";
import ServingsControl from "../ServingsControl";
import { ShoppingBag } from "lucide-react";
import Button from "../../../../components/button/Button";
import Price from "../../../../components/Price";
import {
  ModalContainer,
  ModalContent,
  ModalFooter,
} from "../../../../components/modal/ModalBody";

const OrderFormNote = styled(Note)`
  label {
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
  }
`;

function OrderForm({ orderDish, onClose, isEdit = false }) {
  const {
    state: { activeCustomizations, inventoryObj },
    dispatch,
  } = useOrderDraft();

  const [servings, setServings] = useState(orderDish.servings || 1);

  // 初始化useReducer的activeCustomization(自訂項目的詳細數據)
  useEffect(() => {
    // 初始化customizations
    const initialCustomizations = isEdit
      ? orderDish.customizations
      : orderDish.customizations.map((cus) => ({
          ...cus,
          selectedOptions: [],
        }));

    dispatch({
      type: "customization/init",
      payload: initialCustomizations,
    });
  }, [dispatch, orderDish.customizations, isEdit]);

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
          <Price>$ {orderDish.basePrice - orderDish.discount}</Price>

          {activeCustomizations.map((customization) => (
            <CustomizationField
              customization={customization}
              key={customization.customizationId}
            />
          ))}

          <OrderFormNote label="餐點備註" maxLength={25} />
        </ModalContent>

        <ModalFooter>
          <ServingsControl
            servings={servings}
            onChange={setServings}
            canIncrease={true}
          />

          <Button type="submit" $isFullWidth={true} disabled={!isFormComplete}>
            <ShoppingBag />
            {isEdit ? "更新購物車" : "加入購物車"}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </FormProvider>
  );
}

export default OrderForm;
