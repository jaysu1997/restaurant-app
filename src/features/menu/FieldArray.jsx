import { useFieldArray } from "react-hook-form";
import NestedFieldArray from "./NestedFieldArray";

import { IoCloseSharp } from "react-icons/io5";
import Button from "../../ui/Button";
import InputField from "../../ui/FormInputField";
import FormRow from "../../ui/FormRow";
import FormTypography from "../../ui/FormTypography";
import ControlledSelect from "../../ui/ControlledSelect";

function FieldArray({
  register,
  control,
  disabled,
  inventoryData,
  handleCreateNewItems,
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

          <InputField
            legendValue="細項標題"
            type="text"
            placeholder="請輸入細項標題(例如:冰/熱)"
            autoComplete="off"
            {...register(`customize.${index}.title`, {
              required: "細項標題不能空白",
            })}
          />

          <InputField legendValue="此細項是否必填">
            <ControlledSelect
              name={`customize.${index}.required`}
              control={control}
              rules={{ required: "此欄位不能空白" }}
              options={[
                {
                  label: `是("必填")`,
                  value: true,
                },
                {
                  label: `否("選填")`,
                  value: false,
                },
              ]}
              creatable={false}
              disabled={disabled}
            />
          </InputField>

          <InputField legendValue="此細項填寫規則">
            <ControlledSelect
              name={`customize.${index}.choice`}
              control={control}
              rules={{ required: "此欄位不能空白" }}
              options={[
                {
                  label: `只能"單選"`,
                  value: "radio",
                },
                {
                  label: `可以"多選"`,
                  value: "checkbox",
                },
              ]}
              creatable={false}
              disabled={disabled}
            />
          </InputField>

          <NestedFieldArray
            control={control}
            register={register}
            nestedIndex={index}
            inventoryData={inventoryData}
            handleCreateNewItems={handleCreateNewItems}
            disabled={disabled}
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
                  label: "無額外食材消耗",
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
