import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import { parsePositiveInt } from "../../../utils/helpers";
import TextButton from "../../../components/button/TextButton";
import FormInputField from "../../../components/FormInputField";
import FormSelectField from "../../../components/FormSelectField";
import ModalFormCard from "../../../components/modal/ModalFormCard";

function OptionSection({ nestedIndex, ingredientOptions }) {
  const { control } = useFormContext();

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
          <FormInputField
            label="選項名稱"
            name={`customizations.${nestedIndex}.options.${index}.name`}
            placeholder="例如：大杯、加蛋"
            rules={{
              required: "請完成填寫，或將此選項刪除。",
            }}
          />

          <FormInputField
            label="選項額外加價"
            name={`customizations.${nestedIndex}.options.${index}.extraPrice`}
            rules={{
              required: "請完成填寫，或將此選項刪除。",
              setValueAs: (value) =>
                parsePositiveInt(value, { min: 0, fallback: value }),
              validate: (value) =>
                typeof value === "number" || "請輸入 0 以上的整數",
            }}
          />

          <FormSelectField
            label="額外消耗食材"
            name={`customizations.${nestedIndex}.options.${index}.ingredient`}
            rules={{ required: "請完成填寫，或將此選項刪除。" }}
            options={ingredientOptions}
            placeholder="選擇或新增食材"
            isCreatable
          />

          <FormInputField
            label="食材消耗數量"
            name={`customizations.${nestedIndex}.options.${index}.quantity`}
            rules={{
              required: "請完成填寫，或將此選項刪除。",
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
