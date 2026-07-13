import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import styled from "styled-components";
import { Trash2, Plus, Minus } from "lucide-react";
import IconButton from "../../components/button/IconButton";
import BaseSelect from "../../components/BaseSelect";

const StyledTimeRange = styled.ul`
  display: flex;
  flex-direction: column;
  /* row-gap: 0.3rem; */
  row-gap: 1rem;

  li {
    display: grid;
    grid-template-columns: minmax(7.8rem, 1fr) 1.4rem minmax(7.8rem, 1fr) 2rem;
    /* grid-template-rows: 3.8rem; */
    align-items: center;
    column-gap: 0.6rem;
  }
`;

// 一天的時段(每5分鐘一個選項)
function generateTimeOptions() {
  const options = [];

  for (let time = 0; time <= 1440; time += 5) {
    const hour = Math.floor(time / 60);
    const minute = time % 60;

    const label = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    options.push({
      value: time,
      label,
    });
  }

  return options;
}

const times = generateTimeOptions();

function ControlledTimeRange({ dayIndex, fieldArrayName }) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${fieldArrayName}.${dayIndex}.timeSlots`,
  });

  // 當天是否有營業
  const isBusinessDay = useWatch({
    control,
    name: `${fieldArrayName}.${dayIndex}.isBusinessDay`,
  });

  const baseName = `${fieldArrayName}.${dayIndex}.timeSlots`;

  return (
    <StyledTimeRange>
      {fields.map((field, slotIndex) => (
        <li key={field.id}>
          <Controller
            control={control}
            name={`${baseName}.${slotIndex}.openTime`}
            render={({ field }) => (
              <BaseSelect
                {...field}
                options={times}
                isDisabled={!isBusinessDay}
                placeholder="開始時間"
              />
            )}
          />

          <Minus className="icon-sm" />

          <Controller
            control={control}
            name={`${baseName}.${slotIndex}.closeTime`}
            render={({ field }) => (
              <BaseSelect
                {...field}
                options={times}
                isDisabled={!isBusinessDay}
                placeholder="休息時間"
              />
            )}
          />

          {slotIndex === 0 && (
            <IconButton
              $hoverColor="blue"
              onClick={() =>
                append({
                  openTime: { label: "09:00", value: 540 },
                  closeTime: { label: "17:00", value: 1020 },
                })
              }
            >
              <Plus strokeWidth={2.4} />
            </IconButton>
          )}

          {slotIndex !== 0 && (
            <IconButton
              title="清除這個時段的時間"
              disabled={fields.length === 1}
              onClick={() => remove(slotIndex)}
            >
              <Trash2 />
            </IconButton>
          )}
        </li>
      ))}
    </StyledTimeRange>
  );
}

export default ControlledTimeRange;
