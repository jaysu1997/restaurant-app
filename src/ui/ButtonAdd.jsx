import Button from "./Button";

// 這個名稱可能也需要修改一下，這包含了新增欄位、上傳檔案的按鈕。但是目前設定表單的新增欄位不是這個按鈕(還不確定)
function ButtonAdd({ children, ...rest }) {
  return (
    <Button $type="tertiary" $size="sm" $rounded="full" type="button" {...rest}>
      {children}
    </Button>
  );
}

export default ButtonAdd;
