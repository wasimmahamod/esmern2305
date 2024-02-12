import React, { useEffect, useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set,onValue } from "firebase/database";
import moment from "moment";
import EmojiPicker from 'emoji-picker-react';

const MessageBox = () => {
  const db = getDatabase();
  let [msg, setMsg]=useState('')
  let [msgList,setMsgList]=useState([])
  let [emojiModal,setEmojiModal]=useState(false)
  let chatData = useSelector((state)=>state.activeUserMsg.chatData)
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  let handleMsg=(e)=>{
    setMsg(e.target.value)
  }

  let handleMsgSend=()=>{
    if(msg==''){
      alert('please write something')
    }else{
      set(push(ref(db, 'msg/')), {
        sendername : data.displayName, 
        senderid : data.uid ,
        recivername : chatData.name ,
        reciverid : chatData.id,
        msg: msg,
        date : `${new Date().getFullYear()} -${new Date().getMonth() + 1} -${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}   `
      });

    }
  }


  useEffect(()=>{
    const messageRef = ref(db, 'msg/' );
    onValue(messageRef, (snapshot) => {
      let array = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().senderid && chatData.id == item.val().reciverid || data.uid == item.val().reciverid && chatData.id == item.val().senderid ){
          array.push(item.val())

        }
      })
      setMsgList(array)
    });
  },[chatData.id])


  let handleEmojiModal=()=>{
    setEmojiModal(!emojiModal)
  }

  let handleEmojiSelect=(e)=>{
   setMsg( msg + e.emoji)
  }
  return (
    <div className="w-full h-[956px]   bg-white shadow-lg p-10">
      <div className="flex  items-center gap-5 border-b border-solid  pb-5 mb-4">
        <img src="images/profile.png" alt="" />
        <div>
          <h2 className=" text-xl font-bold text-secandary font-poppins ">
           {chatData.name}
          </h2>
          <h3 className=" text-sm  text-secandary font-poppins ">Online</h3>
        </div>
      </div>
      {/* msg box */}
      <div className="h-[80%] overflow-y-scroll px-5">
        {/* ================msg box start ================== */}
          {msgList.map((item)=>(
            
            
            data.uid == item.senderid ?
            
              <div className="mt-4 flex justify-end ">
              <div>
                <div className="bg-primary inline-block py-5 px-14 rounded-lg relative">
                  <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] right-[-9px] text-primary " />
                  <h2 className=" text-base font-poppins font-medium  text-white ">
                   {item.msg}
                  </h2>
                </div>
                <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2  ">
                  {moment(item.date, "YYYYMMDDh:mm").fromNow()}
                </h3>
              </div>
            </div>

            :

            <div>
            <div className="bg-[#F1F1F1] inline-block py-5 px-14 rounded-lg relative">
              <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] left-[-9px] text-[#F1F1F1] " />
              <h2 className=" text-base font-poppins font-medium  ">{item.msg}</h2>
            </div>
            <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2 ">
            {moment(item.date, "YYYYMMDDh:mm").fromNow()}
            </h3>
          </div>
            
            
          ))}
      
        {/* ================msg box end ================== */}
        <div></div>
      </div>
      {/* msg box */}
      <div>
        <div className=" relative">
          <input onChange={handleMsg}
            className=" w-[90%] border border-solid py-4 rounded-md px-5 "
            type="text" value={msg}
          />
          <FaRegSmile onClick={handleEmojiModal} className=" text-2xl absolute top-[50%] translate-y-[-50%] right-[150px] " />
          <GrGallery className=" text-2xl absolute top-[50%] translate-y-[-50%] right-[190px] " />
          <div className=" absolute top-[50%] translate-y-[-50%] right-7 z-1 bg-primary p-4 rounded-md">
            <IoSend onClick={handleMsgSend} className="text-white text-2xl " />
            {emojiModal &&
            <div className=" absolute  bottom-[60px] right-[50px] ">
              <EmojiPicker onEmojiClick={handleEmojiSelect}  />

            </div>

            }
          
          </div>

        </div>
      </div>
    </div>
  );
};

export default MessageBox;
