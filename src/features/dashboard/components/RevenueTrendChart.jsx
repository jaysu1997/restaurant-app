// ok
import styled from "styled-components";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartNoAxesCombined } from "lucide-react";
import SectionContainer from "../../../components/SectionContainer";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5.2rem 2.4rem 2.8rem 1.2rem;
`;

const TooltipContainer = styled.div`
  min-width: 15rem;
  padding: 1.2rem 1.4rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.8rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const TooltipDate = styled.p`
  color: #6b7280;
  font-size: 1.2rem;
`;

const TooltipRevenue = styled.p`
  color: #111827;
  font-size: 1.4rem;
  font-weight: 600;

  span {
    color: #2563eb;
  }
`;

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <TooltipContainer>
      <TooltipDate>{item.date}</TooltipDate>

      <TooltipRevenue>
        總營收 <span>${item.revenue}</span>
      </TooltipRevenue>
    </TooltipContainer>
  );
}

function formatDateLabel(dateString) {
  const [_, month, day] = dateString.split("-");

  return `${month}/${day}`;
}

function RecentRevenueChart({ dailyRevenue }) {
  return (
    <SectionContainer header="一週營收變化" icon={<ChartNoAxesCombined />}>
      <Wrapper>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dailyRevenue}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.22} />

                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#f3f4f6"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatDateLabel}
              interval="equidistantPreserveEnd"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickMargin={8}
              padding={{ right: 12 }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={45}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                }

                if (value >= 1000) {
                  return `${(value / 1000).toFixed(1)}K`;
                }

                return value;
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#d1d5db", strokeDasharray: "3 3" }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={{
                r: 3,
                fill: "#fff",
                stroke: "#2563eb",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#2563eb",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Wrapper>
    </SectionContainer>
  );
}

export default RecentRevenueChart;
