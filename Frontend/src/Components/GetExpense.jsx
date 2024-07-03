import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
const { VITE_BACKEND_URL } = import.meta.env;
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function GetExpense({ exp, setExp }) {
  const [Expense, setExpense] = useState([]);
  const [ExpenseDup, setExpenseDup] = useState([]);

  const initialFormValues = {
    Category: "",
    month: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleCategoryChange = (e) => {
    setFormValues({ ...formValues, Category: e.target.value });
  };

  useEffect(() => {
    setExpense(ExpenseDup);

    if (formValues.Category) {
      const filteredByCategory = ExpenseDup.filter(
        (ex) => ex.Category === formValues.Category
      );
      setExpense(filteredByCategory);
    }

    if (formValues.month) {
      const filteredByMonth = Expense.filter((ex) => {
        const expenseDate = new Date(ex.Date);
        const selectedMonth = formValues.month;
        return expenseDate.toISOString().startsWith(selectedMonth);
      });
      setExpense(filteredByMonth);
    }
  }, [formValues]);

  const handleMonthChange = (e) => {
    setFormValues({ ...formValues, month: e.target.value });
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
    setExpense(ExpenseDup);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/getExpense`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setExpense(result.data);
        setExpenseDup(result.data);
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [exp]);

  const deleteExpense = async (Id) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/deleteExpense/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setExp((exp) => Object.values(exp).filter((e) => e._id !== Id));
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form id="myForm" onSubmit={handleFormSubmit} className="flex gap-8">
        <select value={formValues.Category} onChange={handleCategoryChange}>
          <option value="" defaultValue>
            Select a category
          </option>
          <option value="Investment">Investment</option>
          <option value="Expense">Expense</option>
          <option value="Savings">Savings</option>
        </select>
        <div className="flex gap-3 py-2 px-3 w-1/6 border-solid border-white bg-white  border-2 ">
          <input
            className="text-xl text-black border-none outline-none "
            type="month"
            value={formValues.month}
            onChange={handleMonthChange}
            placeholder="select a month"
          />
        </div>
        <button
          className="bg-blue-500 border-2 border-solid px-2 my-2 border-black"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
      <div className="mt-5">
        <table className="table-auto border-collapse border-black border-2">
          <thead>
            <tr>
              <th className="border-black border-2 p-2 ">S.No.</th>
              <th className="border-black border-2 p-2 ">Expense_Name</th>
              <th className="border-black border-2 p-2 ">Category</th>
              <th className="border-black border-2 p-2 ">Amount</th>
              <th className="border-black border-2 p-2 ">Date</th>
              <th className="border-black border-2 p-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Expense && Expense.length > 0 ? (
              Expense.map((e, index) => {
                const isoFormattedDate = new Date(e.Date)
                  .toISOString()
                  .substring(0, 10);
                return (
                  <tr key={index}>
                    <td className="border-black border-2 p-2 ">{index + 1}</td>
                    <td className="border-black border-2 p-2 ">
                      {e.Expense_name}
                    </td>
                    <td className="border-black border-2 p-2 ">{e.Category}</td>
                    <td className="border-black border-2 p-2 ">{e.Amount}</td>
                    <td className="border-black border-2 p-2 ">
                      {isoFormattedDate}
                    </td>
                    <td className="flex">
                      <Link to={`/update/${e._id}`} type="button">
                        <Pencil color="blue" className="mt-1 ml-1" />
                      </Link>
                      <button
                        onClick={() => deleteExpense(e._id)}
                        type="button"
                      >
                        <Trash2 color="blue" className="mt-1 ml-1" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">
                  <h5 className="ml-40">No data found</h5>
                  </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
