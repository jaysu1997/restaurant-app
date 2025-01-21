import { Controller, useFieldArray } from "react-hook-form";
import NestedFieldArray from "./NestedFieldArray";

import { IoCloseSharp } from "react-icons/io5";
import Button from "../../ui/Button";
import InputField from "../../ui/FormInputField";
import FormRow from "../../ui/FormRow";
import FormTypography from "../../ui/FormTypography";
import OptionSetting from "../../ui/SwitchOptionSetting";

function FieldArray({
  register,
  control,
  disabled,
  inventoryData,
  handleCreateNewItems,
  getValues,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customize",
  });

  return (
    <>
      <FormTypography $titleStyle="title">自訂附加細項</FormTypography>
      <FormTypography $titleStyle="description">
        &#8251;
        此欄位用來自訂本餐點可供客人調整的各種細項。(例如：餐點份量、附餐選擇、餐點加料等等)。
      </FormTypography>
      <FormTypography $titleStyle="description">
        &#8251;
        此欄位的細目和選項可根據需求進行新增/刪除，但不能留下沒輸入任何內容的空白輸入框。
      </FormTypography>

      {fields.map((fields, index) => (
        <FormRow $formRowStyle="sub" key={fields.id}>
          <FormRow $formRowStyle="subHeader">
            <FormTypography $titleStyle="subTitle">
              自訂細項 {index + 1}.
            </FormTypography>

            <Button
              $buttonStyle="remove"
              type="button"
              onClick={() => remove(index)}
            >
              <IoCloseSharp />
            </Button>
          </FormRow>

          <OptionSetting control={control} fieldIndex={index} />

          <input
            style={{ display: "none" }}
            {...register(`customize.${index}.id`, { value: index })}
          />

          <InputField
            legendValue="細項標題"
            type="text"
            placeholder="請輸入細項標題(例如:冰/熱)"
            {...register(`customize.${index}.title`, {
              required: "細項標題不能空白",
            })}
          />

          <NestedFieldArray
            control={control}
            register={register}
            nestedIndex={index}
            inventoryData={inventoryData}
            handleCreateNewItems={handleCreateNewItems}
            disabled={disabled}
            getValues={getValues}
          />
        </FormRow>
      ))}

      <Button
        $buttonStyle="add"
        type="button"
        onClick={() =>
          append({
            title: "",
            required: {
              label: `是("必填")`,
              value: true,
            },
            choice: {
              label: `只能"單選"`,
              value: "radio",
            },
            options: [
              {
                ingredientName: {
                  label: "無",
                  value: "",
                },
                extraPrice: "",
                optionLabel: "",
                quantity: 0,
              },
            ],
          })
        }
      >
        新增自訂細項
      </Button>
    </>
  );
}

export default FieldArray;
