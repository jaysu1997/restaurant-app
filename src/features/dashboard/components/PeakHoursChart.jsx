import styled from "styled-components";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
} from "recharts";
import { AlarmClock } from "lucide-react";
import SectionContainer from "../../../components/SectionContainer";
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

const TooltipTime = styled.p`
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
`;

const TooltipOrders = styled.p`
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
  const time = String(item.hour).padStart(2, "0");

  return (
    <TooltipContainer>
      <TooltipTime>
        {time}:00 - {time}:59
      </TooltipTime>

      <TooltipOrders>
        共建立 <span>{item.totalOrders}</span> 份訂單
      </TooltipOrders>
    </TooltipContainer>
  );
}

function TodayOrderTimeChart({ hourlyOrders }) {
  // 找出單一或多個訂單數最多的巔峰時段
  const peakHours = hourlyOrders.reduce(
    (acc, order, index) => {
      // 發現破紀錄的新高訂單數
      if (order.totalOrders > acc.maxOrders) {
        return { maxOrders: order.totalOrders, hours: [index] };
      }

      // 訂單數與目前紀錄相同，將該時段加入並存陣列
      if (order.totalOrders === acc.maxOrders && order.totalOrders > 0) {
        acc.hours.push(index);
      }

      return acc;
    },
    { maxOrders: 0, hours: [] },
  );

  return (
    <SectionContainer
      headerPlacement="inside"
      title="今日熱門時段"
      icon={<AlarmClock />}
    >
      <Wrapper>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyOrders} barCategoryGap="20%">
            <CartesianGrid
              vertical={false}
              stroke="var(--color-surface-subtle)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="label"
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
              cursor={{ fill: "rgba(37, 99, 235, 0.05)" }}
            />

            <Bar
              dataKey="totalOrders"
              radius={[5, 5, 0, 0]}
              maxBarSize={32}
              shape={(props) => {
                return (
                  <Rectangle
                    {...props}
                    fill={
                      peakHours.hours.includes(props.index)
                        ? "var(--color-brand)"
                        : "#93c5fd"
                    }
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Wrapper>
    </SectionContainer>
  );
}

export default TodayOrderTimeChart;
