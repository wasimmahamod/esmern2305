import React from "react";
import Sidebar from "../components/Sidebar";
import Group from "../components/Group";
import FriendRequest from "../components/FriendRequest";
import Firends from "../components/Firends";
import MyGroup from "../components/MyGroup";
import UserList from "../components/UserList";
import BlockUser from "../components/BlockUser";

const Home = () => {
  return (
    <div className=" flex justify-between">
      <div className="w-[186px] ">
        <Sidebar />
      </div>
      <div className="w-[427px]  h-[500px] ">
        <Group />
        <FriendRequest />
      </div>
      <div className="w-[427px]  h-[500px] ">
        <Firends />
        <MyGroup />
      </div>
      <div className="w-[427px]  h-[500px] ">
        <UserList />
        <BlockUser />
      </div>
    </div>
  );
};

export default Home;
