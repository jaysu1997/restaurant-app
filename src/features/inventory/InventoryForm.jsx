import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import StyledHotToast from "../../ui/StyledHotToast";
import Modal from "../../ui/Modal";
import useSubmitInventory from "../../hooks/data/inventory/useSubmitInventory";
import SubmitButton from "../../components/button/SubmitButton";
import styled from "styled-components";
import FormSection from "../../components/FormSection";
import { parsePositiveInt, trimString } from "../../utils/helpers";
import Button from "../../components/button/Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 36rem;
  gap: 2.4rem;
  padding: 2rem;
`;

const Footer = styled.footer`
  display: flex;
  gap: 2.4rem;
`;

function InventoryForm({ inventory, onClose }) {
  const isEdit = inventory ? true : false;
  const methods = useForm({
    defaultValues: inventory || {},
  });

  const {
    handleSubmit,
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

  function onError(error) {
    console.log(error);
  }

  return (
    <Modal modalHeader="食材設定表單" onClose={onClose}>
      <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
        {/* 這裡的isDisabled沒用 */}
        <FormProvider {...methods}>
          <FormSection
            descriptions={
              isEdit
                ? [
                    "食材名稱變更後，各餐點中使用此食材的備料與選項也會同步更新為新名稱。",
                  ]
                : null
            }
          >
            <FormSection
              heading={{ text: "食材名稱", required: true }}
              fields={[
                {
                  type: "input",
                  name: "name",
                  errors: errors?.name,
                  rules: {
                    setValueAs: trimString,
                  },
                },
              ]}
            />

            <FormSection
              heading={{ text: "庫存數量", required: true }}
              fields={[
                {
                  type: "input",
                  name: "remainingQuantity",
                  errors: errors?.remainingQuantity,
                  rules: {
                    setValueAs: (value) =>
                      parsePositiveInt(value, { min: 0, fallback: value }),
                    validate: (value) =>
                      typeof value === "number" || "請輸入 0 以上的整數",
                  },
                },
              ]}
            />
          </FormSection>

          <Footer>
            <SubmitButton
              disabled={isSubmittingInventory}
              isProcessing={isSubmittingInventory}
            />
            <Button
              $variant="outline"
              disabled={isSubmittingInventory}
              onClick={onClose}
            >
              取消
            </Button>
          </Footer>
        </FormProvider>
      </StyledForm>
    </Modal>
  );
}

export default InventoryForm;
