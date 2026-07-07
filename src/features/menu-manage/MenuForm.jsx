// 用來新增或更新單筆menu數據的表單
import { useForm, FormProvider } from "react-hook-form";
import Modal from "../../components/modal/Modal";
import { toMenuPayload, toMenuForm } from "./utils/menuTransform";
import useSubmitMenuForm from "../../hooks/data/menus/useSubmitMenuForm";
import IngredientSection from "./IngredientSection";
import CustomizeSection from "./CustomizeSection";
import { parsePositiveInt, trimString } from "../../utils/helpers";
import FormActions from "../../components/FormActions";
import FormInputField from "../../components/FormInputField";
import {
  ModalContainer,
  ModalContent,
  ModalFooter,
} from "../../components/modal/ModalBody";
import ModalFormSection from "../../components/modal/ModalFormSection";

function MenuForm({ onClose, menu, inventoryObj }) {
  const { submitMenuForm, isSubmittingMenuForm } = useSubmitMenuForm();

  const formatMenu = toMenuForm(menu, inventoryObj);
  const ingredientOptions = Object.entries(inventoryObj).map(
    ([uuid, value]) => ({
      label: value.name,
      value: uuid,
    }),
  );

  const methods = useForm({ defaultValues: formatMenu });
  const { getValues, handleSubmit } = methods;

  function onSubmit(data) {
    // 整理好要上傳的數據格式
    const { menuData, newIngredients } = toMenuPayload(data);
    console.log(menuData, newIngredients);

    // 執行表單數據上傳
    submitMenuForm(
      { menuData, newIngredients },
      { onSuccess: () => onClose?.() },
    );
  }

  const fieldsConfig = [
    {
      label: "名稱",
      name: "name",
      rules: { setValueAs: trimString },
      placeholder: "例如：牛肉漢堡",
    },
    {
      label: "分類",
      name: "category",
      rules: { setValueAs: trimString },
      placeholder: "例如：漢堡",
    },
    {
      label: "定價",
      name: "basePrice",
      placeholder: "例如：120",
      rules: {
        deps: ["discount"],
        setValueAs: (value) =>
          parsePositiveInt(value, { min: 0, fallback: value }),
        validate: (value) => typeof value === "number" || "請輸入 0 以上的整數",
      },
    },
    {
      label: "折扣",
      name: "discount",
      placeholder: "例如：10",
      rules: {
        setValueAs: (value) =>
          parsePositiveInt(value, { min: 0, fallback: value }),
        validate: (value) => {
          if (typeof value !== "number") return "請輸入 0 以上的整數";
          if (Number(value) > Number(getValues("basePrice")))
            return "折扣不能超過定價";

          return true;
        },
      },
    },
  ];

  return (
    <Modal title="餐點設定表單" maxWidth={56} onClose={onClose}>
      <FormProvider {...methods}>
        <ModalContainer as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalFormSection columns={2} title="基本資料" required={true}>
              {fieldsConfig.map((field) => (
                <FormInputField
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  rules={{
                    required: "此欄位必須填寫",
                    ...(field.rules || {}),
                  }}
                  key={field.name}
                />
              ))}
            </ModalFormSection>

            <IngredientSection ingredientOptions={ingredientOptions} />

            <CustomizeSection
              ingredientOptions={[
                { label: "無", value: "", uuid: null },
                ...ingredientOptions,
              ]}
            />
          </ModalContent>

          <ModalFooter>
            <FormActions
              onCancel={onClose}
              isProcessing={isSubmittingMenuForm}
            />
          </ModalFooter>
        </ModalContainer>
      </FormProvider>
    </Modal>
  );
}

export default MenuForm;
