import styled from "styled-components";
import useOrderDraft from "../../context/orders/useOrderDraft";
import Option from "./Option";

// 不同選項要求和狀態的樣式設定
const fieldUIConfig = {
  backgroundColor: {
    optional: "#fafaf9",
    requiredEmpty: "#fff1f2",
    requiredFilled: "#f0f9ff",
  },
  color: {
    optional: { background: "#e7e5e4", font: "#000" },
    requiredEmpty: { background: "#f43f5e", font: "#fff" },
    requiredFilled: { background: "#3b82f6", font: "#fff" },
  },
  label: {
    optional: "選填",
    requiredEmpty: "必填",
    requiredFilled: "完成",
  },
  optionHover: {
    optional: "#e7e5e4",
    requiredEmpty: "#fecdd3",
    requiredFilled: "#bae6fd",
  },
};

const StyledCustomizationField = styled.section`
  display: grid;
  grid-template-rows: 2.8rem 3.8rem 1fr;
  border: 1px solid #cacaca;
  padding: 1.2rem;
  border-radius: 6px;
  background-color: ${(props) => props.$bgColorStyle};
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
  font-weight: 400;
  font-size: 1.2rem;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  background-color: ${(props) => props.$labelStyle.background};
  color: ${(props) => props.$labelStyle.font};
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

  const fieldStatus = !isRequiredField
    ? "optional"
    : isFilled
      ? "requiredFilled"
      : "requiredEmpty";

  return fieldStatus;
}

// 自訂選項區塊
function CustomizationField({ customization }) {
  const { dispatch } = useOrderDraft();
  const { type, customizationId, name, options } = customization;

  // 填寫狀態(控制樣式)
  const fieldStatus = getFieldStatus(customization);
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
    <StyledCustomizationField
      $bgColorStyle={fieldUIConfig.backgroundColor[fieldStatus]}
    >
      <Heading>
        <Title>{name}</Title>
        <RequiredLabel $labelStyle={fieldUIConfig.color[fieldStatus]}>
          {fieldUIConfig.label[fieldStatus]}
        </RequiredLabel>
      </Heading>
      <ChoiceHint>{type === "single" ? "只能單選" : "可以多選"}</ChoiceHint>
      <OptionsArea>
        {options.map((optionData) => (
          <Option
            optionHover={fieldUIConfig.optionHover[fieldStatus]}
            optionData={optionData}
            onToggle={(e) => {
              handleOptionChange(e, optionData);
            }}
            selectedOptions={selectedOptions}
            key={optionData.optionId}
          />
        ))}
      </OptionsArea>
    </StyledCustomizationField>
  );
}

export default CustomizationField;
