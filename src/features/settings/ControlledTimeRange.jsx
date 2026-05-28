import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";
import ControlledSelect from "../../ui/ControlledSelect";
import { Trash2, Plus, Minus } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";
import IconButton from "../../components/button/IconButton";

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

const AppendButton = styled(IconButton)`
  &:not(:disabled):hover {
    color: #2563eb;
  }
`;

// 一天的時段(每5分鐘一個選項)
function generateTimeOptions() {
  const options = [];

  for (let time = 0; time <= 1440; time += 1) {
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

  // 當天有營業
  const isBusinessDay = useWatch({
    control,
    name: `${fieldArrayName}.${dayIndex}.isBusinessDay`,
  });

  return (
    <StyledTimeRange>
      {fields.map((field, slotIndex) => (
        <li key={field.id}>
          <ControlledSelect
            options={times}
            name={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}.openTime`}
            creatable={false}
            placeholder="開始時間"
            disabled={!isBusinessDay}
          />

          <Minus className="icon-sm" />

          <ControlledSelect
            options={times}
            name={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}.closeTime`}
            creatable={false}
            placeholder="休息時間"
            disabled={!isBusinessDay}
          />

          {slotIndex === 0 && (
            <AppendButton
              $variant="plain"
              onClick={() =>
                append({
                  openTime: { label: "09:00", value: 540 },
                  closeTime: { label: "17:00", value: 1020 },
                })
              }
            >
              <Plus strokeWidth={2.4} />
            </AppendButton>
          )}

          {slotIndex !== 0 && (
            <IconButton
              $variant="plain"
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
