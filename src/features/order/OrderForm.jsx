// 點餐功能
import { useForm } from "react-hook-form";
import { TiShoppingCart } from "react-icons/ti";
import styled from "styled-components";
import { IoAdd, IoRemove } from "react-icons/io5";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import { useEffect, useRef, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import StyledHotToast from "../../ui/StyledHotToast";
import CustomizeArea from "./CustomizeArea";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 75dvh;
  max-width: 36rem;
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

const Note = styled.textarea`
  height: 6.4rem;
  border: 1px solid #cacaca;
  border-radius: 5px;
  padding: 0.3rem 0.6rem;
  resize: none;
  font-size: 1.4rem;
  line-height: 1.4;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ebebeb;
  padding: 1.6rem;
`;

const Serving = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: space-between;
`;

const CountInputField = styled.input`
  width: 3.6rem;
  height: 2.4rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  padding: 0.2rem 0.4rem;
  font-weight: 600;
  text-align: center;
`;

const CountButton = styled.button`
  height: 2.8rem;
  width: 2.8rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
  background-color: transparent;

  &:not(:disabled):hover {
    background-color: #e5e5e5;
  }

  &:disabled {
    background-color: #f4f4f5;
  }

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

const AddToCartButton = styled.button`
  height: 3.2rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: #292524;
  color: #ffffff;
  font-size: 1.4rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  &:not(:disabled):hover {
    background-color: #3f3f46;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

function OrderForm({ dishData, onCloseModal, edit = false }) {
  // 當前餐點數據
  const { price, discount, ingredients, customize } = dishData;

  const [servings, setServings] = useState(dishData.servings || 1);
  const { state, dispatch, reducer } = useOrder();

  // 必填細項與選填細項
  const customizeOption = customize.reduce(
    (acc, cus) => {
      if (cus.required === "必填") {
        acc.allField.push({
          customizeId: `required${acc.requiredField.length + 1}`,
          detail: [],
        });
        acc.requiredField.push(cus);
      } else {
        acc.allField.push({
          customizeId: `optional${acc.optionalField.length + 1}`,
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
      type: "init/tempArray/consumptionPerDish",
      payload: customizeOptionRef.current,
    });
  }, [dispatch]);

  // isValid + onChange + 設定required:true，可以設計出必填欄位都有填寫才行提交的功能
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: dishData || {},
  });

  function onSubmit(data) {
    // 先計算食材總消耗與庫存剩餘比對
    const { consumptionsMap, result } = reducer(state, {
      type: "compare/inventory",
      payload: {
        ingredients,
        servings,
        originalConsumptionsMap: dishData.consumptionsMap,
      },
    });

    // 庫存充足
    if (result.length === 0) {
      StyledHotToast({ type: "success", title: "點餐成功" });

      const orderData = {
        ...dishData,
        salePrice: price - discount,
        ...data,
        consumptionsMap,
        servings,
      };

      dispatch({
        type: edit ? "order/update" : "order/insert",
        payload: orderData,
      });
      onCloseModal();
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
                <li
                  key={index}
                >{`${ingredient.name}不足（最多供應${ingredient.maxCapacity}份）`}</li>
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
      <StyledOverlayScrollbars>
        <Container>
          <Price>$ {price - discount}</Price>

          {customizeOption.requiredField &&
            customizeOption.requiredField.map(
              (customizeData, customizeIndex) => (
                <CustomizeArea
                  type="required"
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
          <Note {...register("note")} />
        </Container>
      </StyledOverlayScrollbars>

      <Footer>
        <Serving>
          <CountButton
            type="button"
            disabled={servings === 1}
            onClick={() =>
              setServings((servings) =>
                servings > 1 ? servings - 1 : servings
              )
            }
          >
            <IoRemove />
          </CountButton>

          <CountInputField
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            min={1}
          />

          <CountButton
            type="button"
            onClick={() => {
              setServings((servings) => servings + 1);
            }}
          >
            <IoAdd />
          </CountButton>
        </Serving>

        <AddToCartButton disabled={!isValid}>
          <TiShoppingCart />
          加入購物車
        </AddToCartButton>
      </Footer>
    </Form>
  );
}

export default OrderForm;
