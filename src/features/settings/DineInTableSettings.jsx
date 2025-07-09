import styled from "styled-components";
import ControlledInput from "../../ui/ControlledInput";
import { GoTrash, GoPlus } from "react-icons/go";

const Content = styled.section`
  display: grid;
  grid-template-columns: 32rem 1fr;
  padding: 3.2rem;
  font-size: 1.4rem;
  column-gap: 4rem;
  row-gap: 2rem;

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
    grid-template-columns: 1fr;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
  }

  button {
    font-size: 1.4rem;
  }
`;

const DineInTable = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr 6rem 1fr 1.8rem 2.2rem;
  grid-auto-rows: 3.8rem;
  gap: 2rem;
  align-items: center;

  input {
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

const Preview = styled.div`
  grid-column: 2 / -3;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.8rem;
`;

const Footer = styled.footer`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  border-top: 1px solid #dfdfdf;
  padding: 1.6rem 3.2rem;

  button {
    font-size: 1.4rem;
  }
`;

function DineInTableSettings({ control }) {
  return (
    <>
      <Content>
        <header>
          <h3>內用桌號設定</h3>
          <p>設定內用餐桌的區域分類與桌號配置，用於點餐時標記內用桌位。</p>
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <article>
            <DineInTable>
              <label>分區名稱</label>
              <ControlledInput control={control} name="area" />

              <label>桌號數量</label>
              <ControlledInput control={control} name="amount" />
              <button>
                <GoTrash size={18} />
              </button>
              <div></div>

              <label>分區預覽</label>
              <Preview>66666</Preview>
            </DineInTable>
          </article>
          <article>
            <DineInTable>
              <label>分區名稱</label>
              <ControlledInput control={control} name="area" />

              <label>桌號數量</label>
              <ControlledInput control={control} name="amount" />
              <button>
                <GoTrash size={18} />
              </button>

              <div></div>
              <label>分區預覽</label>
              <Preview>66666</Preview>
            </DineInTable>
          </article>

          <button
            style={{
              justifySelf: "start",
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            新增分區
            <GoPlus size={18} />
          </button>
        </div>
      </Content>
      <Footer>
        <button>儲存</button>
        <button>取消</button>
      </Footer>
    </>
  );
}

export default DineInTableSettings;
