// 用來新增或更新單筆menu數據的表單

import { Controller, useFieldArray, useForm } from "react-hook-form";
import useUpsertMenu from "./useUpsertMenu";
import { useSearchParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import useGetInventory from "../inventory/useGetInventory";
import LoadingSpinner from "../../ui/LoadingSpinner";
import FieldArray from "./FieldArray";
import {
  Form,
  Input,
  Title,
  Row,
  SubRow,
  Fieldset,
  Legend,
  NestedInput,
  SubTitle,
  SubHeader,
  Footer,
  ButtonGroup,
  RemoveButton,
  Span,
  AddButton,
  CancelButton,
  SubmitButton,
  Description,
  Highlight,
} from "../../ui/FormTable";

import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import LoadingDotMini from "../../ui/LoadingDotMini";
import { useState } from "react";
import { MacScrollbar } from "mac-scrollbar";

function UpsertMenuForm({ onCloseModal, menu }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [newItems, setNewItems] = useState(new Set());

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: menu || {
      ingredients: [{ quantity: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { upsert, isUpserting } = useUpsertMenu();

  const { inventoryData, isPending } = useGetInventory();

  function handleCreateNewItems(data, fieldName) {
    setValue(fieldName, { label: data, value: data });
    setNewItems(() => newItems.add(data));
  }

  function onSubmit(data) {
    console.log(data);

    const newIngredients = [...newItems].map((item) => ({
      label: item,
      value: item,
    }));

    const { ingredients, customize } = data;
    const customizeNoOptions = customize?.findIndex(
      (cus) => cus.options.length === 0
    );

    if (!navigator.onLine) {
      toast.error("目前網路無法使用，請稍後再試。");
      return;
    }

    // 不能沒有備料數據
    if (ingredients.length === 0) {
      toast.error("備料必填");
      return;
    }
    // 不能只有細項但沒有對應的選項
    if (customize && customizeNoOptions !== -1) {
      toast.error("缺少選項");
      return;
    }

    upsert(
      { data, newIngredients },
      {
        onSuccess: (data) => {
          console.log("成功");
          reset();
          onCloseModal?.();
          searchParams.delete("name");
          searchParams.delete("category");
          setSearchParams(searchParams);
        },
        onError: (error) => {
          console.log("上傳失敗");
        },
      }
    );
  }

  function onError(error) {
    console.log(error);
    console.log("失敗");
    toast.error(
      "餐點數據提交失敗，請確認是否所有必填欄位都已確實填寫，以及選填欄位是否有輸入框是空白的。"
    );
  }

  const inputType = "text";

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <Description>
        <span>表單說明：</span>
        <span>
          <Highlight>*</Highlight>標記的是必填欄位，必須完成填寫。
        </span>
      </Description>

      <Row>
        <Title htmlFor="name">
          名稱<Highlight>*</Highlight>
        </Title>
        <Input
          type="text"
          id="name"
          autoComplete="off"
          onWheel={inputType === "number" ? (e) => e.target.blur() : undefined}
          placeholder="請輸入餐點名稱"
          {...register("name", {
            required: "此欄位不能空白",
          })}
        />
      </Row>

      <Row>
        <Title htmlFor="category">分類</Title>
        <Input
          type="text"
          id="category"
          autoComplete="off"
          placeholder="請輸入餐點分類"
          {...register("category", {
            required: "此欄位不能空白",
          })}
        />
      </Row>

      <Row>
        <Title htmlFor="price">定價</Title>
        <Input
          type="number"
          id="price"
          autoComplete="off"
          onWheel={(e) => {
            // 禁用number input默認的滾輪改變value功能
            e.target.blur();
          }}
          placeholder="請輸入餐點定價"
          {...register("price", {
            required: "此欄位不能空白",
            valueAsNumber: true,
          })}
        />
      </Row>

      <Row>
        <Title htmlFor="discount">折扣</Title>
        <Input
          type="number"
          id="discount"
          autoComplete="off"
          onWheel={(e) => {
            // 禁用number input默認的滾輪改變value功能
            e.target.blur();
          }}
          placeholder="請輸入餐點折扣"
          {...register("discount", {
            required: "此欄位不能空白",
            valueAsNumber: true,
          })}
        />
      </Row>

      <Row>
        <Title htmlFor="ingredients">備料</Title>
        <Span>
          &#8251;
          此欄位用來輸入本餐點需要使用到的食材以及對應數量，以便管理庫存。
        </Span>

        {fields.map((fields, index) => {
          if (isPending) return <LoadingSpinner key={fields.id} />;

          return (
            <SubRow key={fields.id}>
              <SubHeader>
                <SubTitle>備料 {index + 1}.</SubTitle>

                <RemoveButton type="button" onClick={() => remove(index)}>
                  <IoCloseSharp />
                </RemoveButton>
              </SubHeader>

              <Fieldset>
                <Legend>食材名稱</Legend>
                <Controller
                  name={`ingredients.${index}.name`}
                  control={control}
                  rules={{
                    required: "此欄位不能空白",
                  }}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          border: "none",
                          backgroundColor: "inherit",
                          boxShadow: "none",
                          fontSize: "1.4rem",
                          minHeight: "2rem",
                        }),
                      }}
                      formatCreateLabel={(inputValue) =>
                        `新增食材: ${inputValue}`
                      }
                      options={inventoryData}
                      isClearable
                      placeholder="可新增 / 選擇食材"
                      onCreateOption={(optionValue) => {
                        handleCreateNewItems(optionValue, field.name);
                      }}
                    />
                  )}
                />
              </Fieldset>

              <Fieldset>
                <Legend>使用數量</Legend>
                <NestedInput
                  type="number"
                  autoComplete="off"
                  onWheel={(e) => {
                    // 禁用number input默認的滾輪改變value功能
                    e.target.blur();
                  }}
                  placeholder="請輸入食材使用數量"
                  {...register(`ingredients.${index}.quantity`, {
                    required: "此欄位不能空白",
                    valueAsNumber: true,
                  })}
                />
              </Fieldset>
            </SubRow>
          );
        })}

        <AddButton
          type="button"
          onClick={() => append({ name: "", quantity: "" })}
        >
          新增備料
        </AddButton>
      </Row> */}

      <Row>
        <FieldArray
          control={control}
          register={register}
          inventoryData={inventoryData}
          handleCreateNewItems={handleCreateNewItems}
        />
      </Row>

      <Footer>
        <ButtonGroup>
          <CancelButton type="reset" disabled={isUpserting}>
            取消
          </CancelButton>
          <SubmitButton type="submit" disabled={isUpserting}>
            {isUpserting ? <LoadingDotMini /> : "儲存"}
          </SubmitButton>
        </ButtonGroup>
        {/* <div style={{ height: "1.6rem" }}></div> */}
      </Footer>
    </Form>
  );
}

export default UpsertMenuForm;
