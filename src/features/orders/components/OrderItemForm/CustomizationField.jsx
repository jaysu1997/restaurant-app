// ok
import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import Option from "./Option";
import { CircleAlert } from "lucide-react";

// 不同填寫要求和狀態的樣式設定
const FIELD_UI = {
  optional: {
    label: "選填",
    color: "#6b7280",
    bg: "#f9fafb",
    border: "#e5e7eb",
  },
  required: {
    label: "必填",
    color: "#e11d48",
    bg: "#fff1f2",
    border: "#fecdd3",
  },
  completed: {
    label: "完成",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  error: {
    label: "請選擇",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
  },
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 2.4rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.4rem;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`;

const Title = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ $isError }) => ($isError ? "#dc2626" : "#111827")};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Hint = styled.span`
  font-size: 1.3rem;
  line-height: 1.6rem;
  color: #6b7280;
`;

const Badge = styled.div`
  height: 2.8rem;
  flex-shrink: 0;
  padding: 0 1rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ $status }) => $status.color};
  background-color: ${({ $status }) => $status.bg};
  border: 1px solid ${({ $status }) => $status.border};

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

// 根據欄位要求和填寫狀態控制樣式
function getFieldUI({ isRequired, hasSelection, showError }) {
  if (!isRequired) {
    return FIELD_UI.optional;
  }

  if (showError) {
    return FIELD_UI.error;
  }

  if (hasSelection) {
    return FIELD_UI.completed;
  }

  return FIELD_UI.required;
}

// 自訂選項區塊
function CustomizationField({ customization, submitAttempted }) {
  const { dispatch } = useOrderDraft();
  const {
    type,
    customizationId,
    name,
    options,
    isRequired,
    selectedOptions = [],
  } = customization;

  const hasSelection = selectedOptions.length > 0;
  // 必填項目尚未填寫
  const isRequiredEmpty = isRequired && !hasSelection;
  // 必填項目尚未填寫就已經按下提交按鈕
  const showError = submitAttempted && isRequiredEmpty;

  // 填寫狀態(控制樣式)
  const ui = getFieldUI({ isRequired, hasSelection, showError });

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
    <Container data-customization-id={customizationId}>
      <Header>
        <TitleGroup>
          <Title $isError={showError}>{name}</Title>
          <Hint>{type === "single" ? "只能單選" : "可以多選"}</Hint>
        </TitleGroup>

        <Badge $status={ui}>
          {showError && <CircleAlert />}
          <span>{ui.label}</span>
        </Badge>
      </Header>

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
    </Container>
  );
}

export default CustomizationField;
