import Button from "./Button";

function ButtonReload({ children, ...rest }) {
  return (
    <Button $type="primary" $size="sm" $rounded="full" {...rest}>
      {children}
    </Button>
  );
}

export default ButtonReload;
