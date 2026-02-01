import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion"; 

const TransactionTable = ({ transactions, handleEdit, handleDelete }) => {
  // Animation variants for the container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-2xl border border-gray-100">
      <h3 className="font-bold text-lg mb-4 text-gray-700">
        Recent Transactions ({transactions.length}){" "}
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-4 rounded-tl-lg">Date</th>
              <th className="p-4">Title</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Category</th>
              <th className="p-4">Account</th>
              <th className="p-4">Division</th>
              <th className="p-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>

          <motion.tbody variants={container} initial="hidden" animate="show">
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <motion.tr
                  key={txn._id}
                  variants={item} // Apply item animation
                  className="border-b hover:bg-blue-50 transition-colors text-sm group"
                >
                  <td className="p-4 text-gray-600">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-semibold text-gray-800">
                    {txn.description}
                  </td>
                  <td
                    className={`p-4 font-bold ${
                      txn.type === "income" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {txn.type === "income" ? "+" : "-"} ₹{txn.amount}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      {txn.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{txn.account}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        txn.division === "Office"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {txn.division}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(txn)}
                      className="text-blue-500 hover:text-blue-700 hover:scale-110 cursor-pointer transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(txn)}
                      className="text-red-400 hover:text-red-600 hover:scale-110 cursor-pointer transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-8 text-gray-400 italic"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
