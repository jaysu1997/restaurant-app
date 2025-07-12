import styled from "styled-components";
import ControlledInput from "../../ui/ControlledInput";
import { useForm } from "react-hook-form";

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

const Info = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr 6rem 1fr 1.8rem 2.2rem;
  grid-auto-rows: 3.8rem;
  gap: 1.2rem;
  align-items: center;

  input {
    border: 1px solid #ccc;
    border-radius: 6px;
  }
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

function StoreInfo() {
  const { register, handleSubmit, reset, control } = useForm();
  return (
    <>
      <Content>
        <header>
          <h3>店鋪資訊設定</h3>
          <p>
            設定店鋪的基本資訊，包含店鋪名稱、地址、聯絡方式、統一編號，部分資訊將可能顯示在前台或訂單頁。
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <article>
            <Info>
              <label>分店名稱</label>
              <ControlledInput control={control} name="amount" />
              <label>連絡電話</label>
              <ControlledInput control={control} name="amount" />
            </Info>
          </article>

          <article>
            <Info>
              <label>店鋪地址</label>
              <ControlledInput control={control} name="amount" />
              <label>統一編號</label>
              <ControlledInput control={control} name="amount" />
            </Info>
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

export default StoreInfo;
