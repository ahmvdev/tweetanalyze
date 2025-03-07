import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { value: 0, versionA: 400, versionB: 240 },
  { value: 198, versionA: 300, versionB: 280 },
  { value: 396, versionA: 500, versionB: 320 },
  { value: 594, versionA: 280, versionB: 580 },
  { value: 792, versionA: 590, versionB: 390 },
  { value: 999, versionA: 350, versionB: 480 },
];

const Card = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const CardHeader = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const ChartContainer = ({ className, config, children }) => (
  <div className={className}>{children}</div>
);

const ChartTooltip = ({ children }) => <div>{children}</div>;

const ChartTooltipContent = ({ className, children }) => (
  <div className={className}>{children}</div>
);

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent className="bg-[#17181C] border border-[#2A2E31] text-[#E7E8E9]">
          <div className="font-bold">{label}</div>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#1E9CF0] rounded-full"></div>
              <span>Version A: {payload[0].value}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00B87A] rounded-full"></div>
              <span>Version B: {payload[1].value}</span>
            </div>
          </div>
        </ChartTooltipContent>
      </ChartTooltip>
    );
  }

  return null;
}

function ChartComparison() {
  return (
    <Card className="bg-[#17181C] rounded-[16px] p-1 mx-1 sm:mx-2">
      <CardHeader className="p-0">
        <div className="flex justify-center sm:justify-start gap-3 mb-3 mt-1 ml-3">
          <div className="flex items-center w-[90px] sm:w-[100px] h-[36px] bg-[#17181C] border border-[#2A2E31] rounded-[8px] overflow-hidden">
            <div className="w-[8px] h-[36px] bg-[#1E9CF0]"></div>
            <span className="text-[#E7E8E9] font-roboto text-[14px] font-bold ml-2">
              Version A
            </span>
          </div>
          <div className="flex items-center w-[90px] sm:w-[100px] h-[36px] bg-[#17181C] border border-[#2A2E31] rounded-[8px] overflow-hidden">
            <div className="w-[8px] h-[36px] bg-[#00B87A]"></div>
            <span className="text-[#E7E8E9] font-roboto text-[14px] font-bold ml-2">
              Version B
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[180px] sm:h-[200px]">
          <ChartContainer
            className="h-full"
            config={{
              theme: {
                colors: {
                  versionA: "#1E9CF0",
                  versionB: "#00B87A",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="colorVersionA"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#1E9CF0" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1E9CF0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorVersionB"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00B87A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00B87A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2E31" />
                <XAxis
                  dataKey="value"
                  stroke="#E7E8E9"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#2A2E31" }}
                />
                <YAxis
                  stroke="#E7E8E9"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#2A2E31" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="versionA"
                  stroke="#1E9CF0"
                  fillOpacity={1}
                  fill="url(#colorVersionA)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="versionB"
                  stroke="#00B87A"
                  fillOpacity={1}
                  fill="url(#colorVersionB)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChartComparison;
