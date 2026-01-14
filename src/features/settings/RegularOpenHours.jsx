import styled from "styled-components";
import ControlledSwitch from "../../ui-old/ControlledSwitch";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ControlledTimeRange from "./ControlledTimeRange";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";
import { sortTimeSlots } from "./sortTimeSlots";
import StyledHotToast from "../../ui-old/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import { Clock } from "lucide-react";

const BusinessPeriodList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const BusinessPeriodItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3.2rem;

  align-items: start;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const DateField = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  /* grid-template-rows: 3.8rem; */
  row-gap: 0.6rem;
  padding-bottom: 0.6rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

function RegularOpenHours({ data = {} }) {
  const { mutate, isPending } = useUpsertSettings();

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
      <SectionContainer
        title="一般營業時間"
        icon={<Clock size={20} />}
        description="設定店鋪的一般營業時間，系統將會根據此設定來顯示當前是否正在營業。"
        form={{
          formId: "regularOpenHours",
          handleReset: () => reset({ regularOpenHours: data }),
          isDirty,
          isUpdating: isPending,
        }}
      >
        <form id="regularOpenHours" onSubmit={handleSubmit(onSubmit, onError)}>
          <BusinessPeriodList>
            {dayFields.map((day, dayIndex) => (
              <BusinessPeriodItem key={day.id}>
                <DateField>
                  <label htmlFor={day.dayOfWeek}>{day.label}</label>
                  <input
                    id={day.dayOfWeek}
                    type="text"
                    hidden
                    {...register(`regularOpenHours.${dayIndex}.dayOfWeek`)}
                    value={day.dayOfWeek}
                  />

                  <ControlledSwitch
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
                </DateField>

                <ControlledTimeRange
                  control={control}
                  dayIndex={dayIndex}
                  fieldArrayName="regularOpenHours"
                />
              </BusinessPeriodItem>
            ))}
          </BusinessPeriodList>
        </form>
      </SectionContainer>
    </FormProvider>
  );
}

export default RegularOpenHours;
