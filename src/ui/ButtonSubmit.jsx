import ButtonSpinner from "./ButtonSpinner";
import Button from "./Button";

function ButtonSubmit({ isLoading, ...rest }) {
  return (
    <Button
      $type="primary"
      $size="sm"
      $rounded="full"
      $isLoading={isLoading}
      {...rest}
    >
      <span>儲存</span>
      {isLoading && <ButtonSpinner />}
    </Button>
  );
}

export default ButtonSubmit;
