import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const Group = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  let [groupModal, setGroupModal] = useState(false);
  let [groupname, setGroupname] = useState("");
  let [groupList, setGroupList] = useState([]);

  let handlegroupModal = () => {
    setGroupModal(!groupModal);
  };

  let handleGroupCreate = () => {
    set(push(ref(db, "group/")), {
      groupname: groupname,
      admin: data.displayName,
      adminid: data.uid,
    }).then(() => {
      setGroupModal(false);
    });
  };
  useEffect(() => {
    const starCountRef = ref(db, "group/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.val().adminid) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setGroupList(array);
    });
  }, []);

  let handleGroupJoin = (item) => {
    set(push(ref(db, "groupRequest/")), {
      groupname: item.groupname,
      admin: item.admin,
      adminid: item.adminid,
      requestname: data.displayName,
      requrestid: data.uid,
    }).then(() => {
      alert("done");
    });
  };

  return (
    <div className="mt-5 h-[400px] ">
      <div className="relative">
        <input
          placeholder="Search"
          className="w-[427px] h-[59px] shadow-2xl rounded-2xl pl-12 "
          type="text"
        />
        <IoSearchSharp className="absolute text-2xl top-5 left-4" />
        <BsThreeDotsVertical className="absolute text-2xl top-5 right-4" />
      </div>
      <div className="p-5 shadow-xl rounded-2xl">
        <div className="flex items-center justify-between ">
          <h2 className=" font-poppins font-semibold text-[#000000] text-lg mb-4">
            {groupModal ? " Create Group" : " Groups List"}
          </h2>

          <button
            onClick={handlegroupModal}
            className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins "
          >
            {groupModal ? "Go Back " : "CreateGroup"}
          </button>
        </div>
        {groupModal ? (
          <div>
            <input
              onChange={(e) => setGroupname(e.target.value)}
              placeholder="Enter Your Group Name "
              className="w-full py-3 pl-4 mt-3 border border-solid "
              type="text"
            />
            <button
              onClick={handleGroupCreate}
              className="w-full py-2 mt-3 text-lg font-normal text-white rounded-md bg-primary font-poppins "
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="w-full h-[300px] overflow-y-scroll ">
            {groupList.map((item) => (
              <div className="flex items-center justify-between pb-5 border-b ">
                <img src="images/groupimg.png" alt="groupimg" />
                <div>
                  <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                    Admin: {item.admin}
                  </p>
                  <h3 className=" font-poppins font-semibold text-[#000000] text-xl">
                    {item.groupname}
                  </h3>
                </div>

                <button
                  onClick={() => handleGroupJoin(item)}
                  className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins "
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Group;
