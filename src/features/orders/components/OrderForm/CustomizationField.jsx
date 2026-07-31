// ok
import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import Option from "./Option";

// 不同填寫要求和狀態的樣式設定
const FIELD_UI = {
  optional: {
    label: "選填",
    color: "#6b7280",
    bg: "#f9fafb",
    border: "#e5e7eb",
    optionHover: "#f3f4f6",
  },
  requiredEmpty: {
    label: "必填",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    optionHover: "#fef2f2",
  },
  requiredFilled: {
    label: "完成",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    optionHover: "#eff6ff",
  },
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  /* padding: 2.4rem 0; */
  /* gap: 1.4rem; */
  gap: 1.6rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.4rem;
`;

const SectionTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`;

const SectionTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SectionHint = styled.span`
  font-size: 1.3rem;
  color: #6b7280;
`;

const Badge = styled.div`
  /* height: 2.8rem; */
  height: 2.6rem;
  flex-shrink: 0;
  width: max-content;
  padding: 0 1rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  color: ${({ $status }) => $status.color};
  background: ${({ $status }) => $status.bg};
  border: 1px solid ${({ $status }) => $status.border};
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

// 根據欄位要求和填寫狀態控制樣式
function getFieldUI({ isRequired, selectedOptions }) {
  // 選填
  if (!isRequired) return FIELD_UI.optional;

  return selectedOptions.length
    ? FIELD_UI.requiredFilled
    : FIELD_UI.requiredEmpty;
}

// 自訂選項區塊
function CustomizationField({ customization }) {
  const { dispatch } = useOrderDraft();
  const {
    type,
    customizationId,
    name,
    options,
    isRequired,
    selectedOptions = [],
  } = customization;

  // 填寫狀態(控制樣式)
  const ui = getFieldUI({ isRequired, selectedOptions });

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
    <Section>
      <SectionHeader>
        <SectionTitleGroup>
          <SectionTitle>{name}</SectionTitle>
          <SectionHint>
            {type === "single" ? "只能單選" : "可以多選"}
          </SectionHint>
        </SectionTitleGroup>

        <Badge $status={ui}>{ui.label}</Badge>
      </SectionHeader>

      <OptionList>
        {options.map((optionData) => (
          <Option
            optionData={optionData}
            onToggle={(e) => handleOptionChange(e, optionData)}
            selectedOptions={selectedOptions}
            key={optionData.optionId}
          />
        ))}
      </OptionList>
    </Section>
  );
}

export default CustomizationField;
