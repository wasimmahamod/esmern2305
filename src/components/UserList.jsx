import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const UserList = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data);
  const [userList, setUserList] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          array.push(item.val());
        }
      });
      setUserList(array);
    });
  }, []);

  return (
    <div className="mt-10">
      <div className="p-5 shadow-xl rounded-2xl">
        <div className="flex items-center justify-between ">
          <h2 className=" font-poppins font-semibold text-[#000000] text-lg mb-4">
            User List
          </h2>
          <BsThreeDotsVertical className=" text-primary" />
        </div>
        <div className="w-full h-[300px] overflow-y-scroll ">
          {userList.map((item) => (
            <div className="flex items-center justify-between pb-5 border-b ">
              <img src="images/groupimg.png" alt="groupimg" />
              <div>
                <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                  {item.fullname}
                </h3>
                <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                  {item.email}
                </p>
              </div>

              <button className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins ">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
