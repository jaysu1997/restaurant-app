// 用來新增或更新單筆menu數據的表單
import { useForm, FormProvider } from "react-hook-form";
import Modal, {
  ModalContent,
  ModalFooter,
} from "../../../components/modal/Modal";
import { toMenuPayload, toMenuForm } from "../utils/menuTransform";
import useSubmitMenuForm from "../../../hooks/data/menus/useSubmitMenuForm";
import IngredientSection from "./IngredientSection";
import CustomizeSection from "./CustomizeSection";
import { parsePositiveInt } from "../../../utils/numbers.js";
import { trimString } from "../../../utils/text.js";
import FormActions from "../../../components/FormActions";
import FormInputField from "../../../components/FormInputField";
import ModalFormSection from "../../../components/modal/ModalFormSection";
import FormSelectField from "../../../components/FormSelectField";
import ImageSection from "./ImageSection";
import useRestoreFocus from "../../../hooks/ui/useRestoreFocus.js";

function MenuForm({ categoriesOptions, onClose, menu, inventoryObj }) {
  const handleCloseModal = useRestoreFocus(onClose);
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
    const { menuData, newIngredients, imageData } = toMenuPayload(data);

    // 執行表單數據上傳
    submitMenuForm(
      { menuData, newIngredients, imageData },
      { onSuccess: () => handleCloseModal?.() },
    );
  }

  return (
    <FormProvider {...methods}>
      <Modal
        title="餐點設定表單"
        maxWidth={56}
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalContent>
          <ModalFormSection columns={2} title="基本資料" required={true}>
            <FormInputField
              label="名稱"
              name="name"
              placeholder="例如：牛肉漢堡"
              rules={{ required: "此欄位必須填寫", setValueAs: trimString }}
            />

            <FormSelectField
              label="分類"
              name="category"
              options={categoriesOptions}
              rules={{ required: "此欄位必須填寫", setValueAs: trimString }}
              placeholder="選擇或新增分類"
              isCreatable
            />

            <FormInputField
              label="定價"
              name="basePrice"
              rules={{
                required: "此欄位必須填寫",
                deps: ["discount"],
                setValueAs: (value) =>
                  parsePositiveInt(value, { min: 0, fallback: value }),
                validate: (value) =>
                  typeof value === "number" || "請輸入 0 以上的整數",
              }}
            />

            <FormInputField
              label="折扣"
              name="discount"
              rules={{
                required: "此欄位必須填寫",
                setValueAs: (value) =>
                  parsePositiveInt(value, { min: 0, fallback: value }),
                validate: (value) => {
                  if (typeof value !== "number") return "請輸入 0 以上的整數";
                  if (Number(value) > Number(getValues("basePrice")))
                    return "折扣不能超過定價";

                  return true;
                },
              }}
            />
          </ModalFormSection>

          <ImageSection />

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
            onCancel={handleCloseModal}
            isProcessing={isSubmittingMenuForm}
          />
        </ModalFooter>
      </Modal>
    </FormProvider>
  );
}

export default MenuForm;
