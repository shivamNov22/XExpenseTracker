import React from "react";

const WalletCard = ({ title, amount, btnText, type, onClick }) => {
  return (
    <div className="wallet-card">
      <h3>
        {title}:{" "}
        <span
          className={type === "income" ? "wallet-amount" : "expense-amount"}
        >
          ₹{amount}
        </span>
      </h3>

      <button
        className={type === "income" ? "income-btn" : "expense-btn"}
        onClick={onClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default WalletCard;
