import React from "react";
import Sidebar from "../components/Sidebar";
import Firends from "../components/Firends";
import MessageBox from "../components/MessageBox";

const Msg = () => {
  return (
    <div className="flex  justify-between">
      <div className="w-[186px] ">
        <Sidebar active="message" />
      </div>
      <div className="w-[427px]  ">
        <Firends />
      </div>
      <div className=" w-[60%] h-screen  ">
       <MessageBox/>
      </div>
    </div>
  );
};

export default Msg;
