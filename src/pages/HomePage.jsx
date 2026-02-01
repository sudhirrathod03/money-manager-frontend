import React, { useState, useEffect } from "react";
import { FaPlus, FaList, FaChartPie } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // Import Toast
import Header from "../components/Header";
import Modal from "../components/Modal";
import TransactionTable from "../components/TransactionTable";
import Analytics from "../components/Analytics";
import Welcome from "../components/Welcome";
import API from "../utils/axiosConfig";

const HomePage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [editable, setEditable] = useState(null);

  // Filters
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [division, setDivision] = useState("all");
  const [category, setCategory] = useState("all");
  const [account, setAccount] = useState("all");
  const [selectedDate, setSelectedDate] = useState([]);
  const [viewData, setViewData] = useState("table");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await API.post("/get-transaction", {
        userid: "test_user",
        frequency,
        selectedDate: frequency === "custom" ? selectedDate : [],
        type,
        division,
        category,
        account,
      });
      setAllTransaction(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showIntro) fetchTransactions();
  }, [frequency, type, division, category, account, selectedDate, showIntro]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await API.post("/delete-transaction", { transactionId: record._id });
      toast.success("Transaction Deleted! 🗑️"); // SUCCESS TOAST
      fetchTransactions();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete transaction"); // ERROR TOAST
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditable(record);
    setShowModal(true);
  };

  if (showIntro) return <Welcome onComplete={() => setShowIntro(false)} />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto mt-6 p-4"
      >
        {/* --- FILTER BAR --- */}
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100 flex flex-wrap justify-between items-end gap-4 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Filters */}
            {[
              {
                label: "Frequency",
                val: frequency,
                set: setFrequency,
                opts: [
                  { v: "7", l: "Week" },
                  { v: "30", l: "Month" },
                  { v: "365", l: "Year" },
                  { v: "custom", l: "Custom" },
                ],
              },
              {
                label: "Type",
                val: type,
                set: setType,
                opts: [
                  { v: "all", l: "All" },
                  { v: "income", l: "Income" },
                  { v: "expense", l: "Expense" },
                ],
              },
              {
                label: "Account",
                val: account,
                set: setAccount,
                opts: [
                  { v: "all", l: "All" },
                  { v: "Cash", l: "Cash" },
                  { v: "Bank", l: "Bank" },
                  { v: "UPI", l: "UPI" },
                ],
              },
            ].map((f, i) => (
              <div key={i} className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1">
                  {f.label}
                </label>
                <select
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  className="border-gray-200 border cursor-pointer rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {f.opts.map((o) => (
                    <option key={o.v} value={o.v}>
                      {o.l}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Custom Date */}
            {frequency === "custom" && (
              <div className="flex gap-2 border p-1 rounded-lg bg-gray-50">
                <input
                  type="date"
                  onChange={(e) =>
                    setSelectedDate([e.target.value, selectedDate[1]])
                  }
                  className="bg-transparent text-sm p-1 outline-none"
                />
                <input
                  type="date"
                  onChange={(e) =>
                    setSelectedDate([selectedDate[0], e.target.value])
                  }
                  className="bg-transparent text-sm p-1 outline-none"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setViewData("table")}
                className={`p-2 rounded-md cursor-pointer transition ${
                  viewData === "table"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <FaList />
              </button>
              <button
                onClick={() => setViewData("analytics")}
                className={`p-2 rounded-md cursor-pointer transition ${
                  viewData === "analytics"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-500"
                }`}
              >
                <FaChartPie />
              </button>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-700 hover:bg-green-600 cursor-pointer text-white px-5 py-2 rounded-lg shadow-lg shadow-black-200 font-semibold flex items-center gap-2 transition transform hover:-translate-y-1"
            >
              <FaPlus /> Add Transaction
            </button>
          </div>
        </div>

        {/* --- CONTENT --- */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading your data...
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {viewData === "table" ? (
              <TransactionTable
                transactions={allTransaction}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ) : (
              <Analytics transactions={allTransaction} />
            )}
          </motion.div>
        )}
      </motion.div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        editable={editable}
        setEditable={setEditable}
        refreshData={fetchTransactions}
      />
    </div>
  );
};

export default HomePage;