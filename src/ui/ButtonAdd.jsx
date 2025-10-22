import Button from "./Button";

function ButtonAdd({ children, ...rest }) {
  return (
    <Button $type="tertiary" $size="sm" $rounded="full" type="button" {...rest}>
      {children}
    </Button>
  );
}

export default ButtonAdd;
