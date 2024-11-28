import styled from "styled-components";
import Heading from "../ui/Heading";
import SearchField from "../ui/SearchField";
import UpsertButton from "../ui/UpsertButton";

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
`;

function Inventory() {
  //  備料的部分需要注意可能會和新增餐點時設定的名字不同，或許之後要在新增餐點時設定驗證
  return (
    <>
      <Heading>備料管理</Heading>

      <ToolBar>
        <UpsertButton></UpsertButton>
        <SearchField />
      </ToolBar>
    </>
  );
}

export default Inventory;
