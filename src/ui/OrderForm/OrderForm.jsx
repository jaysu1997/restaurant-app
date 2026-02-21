// 點餐功能表單
import styled from "styled-components";
import useOrder from "../../context/order/useOrder";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  checkInventoryAvailability,
  calcIngredientsUsage,
  getTotalIngredientsUsage,
  calcUnitPrice,
  generateDishItemId,
} from "../../utils/orderHelpers";
import StyledHotToast from "../StyledHotToast";
import Modal from "../Modal";
import Note from "../Note";
import CustomizationField from "./CustomizationField";
import ServingsControl from "../ServingsControl";
import { ShoppingBag } from "lucide-react";
import Button from "../../ui/Button";

const Form = styled.form`
  display: grid;
  grid-template-rows: 1fr 7.2rem;
  max-height: calc(90dvh - 5.6rem);
  width: min(36rem, 95dvw);
  font-size: 1.4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2.4rem;
  overflow-y: auto;
`;

const Price = styled.span`
  color: #dc2626;
  font-weight: 600;
  font-size: 1.6rem;
`;

const Title = styled.h5`
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
`;

function OrderForm({ orderDish, onCloseModal, isEdit = false }) {
  // 餐點編輯的相關功能
  const {
    state: { dishes, activeCustomization, inventoryMap },
    dispatch,
  } = useOrder();

  const [servings, setServings] = useState(orderDish.servings || 1);

  // 初始化useReducer的activeCustomization(自訂項目的詳細數據)
  useEffect(() => {
    dispatch({
      type: "orderForm/init",
      payload: orderDish.customize,
    });
  }, [dispatch, orderDish.customize]);

  // 必填項目都完成填寫
  const isFormComplete = activeCustomization.every(
    ({ isRequired, selectOptions }) =>
      isRequired !== "required" || selectOptions.length > 0,
  );

  const { handleSubmit, register } = useForm({
    defaultValues: orderDish,
  });

  function onSubmit(data) {
    // 計算當前訂購餐點所需的食材(單份)
    const unitUsage = calcIngredientsUsage(orderDish, activeCustomization);

    // 原先餐點所消耗的食材總數(編輯時需用到)
    const prevTotalUsage =
      isEdit &&
      getTotalIngredientsUsage(orderDish.unitUsage, orderDish.servings);

    // 確認庫存剩餘食材是否可以供應餐點消耗
    const inventoryCheck = checkInventoryAvailability({
      unitUsage,
      servings,
      inventoryMap,
      prevTotalUsage,
    });

    // 庫存充足
    if (inventoryCheck.isAvailable) {
      // 單份總價
      const unitPrice = calcUnitPrice(activeCustomization, orderDish);

      // 專屬id
      const uniqueId = orderDish.uniqueId ?? generateDishItemId(dishes);

      // 生成要提交的訂餐數據
      const dishData = {
        ...data,
        unitPrice,
        unitUsage,
        servings,
        uniqueId,
      };

      dispatch({
        type: isEdit ? "dishes/updateDish" : "dishes/addDish",
        payload: isEdit ? { dishData, prevTotalUsage } : dishData,
      });

      onCloseModal();
    } else {
      // 庫存不足
      StyledHotToast({
        type: "error",
        title: inventoryCheck.title,
        content: <p>{inventoryCheck.message}</p>,
      });
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Modal
      modalHeader={orderDish.name}
      onCloseModal={onCloseModal}
      scrollBar={false}
    >
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Price>$ {orderDish.price - orderDish.discount}</Price>

          {activeCustomization.map((customization) => (
            <CustomizationField
              customization={customization}
              key={customization.customizeId}
            />
          ))}

          <Note register={register} maxLength={20}>
            <Title>餐點備註</Title>
          </Note>
        </Container>

        <Footer>
          <ServingsControl
            servings={servings}
            onChange={setServings}
            canIncrease={true}
          />

          <Button type="submit" $isFullWidth disabled={!isFormComplete}>
            <ShoppingBag />
            加入購物車
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

export default OrderForm;
