import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";

import { useSelector } from "react-redux";
const MyGroup = () => {
  let [mygroupList, setMyGroupList] = useState([]);
  let [groupRequestList, setGroupRequestList] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();

  let [groupRequestModal, setGroupRequestModal] = useState(false);

  useEffect(() => {
    const starCountRef = ref(db, "group/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminid) {
          array.push(item.val());
        }
      });
      setMyGroupList(array);
    });
  }, []);
  useEffect(() => {
    const starCountRef = ref(db, "groupRequest/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val());
      });
      setGroupRequestList(array);
    });
  }, []);

  let handleGroupsetting = () => {
    setGroupRequestModal(!groupRequestModal);
  };
  return (
    <div className="mt-10">
      <div className="p-5 shadow-xl rounded-2xl">
        <div className="flex items-center justify-between ">
          <h2 className=" font-poppins font-semibold text-[#000000] text-lg mb-4">
            My Group List
          </h2>
          <BsThreeDotsVertical
            onClick={handleGroupsetting}
            className=" text-primary"
          />
        </div>
        {groupRequestModal ? (
          <div>
            {groupRequestList.map((item) => (
              <div className="flex items-center justify-between pb-5 border-b ">
                <img
                  className="order-2"
                  src="images/groupimg.png"
                  alt="groupimg"
                />

                <div className="order-1 pr-5 ">
                  <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                    {item.groupname}
                  </p>
                  <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                    {item.requestname}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[300px] overflow-y-scroll ">
            {mygroupList.map((item) => (
              <div className="flex items-center justify-between pb-5 border-b ">
                <img
                  className="order-2"
                  src="images/groupimg.png"
                  alt="groupimg"
                />
                <div className="order-1 pr-5 ">
                  <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                    {item.admin}
                  </p>
                  <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                    {item.groupname}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroup;
