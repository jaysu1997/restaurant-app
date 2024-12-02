import { Controller, useFieldArray, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import styled from "styled-components";
import useGetInventory from "../features/inventory/useGetInventory";
import LoadingSpinner from "../ui/LoadingSpinner";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 20rem;
`;

const Fieldset = styled.fieldset`
  width: 100%;
  padding: 0.6rem;
  height: fit-content;
  border-radius: 5px;
  border: 2px solid gray;
  max-width: 20rem;
  text-align: center;
`;

const Legend = styled.legend`
  color: blue;
  padding: 0 0.6rem;
`;

const Input = styled.input`
  width: 100%;
  height: 5rem;
  /* background-color: inherit; */
  background-color: orangered;
  border: none;
  font-size: 2rem;

  &:focus {
    outline: none;
  }
`;

function Homepage() {
  const { register, handleSubmit, control } = useForm();

  // 取得所有庫存
  const { inventoryData, isPending } = useGetInventory();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  function onSubmit(data) {
    console.log(data);
  }

  if (isPending) return <LoadingSpinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <Legend>標題</Legend>
        <Input />
      </Fieldset>

      <label htmlFor="name">名字</label>
      <input id="name" {...register("name")} />

      <label htmlFor="options">選項</label>

      <Controller
        control={control}
        name="test"
        render={({ field }) => (
          <CreatableSelect
            {...field}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                border: "none",
                boxShadow: "none",
                fontSize: "1.4rem",
                width: "40rem",
              }),
            }}
            isClearable
            options={inventoryData}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.id}
            onChange={(e) => field.onChange(e.value)}
          />
        )}
      />

      <button type="button" onClick={() => append({ name: "", quantity: "" })}>
        新增選項
      </button>
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{ border: "1px solid green", padding: "0.6rem" }}
        >
          <label htmlFor={index}>{index + 1}</label>
          <input id={index} {...register(`options.${index}.label1`)} />

          <button type="button" onClick={() => remove(index)}>
            刪除{index + 1}
          </button>

          <Nestes
            control={control}
            register={register}
            key={field.id}
            nestIndex={index}
          />
        </div>
      ))}

      <button>submit</button>
    </Form>
  );
}

export default Homepage;

// 嵌套表單
function Nestes({ control, register, nestIndex }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `options.${nestIndex}.value`,
  });

  return (
    <div style={{ border: "1px solid red", padding: "0.6rem" }}>
      <label htmlFor="options">嵌套</label>

      <button type="button" onClick={() => append({ label1: "" }, false)}>
        新增嵌套
      </button>

      {fields.map((field, index) => (
        <div key={field.id}>
          <label htmlFor={index}>嵌套{index + 1}</label>
          <input
            id={index}
            {...register(`options.${nestIndex}.value.${index}.label1`)}
          />

          <button type="button" onClick={() => remove(index)}>
            刪除嵌套{index + 1}
          </button>
        </div>
      ))}
    </div>
  );
}

// react-select
