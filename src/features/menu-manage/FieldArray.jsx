import { useFieldArray, useFormContext } from "react-hook-form";
import NestedFieldArray from "./NestedFieldArray";
import ControlledSwitch from "../../ui-old/ControlledSwitch";
import { fadeInAnimation } from "../../utils/dom";
import {
  FormDescription,
  FormHeading,
  FormList,
  FormSection,
  FromListItem,
} from "../../ui/FormLayout";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import { Plus, Trash2 } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";

function FieldArray({ disabled, inventoryData, handleCreateNewItems }) {
  const { register, control, errors } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customize",
  });

  return (
    <FormSection $isFullRow={true}>
      <FormHeading>餐點自訂項目</FormHeading>
      <FormDescription>
        &#8251;
        此欄位用來自訂本餐點可供客人調整的各種餐點項目。(例如：餐點份量、附餐選擇、餐點加料等等)。
      </FormDescription>
      <FormDescription>
        &#8251;
        此欄位的項目和選項都可根據需求進行新增/刪除，但不能留下沒輸入任何內容的空白輸入框。
      </FormDescription>

      <FormList>
        {fields.map((field, index) => (
          <FromListItem key={field.id} id={`customize.${index}`}>
            <FormHeading>
              自訂項目 {index + 1}
              <Button $variant="ghost" onClick={() => remove(index)}>
                <Trash2 size={16} />
              </Button>
            </FormHeading>

            <FormFieldLayout label="項目填寫設定" errors={false}>
              <ControlledSwitch
                control={control}
                disabled={disabled}
                items={[
                  {
                    name: `customize.${index}.isRequired`,
                    option1: { label: "選填", value: "optional" },
                    option2: { label: "必填", value: "required" },
                  },
                  {
                    name: `customize.${index}.choiceType`,
                    option1: { label: "多選", value: "multiple" },
                    option2: { label: "單選", value: "single" },
                  },
                ]}
              />
            </FormFieldLayout>

            <FormFieldLayout
              label="項目標題"
              errors={errors?.customize?.[index]?.title}
            >
              <FormInput
                id={`customize.${index}.title`}
                placeholder="請輸入項目標題(例如:加料)"
                {...register(`customize.${index}.title`, {
                  required: "項目標題不能空白",
                })}
              />
            </FormFieldLayout>

            {/* 設定項目的id */}
            <input
              hidden
              {...register(`customize.${index}.customizeId`, {
                value: index,
              })}
            />

            <NestedFieldArray
              nestedIndex={index}
              inventoryData={inventoryData}
              handleCreateNewItems={handleCreateNewItems}
              disabled={disabled}
            />
          </FromListItem>
        ))}
      </FormList>

      <Button
        $variant="text"
        onClick={() => {
          append({
            title: "",
            isRequired: "optional",
            choiceType: "multiple",
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
          });

          // 淡入欄位動畫
          fadeInAnimation(`customize.${fields.length}`);
        }}
      >
        <Plus size={18} />
        新增自訂項目
      </Button>
    </FormSection>
  );
}

export default FieldArray;
