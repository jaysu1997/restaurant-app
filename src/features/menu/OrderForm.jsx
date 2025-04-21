// 點餐功能表單
import { useForm } from "react-hook-form";
import { TiShoppingCart } from "react-icons/ti";
import styled from "styled-components";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import { useEffect, useRef, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import StyledHotToast from "../../ui/StyledHotToast";
import CustomizeArea from "./CustomizeArea";
import ServingsControl from "../../ui/ServingsControl";
import Note from "../../ui/Note";
import {
  calcIngredientsUsage,
  compareInventory,
  generateDishItemId,
} from "../../utils/helpers";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-height: 75dvh;
  max-width: clamp(1rem, 36rem, 95dvw);
  width: 100dvw;
  font-size: 1.4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 2.4rem;
`;

const Price = styled.span`
  color: #dc2626;
  font-weight: 600;
  font-size: 1.6rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

const Footer = styled.footer`
  display: flex;
  flex-shrink: 0;
  height: 6.5rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  border-top: 1px solid #ebebeb;
  padding: 1.6rem;
  z-index: 1;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.05);
`;

const AddToCartButton = styled.button`
  height: 3.2rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
  background-color: #292524;
  color: #fff;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  &:not(:disabled):hover {
    background-color: #3f3f46;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

function OrderForm({ dishData, onCloseModal, isEdit = false }) {
  // 餐點編輯的相關功能
  const {
    state: { order, curDishCustomizeOption, inventoryMap },
    dispatch,
  } = useOrder();

  const [servings, setServings] = useState(dishData.servings || 1);

  // 當前餐點數據
  const {
    price,
    discount,
    ingredients,
    customize,
    uniqueId = generateDishItemId(order),
  } = dishData;

  // 必填細項與選填細項
  const { requiredField, optionalField, totalField } = customize.reduce(
    (acc, curCustomization) => {
      acc.totalField.push({
        customizeId: curCustomization.customizeId,
        customizeTitle: curCustomization.title,
        detail: [],
      });
      if (curCustomization.required === "必填") {
        acc.requiredField.push(curCustomization);
      } else {
        acc.optionalField.push(curCustomization);
      }
      return acc;
    },
    {
      requiredField: [],
      optionalField: [],
      totalField: [],
    }
  );

  // 用來存放初始化細項數據
  const customizeOptionRef = useRef(
    isEdit ? dishData.customizeDetail : totalField
  );

  // 初始化useReducer的curDishCustomizeOption(自訂細項的詳細數據)
  useEffect(() => {
    dispatch({
      type: "orderForm/init",
      payload: customizeOptionRef.current,
    });
  }, [dispatch]);

  // isValid + 設定required:true，可以設計出必填欄位都有填寫才點擊提交按鈕的功能
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm({
    defaultValues: dishData || {},
  });

  function onSubmit(data) {
    // 先計算食材總消耗與庫存剩餘比對
    const ingredientsUsage = calcIngredientsUsage(
      ingredients,
      curDishCustomizeOption
    );

    // 餐點原本的食材消耗(在編輯餐點狀態會需要用到)
    const previousIngredientsUsage = isEdit && {
      usageMap: dishData.ingredientsUsage,
      servings: dishData.servings,
    };

    const result = compareInventory({
      ingredientsUsage,
      servings,
      inventoryMap: new Map(inventoryMap),
      previousIngredientsUsage,
    });

    // 庫存充足
    if (result.length === 0) {
      // 每份餐點的售價(本身 + 額外選項)
      const itemTotalPrice = curDishCustomizeOption.reduce((acc, cur) => {
        const extraPriceTotal = cur.detail.reduce(
          (sum, customizeData) => sum + customizeData.extraPrice,
          0
        );
        return acc + extraPriceTotal;
      }, price - discount);

      const orderData = {
        ...data,
        itemTotalPrice,
        ingredientsUsage,
        servings,
        uniqueId,
      };

      dispatch({
        type: isEdit ? "order/updateDish" : "order/addDish",
        payload: isEdit
          ? { ...orderData, previousIngredientsUsage }
          : orderData,
      });

      onCloseModal();

      StyledHotToast({
        type: "success",
        title: isEdit ? "更新成功" : "點餐成功",
      });
    } else {
      // 庫存不足
      StyledHotToast({
        type: "error",
        title: "點餐失敗",
        content: (
          <>
            <h4>庫存食材不足：</h4>
            <ul>
              {result.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.maxCapacity === 0
                    ? `${ingredient.name}已用完`
                    : `${ingredient.name}不足（最多供應${ingredient.maxCapacity}份）`}
                </li>
              ))}
            </ul>
          </>
        ),
      });
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <StyledOverlayScrollbars style={{ maxHeight: "100%" }}>
        <Container>
          <Price>$ {price - discount}</Price>

          {requiredField &&
            requiredField.map((customizeData) => (
              <CustomizeArea
                type="required"
                isEdit={isEdit}
                customizeData={customizeData}
                register={register}
                key={customizeData.customizeId}
              />
            ))}

          {optionalField &&
            optionalField.map((customizeData) => (
              <CustomizeArea
                type="optional"
                customizeData={customizeData}
                customizeIndex={customizeData.customizeId}
                register={register}
                key={customizeData.customizeId}
              />
            ))}

          <Title>餐點備註</Title>
          <Note register={register} />
        </Container>
      </StyledOverlayScrollbars>

      <Footer>
        <ServingsControl
          servings={servings}
          setServings={setServings}
          dishData={isEdit ? dishData : {}}
          liveUpdate={false}
          size="md"
        />

        <AddToCartButton disabled={!isValid}>
          <TiShoppingCart />
          加入購物車
        </AddToCartButton>
      </Footer>
    </Form>
  );
}

export default OrderForm;
