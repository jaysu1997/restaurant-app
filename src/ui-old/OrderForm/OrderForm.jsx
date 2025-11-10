// 點餐功能表單
import styled from "styled-components";
import { useOrder } from "../../context/OrderContext";
import { useEffect, useRef, useState } from "react";
import { calcIngredientsUsage, generateDishItemId } from "./orderFormHelpers";
import { useForm } from "react-hook-form";
import { compareInventory } from "../../utils/orderHelpers";
import StyledHotToast from "../StyledHotToast";
import Modal from "../Modal";
import Note from "../Note";
import CustomizeArea from "./CustomizeArea";
import ServingsControl from "../ServingsControl";
import { TiShoppingCart } from "react-icons/ti";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-height: 75dvh;
  width: min(36rem, 95dvw);
  font-size: 1.4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2.4rem;
  overflow-y: auto;
  scrollbar-gutter: stable;
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
  border-radius: 6px;
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
`;

function OrderForm({ dishData, onCloseModal, isEdit = false }) {
  // 餐點編輯的相關功能
  const {
    state: { dishes, curDishCustomizeOption, inventoryMap },
    dispatch,
  } = useOrder();

  const [servings, setServings] = useState(dishData.servings || 1);

  // 當前餐點數據
  const {
    price,
    discount,
    ingredients,
    customize,
    uniqueId = generateDishItemId(dishes),
  } = dishData;

  // 將自訂細項數據整理成訂購表單展示的欄位數據以及在useReducer進行初始化的數據
  const { displayFields, reducerFields } = customize.reduce(
    (acc, curCustomization) => {
      acc.reducerFields.push({
        customizeId: curCustomization.customizeId,
        customizeTitle: curCustomization.title,
        detail: [],
      });
      // 必填細項與選填細項
      if (curCustomization.isRequired === "required") {
        acc.displayFields.unshift(curCustomization);
      } else {
        acc.displayFields.push(curCustomization);
      }
      return acc;
    },
    {
      displayFields: [],
      reducerFields: [],
    }
  );

  // 用來存放初始化細項數據
  const customizeOptionRef = useRef(
    isEdit ? dishData.customizeDetail : reducerFields
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
    // 計算食材總消耗
    const ingredientsUsage = calcIngredientsUsage(
      ingredients,
      curDishCustomizeOption
    );

    // 餐點原本的食材消耗(在更新餐點設定會需要用到)
    const previousIngredientsUsage = isEdit && {
      usageMap: dishData.ingredientsUsage,
      servings: dishData.servings,
    };

    // 庫存剩餘比對
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

      const dishData = {
        ...data,
        itemTotalPrice,
        ingredientsUsage,
        servings,
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
            {result.map((ingredient, index) => (
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
      modalHeader={dishData.name}
      maxWidth={36}
      onCloseModal={onCloseModal}
      scrollBar={false}
    >
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Price>$ {price - discount}</Price>

          {displayFields &&
            displayFields.map((customizeData) => (
              <CustomizeArea
                isEdit={isEdit}
                customizeData={customizeData}
                register={register}
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
            dishData={isEdit ? dishData : {}}
            liveUpdate={false}
            size="md"
          />

          <AddToCartButton disabled={!isValid}>
            <TiShoppingCart size={20} />
            加入購物車
          </AddToCartButton>
        </Footer>
      </Form>
    </Modal>
  );
}

export default OrderForm;
