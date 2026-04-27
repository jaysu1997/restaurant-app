import { useFieldArray, useFormContext } from "react-hook-form";
import FormSection from "../../components/FormSection";
import { Plus } from "lucide-react";
import Button from "../../ui/Button";
import OptionSection from "./OptionSection";

function CustomizeScetion({ ingredientOptions }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customizations",
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
              name: `customizations.${index}.name`,
              errors: errors?.customizations?.[index]?.name,
              label: "項目標題",
              placeholder: "例如：份量、加料",
            },
            {
              type: "switch",
              name: `customizations.${index}`,
              index: index,
              label: "項目填寫設定",
            },
          ]}
        >
          <OptionSection
            nestedIndex={index}
            ingredientOptions={ingredientOptions}
          />
        </FormSection>
      ))}

      <Button
        $variant="text"
        onClick={() => {
          append({
            customizationId: `c_${crypto.randomUUID().slice(0, 8)}`,
            name: "",
            isRequired: false,
            type: "multiple",
            options: [
              {
                optionId: `o_${crypto.randomUUID().slice(0, 8)}`,
                ingredient: "",
                extraPrice: "",
                name: "",
                quantity: "",
              },
            ],
          });
        }}
      >
        <Plus />
        新增自訂項目
      </Button>
    </FormSection>
  );
}

export default CustomizeScetion;
