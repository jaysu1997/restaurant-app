import styled from "styled-components";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import Option from "./Option";

// 不同選項要求和狀態的樣式設定
const colorStyle = {
  background: {
    optional: "#fafaf9",
    required: "#fff1f2",
    isAnswered: "#f0f9ff",
  },
  label: {
    optional: { background: "#e7e5e4", font: "#000" },
    required: { background: "#f43f5e", font: "#fff" },
    isAnswered: { background: "#3b82f6", font: "#fff" },
  },
};

const Customize = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid #cacaca;
  padding: 1.2rem;
  border-radius: 6px;
  background-color: ${(props) => props.$colorStyle};
  transition: all 0.2s;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.8rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

const RequiredLabel = styled.span`
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.5;
  background-color: ${(props) => props.$colorStyle.background};
  color: ${(props) => props.$colorStyle.font};
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-weight: 400;
`;

const ChoiceLabel = styled.span`
  font-weight: 500;
  margin-bottom: 1.6rem;
  color: rgba(0, 0, 0, 0.6);
`;

const OptionsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

// 自訂選項區塊
function CustomizeArea({ customizeData, register, isEdit = false }) {
  const { choiceType, customizeId, isRequired, title, options } = customizeData;

  // 用來控制項目CSS樣式(填寫狀態)
  const [isAnswered, setIsAnswered] = useState(
    isEdit && isRequired === "required" ? "isAnswered" : isRequired
  );

  // 當前訂購餐點的項目選擇
  const {
    state: { curDishCustomizeOption },
    dispatch,
  } = useOrder();

  function handleClick(e, payload) {
    // 單選新增
    if (choiceType === "single" && e.target.checked) {
      dispatch({
        type: "curDishCustomizeOption/setSingleChoice",
        payload,
      });
      // 必填
      isRequired === "required" && setIsAnswered("isAnswered");
    }

    // 單選刪除
    if (choiceType === "single" && !e.target.checked) {
      dispatch({
        type: "curDishCustomizeOption/clearSingleChoice",
        payload,
      });
      // 必填
      isRequired === "required" && setIsAnswered("required");
    }

    // 多選新增
    if (choiceType === "multiple" && e.target.checked) {
      dispatch({
        type: "curDishCustomizeOption/addMultipleChoice",
        payload,
      });
      // 必填
      isRequired === "required" && setIsAnswered("isAnswered");
    }

    // 多選移除
    if (choiceType === "multiple" && !e.target.checked) {
      // 如果此多選項目是必填，則在沒有選取任何值的情況下，整體樣式需恢復成未填寫狀態
      if (isRequired === "required") {
        const curDishCustomizeOptionIndex = curDishCustomizeOption.findIndex(
          (customize) => customize.customizeId === customizeId
        );

        // 當前選項長度為1，代表目前只有存在一個選項，被移除後就沒有選取任何值
        curDishCustomizeOption[curDishCustomizeOptionIndex].detail.length ===
          1 && setIsAnswered("required");
      }

      // 移除選項
      dispatch({
        type: "curDishCustomizeOption/removeMultipleChoice",
        payload,
      });
    }
  }

  return (
    <Customize
      type={isRequired}
      $colorStyle={colorStyle.background[isAnswered]}
      key={customizeId}
    >
      <Heading>
        <Title>{title}</Title>
        <RequiredLabel
          type={isRequired}
          $colorStyle={colorStyle.label[isAnswered]}
        >
          {isRequired === "required"
            ? isAnswered === "isAnswered"
              ? "完成"
              : "必填"
            : "選填"}
        </RequiredLabel>
      </Heading>
      <ChoiceLabel>
        {choiceType === "single" ? "只能單選" : "可以多選"}
      </ChoiceLabel>
      <OptionsArea>
        {options.map((optionData) => (
          <Option
            isAnswered={isAnswered}
            customizeData={customizeData}
            register={register}
            optionData={optionData}
            handleClick={handleClick}
            curDishCustomizeOption={curDishCustomizeOption}
            key={optionData.optionId}
          />
        ))}
      </OptionsArea>
    </Customize>
  );
}

export default CustomizeArea;
