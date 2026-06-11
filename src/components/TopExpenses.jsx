import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const TopExpenses = ({ expenses }) => {
  const categoryMap = {};

  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) + Number(expense.amount);
  });

  const data = Object.keys(categoryMap)
    .map((category) => ({
      category,
      amount: categoryMap[category],
    }))
    .sort((a, b) => b.amount - a.amount);

  if (data.length === 0) {
    return (
      <div className="top-expense-card">
        <h3>No Expense Data</h3>
      </div>
    );
  }

  return (
    <div className="top-expense-card">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis type="number" />

          <YAxis type="category" dataKey="category" width={100} />

          <Tooltip />

          <Bar dataKey="amount" radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenses;
