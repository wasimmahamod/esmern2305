import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdEyeOff } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";

const Login = () => {
  let dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const auth = getAuth();
  let [email, setEmail] = useState("");
  let [error, setError] = useState("");
  let [password, setPassword] = useState("");
  let [passwordShow, setPasswordShow] = useState(false);
  let [forgetModal, setForgetModal] = useState(false);
  let [forgetEmail, setForgetEmail] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleSubmit = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          dispatch(userLoginInfo(user.user));
          localStorage.setItem("userInfo", JSON.stringify(user.user));
          setError("");
          console.log("success");
          toast.success("Login Successfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code.includes("auth/invalid-credential")) {
            setError("Something is wrong");
          }
        });
    }
  };

  let handleForgetPassword = () => {
    setForgetModal(true);
  };

  let handleForgetInput = (e) => {
    setForgetEmail(e.target.value);
  };
  let handleRestMail = () => {
    sendPasswordResetEmail(auth, forgetEmail)
      .then((user) => {
        setForgetModal(false);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  let handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <div className="flex">
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
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="w-2/4 flex justify-end	">
        <div className="mr-[69px] mt-[225px]">
          <h1 className="font-poppins text-[36px] font-bold  text-secandary mb-3">
            Login to your account!
          </h1>
          <button
            onClick={handleGoogleLogin}
            className="flex gap-3  font-semibold text-sm rounded-xl border border-solid p-[23px]  "
          >
            <img src="images/google.png" alt="google" />
            <span>Login with Google</span>
          </button>
          <div className="mt-[37px] relative  ">
            <p className="font-poppins bg-red-500 text-sm font-semibold text-secandary tracking-[8%] absolute top-[-10px] left-8 bg-white px-2 ">
              Email Address
            </p>
            <input
              onChange={handleEmail}
              className="w-[368px] h-[80px] px-9  border-b border-1 border-solid border-secandary "
              type="email"
            />
          </div>

          <div className="mt-[37px] relative w-[368px]  ">
            <p className="font-poppins bg-red-500 text-sm font-semibold text-secandary tracking-[8%] absolute top-[-10px] left-8 bg-white px-2 ">
              Password
            </p>
            <input
              onChange={handlePassword}
              className="w-full h-[80px] px-9  border-b border-1 border-solid border-secandary "
              type={passwordShow ? "text" : "password"}
            />
            {passwordShow ? (
              <MdRemoveRedEye
                onClick={() => setPasswordShow(false)}
                className=" absolute top-8 right-3 text-2xl"
              />
            ) : (
              <IoMdEyeOff
                onClick={() => setPasswordShow(true)}
                className=" absolute top-8 right-3 text-2xl"
              />
            )}
            {error && (
              <p className="bg-red-500 w-[368px] text-white  pl-3 ">{error}</p>
            )}
          </div>

          <Link
            onClick={handleSubmit}
            className="w-[368px] bg-primary inline-block text-center py-5 rounded-[86px] font-poppins text-white text-xl mt-[50px] "
            href="#"
          >
            Login to Continue
          </Link>

          <p className=" mt-[35px] w-[368px] font-poppins text-sm text-secandary font-normal text-center">
            Don’t have an account ?
            <Link to="/signup" className="text-[#EA6C00] font-bold" href="#">
              Sign up
            </Link>
            <div className="mt-2">
              <button
                onClick={handleForgetPassword}
                className=" font-poppins text-sm text-secandary  "
              >
                forget Password
              </button>
            </div>
          </p>
        </div>
      </div>
      <div className="w-2/4	">
        <img
          className="w-full h-screen object-cover"
          src="images/singin.png"
          alt="signup"
        />
      </div>

      {forgetModal && (
        <div className="w-full  h-screen bg-[rgba(0,0,0,.8)] absolute top-0 left-0 flex justify-center items-center ">
          <div className="w-[400px]  bg-white p-4 rounded-bl-2xl">
            <h1 className="text-2xl font-medium font-poppins text-secandary mb-3">
              Reset Password{" "}
            </h1>
            <input
              onChange={handleForgetInput}
              className="w-[350px] h-[80px] px-9  border border-1 border-solid border-secandary "
              placeholder="Enter Your Email"
            />
            <button
              onClick={handleRestMail}
              className=" py-3 px-4 bg-primary text-white rounded-lg font-poppins mt-3 "
            >
              Submit
            </button>
            <button
              onClick={() => setForgetModal(false)}
              className=" py-3 px-4 bg-red-500 text-white rounded-lg font-poppins mt-3  ml-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
