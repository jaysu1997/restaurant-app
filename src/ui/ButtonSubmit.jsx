import ButtonSpinner from "./ButtonSpinner";
import Button from "./Button";

function ButtonSubmit({ isProcessing, ...rest }) {
  return (
    <Button type="submit" $isProcessing={isProcessing} {...rest}>
      <span>儲存</span>
      {isProcessing && <ButtonSpinner />}
    </Button>
  );
}

export default ButtonSubmit;
