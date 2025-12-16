import { useFieldArray, useFormContext } from "react-hook-form";
import FormSection from "../../components/FormSection";
import { Plus } from "lucide-react";
import Button from "../../ui/Button";
import { fadeInAnimation } from "../../utils/dom";
import OptionSection from "./OptionSection";

function CustomizeScetion({ inventoryData }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customize",
  });

  return (
    <FormSection
      isFullWidth={true}
      heading={{ text: "餐點自訂項目", as: "h3", required: false }}
      descriptions={[
        " 此欄位用來自訂本餐點可供客人調整的各種餐點項目。(例如：餐點份量、附餐選擇、餐點加料等等)。",
        "此欄位的項目和選項都可根據需求進行新增/刪除，但不能留下沒輸入任何內容的空白輸入框。",
      ]}
    >
      {fields.map((field, index) => (
        <FormSection
          key={field.id}
          id={`customize.${index}`}
          isFullWidth={true}
          isGroup={true}
          heading={{
            text: `自訂項目 ${index + 1}`,
            as: "h4",
            required: false,
            action: () => remove(index),
          }}
          fields={[
            {
              type: "input",
              name: `customize.${index}.title`,
              errors: errors?.customize?.[index]?.title,
              label: "項目標題",
              placeholder: "例如：份量、加料",
            },
            {
              type: "switch",
              name: `customize.${index}.setting`,
              index: index,
              label: "項目填寫設定",
            },
          ]}
        >
          {/* 設定項目的id */}
          <input
            hidden
            {...register(`customize.${index}.customizeId`, {
              value: index,
            })}
          />
          <OptionSection nestedIndex={index} inventoryData={inventoryData} />
        </FormSection>
      ))}

      <Button
        $variant="text"
        onClick={() => {
          append({
            title: "",
            isRequired: "optional",
            choiceType: "multiple",
            options: [
              {
                ingredientName: "",
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

export default CustomizeScetion;
