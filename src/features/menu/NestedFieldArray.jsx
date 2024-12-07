import { useFieldArray } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../../ui/Button";
import { InputField } from "../../ui/FormInputField";
import FormRow from "../../ui/FormRow";
import FormTypography from "../../ui/FormTypography";
import ControlledSelect from "../../ui/ControlledSelect";

function NestedFieldArray({
  control,
  register,
  nestedIndex,
  inventoryData = [],
  handleCreateNewItems,
  disabled,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `customize.${nestedIndex}.options`,
  });

  return (
    <>
      {fields.map((fields, index) => (
        <FormRow $formRowStyle="nested" key={fields.id}>
          <FormRow $formRowStyle="subHeader">
            <FormTypography $titleStyle="nestedTitle">
              選項設定 - {index + 1}
            </FormTypography>

            {index !== 0 && (
              <Button
                $buttonStyle="remove"
                type="button"
                onClick={() => remove(index)}
              >
                <IoCloseSharp />
              </Button>
            )}
          </FormRow>

          <InputField
            legendValue="選項名稱設定"
            type="text"
            autoComplete="off"
            placeholder="請輸入選項名稱"
            {...register(
              `customize.${nestedIndex}.options.${index}.optionLabel`,
              {
                required: "此欄位不能空白",
              }
            )}
          />

          <InputField
            legendValue="選項額外加價"
            type="number"
            autoComplete="off"
            onWheel={(e) => {
              e.target.blur();
            }}
            placeholder="請輸入選項加價"
            {...register(
              `customize.${nestedIndex}.options.${index}.extraPrice`,
              {
                required: "此欄位不能空白",
                valueAsNumber: true,
              }
            )}
          />

          <InputField legendValue="額外消耗食材">
            <ControlledSelect
              name={`customize.${nestedIndex}.options.${index}.ingredientName`}
              control={control}
              rules={{ required: "此欄位不能空白" }}
              options={[
                {
                  label: "無額外食材消耗",
                  value: "",
                },
                ...inventoryData,
              ]}
              handleCreateNewItems={handleCreateNewItems}
              creatable={true}
              disabled={disabled}
            />
          </InputField>

          <InputField
            legendValue="食材消耗數量"
            type="number"
            autoComplete="off"
            onWheel={(e) => {
              e.target.blur();
            }}
            placeholder="請輸入備料數量"
            {...register(`customize.${nestedIndex}.options.${index}.quantity`, {
              required: "此欄位不能空白",
              valueAsNumber: true,
            })}
          />
        </FormRow>
      ))}

      <Button
        $buttonStyle="add"
        type="button"
        onClick={() =>
          append({
            optionLabel: "",
            extraPrice: "",
            ingredientName: {
              label: "無額外食材消耗",
              value: "",
            },
            quantity: 0,
          })
        }
      >
        新增選項
      </Button>
    </>
  );
}

export default NestedFieldArray;
