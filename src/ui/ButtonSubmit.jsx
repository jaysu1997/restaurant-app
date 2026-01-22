import ButtonSpinner from "./ButtonSpinner";
import Button from "./Button";

function ButtonSubmit({ isLoading, ...rest }) {
  return (
    <Button type="submit" $isLoading={isLoading} {...rest}>
      <span>儲存</span>
      {isLoading && <ButtonSpinner />}
    </Button>
  );
}

export default ButtonSubmit;
