import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const UserList = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [userList, setUserList] = useState([]);
  const [userSearchList, setUserSearchList] = useState([]);
  const [friendRequrestList, setFriendRequrestList] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const db = getDatabase();
  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
    });
  }, []);

  let handleFriendrequest = (item) => {
    console.log(item);
    set(push(ref(db, "friendrequest/")), {
      sendername: data.displayName,
      senderemail: data.email,
      senderid: data.uid,
      recivername: item.fullname,
      reciveremail: item.email,
      reciverid: item.id,
    }).then(() => {
      // toast.success("Signup Successfull", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    });
  };

  useEffect(() => {
    const friendRequestRef = ref(db, "friendrequest/");
    onValue(friendRequestRef, (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        array.push(item.val().reciverid + item.val().senderid)
      });
      setFriendRequrestList(array);
    });
  }, []);
  useEffect(() => {
    const friendRequestRef = ref(db, "friend/");
    onValue(friendRequestRef, (snapshot) => {
      let array = []
      snapshot.forEach((item) => {
        array.push(item.val().reciverid + item.val().senderid)
      });
      setFriendList(array);
    });
  }, []);


  let handleSearch = (e) => {
    let data = userList.filter((item) => item.fullname.toLowerCase().includes(e.target.value.toLowerCase()))

    setUserSearchList(data)
  }



  return (
    <div className="mt-10">
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
      <div className="p-5 shadow-xl rounded-2xl">
        <div className="flex items-center justify-between ">
          <h2 className=" font-poppins font-semibold text-[#000000] text-lg mb-4">
            User List
          </h2>
          <BsThreeDotsVertical className=" text-primary" />
        </div>
        <div className="relative">
          <input onChange={handleSearch}
            placeholder="Search"
            className="w-[427px] h-[59px] shadow-2xl rounded-2xl pl-12 "
            type="text"
          />
          <IoSearchSharp className="absolute text-2xl top-5 left-4" />
          <BsThreeDotsVertical className="absolute text-2xl top-5 right-4" />
        </div>
        <div className="w-full h-[300px] overflow-y-scroll ">
          {userSearchList.length > 0 ?

            userSearchList.map((item) => (
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

                {friendList.includes(data.uid + item.id) ||
                  friendList.includes(item.id + data.uid) ? (
                  <button className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins ">
                    F
                  </button>
                ) : friendRequrestList.includes(data.uid + item.id) ||
                  friendRequrestList.includes(item.id + data.uid) ? (
                  <button className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins ">
                    -
                  </button>
                ) : (
                  <button
                    onClick={() => handleFriendrequest(item)}
                    className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins "
                  >
                    +
                  </button>
                )}
              </div>


            ))

            :
            userList.map((item) => (
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

                {friendList.includes(data.uid + item.id) ||
                  friendList.includes(item.id + data.uid) ? (
                  <button className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins ">
                    F
                  </button>
                ) : friendRequrestList.includes(data.uid + item.id) ||
                  friendRequrestList.includes(item.id + data.uid) ? (
                  <button className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins ">
                    -
                  </button>
                ) : (
                  <button
                    onClick={() => handleFriendrequest(item)}
                    className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins "
                  >
                    +
                  </button>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default UserList;
