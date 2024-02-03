import React, { useEffect, useState } from "react";
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

const FriendRequest = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  let [friendrequrestList, setFriendrequestList] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const friendrequrestRef = ref(db, "friendrequest/");
    onValue(friendrequrestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().reciverid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setFriendrequestList(array);
    });
  }, []);

  let handleFriendAccept = (item) => {
    console.log(item.id);
    set(push(ref(db, "friend/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id));
    });
  };
  return (
    <div className="mt-10">
      <div className="p-5 shadow-xl rounded-2xl">
        <div className="flex items-center justify-between ">
          <h2 className=" font-poppins font-semibold text-[#000000] text-lg mb-4">
            Friend request List
          </h2>
          <BsThreeDotsVertical className=" text-primary" />
        </div>
        <div className="w-full h-[300px] overflow-y-scroll ">
          {friendrequrestList.map((item) => (
            <div className="flex items-center justify-between pb-5 border-b ">
              <img src="images/groupimg.png" alt="groupimg" />
              <div>
                <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                  {item.sendername}
                </h3>
                <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                  Hi Guys, Wassup!
                </p>
              </div>

              <button
                onClick={() => handleFriendAccept(item)}
                className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins "
              >
                Accept
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
