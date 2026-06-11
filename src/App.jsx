import { useEffect, useState } from "react";
import "./App.css";

import WalletCard from "./components/WalletCard";
import AddIncomeModal from "./components/AddIncomeModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import TopExpenses from "./components/TopExpenses";

function App() {
  const [walletBalance, setWalletBalance] = useState(
    Number(localStorage.getItem("walletBalance")) || 5000,
  );

  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || [],
  );

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const totalExpense = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0,
  );

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (amount) => {
    setWalletBalance((prev) => prev + Number(amount));
  };

  const addExpense = (expense) => {
    if (Number(expense.amount) > walletBalance) {
      alert("Insufficient wallet balance!");
      return false;
    }

    setWalletBalance((prev) => prev - Number(expense.amount));

    setExpenses([
      {
        id: Date.now(),
        ...expense,
      },
      ...expenses,
    ]);

    return true;
  };

  const deleteExpense = (id) => {
    const item = expenses.find((exp) => exp.id === id);

    if (!item) return;

    setWalletBalance((prev) => prev + Number(item.amount));

    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const editExpense = (updatedExpense) => {
    const oldExpense = expenses.find((exp) => exp.id === updatedExpense.id);

    if (!oldExpense) return;

    const balanceAfterRefund = walletBalance + Number(oldExpense.amount);

    if (Number(updatedExpense.amount) > balanceAfterRefund) {
      alert("Insufficient wallet balance!");
      return;
    }

    setWalletBalance(balanceAfterRefund - Number(updatedExpense.amount));

    setExpenses(
      expenses.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp,
      ),
    );
  };

  return (
    <div className="app">
      <h1 className="heading">Expense Tracker</h1>

      <div className="top-section">
        <WalletCard
          title="Wallet Balance"
          amount={walletBalance}
          btnText="+ Add Income"
          type="income"
          onClick={() => setShowIncomeModal(true)}
        />

        <WalletCard
          title="Expenses"
          amount={totalExpense}
          btnText="+ Add Expense"
          type="expense"
          onClick={() => setShowExpenseModal(true)}
        />

        <ExpenseSummary expenses={expenses} />
      </div>

      <div className="bottom-section">
        <div className="transactions">
          <h2>Recent Transactions</h2>

          <ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
          />
        </div>

        <div className="top-expenses">
          <h2>Top Expenses</h2>

          <TopExpenses expenses={expenses} />
        </div>
      </div>

      <AddIncomeModal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        addIncome={addIncome}
      />

      <AddExpenseModal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        addExpense={addExpense}
      />
    </div>
  );
}

export default App;
