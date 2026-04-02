import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

const StyledSegmented = styled.div`
  height: 3.8rem;
  width: 100%;
  background-color: #e7e5e4;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.4rem;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
`;

const SegmentedButton = styled.button`
  font-size: 1.2rem;
  border-radius: 4px;
  background-color: ${({ $isActive }) => ($isActive ? "#fff" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#111827" : "#6b7280")};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0 1px 3px rgba(0, 0, 0, 0.15)" : "none"};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s ease;

  &:disabled {
    cursor: not-allowed;
  }
`;

function DiningMethodSegmented({ isDisabled }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name="diningMethod"
      control={control}
      render={({ field }) => (
        <StyledSegmented
          $isDisabled={isDisabled}
          title={isDisabled ? "非營業時段" : undefined}
        >
          <SegmentedButton
            type="button"
            $isActive={field.value === "內用"}
            disabled={isDisabled}
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
            disabled={isDisabled}
            onClick={() => {
              field.onChange("外帶");
              setValue("tableNumber", null);
            }}
          >
            外帶
          </SegmentedButton>
        </StyledSegmented>
      )}
    />
  );
}

export default DiningMethodSegmented;
