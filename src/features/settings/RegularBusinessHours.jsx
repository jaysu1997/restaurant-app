import styled from "styled-components";
import ControlledTimeSelect from "../../ui/ControlledTimeSelect";
import { AiOutlineMinus } from "react-icons/ai";
import ControlledSwitch from "../../ui/ControlledSwitch";
import { GoTrash, GoPlus } from "react-icons/go";

const Content = styled.section`
  display: grid;
  grid-template-columns: 32rem 1fr;
  padding: 3.2rem;
  column-gap: 4rem;
  row-gap: 2rem;
  font-size: 1.4rem;

  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    font-size: 2rem;
  }

  p {
    color: #797f87;
  }

  article {
    grid-column: 2;
    display: grid;
    grid-template-columns: 25rem 8.2rem 1fr auto;
    gap: 2rem;
    align-items: center;
    font-size: 1.4rem;
  }

  button {
    font-size: 1.4rem;
  }
`;

const Time = styled.div`
  grid-column: 3 / 4;
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) 2rem minmax(12rem, 1fr) 2rem;
  grid-auto-rows: 3.8rem;
  align-items: center;
  gap: 2rem;
`;

const Footer = styled.footer`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  border-top: 1px solid #dfdfdf;
  padding: 1.6rem 3.2rem;

  button {
    font-size: 1.4rem;
  }
`;

function RegularBusinessHours({ control }) {
  return (
    <>
      <Content>
        <header>
          <h2>一般營業時間</h2>
          <p>
            設定在非國定假日期間的每週固定營業時間，系統將依此顯示店鋪的營業狀態。
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
            <button>
              <GoPlus size={22} />
            </button>
          </article>

          <article>
            <label>星期二</label>
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

            <button>
              <GoPlus size={22} />
            </button>
          </article>
        </div>
      </Content>
      <Footer>
        <button>儲存</button>
        <button>取消</button>
      </Footer>
    </>
  );
}

export default RegularBusinessHours;
