import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetExpense from "./GetExpense";
const { VITE_BACKEND_URL } = import.meta.env;

export default function Form({setExp}) {

  const [isLoading, setIsLoading] = useState(false);


  let notify = () =>
    toast.warn(
      errors.Expense_name?.message ||
        errors.Category?.message ||
        errors.Amount?.message ||
        errors.Date?.message
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

  const handleInput = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_BACKEND_URL}/createExpense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setExp(data);
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      toast.error(error.message);

    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2 p-10 ml-48">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3  mb-5 py-2 px-5  border-solid border-white bg-white  border-2 ">
          <input
            className="text-xl text-black border-none outline-none  "
            placeholder="Enter Expense name"
            type="text"
            {...register("Expense_name", {
              required: "Expense name is required",
            })}
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-3  mb-5 py-2 px-5  border-solid border-white bg-white  border-2 ">
          <select 
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
            {...register("Amount", { required: "Amount is required" })}
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-3  mb-5 py-2 px-5  border-solid border-white bg-white  border-2 ">
          <input
            className="text-xl text-black border-none outline-none"
            type="date"
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
