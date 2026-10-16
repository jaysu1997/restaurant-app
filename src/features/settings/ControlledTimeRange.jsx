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
import { generateTimeOptions } from "./utils/timeOptions.js";

const StyledTimeRange = styled.ul`
  display: flex;
  flex-direction: column;
  /* row-gap: 0.3rem; */
  row-gap: var(--space-2-5);

  li {
    display: grid;
    grid-template-columns: minmax(7.8rem, 1fr) 1.4rem minmax(7.8rem, 1fr) 2rem;
    /* grid-template-rows: 3.8rem; */
    align-items: center;
    column-gap: var(--space-1-5);
  }
`;

const StyledMinusIcon = styled(Minus)`
  width: 1.4rem;
  height: 1.4rem;
`;

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

          <StyledMinusIcon />

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
