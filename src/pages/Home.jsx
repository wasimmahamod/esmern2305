import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Group from "../components/Group";
import FriendRequest from "../components/FriendRequest";
import Firends from "../components/Firends";
import MyGroup from "../components/MyGroup";
import UserList from "../components/UserList";
import BlockUser from "../components/BlockUser";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from "../slices/userSlice";
const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  useEffect(() => {
    if (data == "null") {
      navigate("/");
    }
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(userLoginInfo(user));
      localStorage.setItem("userInfo", JSON.stringify(user));
    }
  });

  return (
    <div>
      {data.emailVerified ? (
        <div className="flex justify-between ">
          <div className="w-[186px] ">
            <Sidebar active="home" />
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
      ) : (
        <div className="flex items-center justify-center w-full h-screen bg-primary">
          <h1 className="text-2xl font-bold text-white font-poppins ">
            Your Email not verify
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
