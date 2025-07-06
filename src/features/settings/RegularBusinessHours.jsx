import styled from "styled-components";
import ControlledTimeSelect from "../../ui/ControlledTimeSelect";
import { AiOutlineMinus } from "react-icons/ai";
import ControlledSwitch from "../../ui/ControlledSwitch";
import { GoTrash } from "react-icons/go";

const SettingSection = styled.section`
  display: grid;
  grid-template-columns: 32rem 1fr;
  align-items: start;
  padding: 3.2rem;
  font-size: 1.4rem;
  background-color: #fff;
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

function RegularBusinessHours({ control }) {
  return (
    <SettingSection>
      <header>
        <h2>一般營業時間</h2>
        <p>
          設定在非國定假日期間的每週固定營業時間，系統將依此顯示店鋪的營業狀態。
        </p>
      </header>

      <article>
        <label>星期一</label>
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

export default RegularBusinessHours;
