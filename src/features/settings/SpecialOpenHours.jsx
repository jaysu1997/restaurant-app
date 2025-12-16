import styled from "styled-components";
import DateRangePicker from "../../ui-old/DateRangePicker";
import ControlledSwitch from "../../ui-old/ControlledSwitch";
import ControlledTimeRange from "./ControlledTimeRange";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { addYears, compareAsc, endOfYear, isAfter, isToday } from "date-fns";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";
import { checkOverlapConflicts, validateValues } from "./validateOverlap";
import { sortTimeSlots } from "./sortTimeSlots";
import { fadeInAnimation } from "../../utils/dom";
import StyledHotToast from "../../ui-old/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import Button from "../../ui/Button";
import { Plus, Trash2, CalendarClock } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";

const BusinessPeriodList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const BusinessPeriodItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.6rem;
  align-items: start;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.p`
  color: #b0b0b0;
  font-weight: 500;
`;

const DateField = styled.div`
  display: grid;
  grid-template-columns: minmax(20rem, 1fr) 2rem;
  column-gap: 0.6rem;
  row-gap: 0.3rem;
  padding-bottom: 0.6rem;
`;

// 檢查日期是否有重疊或其他錯誤
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

function SpecialOpenHours({ data = {} }) {
  const { mutate, isPending } = useUpsertSettings();

  const methods = useForm({
    defaultValues: {
      specialOpenHours: data.filter((date) => {
        const start = date.dateRange.to;
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

    // 我發現，如果我先新增大量時段，然後切換成公休，再提交，之後會留下大量沒有value的欄位，應該要想辦法刪除

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
      <SectionContainer
        title="特殊營業時間"
        icon={<CalendarClock size={20} />}
        description="需要臨時調整特定日期的營業時段，可在此處添加設定，設定值會覆蓋一般營業時間。"
        form={{
          formId: "specialOpenHours",
          handleReset: () => reset({ specialOpenHours: data }),
          isDirty,
          isUpdating: isPending,
        }}
        appendButton={
          <Button
            $variant="text"
            onClick={() => {
              append({
                dateRange: "",
                isBusinessDay: false,
                timeSlots: [{ openTime: "", closeTime: "" }],
              });
              // 淡入欄位動畫
              fadeInAnimation(`specialOpenHours.${dayFields.length}`);
            }}
          >
            <Plus size={18} />
            新增日期
          </Button>
        }
      >
        <form id="specialOpenHours" onSubmit={handleSubmit(onSubmit, onError)}>
          <BusinessPeriodList>
            {dayFields.length === 0 && (
              <EmptyMessage>目前沒有設定任何特殊營業時間</EmptyMessage>
            )}

            {dayFields.map((day, dayIndex) => (
              <BusinessPeriodItem
                key={day.id}
                id={`specialOpenHours.${dayIndex}`}
              >
                <DateField>
                  <FormFieldLayout
                    error={
                      errors?.specialOpenHours?.[dayIndex]?.errorFallback ||
                      false
                    }
                  >
                    <Controller
                      name={`specialOpenHours.${dayIndex}.dateRange`}
                      control={control}
                      render={({ field }) => (
                        <DateRangePicker
                          defaultMonth={field.value?.from}
                          startMonth={new Date()}
                          endMonth={endOfYear(addYears(new Date(), 5))}
                          selected={field.value}
                          onSelect={(range) =>
                            field.onChange(range ? range : "")
                          }
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
                  </FormFieldLayout>

                  <Button $variant="plain" onClick={() => remove(dayIndex)}>
                    <Trash2 size={20} />
                  </Button>

                  <ControlledSwitch
                    items={[
                      {
                        name: `specialOpenHours.${dayIndex}.isBusinessDay`,
                        option1: { label: "公休", value: false },
                        option2: { label: "營業", value: true },
                      },
                    ]}
                    handleChange={() =>
                      clearErrors(`specialOpenHours.${dayIndex}.timeSlots`)
                    }
                  />
                </DateField>

                <ControlledTimeRange
                  control={control}
                  dayIndex={dayIndex}
                  fieldArrayName="specialOpenHours"
                />
              </BusinessPeriodItem>
            ))}
          </BusinessPeriodList>
        </form>
      </SectionContainer>
    </FormProvider>
  );
}

export default SpecialOpenHours;
