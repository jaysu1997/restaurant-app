// ok
import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import Option from "./Option";

// 不同填寫要求和狀態的樣式設定
const fieldUIConfig = {
  optional: {
    backgroundColor: "#fafaf9",
    label: {
      text: "選填",
      background: "#e7e5e4",
      font: "#000",
    },
    optionHover: "#e7e5e4",
  },
  requiredEmpty: {
    backgroundColor: "#fff1f2",
    label: {
      text: "必填",
      background: "#f43f5e",
      font: "#fff",
    },
    optionHover: "#fecdd3",
  },
  requiredFilled: {
    backgroundColor: "#f0f9ff",
    label: {
      text: "完成",
      background: "#3b82f6",
      font: "#fff",
    },
    optionHover: "#bae6fd",
  },
};

const StyledCustomizationField = styled.section`
  display: grid;
  grid-template-rows: 2.8rem 3.8rem 1fr;
  border: 1px solid #cacaca;
  padding: 1.2rem;
  border-radius: 6px;
  background-color: ${({ $bgColor }) => $bgColor};
`;

const Header = styled.div`
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
  font-weight: 400;
  font-size: 1.2rem;
  border-radius: 999px;
  height: 100%;
  width: 4.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $labelStyle }) => $labelStyle.background};
  color: ${({ $labelStyle }) => $labelStyle.font};
`;

const ChoiceHint = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
`;

const OptionsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

// 根據欄位要求和填寫狀態控制樣式
function getFieldStatus(customization) {
  const isRequiredField = customization.isRequired;
  const isFilled = customization.selectedOptions.length > 0;

  // 選填
  if (!isRequiredField) return "optional";

  return isFilled ? "requiredFilled" : "requiredEmpty";
}

// 自訂選項區塊
function CustomizationField({ customization }) {
  const { dispatch } = useOrderDraft();
  const { type, customizationId, name, options } = customization;

  // 填寫狀態(控制樣式)
  const fieldStatus = getFieldStatus(customization);
  const uiType = fieldUIConfig[fieldStatus];
  // 已選選項
  const selectedOptions = customization.selectedOptions ?? [];

  function handleOptionChange(e, optionData) {
    let actionType;

    if (!e.target.checked) {
      // 移除選項
      actionType = "customization/removeOption";
    } else if (type === "multiple") {
      // 多選新增
      actionType = "customization/addOption";
    } else {
      // 單選新增
      actionType = "customization/setSingle";
    }

    dispatch({
      type: actionType,
      payload: { customizationId, ...optionData },
    });
  }

  return (
    <StyledCustomizationField $bgColor={uiType.backgroundColor}>
      <Header>
        <Title>{name}</Title>
        <RequiredLabel $labelStyle={uiType.label}>
          {uiType.label.text}
        </RequiredLabel>
      </Header>

      <ChoiceHint>{type === "single" ? "只能單選" : "可以多選"}</ChoiceHint>
      <OptionsArea>
        {options.map((optionData) => (
          <Option
            hoverBgColor={uiType.optionHover}
            optionData={optionData}
            onToggle={(e) => handleOptionChange(e, optionData)}
            selectedOptions={selectedOptions}
            key={optionData.optionId}
          />
        ))}
      </OptionsArea>
    </StyledCustomizationField>
  );
}

export default CustomizationField;
