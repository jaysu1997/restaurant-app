import styled from "styled-components";
import ControlledSwitch from "../../ui/ControlledSwitch";
import SettingFormSection from "../../ui/SettingFormSection";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ControlledTimeRange from "./ControlledTimeRange";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    display: grid;
    grid-template-columns: 25rem 8.2rem 1fr 2rem;
    grid-auto-rows: 3.8rem 2rem;
    row-gap: 0.3rem;
    column-gap: 2rem;
    align-items: center;
    padding-bottom: 0.3rem;
  }
`;

function RegularBusinessHours({ data = {} }) {
  const { mutate } = useUpsertSettings();

  const methods = useForm({
    defaultValues: { regularOpenHours: data },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = methods;

  const { fields: dayFields } = useFieldArray({
    control,
    name: "regularOpenHours",
  });

  function onSubmit(data) {
    console.log("成功", data);
    mutate(data, {
      onSuccess: (newData) =>
        reset({ regularOpenHours: newData.regularOpenHours }),
    });
  }

  function onError(error) {
    console.log("失敗", error);
  }

  return (
    <FormProvider {...methods}>
      <SettingFormSection
        title="一般營業時間"
        description="設定在非國定假日期間的每週固定營業時間，系統將依此顯示店鋪的營業狀態。"
        handleSubmit={handleSubmit(onSubmit, onError)}
        handleReset={() => reset({ regularOpenHours: data })}
        isDirty={isDirty}
      >
        <Content>
          {dayFields.map((day, dayIndex) => (
            <li key={day.id}>
              <label htmlFor={day.dayOfWeek}>{day.label}</label>
              <input
                id={day.dayOfWeek}
                type="text"
                hidden
                {...register(`regularOpenHours.${dayIndex}.dayOfWeek`)}
                value={day.dayOfWeek}
              />

              <ControlledSwitch
                control={control}
                items={[
                  {
                    name: `regularOpenHours.${dayIndex}.isOpen`,
                    option1: { label: "公休", value: false },
                    option2: { label: "營業", value: true },
                  },
                ]}
              />

              <ControlledTimeRange
                control={control}
                dayIndex={dayIndex}
                fieldArrayName="regularOpenHours"
              />
            </li>
          ))}
        </Content>
      </SettingFormSection>
    </FormProvider>
  );
}

export default RegularBusinessHours;
