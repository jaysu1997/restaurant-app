import styled from "styled-components";
import SubmitButton from "./button/SubmitButton";
import Button from "./button/Button";

const StyledFormActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: ${({ $gap }) => $gap};
`;

function FormActions({
  onCancel,
  isProcessing = false,
  submitDisabled = false,
  cancelDisabled = false,
  gap = "2.4rem",
}) {
  return (
    <StyledFormActions $gap={gap}>
      <Button
        $variant="outline"
        onClick={onCancel}
        disabled={cancelDisabled || isProcessing}
      >
        取消
      </Button>

      <SubmitButton processing={isProcessing} disabled={submitDisabled} round>
        儲存
      </SubmitButton>
    </StyledFormActions>
  );
}

export default FormActions;
