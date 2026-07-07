import { get, useController, useFormContext } from "react-hook-form";
import BaseSelect from "./BaseSelect";
import FormFieldLayout from "./FormFieldLayout";

function FormSelectField({
  label,
  name,
  rules,
  options,
  isCreatable = false,
  placeholder = null,
  disabled = false,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({ name, control, rules });
  // 這是官方提供的utils(可取得串聯欄位名稱的數據)
  const error = get(errors, name);

  return (
    <FormFieldLayout label={label} id={name} error={error}>
      <BaseSelect
        {...field}
        inputId={name}
        isCreatable={isCreatable}
        options={options}
        placeholder={placeholder}
        // filterOption默認的設定會比較value是否包含搜尋值，而因為食材options的value都是uuid，所以搜尋英文或數字的時候，會出現許多看起來毫不相關的選項，因此把filterOtion的設定改成檢視label和輸入的搜尋值。
        filterOption={(option, inputValue) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        }
        error={!!error}
        isDisabled={disabled}
      />
    </FormFieldLayout>
  );
}

export default FormSelectField;
