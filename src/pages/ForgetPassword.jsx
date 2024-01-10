import React from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div className="  bg-primary w-100 h-screen flex justify-center items-center">
      <div className="w-[400px]  bg-white p-4 rounded-bl-2xl">
        <h1 className="text-2xl font-medium font-poppins text-secandary mb-3">
          Reset Password{" "}
        </h1>
        <input
          className="w-[350px] h-[80px] px-9  border border-1 border-solid border-secandary "
          placeholder="Enter Your Email"
        />
        <button className=" py-3 px-4 bg-primary text-white rounded-lg font-poppins mt-3 ">
          Submit
        </button>
        <Link
          to="/login"
          className=" py-3 px-4 bg-red-500 text-white rounded-lg font-poppins mt-3  ml-3"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
