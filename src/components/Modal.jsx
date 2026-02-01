import React, { useState, useEffect } from "react";
import { FaTimes, FaExchangeAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify"; 
import API from "../utils/axiosConfig";

const Modal = ({
  showModal,
  setShowModal,
  editable,
  setEditable,
  refreshData,
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("expense");

  // Form State
  const [values, setValues] = useState({
    description: "",
    amount: "",
    category: "Food",
    division: "Personal",
    account: "Cash",
    fromAccount: "Bank",
    toAccount: "Cash",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editable) {
      setActiveTab(editable.type);
      setValues({
        description: editable.description,
        amount: editable.amount,
        category: editable.category,
        division: editable.division,
        account: editable.account || "Cash",
        date: new Date(editable.date).toISOString().split("T")[0],
        fromAccount: "Bank",
        toAccount: "Cash",
      });
    }
  }, [editable]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === "transfer") {
        await API.post("/add-transfer", { ...values, userid: "test_user" });
        toast.success("Transfer Successful! 💸");
      } else if (editable) {
        await API.post("/edit-transaction", {
          payload: { ...values, type: activeTab, userid: "test_user" },
          transactionId: editable._id,
        });
        toast.success("Transaction Updated! ✏️");
      } else {
        await API.post("/add-transaction", {
          ...values,
          type: activeTab,
          userid: "test_user",
        });
        toast.success("Transaction Added! 🎉");
      }

      handleClose();
      refreshData();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Error processing request");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditable(null);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl w-[450px] overflow-hidden m-4"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-between items-center p-5 bg-gradient-to-r from-sky-800 to-sky-900 text-white">
              <h2 className="text-xl font-bold tracking-wide">
                {editable ? "Edit Record" : "New Transaction"}
              </h2>
              <button
                onClick={handleClose}
                className="text-white hover:text-red-400 transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="flex bg-gray-100 p-1 mx-4 mt-4 rounded-lg">
              {["expense", "income", "transfer"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? tab === "expense"
                        ? "bg-red-600 text-white shadow"
                        : tab === "income"
                        ? "bg-green-500 text-white shadow"
                        : "bg-blue-500 text-white shadow"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              {activeTab === "transfer" ? (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                      From
                    </label>
                    <select
                      name="fromAccount"
                      value={values.fromAccount}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Bank">Bank</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-6 text-gray-400">
                    <FaExchangeAlt />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                      To
                    </label>
                    <select
                      name="toAccount"
                      value={values.toAccount}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Bank">Bank</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                    Account
                  </label>
                  <select
                    name="account"
                    value={values.account}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="₹"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {activeTab !== "transfer" && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Food">Food</option>
                      <option value="Fuel">Fuel</option>
                      <option value="Movie">Movie</option>
                      <option value="Medical">Medical</option>
                      <option value="Salary">Salary</option>
                      <option value="Loan">Loan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                      Division
                    </label>
                    <select
                      name="division"
                      value={values.division}
                      onChange={handleChange}
                      className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Personal">Personal</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Dinner, Salary"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-bold transition transform hover:scale-[1.02] shadow-md ${
                  activeTab === "expense"
                    ? "bg-red-500 hover:bg-red-600"
                    : activeTab === "income"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading
                  ? "Processing..."
                  : editable
                  ? "UPDATE TRANSACTION"
                  : "SAVE TRANSACTION"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
