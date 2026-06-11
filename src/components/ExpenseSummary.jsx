import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#A000FF", // Entertainment
  "#FF9304", // Food
  "#FDE006", // Travel
];

const ExpenseSummary = ({ expenses }) => {
  const categoryMap = {};

  expenses.forEach((expense) => {
    const category = expense.category;

    categoryMap[category] =
      (categoryMap[category] || 0) + Number(expense.amount);
  });

  const chartData = Object.keys(categoryMap).map((category) => ({
    name: category,
    value: categoryMap[category],
  }));

  if (chartData.length === 0) {
    return (
      <div className="chart-card">
        <h3>No Expense Data</h3>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseSummary;
