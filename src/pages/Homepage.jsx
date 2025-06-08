import { useState } from "react";
import PageHeader from "../ui/PageHeader";

import styled from "styled-components";
import CustomBarChart from "../features/homepage/CategoryBarChart";
import PopularHoursChart from "../features/homepage/PopularHoursChart";
import { TbEdit, TbTrashX } from "react-icons/tb";
import OrderRow from "../features/orders/OrderRow";
import { formatPickupNumber } from "../utils/orderHelpers";
import Tag from "../ui/Tag";
import StyledOverlayScrollbars from "../ui/StyledOverlayScrollbars";
import OrderStatsChart from "../features/homepage/OrderStatsChart";
import SalesCategoryPieChart from "../features/homepage/SalesCategoryPieChart ";

const Container = styled.div`
  display: grid;

  /* grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr)); */
  grid-template-columns: 1fr 1fr;
  /* grid-template-columns: 28rem; */
  grid-template-rows: 30rem;
  gap: 3.2rem;
  /* background-color: #fff; */
`;

const sampleData = [
  { category: "漢堡", count: 120 },
  { category: "吐司", count: 90 },
  { category: "飲料", count: 150 },
  { category: "炸物", count: 60 },
  { category: "沙拉", count: 40 },
  { category: "甜點", count: 30 },
  { category: "套餐", count: 20 },
];

function Homepage() {
  return (
    <>
      <PageHeader title="營運總覽"></PageHeader>

      <Container>
        <CustomBarChart />
        <PopularHoursChart />
        <OrderStatsChart />
        <SalesCategoryPieChart data={sampleData} />
      </Container>
    </>
  );
}

export default Homepage;
