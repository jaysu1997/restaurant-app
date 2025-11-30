import { useFieldArray, useFormContext } from "react-hook-form";
import ControlledSelect from "../../ui-old/ControlledSelect";
import { fadeInAnimation } from "../../utils/dom";
import { FormHeading, FormList, FromListItem } from "../../ui/FormLayout";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import { Plus, Trash2 } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";

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
    <FormList>
      {fields.map((field, index) => (
        <FromListItem
          key={field.id}
          id={`customize.${nestedIndex}.options.${index}`}
        >
          <FormHeading>
            選項 - {index + 1}
            {fields.length - 1 !== 0 && (
              <Button $variant="ghost" onClick={() => remove(index)}>
                <Trash2 size={16} />
              </Button>
            )}
          </FormHeading>

          {/* 選項的id */}
          <input
            hidden
            {...register(`customize.${nestedIndex}.options.${index}.optionId`, {
              value: index,
            })}
          />

          <FormFieldLayout
            id={`customize.${nestedIndex}.options.${index}.optionLabel`}
            label="選項名稱設定"
            errors={
              errors?.customize?.[nestedIndex]?.options?.[index]?.optionLabel
            }
          >
            <FormInput
              id={`customize.${nestedIndex}.options.${index}.optionLabel`}
              placeholder="請輸入選項名稱"
              {...register(
                `customize.${nestedIndex}.options.${index}.optionLabel`,
                { required: "選項名稱不能空白" }
              )}
            />
          </FormFieldLayout>

          <FormFieldLayout
            id={`customize.${nestedIndex}.options.${index}.extraPrice`}
            label="選項額外加價"
            errors={
              errors?.customize?.[nestedIndex]?.options?.[index]?.extraPrice
            }
          >
            <FormInput
              id={`customize.${nestedIndex}.options.${index}.extraPrice`}
              placeholder="請輸入選項加價"
              {...register(
                `customize.${nestedIndex}.options.${index}.extraPrice`,
                {
                  required: "選項額外加價不能空白",
                  min: {
                    value: 0,
                    message: `加價不能為負數`,
                  },
                }
              )}
            />
          </FormFieldLayout>

          <FormFieldLayout
            label="額外消耗食材"
            errors={
              errors?.customize?.[nestedIndex]?.options?.[index]?.ingredientName
            }
          >
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
          </FormFieldLayout>

          <FormFieldLayout
            id={`customize.${nestedIndex}.options.${index}.quantity`}
            label="食材消耗數量"
            errors={
              errors?.customize?.[nestedIndex]?.options?.[index]?.quantity
            }
          >
            <FormInput
              id={`customize.${nestedIndex}.options.${index}.quantity`}
              placeholder="請輸入備料數量"
              {...register(
                `customize.${nestedIndex}.options.${index}.quantity`,
                {
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
                }
              )}
            />
          </FormFieldLayout>
        </FromListItem>
      ))}

      <Button
        $variant="text"
        onClick={() => {
          append({
            optionLabel: "",
            extraPrice: "",
            ingredientName: {
              label: "無",
              value: "",
            },
            quantity: "",
          });

          // 淡入欄位動畫
          fadeInAnimation(`customize.${nestedIndex}.options.${fields.length}`);
        }}
      >
        <Plus size={18} />
        新增選項
      </Button>
    </FormList>
  );
}

export default NestedFieldArray;
