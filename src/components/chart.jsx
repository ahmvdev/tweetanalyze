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
  { value: 0, versionA: 0, versionB: 0 },
  { value: 198, versionA: 220, versionB: 180 },
  { value: 396, versionA: 410, versionB: 350 },
  { value: 594, versionA: 590, versionB: 620 },
  { value: 792, versionA: 800, versionB: 850 },
  { value: 999, versionA: 950, versionB: 980 },
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

const ChartContainer = ({ className, children }) => (
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
        <ChartTooltipContent className="bg-[#17181C] border border-gray-700 text-gray-100 p-2 rounded">
          <div className="font-bold">{label}</div>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Version A: {payload[0].value}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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
    <Card className="bg-[#17181C] rounded-xl p-1 mx-1 sm:mx-2">
      <CardHeader className="p-0">
        <div className="flex justify-center sm:justify-start gap-3 mb-3 mt-1 ml-3">
          <div className="flex items-center w-24 sm:w-28 h-9 bg-[#17181C] border border-gray-700 rounded-lg overflow-hidden">
            <div className="w-2 h-9 bg-blue-500"></div>
            <span className="text-gray-100 font-medium text-sm ml-2">
              Version A
            </span>
          </div>
          <div className="flex items-center w-24 sm:w-28 h-9 bg-[#17181C] border border-gray-700 rounded-lg overflow-hidden">
            <div className="w-2 h-9 bg-green-500"></div>
            <span className="text-gray-100 font-medium text-sm ml-2">
              Version B
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-48 sm:h-52">
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
