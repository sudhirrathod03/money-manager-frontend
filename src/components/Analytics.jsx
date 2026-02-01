import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const Analytics = ({ transactions }) => {


  // Totals
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (t) => t.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (t) => t.type === "expense"
  );

  const totalIncomePercent =
    totalTransactions === 0
      ? 0
      : (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpensePercent =
    totalTransactions === 0
      ? 0
      : (totalExpenseTransactions.length / totalTransactions) * 100;

  const totalTurnover = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalIncomeTurnover = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenseTurnover = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncomeTurnoverPercent =
    totalTurnover === 0 ? 0 : (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    totalTurnover === 0 ? 0 : (totalExpenseTurnover / totalTurnover) * 100;

  const categories = [
    "Food",
    "Fuel",
    "Movie",
    "Medical",
    "Loan",
    "Salary",
    "Other",
  ];
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
    "#8884d8",
  ];

  // Data for Charts
  const expenseCategoryData = categories
    .map((cat) => {
      const value = transactions
        .filter((t) => t.type === "expense" && t.category === cat)
        .reduce((acc, t) => acc + t.amount, 0);
      return { name: cat, value };
    })
    .filter((item) => item.value > 0);

  const barChartData = [
    { name: "Income", amount: totalIncomeTurnover, fill: "#10B981" }, // green
    { name: "Expense", amount: totalExpenseTurnover, fill: "#EF4444" }, // red
  ];

  return (
    <motion.div
      className="p-4 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-9xl font-bold text-blue-500">#</span>
          </div>
          <div className="relative z-10">
            <h4 className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-2">
              Total Transactions
            </h4>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
              {totalTransactions}
            </h2>

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-600 font-bold">Income</span>
                  <span className="text-gray-500">
                    {totalIncomeTransactions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalIncomePercent}%` }}
                    className="bg-emerald-500 h-2 rounded-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-rose-600 font-bold">Expense</span>
                  <span className="text-gray-500">
                    {totalExpenseTransactions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalExpensePercent}%` }}
                    className="bg-rose-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-9xl font-bold text-yellow-500">₹</span>
          </div>
          <div className="relative z-10">
            <h4 className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-2">
              Net Balance
            </h4>
            <h2
              className={`text-3xl font-extrabold mb-4 ${
                totalIncomeTurnover - totalExpenseTurnover > 0
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              ₹{totalIncomeTurnover - totalExpenseTurnover}
            </h2>

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-600 font-bold">Income</span>
                  <span className="text-gray-500">₹{totalIncomeTurnover}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalIncomeTurnoverPercent}%` }}
                    className="bg-emerald-500 h-2 rounded-full"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-rose-600 font-bold">Expense</span>
                  <span className="text-gray-500">₹{totalExpenseTurnover}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalExpenseTurnoverPercent}%` }}
                    className="bg-rose-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
        >
          <h4 className="text-lg font-bold text-slate-700 mb-6">
            Expense Distribution
          </h4>
          <div className="h-64">
            {expenseCategoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 italic">
                No expenses to display
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
        >
          <h4 className="text-lg font-bold text-slate-700 mb-6">
            Financial Overview
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#F3F4F6" }} />
                <Bar dataKey="amount" radius={[10, 10, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h4 className="text-lg font-bold mb-4 text-emerald-700">
            Income Sources
          </h4>
          {categories.map((cat) => {
            const amount = transactions
              .filter((t) => t.type === "income" && t.category === cat)
              .reduce((acc, t) => acc + t.amount, 0);
            return (
              amount > 0 && (
                <div key={cat} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-600">{cat}</span>
                    <span className="font-bold text-gray-800">₹{amount}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(amount / totalIncomeTurnover) * 100}%`,
                      }}
                      transition={{ duration: 1 }}
                      className="bg-emerald-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>


        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
          <h4 className="text-lg font-bold mb-4 text-rose-700">
            Expense Breakdown
          </h4>
          {categories.map((cat) => {
            const amount = transactions
              .filter((t) => t.type === "expense" && t.category === cat)
              .reduce((acc, t) => acc + t.amount, 0);
            return (
              amount > 0 && (
                <div key={cat} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-600">{cat}</span>
                    <span className="font-bold text-gray-800">₹{amount}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(amount / totalExpenseTurnover) * 100}%`,
                      }}
                      transition={{ duration: 1 }}
                      className="bg-rose-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
