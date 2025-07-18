import styled from "styled-components";
import { GoPlus } from "react-icons/go";
import DateRangePicker from "../../ui/DateRangePicker";
import ControlledSwitch from "../../ui/ControlledSwitch";
import ControlledTimeRange from "./ControlledTimeRange";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import SettingFormSection from "../../ui/SettingFormSection";
import { addYears, endOfYear } from "date-fns";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  li {
    display: grid;
    grid-template-columns: 25rem 8.2rem 1fr 2rem;
    grid-auto-rows: auto;
    row-gap: 1rem;
    column-gap: 2rem;
    align-items: center;
  }
`;

const AppendButton = styled.button`
  justify-self: start;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

function SpecialBusinessHours({ data = {} }) {
  const methods = useForm({
    defaultValues: { specialOpenHours: data },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = methods;

  const {
    fields: dayFields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: "specialOpenHours",
  });

  function onSubmit(data) {
    console.log("成功", data);
  }

  function onError(error) {
    console.log("失敗", error);
  }

  return (
    <FormProvider {...methods}>
      <SettingFormSection
        title="特殊營業時間"
        description="當遇到活動、特殊節日而需要修改店鋪的營業狀態時，可以在此處指定日期並調整營業時間，以覆蓋一般營業時間設定。"
        handleSubmit={handleSubmit(onSubmit, onError)}
        handleReset={() => reset({ specialOpenHours: data })}
        isDirty={isDirty}
      >
        <Content>
          {dayFields.map((day, dayIndex) => (
            <li key={day.id}>
              <Controller
                name={`specialOpenHours.${dayIndex}.dateRange`}
                control={control}
                render={({ field }) => (
                  <DateRangePicker
                    startMonth={new Date()}
                    endMonth={endOfYear(addYears(new Date(), 10))}
                    selected={field.value}
                    onSelect={field.onChange}
                    handleValueReset={() => field.onChange("")}
                    disabledDate={{ before: new Date() }}
                  />
                )}
              />

              <ControlledSwitch
                control={control}
                items={[
                  {
                    name: `specialOpenHours.${dayIndex}.isOpen`,
                    option1: { label: "公休", value: false },
                    option2: { label: "營業", value: true },
                  },
                ]}
              />

              <ControlledTimeRange
                control={control}
                dayIndex={dayIndex}
                fieldArrayName="specialOpenHours"
                removeSpecialDate={remove}
              />
            </li>
          ))}

          <AppendButton
            type="button"
            onClick={() =>
              append({
                dateRange: "",
                isOpen: false,
                timeSlots: [{ openTime: "", closeTime: "" }],
              })
            }
          >
            新增日期
            <GoPlus size={18} />
          </AppendButton>
        </Content>
      </SettingFormSection>
    </FormProvider>
  );
}

export default SpecialBusinessHours;
