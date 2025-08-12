import styled from "styled-components";
import ControlledSwitch from "../../ui/ControlledSwitch";
import SettingFormSection from "../../ui/SettingFormSection";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ControlledTimeRange from "./ControlledTimeRange";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";
import { sortTimeSlots } from "./sortTimeSlots";
import StyledHotToast from "../../ui/StyledHotToast";

const Content = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  column-gap: 2.4rem;
  row-gap: 3.2rem;
  align-items: start;

  li {
    display: grid;
    grid-template-columns: 1fr 2rem;
    grid-template-rows: 3.8rem auto;
    row-gap: 0.4rem;
    column-gap: 1rem;
    padding-bottom: 0.3rem;
  }

  label {
    align-self: center;
  }
`;

function RegularOpenHours({ data = {} }) {
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
    clearErrors,
  } = methods;

  const { fields: dayFields } = useFieldArray({
    control,
    name: "regularOpenHours",
  });

  function onSubmit(data) {
    console.log(data);

    const sortedData = sortTimeSlots(data.regularOpenHours);

    mutate(
      { regularOpenHours: sortedData },
      {
        onSuccess: (newData) =>
          reset({ regularOpenHours: newData.regularOpenHours }),
      }
    );
  }

  function onError(error) {
    console.log("失敗", error);
    StyledHotToast({ type: "error", title: "設定更新失敗" });
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

              <ControlledTimeRange
                control={control}
                dayIndex={dayIndex}
                fieldArrayName="regularOpenHours"
              />

              <ControlledSwitch
                control={control}
                items={[
                  {
                    name: `regularOpenHours.${dayIndex}.isBusinessDay`,
                    option1: { label: "公休", value: false },
                    option2: { label: "營業", value: true },
                  },
                ]}
                handleChange={() =>
                  clearErrors(`regularOpenHours.${dayIndex}.timeSlots`)
                }
              />
            </li>
          ))}
        </Content>
      </SettingFormSection>
    </FormProvider>
  );
}

export default RegularOpenHours;
