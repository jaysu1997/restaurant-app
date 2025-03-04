import { useForm } from "react-hook-form";
import FormTable from "../../ui/FormTable";
import FormTypography from "../../ui/FormTypography";
import FormRow from "../../ui/FormRow";
import InputField from "../../ui/FormInputField";
import Button from "../../ui/Button";
import LoadingDotMini from "../../ui/LoadingDotMini";
import useUpsertInventory from "./useUpsertInventory";
import { useSearchParams } from "react-router-dom";
import StyledHotToast from "../../ui/StyledHotToast";

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
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: inventory,
  });
  const { upsert, isUpserting } = useUpsertInventory();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(data) {
    // 增加value(配合react-select的格式)
    const inventoryData = {
      ...data,
      value: data.label,
    };

    // 當網路離線時會跳出錯誤訊息，並終止提交表單動作
    if (!navigator.onLine) {
      StyledHotToast({
        type: "error",
        title: "庫存食材設定失敗",
        content: "目前網路無法使用，請稍後再試。",
      });
      return;
    }

    upsert(inventoryData, {
      onSuccess: (data) => {
        inventory
          ? StyledHotToast({
              type: "success",
              title: "庫存食材設定更新成功",
            })
          : StyledHotToast({
              type: "success",
              title: "庫存食材設定新增成功",
            });
        onCloseModal?.();
        setSearchParams({});
      },
      onError: (error) => {
        reset(getValues());
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
    <FormTable onSubmit={handleSubmit(onSubmit, onError)}>
      {inventory && (
        <FormTypography $titleStyle="description">
          表單說明：食材名稱更改後，所有使用此食材的備料和選項也會同步更新名稱。
        </FormTypography>
      )}

      {formFieldData.map((data) => (
        <FormRow $formRowStyle="oneColumn" key={data.inputName}>
          <FormTypography $titleStyle="title">
            {data.title}
            <FormTypography $titleStyle="highlight">*</FormTypography>
          </FormTypography>

          <InputField
            legendValue=""
            type={data.inputType}
            id={data.inputName}
            placeholder={`請輸入餐點${data.title}`}
            {...register(`${data.inputName}`, {
              required: `${data.title}欄位必須填寫`,
              min: {
                value: 0,
                message: `${data.title}數量必須大於0`,
              },
            })}
          />
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
  );
}

export default UpsertInventoryForm;
