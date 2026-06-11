import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "500px",
    height: "260px",
    margin: "auto",
    borderRadius: "12px",
    padding: "25px",
    border: "none",
    background: "#EFEFEF",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
};

const AddExpenseModal = ({ isOpen, onClose, addExpense }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, amount, category, date } = formData;

    if (!title || !amount || !category || !date) {
      return;
    }

    const success = addExpense({
      title,
      amount: Number(amount),
      category,
      date,
    });

    if (success) {
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      <h2 className="modal-title">Add Expenses</h2>

      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Price"
          min="1"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>

          <option value="Food">Food</option>

          <option value="Entertainment">Entertainment</option>

          <option value="Travel">Travel</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit" className="add-expense-btn">
          Add Expense
        </button>

        <button type="button" className="cancel-btn" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
