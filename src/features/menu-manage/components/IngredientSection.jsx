import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import { parsePositiveInt } from "../../../utils/helpers";
import TextButton from "../../../components/button/TextButton";
import FormSelectField from "../../../components/FormSelectField";
import FormInputField from "../../../components/FormInputField";
import ModalFormSection from "../../../components/modal/ModalFormSection";
import ModalFormCard from "../../../components/modal/ModalFormCard";

function IngredientSection({ ingredientOptions }) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <ModalFormSection
      columns={1}
      title="備料設定"
      required={true}
      descriptions={[
        "此欄位用來輸入本餐點需要使用到的食材以及對應數量，以便管理庫存。",
      ]}
    >
      {fields.map((field, index) => (
        <ModalFormCard
          columns={2}
          title={`備料 ${index + 1}`}
          compact={false}
          onDelete={fields.length > 1 ? () => remove(index) : undefined}
          key={field.id}
        >
          <FormSelectField
            label="食材名稱"
            name={`ingredients.${index}.ingredient`}
            rules={{ required: "食材名稱不能空白" }}
            options={ingredientOptions}
            placeholder="選擇或新增食材"
            isCreatable
          />

          <FormInputField
            label="消耗數量"
            name={`ingredients.${index}.quantity`}
            rules={{
              required: "此欄位必須填寫",
              setValueAs: (value) =>
                parsePositiveInt(value, { min: 0, fallback: value }),
              validate: (value) =>
                typeof value === "number" || "請輸入 0 以上的整數",
            }}
          />
        </ModalFormCard>
      ))}

      <TextButton
        onClick={() => {
          append({
            ingredient: "",
            quantity: "",
          });
        }}
      >
        <Plus />
        新增備料
      </TextButton>
    </ModalFormSection>
  );
}

export default IngredientSection;
