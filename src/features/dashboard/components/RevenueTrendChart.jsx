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
import Price from "../../../components/Price";
import { focusRingStyles } from "../../../style/helpers.js";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5.2rem var(--space-6) var(--space-7) var(--space-3);

  & [tabindex="0"]:focus-visible {
    ${focusRingStyles}
  }
`;

const TooltipContainer = styled.div`
  min-width: 15rem;
  padding: var(--space-3) var(--space-3-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-tooltip);
`;

const TooltipDate = styled.p`
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
`;

const TooltipRevenue = styled.p`
  color: var(--color-text-strong);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);

  span {
    color: var(--color-brand);
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
        總營收 <Price value={item.revenue} />
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
    <SectionContainer
      headerPlacement="inside"
      title="一週營收變化"
      icon={<ChartNoAxesCombined />}
    >
      <Wrapper>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dailyRevenue}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand)"
                  stopOpacity={0.22}
                />

                <stop
                  offset="100%"
                  stopColor="var(--color-brand)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="var(--color-surface-subtle)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatDateLabel}
              interval="equidistantPreserveEnd"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-placeholder)", fontSize: 12 }}
              tickMargin={8}
              padding={{ right: 12 }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={45}
              tick={{ fill: "var(--color-text-placeholder)", fontSize: 12 }}
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
              cursor={{
                stroke: "var(--color-border-strong)",
                strokeDasharray: "3 3",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-brand)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={{
                r: 3,
                fill: "var(--color-surface)",
                stroke: "var(--color-brand)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "var(--color-brand)",
                stroke: "var(--color-surface)",
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
