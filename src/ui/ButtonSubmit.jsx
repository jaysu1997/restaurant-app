import ButtonSpinner from "./ButtonSpinner";
import Button from "./Button";

function ButtonSubmit({
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

export default ButtonSubmit;
