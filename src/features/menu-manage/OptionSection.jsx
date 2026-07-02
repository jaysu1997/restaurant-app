import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import { parsePositiveInt } from "../../utils/helpers";
import TextButton from "../../components/button/TextButton";
import FormFieldLayout from "../../components/FormFieldLayout";
import FormInput from "../../components/FormInput";
import ControlledSelect from "../../ui/ControlledSelect";
import ModalFormCard from "../../components/modal/ModalFormCard";

function OptionSection({ nestedIndex, ingredientOptions }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `customizations.${nestedIndex}.options`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <ModalFormCard
          columns={2}
          title={`選項 ${index + 1}`}
          compact={true}
          onDelete={fields.length > 1 ? () => remove(index) : undefined}
          key={field.id}
        >
          <FormFieldLayout
            label="選項名稱"
            id={`customizations.${nestedIndex}.options.${index}.name`}
            error={
              errors?.customizations?.[nestedIndex]?.options?.[index]?.name
            }
          >
            <FormInput
              placeholder="例如：大杯、加蛋"
              id={`customizations.${nestedIndex}.options.${index}.name`}
              {...register(
                `customizations.${nestedIndex}.options.${index}.name`,
                {
                  required: "請完成填寫，或將此選項刪除。",
                },
              )}
            />
          </FormFieldLayout>

          <FormFieldLayout
            label="選項額外加價"
            id={`customizations.${nestedIndex}.options.${index}.extraPrice`}
            error={
              errors?.customizations?.[nestedIndex]?.options?.[index]
                ?.extraPrice
            }
          >
            <FormInput
              id={`customizations.${nestedIndex}.options.${index}.extraPrice`}
              {...register(
                `customizations.${nestedIndex}.options.${index}.extraPrice`,
                {
                  required: "請完成填寫，或將此選項刪除。",
                  setValueAs: (value) =>
                    parsePositiveInt(value, { min: 0, fallback: value }),
                  validate: (value) =>
                    typeof value === "number" || "請輸入 0 以上的整數",
                },
              )}
            />
          </FormFieldLayout>

          <FormFieldLayout
            label="額外消耗食材"
            id={`customizations.${nestedIndex}.options.${index}.ingredient`}
            error={
              errors?.customizations?.[nestedIndex]?.options?.[index]
                ?.ingredient
            }
          >
            <ControlledSelect
              inputId={`customizations.${nestedIndex}.options.${index}.ingredient`}
              name={`customizations.${nestedIndex}.options.${index}.ingredient`}
              rules={{ required: "請完成填寫，或將此選項刪除。" }}
              options={ingredientOptions}
              placeholder="選擇現有食材或輸入新食材"
              creatable
            />
          </FormFieldLayout>

          <FormFieldLayout
            label="食材消耗數量"
            id={`customizations.${nestedIndex}.options.${index}.quantity`}
            error={
              errors?.customizations?.[nestedIndex]?.options?.[index]?.quantity
            }
          >
            <FormInput
              id={`customizations.${nestedIndex}.options.${index}.quantity`}
              {...register(
                `customizations.${nestedIndex}.options.${index}.quantity`,
                {
                  required: "請完成填寫，或將此選項刪除。",
                  setValueAs: (value) =>
                    parsePositiveInt(value, { min: 0, fallback: value }),
                  validate: (value) =>
                    typeof value === "number" || "請輸入 0 以上的整數",
                },
              )}
            />
          </FormFieldLayout>
        </ModalFormCard>
      ))}

      <TextButton
        onClick={() => {
          append({
            optionId: `o_${crypto.randomUUID().slice(0, 8)}`,
            name: "",
            extraPrice: 0,
            ingredient: { label: "無", value: "", uuid: null },
            quantity: 0,
          });
        }}
      >
        <Plus />
        新增選項
      </TextButton>
    </>
  );
}

export default OptionSection;
