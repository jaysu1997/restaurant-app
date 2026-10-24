import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import Option from "./Option";
import { CircleAlert } from "lucide-react";

// 不同填寫要求和狀態的樣式設定
const FIELD_UI = {
  optional: {
    label: "選填",
    color: "var(--color-text-muted)",
    bg: "var(--color-background)",
    border: "var(--color-border)",
  },
  required: {
    label: "必填",
    color: "var(--color-danger-strong)",
    bg: "#fff1f2",
    border: "#fecdd3",
  },
  completed: {
    label: "完成",
    color: "var(--color-brand)",
    bg: "var(--color-brand-subtle)",
    border: "#bfdbfe",
  },
  error: {
    label: "請選擇",
    color: "var(--color-danger)",
    bg: "var(--color-danger-subtle)",
    border: "var(--color-danger-border)",
  },
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-6);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--space-1);
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
`;

const Title = styled.h4`
  font-size: 1.8rem;
  font-weight: var(--font-weight-semibold);
  color: ${({ $isError }) =>
    $isError ? "var(--color-danger)" : "var(--color-text-strong)"};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Hint = styled.span`
  font-size: 1.3rem;
  line-height: 1.6rem;
  color: var(--color-text-muted);
`;

const Badge = styled.div`
  height: 2.8rem;
  flex-shrink: 0;
  padding: 0 var(--space-2-5);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: var(--space-1-5);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
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
  gap: var(--space-1);
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
