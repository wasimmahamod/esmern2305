import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { IoMdEyeOff } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [loader, setLoadder] = useState(false);
  let [passwordShow, setPasswordShow] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };
  let handleName = (e) => {
    setName(e.target.value);
    setNameerr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };

  let handleSubmit = () => {
    if (!email) {
      setEmailerr("Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr("Invalid Email");
    }
    if (!name) {
      setNameerr("Name is required");
    }
    if (!password) {
      setPassworderr("Password is required");
    }
    if (
      name &&
      password &&
      email &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setLoadder(true);
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: "images/profile.png",
            })
              .then(() => {
                toast.success("Signup Successfull", {
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
                  navigate("/");
                }, 2000);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            setEmailerr("Email already in use ");
          }
          console.log(error.code);
        });
    }
  };

  return (
    <div>
      {loader ? (
        <div>
          <img className="w-full h-screen" src="images/waiting.gif" alt="" />
        </div>
      ) : (
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
          <div className="w-full md:w-2/4 flex justify-center md:justify-end	">
            <div className="mr-0 px-3 lg:px-0 lg:mr-[69px] mt-[25px] lg:mt-[225px]">
              <h1 className="font-poppins text-[30px] md:text-[36px] font-bold  text-secandary mb-3 text-center md:text-left">
                Get started with easily register
              </h1>
              <p className="text-center md:text-left font-poppins text-xl text-secandary font-normal">
                Free register and you can enjoy it
              </p>
              <div className=" mt-[25px] md:mt-[37px] relative  ">
                <p className=" font-poppins bg-red-500 text-md font-semibold text-secandary tracking-[8%] absolute top-[-10px] left-8 bg-white px-2   ">
                  Email Address
                </p>
                <input
                  onChange={handleEmail}
                  className={`w-full md:w-[368px] h-[60px] sm:h-[70px] md:h-[60px]  lg:h-[80px] px-9 rounded-lg border border-1 border-solid  border-secandary`}
                  type="email"
                  value={email}
                />
                {emailerr && (
                  <p className="bg-red-500 w-full md:w-[368px] text-white rounded-b-lg pl-3 ">
                    {emailerr}
                  </p>
                )}
              </div>
              <div className="mt-[25px] md:mt-[37px]  relative  ">
                <p className="font-poppins  text-md font-semibold text-secandary tracking-[8%] absolute top-[-10px] left-8  px-2 bg-white">
                  Full name
                </p>
                <input
                  onChange={handleName}
                  className="w-full md:w-[368px] h-[60px] sm:h-[70px] md:h-[60px]  lg:h-[80px] px-9 rounded-lg border border-1 border-solid border-secandary"
                  type="text"
                  value={name}
                />
                {nameerr && (
                  <p className="bg-red-500 w-[368px] text-white rounded-b-lg pl-3 ">
                    {nameerr}
                  </p>
                )}
              </div>
              <div className="mt-[25px] md:mt-[37px]  relative marker:w-full md:w-[368px]  ">
                <p className="font-poppins bg-red-500 text-md font-semibold text-secandary tracking-[8%] absolute top-[-10px] left-8 bg-white px-2 ">
                  Password
                </p>
                <input
                  onChange={handlePassword}
                  className="w-full h-[60px] sm:h-[70px] md:h-[60px]  lg:h-[80px]  px-9 rounded-lg border border-1 border-solid border-secandary "
                  type={passwordShow ? "text" : "password"}
                  value={password}
                />
                {passwordShow ? (
                  <MdRemoveRedEye
                    onClick={() => setPasswordShow(false)}
                    className=" absolute top-[20px] md:top-8 right-3 text-2xl"
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={() => setPasswordShow(true)}
                    className=" absolute top-[20px] md:top-8 right-3 text-2xl"
                  />
                )}
                {passworderr && (
                  <p className="bg-red-500 w-[368px] text-white rounded-b-lg pl-3 ">
                    {passworderr}
                  </p>
                )}
              </div>
              {loader ? (
                <div className="w-full md:w-[368px]  flex justify-center">
                  <ColorRing
                    visible={true}
                    height="120"
                    width="120"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              ) : (
                <Link
                  onClick={handleSubmit}
                  className="w-full md:w-[368px] bg-primary inline-block text-center py-3 md:py-5 rounded-[86px] font-poppins text-white text-xl  mt-[30px] md:mt-[20px] lg:mt-[50px] "
                  href="#"
                >
                  Sign up
                </Link>
              )}

              <p className="mt-[15px] lg:mt-[35px] w-full md:w-[368px] font-poppins text-md text-secandary font-normal text-center">
                Already have an account ?{" "}
                <Link to="/" className="text-[#EA6C00] font-bold" href="#">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden md:block  w-2/4	">
            <img
              className="w-full h-screen object-cover"
              src="images/signup.png"
              alt="signup"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
