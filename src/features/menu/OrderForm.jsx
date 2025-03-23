// 點餐功能
import { useForm } from "react-hook-form";
import { TiShoppingCart } from "react-icons/ti";
import styled from "styled-components";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import { useEffect, useRef, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import StyledHotToast from "../../ui/StyledHotToast";
import CustomizeArea from "./CustomizeArea";
import ServingsControl from "../../ui/ServingsControl";

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

function OrderForm({ dishData, onCloseModal, edit = false }) {
  // 當前餐點數據
  const { id, price, discount, ingredients, customize } = dishData;

  const [servings, setServings] = useState(dishData.servings || 1);
  const { state, dispatch, calcIngredientUsage, compareInventory } = useOrder();

  // 必填細項與選填細項
  const customizeOption = customize.reduce(
    (acc, cus) => {
      if (cus.required === "必填") {
        acc.allField.push({
          customizeId: `required${acc.requiredField.length + 1}`,
          customizeTitle: cus.title,
          detail: [],
        });
        acc.requiredField.push(cus);
      } else {
        acc.allField.push({
          customizeId: `optional${acc.optionalField.length + 1}`,
          customizeTitle: cus.title,
          detail: [],
        });
        acc.optionalField.push(cus);
      }
      return acc;
    },
    {
      requiredField: [],
      optionalField: [],
      allField: [],
    }
  );

  const customizeOptionRef = useRef(
    edit ? dishData.customizeDetail : [...customizeOption.allField]
  );

  // 初始化useReducer的tempArray(自訂細項的詳細數據)
  useEffect(() => {
    dispatch({
      type: "init/tempArray/coustomize",
      payload: customizeOptionRef.current,
    });
  }, [dispatch]);

  // isValid + 設定required:true，可以設計出必填欄位都有填寫才行提交的功能
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm({
    defaultValues: dishData || {},
  });

  function onSubmit(data) {
    // 先計算食材總消耗與庫存剩餘比對
    const ingredientUsageMap = calcIngredientUsage(ingredients, state);

    // 餐點原本的食材消耗(在編輯餐點狀態會需要用到)
    const previousIngredientsUsage = edit && {
      usageMap: dishData.ingredientUsageMap,
      servings: dishData.servings,
    };

    const result = compareInventory({
      ingredientUsageMap,
      servings,
      inventoryMap: new Map(state.inventoryMap),
      previousIngredientsUsage,
    });

    // 庫存充足
    if (result.length === 0) {
      // 每份餐點的售價(本身 + 額外選項)
      const itemTotalPrice = state.tempArray.reduce((acc, cur) => {
        const extraPriceTotal = cur.detail.reduce(
          (sum, customizeData) => sum + customizeData.extraPrice,
          0
        );
        return acc + extraPriceTotal;
      }, price - discount);

      const orderData = {
        ...data,
        itemTotalPrice,
        ingredientUsageMap,
        servings,
        uniqueId: `${id}-${state.dishId}`,
      };

      dispatch({
        type: edit ? "order/update" : "order/insert",
        payload: edit ? { ...orderData, previousIngredientsUsage } : orderData,
      });

      onCloseModal();

      StyledHotToast({ type: "success", title: "點餐成功" });
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
      <StyledOverlayScrollbars style={{ maxHeight: "100%" }} autoHide="scroll">
        <Container>
          <Price>$ {price - discount}</Price>

          {customizeOption.requiredField &&
            customizeOption.requiredField.map(
              (customizeData, customizeIndex) => (
                <CustomizeArea
                  type="required"
                  edit={edit}
                  customizeData={customizeData}
                  customizeIndex={customizeIndex}
                  register={register}
                  key={customizeIndex}
                />
              )
            )}

          {customizeOption.optionalField &&
            customizeOption.optionalField.map(
              (customizeData, customizeIndex) => (
                <CustomizeArea
                  type="optional"
                  customizeData={customizeData}
                  customizeIndex={customizeIndex}
                  register={register}
                  key={customizeIndex}
                />
              )
            )}

          <Title>餐點備註</Title>
          <textarea
            maxLength="50"
            placeholder="備註內容最多50個字"
            {...register("note")}
          />
        </Container>
      </StyledOverlayScrollbars>

      <Footer>
        <ServingsControl
          servings={servings}
          setServings={setServings}
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
