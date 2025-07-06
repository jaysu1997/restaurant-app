import styled from "styled-components";
import { GoTrash } from "react-icons/go";
import DateRangePicker from "../../ui/DateRangePicker";
import { useState } from "react";
import ControlledSwitch from "../../ui/ControlledSwitch";
import ControlledTimeSelect from "../../ui/ControlledTimeSelect";
import { AiOutlineMinus } from "react-icons/ai";

const SettingSection = styled.section`
  display: grid;
  grid-template-columns: 32rem 1fr;
  padding: 3.2rem;
  font-size: 1.4rem;
  background-color: #fff;
  align-items: start;
  gap: 5rem;

  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    font-size: 2rem;
  }

  article {
    display: grid;
    grid-template-columns: 25rem minmax(8.2rem, 1fr) 1fr auto;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
  }

  button {
    font-size: 1.4rem;
  }
`;

const Time = styled.div`
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) 2rem minmax(12rem, 1fr) 2rem;
  align-items: center;
  justify-content: center;
  justify-items: center;
  gap: 1.2rem;
`;

function SpecialBusinessHours({ control }) {
  const [selected, setSelected] = useState();

  return (
    <SettingSection>
      <header>
        <h2>特殊營業時間</h2>
        <p>
          當遇到活動、特殊節日而需要修改店鋪的營業狀態時，可以在此處指定日期並調整營業時間，以覆蓋一般營業時間設定。
        </p>
      </header>

      <article>
        <DateRangePicker
          placeholder="請選擇日期"
          startMonth={new Date()}
          endMonth={new Date()}
          selected={selected}
          onSelect={setSelected}
          handleValueReset={() => setSelected("")}
        />

        <ControlledSwitch
          control={control}
          items={[{ name: "open", label1: "公休", label2: "營業" }]}
        />
        <Time>
          <ControlledTimeSelect control={control} name="startTime" />
          <AiOutlineMinus size={18} />
          <ControlledTimeSelect control={control} name="endTime" />
          <button>
            <GoTrash size={18} />
          </button>
        </Time>
        <button>新增時段</button>
      </article>
    </SettingSection>
  );
}

export default SpecialBusinessHours;
