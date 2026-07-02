import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import { parsePositiveInt } from "../../utils/helpers";
import TextButton from "../../components/button/TextButton";
import FormFieldLayout from "../../components/FormFieldLayout";
import ControlledSelect from "../../ui/ControlledSelect";
import FormInput from "../../components/FormInput";
import ModalFormSection from "../../components/modal/ModalFormSection";
import ModalFormCard from "../../components/modal/ModalFormCard";

function IngredientSection({ ingredientOptions }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

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
          <FormFieldLayout
            label="食材名稱"
            error={errors?.ingredients?.[index]?.ingredient}
            id={`ingredients.${index}.ingredient`}
          >
            <ControlledSelect
              inputId={`ingredients.${index}.ingredient`}
              name={`ingredients.${index}.ingredient`}
              rules={{ required: "食材名稱不能空白" }}
              options={ingredientOptions}
              placeholder="選擇現有食材或輸入新食材"
              creatable
            />
          </FormFieldLayout>

          <FormFieldLayout
            label="消耗數量"
            error={errors?.ingredients?.[index]?.quantity}
            id={`ingredients.${index}.quantity`}
          >
            <FormInput
              id={`ingredients.${index}.quantity`}
              {...register(`ingredients.${index}.quantity`, {
                required: "此欄位必須填寫",
                setValueAs: (value) =>
                  parsePositiveInt(value, { min: 0, fallback: value }),
                validate: (value) =>
                  typeof value === "number" || "請輸入 0 以上的整數",
              })}
            />
          </FormFieldLayout>
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
