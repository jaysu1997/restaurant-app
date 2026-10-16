import { Controller, useFormContext } from "react-hook-form";
import styled, { css } from "styled-components";
import FormFieldLayout from "./FormFieldLayout";
import { hoverStyles } from "../style/helpers";

const StyledSegmented = styled.div`
  height: 4.2rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-1);
  background-color: #f1f5f9;
  border: 1px solid var(--color-border-slate);
  border-radius: var(--radius-lg);
  padding: var(--space-1);
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
`;

const SegmentedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  background-color: ${({ $isActive }) => ($isActive ? "var(--color-surface)" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "var(--color-text-slate-strong)" : "var(--color-text-slate-muted)")};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  border: 1px solid
    ${({ $isActive }) => ($isActive ? "#dce3ea" : "transparent")};
  border-radius: var(--radius-md);
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0 1px 2px rgba(15, 23, 42, 0.06)" : "none"};

  transition:
    color 0.16s ease,
    background-color 0.16s ease,
    border-color 0.16s ease,
    box-shadow 0.16s ease;

  &:disabled {
    cursor: not-allowed;
  }

  ${hoverStyles(css`
    color: var(--color-text-slate-strong);
  `)}
`;

function DiningMethodSegmented({ disabled }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name="diningMethod"
      control={control}
      render={({ field }) => (
        <FormFieldLayout label="用餐方式" required>
          <StyledSegmented
            $isDisabled={disabled}
            title={disabled ? "非營業時段" : undefined}
          >
            <SegmentedButton
              type="button"
              $isActive={field.value === "內用"}
              disabled={disabled}
              onClick={() => {
                field.onChange("內用");
                setValue("pickupTime", null);
              }}
            >
              內用
            </SegmentedButton>

            <SegmentedButton
              type="button"
              $isActive={field.value === "外帶"}
              disabled={disabled}
              onClick={() => {
                field.onChange("外帶");
                setValue("tableNumber", null);
              }}
            >
              外帶
            </SegmentedButton>
          </StyledSegmented>
        </FormFieldLayout>
      )}
    />
  );
}

export default DiningMethodSegmented;
