"use client";

import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Completed", value: 78.1 },
  { name: "Pending", value: 16.2 },
  { name: "Cancelled", value: 5.7 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"]; // Tailwind green-500, amber-500, red-500

const OrderStatusChart = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="value"
          label={false}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          formatter={(value: string) => {
            const percentage = data.find((d) => d.name === value)?.value;
            return (
              <span className="text-sm text-gray-700">
                {value} {percentage}%
              </span>
            );
          }}
        />
      </PieChart>
    </div>
  );
};

export default OrderStatusChart;
