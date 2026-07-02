import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import StyledHotToast from "../../ui/StyledHotToast";
import Modal from "../../components/modal/Modal";
import useSubmitInventory from "../../hooks/data/inventory/useSubmitInventory";
import { parsePositiveInt, trimString } from "../../utils/helpers";
import FormActions from "../../components/FormActions";
import FormFieldLayout from "../../components/FormFieldLayout";
import FormInput from "../../components/FormInput";
import {
  ModalContainer,
  ModalContent,
  ModalFooter,
} from "../../components/modal/ModalBody";
import ModalFormSection from "../../components/modal/ModalFormSection";

function InventoryForm({ inventory, onClose }) {
  const isEdit = !!inventory;
  const methods = useForm({
    defaultValues: inventory || {},
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const { submitInventory, isSubmittingInventory } = useSubmitInventory();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(data) {
    console.log(data);

    submitInventory(data, {
      onSuccess: () => {
        StyledHotToast({
          type: "success",
          title: `庫存食材設定${isEdit ? "更新" : "新增"}成功`,
        });

        onClose?.();
        searchParams.delete("quantity");
        searchParams.delete("name");
        setSearchParams(searchParams);
      },
    });
  }

  return (
    <Modal title="食材設定表單" onClose={onClose}>
      <FormProvider {...methods}>
        <ModalContainer as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {isEdit && (
              <ModalFormSection
                columns={1}
                descriptions={[
                  "食材名稱變更後，各餐點中使用此食材的備料與選項也會同步更新為新名稱。",
                ]}
              />
            )}

            <ModalFormSection columns={1}>
              <FormFieldLayout label="食材名稱" error={errors?.name} id="name">
                <FormInput
                  id="name"
                  {...register("name", {
                    required: "此欄位必須填寫",
                    setValueAs: trimString,
                  })}
                />
              </FormFieldLayout>

              <FormFieldLayout
                label="庫存數量"
                error={errors?.remainingQuantity}
                id="remainingQuantity"
              >
                <FormInput
                  id="remainingQuantity"
                  {...register("remainingQuantity", {
                    required: "此欄位必須填寫",
                    setValueAs: (value) =>
                      parsePositiveInt(value, { min: 0, fallback: value }),
                    validate: (value) =>
                      typeof value === "number" || "請輸入 0 以上的整數",
                  })}
                />
              </FormFieldLayout>
            </ModalFormSection>
          </ModalContent>

          <ModalFooter>
            <FormActions
              onCancel={onClose}
              isProcessing={isSubmittingInventory}
            />
          </ModalFooter>
        </ModalContainer>
      </FormProvider>
    </Modal>
  );
}

export default InventoryForm;
