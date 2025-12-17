import styled from "styled-components";
import { Trash2 } from "lucide-react";
import FormFieldLayout from "../ui/FormFieldLayout";
import ControlledSelect from "../ui-old/ControlledSelect";
import ControlledSwitch from "../ui-old/ControlledSwitch";
import Button from "../ui/Button";
import { useFormContext } from "react-hook-form";
import FormInput from "../ui/FormInput";

// 測試看看(應該要改個名稱，例如UpsertFormSection之類的)
const Section = styled.div`
  grid-column: ${({ $isFullWidth }) => ($isFullWidth ? "1 / -1" : "auto")};
  display: grid;
  grid-template-columns: ${({ $isFullWidth }) =>
    $isFullWidth ? "1fr 1fr" : "1fr"};

  column-gap: 2rem;
  row-gap: 1.4rem;
  font-size: 1.4rem;

  border-radius: 6px;
  border: ${({ $isGroup }) => ($isGroup ? "1px solid #ddd" : "")};
  padding: ${({ $isGroup }) => ($isGroup ? "1.6rem" : "")};

  h3 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #292929;
  }

  h4 {
    font-size: 1.8rem;
    color: #292929;
  }

  h5 {
    font-size: 1.5rem;
    color: #292929;
  }

  label {
    color: #666;
  }

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

const Heading = styled.h3`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  min-height: 3rem;
  font-weight: 600;
`;

const Description = styled.p`
  grid-column: 1 / -1;
  color: #6b7280;
`;

function FormSection({
  id,
  isFullWidth = false,
  isGroup = false,
  heading,
  descriptions = undefined,
  fields = [],
  inventoryData,
  children,
}) {
  const { register, isDisabled } = useFormContext();

  return (
    <Section $isFullWidth={isFullWidth} $isGroup={isGroup} id={id}>
      {heading && (
        <Heading as={heading.as}>
          {heading.text}
          {heading.required && <span className="emphasize">*</span>}
          {heading.action && (
            <Button $variant="ghost" onClick={heading.action}>
              <Trash2 size={16} />
            </Button>
          )}
        </Heading>
      )}

      {descriptions &&
        descriptions?.map((des, i) => (
          <Description key={i}>&#8251;{des}</Description>
        ))}

      {fields &&
        fields.map((field) => (
          <FormFieldLayout
            label={field.label}
            id={field.type === "input" ? field.name : undefined}
            error={field.errors}
            key={field.name}
          >
            {field.type === "input" && (
              <FormInput
                id={field.name}
                placeholder={field.placeholder}
                {...register(field.name, {
                  disabled: isDisabled,
                  required: "此欄位必須填寫",
                  ...(field.rules ? field.rules : {}),
                })}
              />
            )}

            {field.type === "select" && (
              <SelectField
                name={field.name}
                inventoryData={inventoryData}
                disabled={isDisabled}
              />
            )}

            {field.type === "switch" && (
              <SwitchField disabled={isDisabled} index={field.index} />
            )}
          </FormFieldLayout>
        ))}

      {children}
    </Section>
  );
}

function SelectField({ name, inventoryData, disabled }) {
  return (
    <ControlledSelect
      name={name}
      rules={{ required: "食材名稱不能空白" }}
      options={[
        {
          label: "無",
          value: "",
        },
        ...inventoryData,
      ]}
      creatable={true}
      placeholder="選擇現有食材或輸入新食材"
      disabled={disabled}
    />
  );
}

function SwitchField({ disabled, index }) {
  return (
    <ControlledSwitch
      disabled={disabled}
      items={[
        {
          name: `customize.${index}.isRequired`,
          option1: { label: "選填", value: "optional" },
          option2: { label: "必填", value: "required" },
        },
        {
          name: `customize.${index}.choiceType`,
          option1: { label: "多選", value: "multiple" },
          option2: { label: "單選", value: "single" },
        },
      ]}
    />
  );
}

export default FormSection;
