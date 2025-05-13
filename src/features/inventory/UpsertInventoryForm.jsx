import { useForm } from "react-hook-form";
import FormTable from "../../ui/FormTable";
import FormTypography from "../../ui/FormTypography";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import LoadingDotMini from "../../ui/LoadingDotMini";
import useUpsertInventory from "./useUpsertInventory";
import { useSearchParams } from "react-router-dom";
import StyledHotToast from "../../ui/StyledHotToast";
import FormFieldset from "../../ui/FormFieldset";
import ControlledInput from "../../ui/ControlledInput";
import Modal from "../../ui/Modal";

const formFieldData = [
  {
    title: "食材名稱",
    inputName: "label",
    inputType: "text",
  },
  {
    title: "庫存數量",
    inputName: "remainingQuantity",
    inputType: "number",
  },
];

function UpsertInventoryForm({ inventory, onCloseModal }) {
  console.log(inventory);
  const { handleSubmit, getValues, reset, control } = useForm({
    defaultValues: inventory || {},
  });
  const { upsert, isUpserting } = useUpsertInventory();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(data) {
    // 增加value(配合react-select的格式)
    const inventoryData = {
      ...data,
      value: data.label,
    };

    upsert(inventoryData, {
      onSuccess: (data) => {
        StyledHotToast({
          type: "success",
          title: `庫存食材設定${inventory ? "更新" : "新增"}成功`,
        });

        onCloseModal?.();
        searchParams.delete("quantity");
        searchParams.delete("name");
        setSearchParams(searchParams);
      },
      onError: (error) => {
        console.log("上傳失敗", error);
        // reset(getValues());
      },
    });
  }

  function onError(error) {
    // 所有的error訊息
    const toastMessage = `${Object.values(error)
      .map((err) => err.message)
      .join("， ")}。`;

    StyledHotToast({
      type: "error",
      title: "庫存食材設定失敗",
      content: toastMessage,
    });
  }

  return (
    <Modal modalHeader="食材設定表單" maxWidth={56} onCloseModal={onCloseModal}>
      <FormTable onSubmit={handleSubmit(onSubmit, onError)}>
        {inventory && (
          <FormTypography $titleStyle="description">
            表單說明：食材名稱更改後，所有使用此食材的餐點備料和選項也會同步更新名稱。
          </FormTypography>
        )}

        {formFieldData.map((data) => (
          <FormRow $formRowStyle="oneColumn" key={data.inputName}>
            <FormTypography $titleStyle="title">
              {data.title}
              <FormTypography $titleStyle="highlight">*</FormTypography>
            </FormTypography>

            <FormFieldset legendValue="">
              <ControlledInput
                placeholder={`請輸入餐點${data.title}`}
                type={data.inputType}
                control={control}
                name={data.inputName}
                rules={{
                  required: `${data.title}欄位必須填寫`,
                  min: {
                    value: 0,
                    message: `${data.title}數量必須不得為負數`,
                  },
                }}
              />
            </FormFieldset>
          </FormRow>
        ))}

        <FormRow $formRowStyle="footer">
          <Button
            $buttonStyle="cancel"
            type="button"
            disabled={isUpserting}
            onClick={onCloseModal}
          >
            取消
          </Button>
          <Button $buttonStyle="submit" type="submit" disabled={isUpserting}>
            {isUpserting ? <LoadingDotMini /> : "儲存"}
          </Button>
        </FormRow>
      </FormTable>
    </Modal>
  );
}

export default UpsertInventoryForm;
