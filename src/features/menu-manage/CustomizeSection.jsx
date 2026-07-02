import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import OptionSection from "./OptionSection";
import TextButton from "../../components/button/TextButton";
import FormFieldLayout from "../../components/FormFieldLayout";
import FormInput from "../../components/FormInput";
import ControlledSwitch from "../../ui/ControlledSwitch";
import ModalFormSection from "../../components/modal/ModalFormSection";
import ModalFormCard from "../../components/modal/ModalFormCard";

function CustomizeSection({ ingredientOptions }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customizations",
  });

  return (
    <ModalFormSection
      columns={1}
      title="餐點自訂項目"
      required={false}
      descriptions={[
        "此欄位用來自訂本餐點可供客人調整的各種餐點項目。(例如：餐點份量、附餐選擇、餐點加料等等)。",
        "此區塊為選填，不建立任何自訂項目亦可。新增自訂項目後，請完成所有欄位，或直接刪除該項目。",
      ]}
    >
      {fields.map((field, index) => (
        <ModalFormCard
          columns={1}
          title={`自訂項目 ${index + 1}`}
          compact={false}
          onDelete={() => remove(index)}
          key={field.id}
        >
          <FormFieldLayout
            label="項目名稱"
            error={errors?.customizations?.[index]?.name}
            id={`customizations.${index}.name`}
          >
            <FormInput
              id={`customizations.${index}.name`}
              placeholder="例如：份量、加料"
              {...register(`customizations.${index}.name`, {
                required: "請完成填寫，或將此項目刪除。",
              })}
            />
          </FormFieldLayout>

          <ModalFormCard columns={2} compact={true}>
            <FormFieldLayout label="填寫規則">
              <ControlledSwitch
                options={{
                  name: `customizations.${index}.isRequired`,
                  option1: { label: "選填", value: false },
                  option2: { label: "必填", value: true },
                }}
              />
            </FormFieldLayout>

            <FormFieldLayout label="選取規則">
              <ControlledSwitch
                options={{
                  name: `customizations.${index}.type`,
                  option1: { label: "多選", value: "multiple" },
                  option2: { label: "單選", value: "single" },
                }}
              />
            </FormFieldLayout>
          </ModalFormCard>

          <OptionSection
            nestedIndex={index}
            ingredientOptions={ingredientOptions}
          />
        </ModalFormCard>
      ))}

      <TextButton
        onClick={() => {
          append({
            customizationId: `c_${crypto.randomUUID().slice(0, 8)}`,
            name: "",
            isRequired: false,
            type: "multiple",
            options: [
              {
                optionId: `o_${crypto.randomUUID().slice(0, 8)}`,
                ingredient: { label: "無", value: "", uuid: null },
                extraPrice: 0,
                name: "",
                quantity: 0,
              },
            ],
          });
        }}
      >
        <Plus />
        新增自訂項目
      </TextButton>
    </ModalFormSection>
  );
}

export default CustomizeSection;
