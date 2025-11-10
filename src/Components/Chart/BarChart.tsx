import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Define the structure of each data point in the chart

const Bar_Chart = ({
  monthlyCommission,
}: {
  monthlyCommission: { month: string; totalCommission: number }[];
}) => {
  // Custom tooltip to display the information

  // Custom tick style for X and Y axes
  const tickStyle = { fill: "#000" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={monthlyCommission}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            itemStyle={{ color: "#0a0a08" }}
            labelStyle={{ color: "#202020" }}
            formatter={(value: number): [string, string] => [
              `€${value}`,
              "Earning",
            ]}
            labelFormatter={(label: string) => `Month: ${label}`}
          />
          <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#0861C500", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />
          {/* Add several horizontal black lines using ReferenceLine */}
          <ReferenceLine y={10} stroke="#20202055" />
          <ReferenceLine y={20} stroke="#20202055" />
          <ReferenceLine y={30} stroke="#20202055" />
          <ReferenceLine y={40} stroke="#20202055" />
          <ReferenceLine y={50} stroke="#20202055" />
          <ReferenceLine y={60} stroke="#20202055" />
          <Bar
            dataKey="totalCommission"
            fill="url(#incomeGradient)" // Bar color
            barSize={20} // Width of each bar
            radius={[10, 10, 10, 10]} // Rounded corners for bars
          />

          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#AD2B08" />
              <stop offset="100%" stopColor="#AD2B08" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
