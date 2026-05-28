import ButtonSpinner from "../../ui/ButtonSpinner";
import Button from "./Button";

function SubmitButton({
  label = "儲存",
  isProcessing = false,
  fullWidth = false,
  ...rest
}) {
  return (
    <Button
      type="submit"
      $isProcessing={isProcessing}
      $isFullWidth={fullWidth}
      {...rest}
    >
      <span>{label}</span>
      {isProcessing && <ButtonSpinner />}
    </Button>
  );
}

export default SubmitButton;
