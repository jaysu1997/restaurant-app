import Button from "./Button";

function ButtonHome({ ...rest }) {
  return (
    <Button $type="danger" $size="sm" $rounded="full" {...rest}>
      返回首頁
    </Button>
  );
}

export default ButtonHome;
