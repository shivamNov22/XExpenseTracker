import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "450px",
    height: "180px",
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

const AddIncomeModal = ({ isOpen, onClose, addIncome }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return;
    }

    addIncome(amount);

    setAmount("");
    onClose();
  };

  const handleClose = () => {
    setAmount("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      <h2 className="modal-title">Add Balance</h2>

      <form className="modal-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Income Amount"
          value={amount}
          min="1"
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit" className="add-balance-btn">
          Add Balance
        </button>

        <button type="button" className="cancel-btn" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddIncomeModal;
