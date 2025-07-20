import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";
import {
  MdAdd,
  MdHorizontalRule,
  MdOutlineDelete,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { Fragment, useEffect } from "react";
import { eachMinuteOfInterval, endOfDay, format, startOfDay } from "date-fns";
import ControlledSelect from "../../ui/ControlledSelect";
import FormErrorsMessage from "../../ui/FormErrorsMessage";

const StyledTimeRange = styled.div`
  grid-column: 3 / 4;
  display: grid;
  grid-template-columns: minmax(7.8rem, 1fr) 2rem minmax(7.8rem, 1fr) 2rem;
  align-items: center;
  column-gap: 1rem;
`;

const AppendButton = styled.button`
  grid-column: 4;
  grid-row: 1;
`;

// 一天的時段(每5分鐘一個選項)
const times = [
  ...eachMinuteOfInterval(
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    },
    { step: 5 }
  ).map((time) => ({
    label: format(time, "HH:mm"),
    value: format(time, "HH:mm"),
  })),
  { label: "23:59", value: "23:59" },
];

function validateTimeSlotField({
  fieldArrayName,
  isOpen,
  dayIndex,
  setError,
  clearErrors,
  getValues,
}) {
  const basePath = `${fieldArrayName}.${dayIndex}.timeSlots`;

  // 1. 公休則清除整天錯誤
  if (!isOpen) {
    clearErrors(basePath);
    return true;
  }

  const timeSlots = getValues(basePath);
  let slotErrors = false;

  timeSlots.forEach((slot, index) => {
    const open = slot?.openTime?.value;
    const close = slot?.closeTime?.value;

    // 先清除錯誤（避免殘留）
    clearErrors(`${basePath}.${index}`);

    // 2. 是否填寫完整
    if (!open || !close) {
      slotErrors = true;
      setError(`${basePath}.${index}`, {
        type: "manual",
        message: "營業日不能設定空白未填寫的時段",
      });
      return;
    }

    // 3. 開始時間不能晚於結束時間
    if (open >= close) {
      slotErrors = true;
      setError(`${basePath}.${index}`, {
        type: "manual",
        message: "結束時間必須晚於開始時間",
      });
    }
  });

  // 4. 有錯誤就不進行重疊時段檢查
  if (slotErrors) return;

  // 5. 重疊時段檢查
  const sorted = timeSlots.toSorted((a, b) =>
    a.openTime.value.localeCompare(b.openTime.value)
  );

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];

    if (prev.closeTime.value > curr.openTime.value) {
      const lastIndex = timeSlots.length - 1;
      setError(`${basePath}.${lastIndex}`, {
        type: "manual",
        message: "有重疊的營業時段",
      });
      return "有重疊的營業時段";
    }
  }

  // 6. 最終清除整天錯誤
  clearErrors(basePath);
  return true;
}

function ControlledTimeRange({
  control,
  dayIndex,
  fieldArrayName,
  removeSpecialDate = () => {},
}) {
  const {
    getValues,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${fieldArrayName}.${dayIndex}.timeSlots`,
  });

  const isOpen = useWatch({
    control,
    name: `${fieldArrayName}.${dayIndex}.isOpen`,
  });

  const isRegular = fieldArrayName === "regularOpenHours";
  const isSpecial = fieldArrayName === "specialOpenHours";

  // 是否需要具備禁用按鈕以及保留一個欄位(一般營業時間需要)
  const restricted = isRegular && !isOpen;

  useEffect(
    function () {
      if (!isOpen) clearErrors(`${fieldArrayName}.${dayIndex}.timeSlots`);
    },
    [isOpen, clearErrors, dayIndex, fieldArrayName]
  );

  return (
    <>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <StyledTimeRange>
            <ControlledSelect
              options={times}
              control={control}
              name={`${fieldArrayName}.${dayIndex}.timeSlots.${index}.openTime`}
              creatable={false}
              placeholder="開始時間"
              disabled={!isOpen}
              rules={{
                validate: () =>
                  validateTimeSlotField({
                    fieldArrayName,
                    isOpen,
                    dayIndex,
                    setError,
                    clearErrors,
                    getValues,
                  }),
              }}
            />

            <MdHorizontalRule size={18} />

            <ControlledSelect
              options={times}
              control={control}
              name={`${fieldArrayName}.${dayIndex}.timeSlots.${index}.closeTime`}
              creatable={false}
              placeholder="休息時間"
              disabled={!isOpen}
              rules={{
                validate: () =>
                  validateTimeSlotField({
                    fieldArrayName,
                    isOpen,
                    dayIndex,
                    setError,
                    clearErrors,
                    getValues,
                  }),
              }}
            />

            <button
              title="清除這個時段的時間"
              type="button"
              disabled={restricted || (isRegular && fields.length === 1)}
              onClick={() => {
                isSpecial && fields.length === 1
                  ? removeSpecialDate(dayIndex)
                  : remove(index);
              }}
            >
              {isSpecial && fields.length === 1 ? (
                <MdOutlineDeleteForever size={20} />
              ) : (
                <MdOutlineDelete size={20} />
              )}
            </button>
          </StyledTimeRange>

          <FormErrorsMessage
            fieldName={errors?.[fieldArrayName]?.[dayIndex]?.timeSlots?.[index]}
            gridColumn="3"
          />
        </Fragment>
      ))}

      <AppendButton
        type="button"
        onClick={() => append({ openTime: "", closeTime: "" })}
        disabled={restricted}
      >
        <MdAdd size={20} />
      </AppendButton>
    </>
  );
}

export default ControlledTimeRange;
