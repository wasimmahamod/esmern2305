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

const BlockUser = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "block/");
    onValue(friendRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().blockbyid) {
          array.push({
            blockid: item.val().blockid,
            block: item.val().block,
            id: item.key,
          });
        } else if (data.uid == item.val().blockid) {
          array.push({
            blockbyid: item.val().blockbyid,
            blockby: item.val().blockby,
            id: item.key,
          });
        }
      });
      setBlockList(array);
    });
  }, []);

  let handleUnblock = (item) => {
    set(push(ref(db, "friend/")), {
      sendername: data.displayName,
      senderid: data.uid,
      recivername: item.block,
      reciverid: item.blockid,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };

  return (
    <div className="mt-10">
      <div className="p-5 shadow-xl rounded-2xl">
        <div className="flex items-center justify-between ">
          <h2 className=" font-poppins font-semibold text-[#000000] text-lg mb-4">
            Blocked User List
          </h2>
          <BsThreeDotsVertical className=" text-primary" />
        </div>
        <div className="w-full h-[300px] overflow-y-scroll ">
          {blockList.map((item) => (
            <div className="flex items-center justify-between pb-5 border-b ">
              <img src="images/groupimg.png" alt="groupimg" />
              <div>
                <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                  {item.block}
                </h3>
                <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                  {item.blockby}
                </h3>
                <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                  Hi Guys, Wassup!
                </p>
              </div>
              {item.blockid ? (
                <button
                  onClick={() => handleUnblock(item)}
                  className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins "
                >
                  unblock
                </button>
              ) : (
                <button className="px-4 py-2 text-lg font-normal text-white bg-gray-300 rounded-md font-poppins ">
                  blocked
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
