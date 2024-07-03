import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const { VITE_BACKEND_URL } = import.meta.env;

export default function UpdateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [Expense, setExpense] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  let notify = () =>
    toast.warn(
      errors.Expense_name?.message ||
        errors.Category?.message ||
        errors.Amount?.message ||
        errors.Expense_date?.message
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    handleInput(data);
    reset();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/getExpense/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        
        const isoFormattedDate = new Date(result.data.Date)
          .toISOString()
          .substring(0, 10);
        console.log(result.data.Date, isoFormattedDate);
        result.data.Date = isoFormattedDate;
        setExpense(result.data);
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInput = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_BACKEND_URL}/updateExpense/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate("/");
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10  h-screen w-screen justify-center flex">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 mt-10">
      <div className="text-3xl font-extrabold  text-bl text-center non-italic mb-5">Update Expense</div>
        <div className="flex gap-3  mb-5 py-2 px-5  border-solid border-white bg-white  border-2 ">
          <input
            className="text-xl text-black border-none outline-none  "
            placeholder="Enter Expense name"
            type="text"
            value={Expense.Expense_name}
            {...register("Expense_name", {
              required: "Expense name is required",
            })}
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-3  mb-5 py-2 px-5  border-solid border-white bg-white  border-2 ">
          <select
            value={Expense.Category}
            {...register("Category", { required: "Category is required" })}
          >
            <option value="" defaultValue>
              Select a category
            </option>
            <option value="Investment">Investment</option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
        </div>
        <div className="flex gap-3  mb-5 py-2 px-5  border-solid border-white bg-white  border-2 ">
          <input
            className="text-xl text-black border-none outline-none   "
            placeholder="Enter Amount"
            type="number"
            value={Expense.Amount}
            {...register("Amount", { required: "Amount is required" })}
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-3  mb-5 py-2 px-5  border-solid border-white bg-white  border-2 ">
          <input
            className="text-xl text-black border-none outline-none"
            type="date"
            value={Expense.Date}
            {...register("Date", { required: "Date is required" })}
            disabled={isLoading}
          />
        </div>
        <button
          className={`
  w-full
  rounded-xl 
   font-bold hover:text-black py-3 px-4 border hover:border-lime-300 transition duration-500   mt-5 mb-4  ${
     isLoading
       ? "bg-green-400 hover:bg-green-600 text-white"
       : "bg-transparent border-black border-2"
   }`}
          type="submit"
          onClick={notify}
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
