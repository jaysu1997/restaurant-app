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
  getValues,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `customize.${nestedIndex}.options`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <FormRow $formRowStyle="nested" key={field.id}>
          <FormRow $formRowStyle="subHeader">
            <FormTypography $titleStyle="nestedTitle">
              選項 - {index + 1}
            </FormTypography>

            {fields.length - 1 !== 0 && (
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
            placeholder="請輸入選項名稱"
            {...register(
              `customize.${nestedIndex}.options.${index}.optionLabel`,
              {
                required: "選項名稱不能空白",
              }
            )}
          />

          <InputField
            legendValue="選項額外加價"
            type="number"
            placeholder="請輸入選項加價"
            {...register(
              `customize.${nestedIndex}.options.${index}.extraPrice`,
              {
                required: "選項額外加價不能空白",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: `加價不能為負數`,
                },
              }
            )}
          />

          <InputField legendValue="額外消耗食材">
            <ControlledSelect
              name={`customize.${nestedIndex}.options.${index}.ingredientName`}
              control={control}
              rules={{ required: "額外消耗食材不能空白" }}
              options={[
                {
                  label: "無",
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
            onWheel={(e) => {
              e.target.blur();
            }}
            placeholder="請輸入備料數量"
            {...register(`customize.${nestedIndex}.options.${index}.quantity`, {
              required: "食材消耗數量不能空白",
              valueAsNumber: true,
              validate: (value) => {
                // 如果有使用額外消耗食材就不能將消耗量設為0
                const ingredient = getValues(
                  `customize.${nestedIndex}.options.${index}.ingredientName`
                )?.value;

                if (ingredient === "") {
                  return value < 0 ? "食材消耗數量不能少於0" : true;
                } else {
                  return value < 1 ? "食材消耗數量不能少於1" : true;
                }
              },
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
              label: "無",
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
