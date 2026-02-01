import { useFieldArray, useFormContext } from "react-hook-form";
import FormSection from "../../components/FormSection";
import { Plus } from "lucide-react";
import Button from "../../ui/Button";
import { parsePositiveInt } from "../../utils/helpers";

function IngredientScetion({ inventoryData }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <FormSection
      isFullWidth={true}
      heading={{ text: "備料", as: "h3", required: true }}
      descriptions={[
        "此欄位用來輸入本餐點需要使用到的食材以及對應數量，以便管理庫存。",
      ]}
    >
      {fields.map((field, index) => (
        <FormSection
          key={field.id}
          id={`ingredients.${index}`}
          isFullWidth={true}
          isGroup={true}
          heading={{
            text: `備料 ${index + 1}`,
            as: "h4",
            required: false,
            action: fields.length > 1 ? () => remove(index) : undefined,
          }}
          inventoryData={inventoryData}
          fields={[
            {
              type: "select",
              name: `ingredients.${index}.ingredient`,
              errors: errors?.ingredients?.[index]?.ingredient,
              label: "食材名稱",
            },
            {
              type: "input",
              name: `ingredients.${index}.quantity`,
              errors: errors?.ingredients?.[index]?.quantity,
              label: "使用數量",
              rules: {
                setValueAs: (value) =>
                  parsePositiveInt(value, { min: 0, fallback: value }),
                validate: (value) =>
                  typeof value === "number" || "請輸入 0 以上的整數",
              },
            },
          ]}
        />
      ))}

      <Button
        $variant="text"
        onClick={() => {
          append({
            ingredient: "",
            quantity: "",
          });
        }}
      >
        <Plus />
        新增備料
      </Button>
    </FormSection>
  );
}

export default IngredientScetion;
