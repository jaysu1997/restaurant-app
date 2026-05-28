// 點餐功能表單
import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { prepareOrderItem } from "../../../../utils/orderHelpers";
import StyledHotToast from "../../../../ui/StyledHotToast";
import Note from "../../../../components/Note";
import CustomizationField from "./CustomizationField";
import ServingsControl from "../ServingsControl";
import { ShoppingBag } from "lucide-react";
import Button from "../../../../components/button/Button";
import Price from "../../../../components/Price";

const Form = styled.form`
  max-height: calc(90dvh - 5.6rem);
  width: min(36rem, 95dvw);
  display: grid;
  grid-template-rows: minmax(0, 1fr) 7.2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2.4rem;
  overflow-y: auto;
`;

const NoteLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const NoteLabel = styled.label`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

const Footer = styled.footer`
  display: flex;
  min-height: 7.2rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  box-shadow: inset 0px 1px #e5e7eb;
  padding: 1.6rem;
  background-color: #fff;
  z-index: 2;
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

    // 庫存食材不足
    if (!result.isAvailable) {
      StyledHotToast({
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

  function onError(error) {
    console.log(error);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Price>$ {orderDish.basePrice - orderDish.discount}</Price>

          {activeCustomizations.map((customization) => (
            <CustomizationField
              customization={customization}
              key={customization.customizationId}
            />
          ))}

          <NoteLayout>
            <NoteLabel>餐點備註</NoteLabel>
            <Note maxLength={25} />
          </NoteLayout>
        </Container>

        <Footer>
          <ServingsControl
            servings={servings}
            onChange={setServings}
            canIncrease={true}
          />

          <Button type="submit" $isFullWidth={true} disabled={!isFormComplete}>
            <ShoppingBag />
            加入購物車
          </Button>
        </Footer>
      </Form>
    </FormProvider>
  );
}

export default OrderForm;
