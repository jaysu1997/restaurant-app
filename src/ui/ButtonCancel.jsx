import Button from "./Button";

function ButtonCancel({ ...rest }) {
  return (
    <Button $type="secondary" $size="sm" $rounded="full" {...rest}>
      取消
    </Button>
  );
}

export default ButtonCancel;
