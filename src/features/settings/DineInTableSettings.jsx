import styled from "styled-components";

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

function DineInTableSettings({ control }) {
  return (
    <SettingSection>
      <header>
        <h3>內用桌號設定</h3>
      </header>
    </SettingSection>
  );
}

export default DineInTableSettings;
