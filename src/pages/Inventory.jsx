import styled from "styled-components";
import Heading from "../ui/Heading";
import SearchField from "../ui/SearchField";
import { useState } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";
import Button from "../ui/Button";

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
`;

function Inventory() {
  //  備料的部分需要注意可能會和新增餐點時設定的名字不同，或許之後要在新增餐點時設定驗證
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Heading>備料管理</Heading>

      <ToolBar>
        <SearchField />
        <Button $buttonStyle="upsert" onClick={() => setOpenModal(true)}>
          <BsFileEarmarkPlus />
          <span>新增數據</span>
        </Button>
      </ToolBar>
    </>
  );
}

export default Inventory;
