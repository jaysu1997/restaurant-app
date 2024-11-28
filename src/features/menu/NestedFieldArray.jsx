import { Controller, useFieldArray } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import {
  AddButton,
  Fieldset,
  Legend,
  NestedInput,
  NestedRow,
  NestedTitle,
  RemoveButton,
  SubHeader,
} from "../../ui/FormTable";

import { IoCloseSharp } from "react-icons/io5";

function NestedFieldArray({
  control,
  register,
  nestedIndex,
  inventoryData = [],
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `customize.${nestedIndex}.options`,
  });

  return (
    <>
      {fields.map((fields, index) => (
        <NestedRow key={fields.id}>
          <SubHeader>
            <NestedTitle>選項設定 - {index + 1}</NestedTitle>

            <RemoveButton type="button" onClick={() => remove(index)}>
              <IoCloseSharp />
            </RemoveButton>
          </SubHeader>

          <Fieldset>
            <Legend>選項名稱設定</Legend>
            <NestedInput
              type="text"
              autoComplete="off"
              placeholder="請輸入選項名稱"
              {...register(`customize.${nestedIndex}.options.${index}.name`, {
                required: "此欄位不能空白",
              })}
            />
          </Fieldset>

          <Fieldset>
            <Legend>選項額外加價</Legend>
            <NestedInput
              type="number"
              autoComplete="off"
              onWheel={(e) => {
                // 禁用number input默認的滾輪改變value功能
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
          </Fieldset>

          <Fieldset>
            <Legend>額外消耗食材</Legend>
            <Controller
              name={`customize.${nestedIndex}.options.${index}.ingredientName`}
              rules={{
                required: "此欄位不能空白",
              }}
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      border: "none",
                      backgroundColor: "inherit",
                      boxShadow: "none",
                      fontSize: "1.4rem",
                      minHeight: "2rem",
                    }),
                  }}
                  inputId={`ingredients-${index}`}
                  formatCreateLabel={(inputValue) => `新增: ${inputValue}`}
                  options={[
                    {
                      label: "無額外食材消耗",
                      value: "無額外食材消耗",
                    },
                    ...inventoryData,
                  ]}
                  isClearable
                  placeholder="可新增 / 選擇食材"
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Legend>食材消耗數量</Legend>
            <NestedInput
              type="number"
              autoComplete="off"
              onWheel={(e) => {
                // 禁用number input默認的滾輪改變value功能
                e.target.blur();
              }}
              placeholder="請輸入備料數量"
              {...register(
                `customize.${nestedIndex}.options.${index}.quantity`,
                {
                  required: "此欄位不能空白",
                  valueAsNumber: true,
                }
              )}
            />
          </Fieldset>
        </NestedRow>
      ))}

      <AddButton
        type="button"
        onClick={() =>
          append({
            ingredientName: {
              label: "無額外食材消耗",
              value: "無額外食材消耗",
            },
            extraPrice: "",
            name: "",
            quantity: 0,
          })
        }
      >
        新增選項
      </AddButton>
    </>
  );
}

export default NestedFieldArray;
