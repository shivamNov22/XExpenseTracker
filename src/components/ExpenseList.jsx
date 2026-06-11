import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const startEdit = (expense) => {
    setEditingId(expense.id);

    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  const saveEdit = (id) => {
    editExpense({
      id,
      ...editData,
      amount: Number(editData.amount),
    });

    setEditingId(null);
  };

  if (expenses.length === 0) {
    return <div className="empty-expenses">No expenses added yet.</div>;
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          {editingId === expense.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={editData.amount}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    amount: e.target.value,
                  })
                }
              />

              <select
                value={editData.category}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    category: e.target.value,
                  })
                }
              >
                <option value="Food">Food</option>

                <option value="Entertainment">Entertainment</option>

                <option value="Travel">Travel</option>
              </select>

              <input
                type="date"
                value={editData.date}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    date: e.target.value,
                  })
                }
              />

              <button className="save-btn" onClick={() => saveEdit(expense.id)}>
                Save
              </button>
            </div>
          ) : (
            <>
              <div className="expense-info">
                <div>
                  <h4>{expense.title}</h4>

                  <p>
                    {new Date(expense.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="expense-right">
                  <span className="expense-price">₹{expense.amount}</span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    <FaTrash />
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => startEdit(expense)}
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>

              <hr />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
