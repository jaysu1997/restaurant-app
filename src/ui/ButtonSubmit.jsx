import ButtonSpinner from "./ButtonSpinner";
import Button from "./Button";

function ButtonSubmit({
  label = "儲存",
  isProcessing = false,
  isFullWidth = false,
  ...rest
}) {
  return (
    <Button
      type="submit"
      $isProcessing={isProcessing}
      $isFullWidth={isFullWidth}
      {...rest}
    >
      <span>{label}</span>
      {isProcessing && <ButtonSpinner />}
    </Button>
  );
}

export default ButtonSubmit;
