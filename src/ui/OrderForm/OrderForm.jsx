// 點餐功能表單
import styled from "styled-components";
import { useOrder } from "../../context/OrderContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  checkInventoryAvailability,
  calcIngredientsUsagePerServing,
  generateDishItemId,
  getTotalIngredientsUsage,
} from "../../utils/orderHelpers";
import StyledHotToast from "../StyledHotToast";
import Modal from "../Modal";
import Note from "../Note";
import CustomizeArea from "./CustomizeArea";
import ServingsControl from "../ServingsControl";
import { ShoppingBag } from "lucide-react";
import Button from "../../ui/Button";
import { parsePositiveInt } from "../../utils/helpers";

const Form = styled.form`
  display: grid;
  grid-template-rows: 1fr 7.2rem;
  max-height: calc(90dvh - 5.7rem);
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
  border-top: 1px solid #ebebeb;
  padding: 1.6rem;
  z-index: 1;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.05);

  position: sticky;
  bottom: 0;
`;

function OrderForm({ orderDish, onCloseModal, isEdit = false }) {
  // 餐點編輯的相關功能
  const {
    state: { dishes, currentCustomization, inventoryMap },
    dispatch,
  } = useOrder();

  const [servings, setServings] = useState(orderDish.servings || 1);

  // 當前餐點數據
  const {
    price,
    discount,
    ingredients,
    customize,
    uniqueId = generateDishItemId(dishes),
  } = orderDish;

  // 初始化useReducer的currentCustomization(自訂項目的詳細數據)
  useEffect(() => {
    dispatch({
      type: "orderForm/init",
      payload: customize,
    });
  }, [dispatch, customize]);

  // 必填項目尚未完成填寫
  const hasUnfilledRequiredCustomization = currentCustomization.some(
    ({ isRequired, selectOptions }) =>
      isRequired === "required" && selectOptions.length === 0,
  );

  const { handleSubmit, register } = useForm({
    defaultValues: orderDish || {},
  });

  function onSubmit(data) {
    // 計算當前訂購餐點所需的食材(每1份)
    const ingredientsUsagePerServing = calcIngredientsUsagePerServing(
      ingredients,
      currentCustomization,
    );

    // 編輯時需用到(原先餐點所消耗的食材總數)
    const previousIngredientsUsage =
      isEdit &&
      getTotalIngredientsUsage(
        orderDish.ingredientsUsagePerServing,
        orderDish.servings,
      );

    // 避免非正整數分量值
    const currentServings = parsePositiveInt(servings, { min: 1, fallback: 1 });

    // 確認庫存剩餘食材是否可以供應餐點消耗
    const shortages = checkInventoryAvailability({
      ingredientsUsagePerServing,
      servings: currentServings,
      inventoryMap,
      previousIngredientsUsage,
    });

    // 庫存充足
    if (shortages.length === 0) {
      // 每份餐點的售價(本身 + 額外選項)
      const itemTotalPrice = currentCustomization.reduce((acc, cur) => {
        const extraPriceTotal = cur.selectOptions.reduce(
          (sum, customizeData) => sum + customizeData.extraPrice,
          0,
        );
        return acc + extraPriceTotal;
      }, price - discount);

      const dishData = {
        ...data,
        itemTotalPrice,
        ingredientsUsagePerServing,
        servings: currentServings,
        uniqueId,
      };

      dispatch({
        type: isEdit ? "dishes/updateDish" : "dishes/addDish",
        payload: isEdit ? { dishData, previousIngredientsUsage } : dishData,
      });

      onCloseModal();
    } else {
      // 庫存不足
      StyledHotToast({
        type: "error",
        title: "點餐失敗（庫存食材不足）",
        content: (
          <ul>
            {shortages.map((ingredient, index) => (
              <li key={index}>
                {ingredient.maxCapacity === 0
                  ? `${ingredient.name}已用完`
                  : `${ingredient.name}（剩${ingredient.maxCapacity}份）`}
              </li>
            ))}
          </ul>
        ),
      });
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Modal
      modalHeader={orderDish.name}
      maxWidth={36}
      onCloseModal={onCloseModal}
      scrollBar={false}
    >
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Price>$ {price - discount}</Price>

          {customize &&
            customize.map((customizeData) => (
              <CustomizeArea
                isEdit={isEdit}
                customizeData={customizeData}
                key={customizeData.customizeId}
              />
            ))}

          <Note register={register} maxLength={20}>
            <Title>餐點備註</Title>
          </Note>
        </Container>

        <Footer>
          <ServingsControl
            servings={servings}
            setServings={setServings}
            orderDish={isEdit ? orderDish : {}}
            liveUpdate={false}
            size="md"
          />

          <Button
            type="submit"
            $isFullWidth
            disabled={hasUnfilledRequiredCustomization}
          >
            <ShoppingBag />
            加入購物車
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
}

export default OrderForm;
