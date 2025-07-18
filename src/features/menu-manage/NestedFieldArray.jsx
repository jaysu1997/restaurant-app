import { useFieldArray, useFormContext } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormTypography from "../../ui/FormTypography";
import ControlledSelect from "../../ui/ControlledSelect";
import FormFieldset from "../../ui/FormFieldset";
import ControlledInput from "../../ui/ControlledInput";
import FormErrorsMessage from "../../ui/FormErrorsMessage";

function NestedFieldArray({
  nestedIndex,
  inventoryData = [],
  handleCreateNewItems,
  disabled,
}) {
  const { register, control, getValues, errors } = useFormContext();

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

          {/* 選項的id */}
          <input
            hidden
            {...register(`customize.${nestedIndex}.options.${index}.optionId`, {
              value: index,
            })}
          />

          <FormFieldset legendValue="選項名稱設定">
            <ControlledInput
              type="text"
              placeholder="請輸入選項名稱"
              control={control}
              name={`customize.${nestedIndex}.options.${index}.optionLabel`}
              rules={{
                required: "選項名稱不能空白",
              }}
            />
          </FormFieldset>

          <FormErrorsMessage
            fieldName={
              errors?.customize?.[nestedIndex]?.options?.[index]?.optionLabel
            }
          />

          <FormFieldset legendValue="選項額外加價">
            <ControlledInput
              type="number"
              placeholder="請輸入選項加價"
              control={control}
              name={`customize.${nestedIndex}.options.${index}.extraPrice`}
              rules={{
                required: "選項額外加價不能空白",
                min: {
                  value: 0,
                  message: `加價不能為負數`,
                },
              }}
            />
          </FormFieldset>

          <FormErrorsMessage
            fieldName={
              errors?.customize?.[nestedIndex]?.options?.[index]?.extraPrice
            }
          />

          <FormFieldset legendValue="額外消耗食材">
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
              placeholder="可新增/選擇食材"
              disabled={disabled}
            />
          </FormFieldset>

          <FormErrorsMessage
            fieldName={
              errors?.customize?.[nestedIndex]?.options?.[index]?.ingredientName
            }
          />

          <FormFieldset legendValue="食材消耗數量">
            <ControlledInput
              type="number"
              placeholder="請輸入備料數量"
              control={control}
              name={`customize.${nestedIndex}.options.${index}.quantity`}
              rules={{
                required: "食材消耗數量不能空白",
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
              }}
            />
          </FormFieldset>

          <FormErrorsMessage
            fieldName={
              errors?.customize?.[nestedIndex]?.options?.[index]?.quantity
            }
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
            quantity: "",
          })
        }
      >
        新增選項
      </Button>
    </>
  );
}

export default NestedFieldArray;
