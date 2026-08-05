import Button from "./Button";
import ButtonSpinner from "../../components/ButtonSpinner";
import styled, { css } from "styled-components";

const StyledSubmitButton = styled(Button)`
  position: relative;
  border-radius: ${({ $round }) => ($round ? "999px" : "8px")};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `};
`;

const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  /* 隱藏span顯示載入中spinner */
  visibility: ${({ $processing }) => ($processing ? "hidden" : "visible")};
`;

function SubmitButton({
  children,
  processing = false,
  fullWidth = false,
  round = false,
  disabled,
  ...rest
}) {
  return (
    <StyledSubmitButton
      $fullWidth={fullWidth}
      $round={round}
      type="submit"
      disabled={disabled || processing}
      {...rest}
    >
      <ButtonContent $processing={processing}>{children}</ButtonContent>
      {processing && <ButtonSpinner />}
    </StyledSubmitButton>
  );
}

export default SubmitButton;
