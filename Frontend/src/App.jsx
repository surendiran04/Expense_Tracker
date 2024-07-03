import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Components/Home";
import UpdateForm from "./Components/UpdateForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-screen gap-10 bg-gray-200 flex">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/update/:id" element={<UpdateForm />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
}

export default App;
