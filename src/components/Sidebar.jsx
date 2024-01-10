import React from "react";
import { CiHome } from "react-icons/ci";
import { AiFillMessage } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
  let data = useSelector((state) => state.userLoginInfo.userInfo);

  let name = localStorage.getItem("name");
  console.log(name);

  return (
    <div className=" w-full h-screen bg-[#5F35F5] rounded-3xl ">
      <div className="pt-[38px] ">
        <div className=" w-[100px] h-[100px] mx-auto rounded-full relative group ">
          <img
            className="w-[100px] h-[100px] rounded-full mx-auto"
            src="images/profile.png"
            alt="profile"
          />
          <div className="w-0 h-[100px] bg-[rgba(0,0,0,.7)] absolute top-0 left-0 rounded-full group-hover:w-[100px] flex justify-center items-center ">
            <FaCloudUploadAlt className=" text-white text-2xl " />
          </div>
        </div>
      </div>
      <h2 className="text-center text-2xl font-bold text-white font-poppins mt-3 ">
        {data.displayName}
      </h2>
      <div className="bg-white w-[161px] h-[89px] ml-auto mt-[78px] relative  rounded-tl-3xl rounded-bl-3xl    flex justify-center items-center">
        <CiHome className="text-[50px] ml-[-42px] text-[#5F35F5]" />
        <div className=" h-[89px] w-2 bg-[#5F35F5] absolute top-0 right-0 shadow-2xl rounded-tl-[25px] rounded-bl-[25px] "></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto mt-[78px] relative  rounded-tl-3xl rounded-bl-3xl    flex justify-center items-center">
        <AiFillMessage className="text-[50px] ml-[-42px] text-[#BAD1FF]" />
        <div className=" h-[89px] w-2 bg-[#5F35F5] absolute top-0 right-0 shadow-2xl rounded-tl-[25px] rounded-bl-[25px] "></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto mt-[78px] relative  rounded-tl-3xl rounded-bl-3xl    flex justify-center items-center">
        <IoIosNotifications className="text-[50px] ml-[-42px] text-[#BAD1FF]" />
        <div className=" h-[89px] w-2 bg-[#5F35F5] absolute top-0 right-0 shadow-2xl rounded-tl-[25px] rounded-bl-[25px] "></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto mt-[78px] relative  rounded-tl-3xl rounded-bl-3xl    flex justify-center items-center">
        <IoSettings className="text-[50px] ml-[-42px] text-[#BAD1FF]" />
        <div className=" h-[89px] w-2 bg-[#5F35F5] absolute top-0 right-0 shadow-2xl rounded-tl-[25px] rounded-bl-[25px] "></div>
      </div>
    </div>
  );
};

export default Sidebar;
