import Button from "./Button";

function ButtonCancel({ ...rest }) {
  return (
    <Button $variant="outline" type="button" {...rest}>
      取消
    </Button>
  );
}

export default ButtonCancel;
