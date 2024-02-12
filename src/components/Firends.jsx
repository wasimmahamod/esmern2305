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
import { useSelector, useDispatch } from "react-redux";
import { activeChatInfo } from "../slices/chatSlice";
const Firends = () => {
  let dispatch = useDispatch()
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendList, setFriendList] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const friendRef = ref(db, "friend/");
    onValue(friendRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().senderid ||
          data.uid == item.val().reciverid
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(array);
    });
  }, []);

  let handleBlock = (item) => {
    if (data.uid == item.senderid) {
      set(push(ref(db, "block/")), {
        block: item.recivername,
        blockid: item.reciverid,
        blockby: data.displayName,
        blockbyid: data.uid,
      }).then(() => {
        remove(ref(db, "friend/" + item.id));
      });
    } else {
      set(push(ref(db, "block/")), {
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.recivername,
        blockbyid: item.reciverid,
      }).then(() => {
        remove(ref(db, "friend/" + item.id));
      });
    }
    console.log(item.senderid);
  };

  let handleMsgInfo=(item)=>{
    console.log(item)
    if(data.uid ==item.senderid){

      dispatch(activeChatInfo({name:item.recivername , id: item.reciverid}))
    }else{
      dispatch(activeChatInfo({name:item.sendername , id: item.senderid}))
    }
  }
  return (
    <div className="mt-10">
      <div className="p-5 shadow-xl rounded-2xl">
        <div className="flex items-center justify-between ">
          <h2 className=" font-poppins font-semibold text-[#000000] text-lg mb-4">
            Friends List
          </h2>
          <BsThreeDotsVertical className=" text-primary" />
        </div>
        <div className="w-full h-[300px] overflow-y-scroll ">
          {friendList.map((item) => (
            <div onClick={()=>handleMsgInfo(item)} className="flex items-center justify-between pb-5 border-b ">
              {console.log(item)}
              <img src="images/groupimg.png" alt="groupimg" />
              <div>
                {data.uid == item.senderid ? (
                  <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                    {item.recivername}
                  </h3>
                ) : (
                  <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                    {item.sendername}
                  </h3>
                )}
                <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                  Hi Guys, Wassup!
                </p>
              </div>

              <button
                onClick={() => handleBlock(item)}
                className="px-4 py-2 text-lg font-normal text-white rounded-md bg-primary font-poppins "
              >
                Block
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Firends;
