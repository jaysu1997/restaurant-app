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
import { addYears, compareAsc, endOfYear, isAfter, isToday } from "date-fns";
import FormErrorsMessage from "../../ui/FormErrorsMessage";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";
import { checkOverlapConflicts, validateValues } from "./validateOverlap";
import { sortTimeSlots } from "./sortTimeSlots";
import fadeInAnimation from "../../utils/fadeInAnimation";
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
`;

const EmptyMessage = styled.p`
  color: #b0b0b0;
  font-weight: 500;
`;

const AppendButton = styled.button`
  height: fit-content;
  width: fit-content;
  grid-column: 1;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #3b82f6;
  font-weight: 500;
  padding: 0.6rem 1.8rem;
  border-radius: 4px;
  background-color: #dbeafe;

  &:hover {
    background-color: #bfdbfe;
  }
`;

const DateField = styled.div`
  grid-column: 1;
`;

function validateDateRangeField({ setError, clearErrors, getValues }) {
  const path = "specialOpenHours";
  const slots = getValues(path);

  const normalizeData = slots.map((slot) => {
    const { from, to } = slot.dateRange || {};

    return {
      start: from ? new Date(from) : undefined,
      end: to ? new Date(to) : undefined,
    };
  });

  // 進行欄位檢查(不能空值或是休息時間比開始時間早)，並回傳通過檢查的時段
  const validSlots = validateValues({
    normalizeData,
    path,
    setError,
    clearErrors,
    dataType: "date",
  });

  // 驗證時段之間是否有重疊
  checkOverlapConflicts({ validSlots, path, setError });
}

function SpecialBusinessHours({ data = {} }) {
  const { mutate } = useUpsertSettings();

  const methods = useForm({
    defaultValues: {
      specialOpenHours: data.filter((date) => {
        const start = date.dateRange.from;
        return isToday(start) || isAfter(start, new Date());
      }),
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    clearErrors,
    setError,
    getValues,
    formState: { isDirty, errors },
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

    const sortedData = data.specialOpenHours.toSorted((a, b) =>
      compareAsc(a.dateRange.from, b.dateRange.from)
    );

    mutate(
      { specialOpenHours: sortTimeSlots(sortedData) },
      {
        onSuccess: (newData) =>
          reset({ specialOpenHours: newData.specialOpenHours }),
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
        title="特殊營業時間"
        description="當遇到國定假日或特殊活動需要改變營業時間，可以在此處選擇指定日期並設定營業時間，設定值將會覆蓋一般營業時間設定。"
        handleSubmit={handleSubmit(onSubmit, onError)}
        handleReset={() => reset({ specialOpenHours: data })}
        isDirty={isDirty}
      >
        <Content>
          {dayFields.length === 0 && (
            <EmptyMessage>目前沒有設定任何特殊營業時間</EmptyMessage>
          )}

          {dayFields.map((day, dayIndex) => (
            <li key={day.id} id={`specialOpenHours.${dayIndex}`}>
              <DateField>
                <Controller
                  name={`specialOpenHours.${dayIndex}.dateRange`}
                  control={control}
                  render={({ field }) => (
                    <DateRangePicker
                      defaultMonth={field.value?.from}
                      startMonth={new Date()}
                      endMonth={endOfYear(addYears(new Date(), 5))}
                      selected={field.value}
                      onSelect={(range) => field.onChange(range ? range : "")}
                      handleValueReset={() => field.onChange("")}
                      disabledDate={{ before: new Date() }}
                    />
                  )}
                  rules={{
                    validate: () =>
                      validateDateRangeField({
                        dayIndex,
                        setError,
                        clearErrors,
                        getValues,
                      }),
                  }}
                />
              </DateField>

              <FormErrorsMessage
                fieldName={errors?.specialOpenHours?.[dayIndex]?.errorFallback}
                gridColumn="1 / -1"
              />

              <ControlledTimeRange
                control={control}
                dayIndex={dayIndex}
                fieldArrayName="specialOpenHours"
                removeEntireFields={remove}
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
                handleChange={() =>
                  clearErrors(`specialOpenHours.${dayIndex}.timeSlots`)
                }
              />
            </li>
          ))}

          <AppendButton
            type="button"
            onClick={() => {
              append({
                dateRange: "",
                isOpen: false,
                timeSlots: [{ openTime: "", closeTime: "" }],
              });
              // 淡入欄位動畫
              fadeInAnimation(`specialOpenHours.${dayFields.length}`);
            }}
          >
            <GoPlus size={18} strokeWidth={0.6} />
            新增日期
          </AppendButton>
        </Content>
      </SettingFormSection>
    </FormProvider>
  );
}

export default SpecialBusinessHours;
