// 用來新增或更新單筆menu數據的表單
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import useUpsertMenu from "./useUpsertMenu";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../ui/LoadingSpinner";
import FieldArray from "./FieldArray";
import FormTable from "../../ui/FormTable";
import { IoCloseSharp } from "react-icons/io5";
import LoadingDotMini from "../../ui/LoadingDotMini";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormTypography from "../../ui/FormTypography";
import ControlledSelect from "../../ui/ControlledSelect";
import StyledHotToast from "../../ui/StyledHotToast";
import { useRef } from "react";
import FormFieldset from "../../ui/FormFieldset";
import ControlledInput from "../../ui/ControlledInput";
import useGetInventory from "../inventory/useGetInventory";

const formFieldData = [
  {
    title: "名稱",
    inputName: "name",
    inputType: "text",
  },
  {
    title: "分類",
    inputName: "category",
    inputType: "text",
  },
  {
    title: "定價",
    inputName: "price",
    inputType: "number",
    min: true,
  },
  {
    title: "折扣",
    inputName: "discount",
    inputType: "number",
    min: true,
    validateValue: true,
  },
];

function UpsertMenuForm({ onCloseModal, menu }) {
  const { inventoryData, inventoryDataFetching } = useGetInventory(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { upsert, isUpserting } = useUpsertMenu();
  const newIngredientRef = useRef(new Map());

  const { register, handleSubmit, control, setValue, getValues, reset } =
    useForm({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      criteriaMode: "all",
      disabled: isUpserting,
      defaultValues: menu || {
        name: "",
        category: "",
        price: "",
        discount: "",
        ingredients: [{ ingredientName: "", quantity: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  // 當<CreatableSelect />建立新選項時執行
  function handleCreateNewItems(data, fieldName) {
    // 把新的選項值設置到react hook form的指定欄位中
    setValue(fieldName, { label: data, value: data });
    newIngredientRef.current.set(fieldName, data);
  }

  function onSubmit(data) {
    console.log(data);

    // 新的食材數據(要順便新增到inventory中)
    function createNewIngredients(newIngredientsMap) {
      const newIngredientSet = new Set();
      const newIngredientsArr = [];

      // 之所以使用Map存放數據，是為了檢察這個新食材是否真的有使用，還是在新增食材食輸入錯誤但被記錄儲存的
      newIngredientsMap.forEach((newIngredientsName, fieldName) => {
        const fieldValue = getValues(fieldName).label;

        if (
          fieldValue === newIngredientsName &&
          !newIngredientSet.has(newIngredientsName)
        ) {
          newIngredientSet.add(newIngredientsName);
          newIngredientsArr.push({
            label: newIngredientsName,
            value: newIngredientsName,
          });
        }
      });

      return newIngredientsArr;
    }

    const newIngredients = createNewIngredients(newIngredientRef.current);

    const menuData = {
      data,
      newIngredients,
    };

    // 當網路離線時會跳出錯誤訊息，並終止提交表單動作
    if (!navigator.onLine) {
      StyledHotToast({
        type: "error",
        title: "餐點設定失敗",
        content: "目前網路無法使用，請稍後再試。",
      });

      return;
    }

    // 執行表單數據上傳
    upsert(menuData, {
      onSuccess: (data) => {
        menu
          ? StyledHotToast({
              type: "success",
              title: "餐點設定更新成功",
            })
          : StyledHotToast({
              type: "success",
              title: "餐點設定新增成功",
            });
        onCloseModal?.();
        searchParams.set("category", "all");
        searchParams.set("name", "");
        setSearchParams(searchParams);
      },
      onError: (error) => {
        console.log("上傳失敗", error);
        // 確保在上傳supabase失敗後，各個欄位的值不會被清空
        reset(getValues());
      },
    });
  }

  function onError(error) {
    // 透過反覆遍歷取得所有錯誤訊息
    const getAllMessages = (errors) => {
      return Object.keys(errors).flatMap((key) => {
        const error = errors[key];
        if (error.message) {
          return [error.message];
        }
        if (typeof error === "object") {
          return getAllMessages(error);
        }
        return [];
      });
    };

    StyledHotToast({
      type: "error",
      title: "餐點設定失敗",
      content: `${getAllMessages(error).join("， ")}。`,
    });
  }

  if (inventoryDataFetching) {
    return <LoadingSpinner />;
  }

  return (
    <FormProvider register={register} control={control} getValues={getValues}>
      <FormTable onSubmit={handleSubmit(onSubmit, onError)}>
        <FormTypography $titleStyle="description">
          表單說明：
          <FormTypography $titleStyle="highlight">*</FormTypography>
          標記的是必填欄位，必須完成填寫。
        </FormTypography>

        {formFieldData.map((data) => (
          <FormRow $formRowStyle="oneColumn" key={data.inputName}>
            <FormTypography $titleStyle="title">
              {data.title}
              <FormTypography $titleStyle="highlight">*</FormTypography>
            </FormTypography>

            <FormFieldset legendValue="">
              <ControlledInput
                type={data.inputType}
                placeholder={`請輸入餐點${data.title}`}
                control={control}
                name={data.inputName}
                rules={{
                  required: `${data.title}欄位必須填寫`,
                  min: data.min
                    ? {
                        value: 0,
                        message: `折扣和定價不能為負數`,
                      }
                    : undefined,
                  validate: data.validateValue
                    ? (value) =>
                        Number(value) <= Number(getValues("price")) ||
                        "折扣不能超過定價"
                    : undefined,
                }}
              />
            </FormFieldset>
          </FormRow>
        ))}

        <FormRow $formRowStyle="twoColumn">
          <FormTypography $titleStyle="title">
            備料
            <FormTypography $titleStyle="highlight">*</FormTypography>
          </FormTypography>
          <FormTypography $titleStyle="description">
            &#8251;
            此欄位用來輸入本餐點需要使用到的食材以及對應數量，以便管理庫存。
          </FormTypography>

          {fields.map((field, index) => (
            <FormRow $formRowStyle="sub" key={field.id}>
              <FormRow $formRowStyle="subHeader">
                <FormTypography $titleStyle="subTitle">
                  備料 {index + 1}.
                </FormTypography>

                {fields.length - 1 !== 0 && (
                  <Button
                    $buttonStyle="remove"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <IoCloseSharp />
                  </Button>
                )}
              </FormRow>

              <FormFieldset legendValue="食材名稱">
                <ControlledSelect
                  name={`ingredients.${index}.ingredientName`}
                  control={control}
                  rules={{ required: "食材名稱不能空白" }}
                  menuPlacement="auto"
                  options={inventoryData}
                  handleCreateNewItems={handleCreateNewItems}
                  creatable={true}
                  placeholder="可新增/選擇食材"
                  disabled={isUpserting}
                />
              </FormFieldset>

              <FormFieldset legendValue="使用數量">
                <ControlledInput
                  type="number"
                  placeholder="請輸入食材使用數量"
                  control={control}
                  name={`ingredients.${index}.quantity`}
                  rules={{
                    required: "使用數量不能空白",
                    min: {
                      value: 1,
                      message: `使用數量不能少於1`,
                    },
                  }}
                />
              </FormFieldset>
            </FormRow>
          ))}

          <Button
            $buttonStyle="add"
            type="button"
            onClick={() =>
              append({
                ingredientName: "",
                quantity: "",
              })
            }
          >
            新增備料
          </Button>
        </FormRow>

        <FormRow $formRowStyle="twoColumn">
          <FieldArray
            inventoryData={inventoryData}
            handleCreateNewItems={handleCreateNewItems}
            disabled={isUpserting}
          />
        </FormRow>

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
    </FormProvider>
  );
}

export default UpsertMenuForm;
