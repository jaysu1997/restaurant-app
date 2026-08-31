// ok
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

const TooltipTime = styled.p`
  color: #6b7280;
  font-size: 1.2rem;
`;

const TooltipOrders = styled.p`
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
    <SectionContainer header="今日熱門時段" icon={<AlarmClock />}>
      <Wrapper>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyOrders} barCategoryGap="20%">
            <CartesianGrid
              vertical={false}
              stroke="#f3f4f6"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="label"
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
                        ? "#2563eb"
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
