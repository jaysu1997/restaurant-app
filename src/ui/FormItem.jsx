import styled from "styled-components";
import { FormInput, Trash2 } from "lucide-react";
import FormFieldLayout from "./FormFieldLayout";
import ControlledSelect from "../ui-old/ControlledSelect";
import ControlledSwitch from "../ui-old/ControlledSwitch";
import Button from "./Button";

// 測試看看
const FormSection = styled.div`
  grid-column: ${({ $isFullWidth }) => ($isFullWidth ? "1 / -1" : "auto")};
  display: grid;
  grid-template-columns: ${({ $isFullWidth }) =>
    $isFullWidth ? "1fr 1fr" : "1fr"};
  gap: 1.4rem;
`;

const FormHeading = styled.h3`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  font-weight: 600;
`;

const FormDescription = styled.p`
  grid-column: 1 / -1;
  font-size: 1.4rem;
  color: #6b7280;
`;

function FormItem({
  keyId,
  isFullWidth,
  heading,
  required,
  description,
  fields,
  control,
  inventoryData,
  disabled,
  handleCreateNewItems,
}) {
  return (
    <FormSection $isFullWidth={isFullWidth} key={keyId}>
      {heading && (
        <FormHeading as={heading.as}>
          {heading.text}
          {required && <span className="emphasize">*</span>}
          {heading.action && (
            <Button $variant="ghost" onClick={heading.action}>
              <Trash2 size={16} />
            </Button>
          )}
        </FormHeading>
      )}
      {description && <FormDescription>{description}</FormDescription>}

      {fields.map((field) => (
        <FormFieldLayout
          label={field.label}
          id={field.id}
          errors={field.errors}
          key={field.name}
        >
          {field.type === "input" && <FormInput id={field.id} />}

          {field.type === "select" && (
            <SelectField
              name={field.name}
              control={control}
              inventoryData={inventoryData}
              disabled={disabled}
              handleCreateNewItems={handleCreateNewItems}
            />
          )}

          {field.type === "switch" && (
            <SwitchField
              control={control}
              disabled={disabled}
              index={field.index}
            />
          )}
        </FormFieldLayout>
      ))}
    </FormSection>
  );
}

function SelectField({
  name,
  control,
  inventoryData,
  disabled,
  handleCreateNewItems,
}) {
  return (
    <ControlledSelect
      name={name}
      control={control}
      rules={{ required: "食材名稱不能空白" }}
      options={[
        {
          label: "無",
          value: "",
        },
        ...inventoryData,
      ]}
      handleCreateNewItems={handleCreateNewItems}
      creatable={true}
      placeholder="選擇現有食材或輸入新食材"
      disabled={disabled}
    />
  );
}

function SwitchField({ control, disabled, index }) {
  return (
    <ControlledSwitch
      control={control}
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

export default FormItem;
