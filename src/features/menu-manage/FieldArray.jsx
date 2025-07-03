import { useFieldArray, useFormContext } from "react-hook-form";
import NestedFieldArray from "./NestedFieldArray";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormTypography from "../../ui/FormTypography";
import ControlledSwitch from "../../ui/ControlledSwitch";
import FormFieldset from "../../ui/FormFieldset";
import ControlledInput from "../../ui/ControlledInput";

function FieldArray({ disabled, inventoryData, handleCreateNewItems }) {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customize",
  });

  return (
    <>
      <FormTypography $titleStyle="title">自訂附加細項</FormTypography>
      <FormTypography $titleStyle="description">
        &#8251;
        此欄位用來自訂本餐點可供客人調整的各種餐點細項。(例如：餐點份量、附餐選擇、餐點加料等等)。
      </FormTypography>
      <FormTypography $titleStyle="description">
        &#8251;
        此欄位的細項和選項都可根據需求進行新增/刪除，但不能留下沒輸入任何內容的空白輸入框。
      </FormTypography>

      {fields.map((field, index) => (
        <FormRow $formRowStyle="sub" key={field.id}>
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

          <FormFieldset legendValue="細項標題">
            <ControlledInput
              type="text"
              placeholder="請輸入細項標題(例如:加料)"
              control={control}
              name={`customize.${index}.title`}
              rules={{
                required: "細項標題不能空白",
              }}
            />
          </FormFieldset>

          <span>細項填寫設定：</span>
          <ControlledSwitch
            control={control}
            items={[
              {
                name: `customize.${index}.required`,
                label1: "選填",
                label2: "必填",
              },
              {
                name: `customize.${index}.choice`,
                label1: "多選",
                label2: "單選",
              },
            ]}
          />

          {/* 設定細項的id */}
          <input
            hidden
            {...register(`customize.${index}.customizeId`, { value: index })}
          />

          <NestedFieldArray
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
            required: "選填",
            choice: "多選",
            options: [
              {
                ingredientName: {
                  label: "無",
                  value: "",
                },
                extraPrice: "",
                optionLabel: "",
                quantity: "",
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
