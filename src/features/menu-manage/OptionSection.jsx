import { useFieldArray, useFormContext } from "react-hook-form";
import FormSection from "../../components/FormSection";
import { Plus } from "lucide-react";
import Button from "../../ui/Button";
import { parsePositiveInt } from "../../utils/helpers";

function OptionSection({ nestedIndex, inventoryData }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `customize.${nestedIndex}.options`,
  });

  return (
    <>
      {fields.map((field, index) => (
        <FormSection
          key={field.id}
          id={`customize.${nestedIndex}.options.${index}`}
          isFullWidth={true}
          heading={{
            text: `選項 ${index + 1}`,
            as: "h5",
            required: false,
            action: fields.length > 1 ? () => remove(index) : undefined,
          }}
          inventoryData={inventoryData}
          fields={[
            {
              type: "input",
              name: `customize.${nestedIndex}.options.${index}.optionLabel`,
              errors:
                errors?.customize?.[nestedIndex]?.options?.[index]?.optionLabel,
              label: "選項名稱設定",
              placeholder: "例如：大杯、加蛋",
            },
            {
              type: "input",
              name: `customize.${nestedIndex}.options.${index}.extraPrice`,
              errors:
                errors?.customize?.[nestedIndex]?.options?.[index]?.extraPrice,
              label: "選項額外加價",
              rules: {
                setValueAs: (value) =>
                  parsePositiveInt(value, { min: 0, fallback: value }),
                validate: (value) =>
                  typeof value === "number" || "請輸入 0 以上的整數",
              },
            },
            {
              type: "select",
              name: `customize.${nestedIndex}.options.${index}.ingredient`,
              errors:
                errors?.customize?.[nestedIndex]?.options?.[index]?.ingredient,
              label: "額外消耗食材",
            },
            {
              type: "input",
              name: `customize.${nestedIndex}.options.${index}.quantity`,
              errors:
                errors?.customize?.[nestedIndex]?.options?.[index]?.quantity,
              label: "食材消耗數量",
              rules: {
                setValueAs: (value) =>
                  parsePositiveInt(value, { min: 0, fallback: value }),
                validate: (value) =>
                  typeof value === "number" || "請輸入 0 以上的整數",
              },
            },
          ]}
        ></FormSection>
      ))}
      <Button
        $variant="text"
        onClick={() => {
          append({
            optionId: `o_${crypto.randomUUID().slice(0, 8)}`,
            optionLabel: "",
            extraPrice: "",
            ingredient: "",
            quantity: "",
          });
        }}
      >
        <Plus />
        新增選項
      </Button>
    </>
  );
}

export default OptionSection;
