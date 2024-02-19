import React, { useEffect, useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import { AiFillAudio } from "react-icons/ai";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  getDownloadURL,
  getStorage,
  ref as sref,
  uploadBytes,
} from "firebase/storage";
import { AudioRecorder } from "react-audio-voice-recorder";
import { v4 as uuidv4 } from "uuid";

const MessageBox = () => {
  let uuid = uuidv4();
  const db = getDatabase();
  const storage = getStorage();
  let [msg, setMsg] = useState("");
  let [msgList, setMsgList] = useState([]);
  let [emojiModal, setEmojiModal] = useState(false);
  let chatData = useSelector((state) => state.activeUserMsg.chatData);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleMsgSend = () => {
    if (msg == "") {
      alert("please write something");
    } else {
      set(push(ref(db, "msg/")), {
        sendername: data.displayName,
        senderid: data.uid,
        recivername: chatData.name,
        reciverid: chatData.id,
        msg: msg,
        date: `${new Date().getFullYear()} -${
          new Date().getMonth() + 1
        } -${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}   `,
      });
    }
  };

  useEffect(() => {
    const messageRef = ref(db, "msg/");
    onValue(messageRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          (data.uid == item.val().senderid &&
            chatData.id == item.val().reciverid) ||
          (data.uid == item.val().reciverid &&
            chatData.id == item.val().senderid)
        ) {
          array.push(item.val());
        }
      });
      setMsgList(array);
    });
  }, [chatData.id]);

  let handleEmojiModal = () => {
    setEmojiModal(!emojiModal);
  };

  let handleEmojiSelect = (e) => {
    setMsg(msg + e.emoji);
  };

  let handleImageFile = (e) => {
    const storageRef = sref(storage, uuid);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "msg/")), {
          sendername: data.displayName,
          senderid: data.uid,
          recivername: chatData.name,
          reciverid: chatData.id,
          img: downloadURL,
          date: `${new Date().getFullYear()} -${
            new Date().getMonth() + 1
          } -${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}   `,
        });
      });
    });
  };

  let handlePress = (e) => {
    if (e.key == "Enter") {
      set(push(ref(db, "msg/")), {
        sendername: data.displayName,
        senderid: data.uid,
        recivername: chatData.name,
        reciverid: chatData.id,
        msg: msg,
        date: `${new Date().getFullYear()} -${
          new Date().getMonth() + 1
        } -${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}   `,
      });
    }
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const storageRef = sref(storage, uuid);
    console.log(blob);

    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "msg/")), {
          sendername: data.displayName,
          senderid: data.uid,
          recivername: chatData.name,
          reciverid: chatData.id,
          audio: downloadURL,
          date: `${new Date().getFullYear()} -${
            new Date().getMonth() + 1
          } -${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}   `,
        });
      });
    });
  };
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
      <ScrollToBottom className=" overflow-y-scroll h-[80%]">
        {/* ================msg box start ================== */}
        {msgList.map((item) =>
          data.uid == item.senderid ? (
            item.msg ? (
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
            ) : item.img ? (
              <div className="mt-4 flex justify-end ">
                <div>
                  <div className="bg-primary inline-block p-3 rounded-lg relative">
                    <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] right-[-9px] text-primary " />
                    <div>
                      <ModalImage
                        small={item.img}
                        large={item.img}
                        alt=""
                        className="w-[250px] h-[300px]   object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2  ">
                    {moment(item.date, "YYYYMMDDh:mm").fromNow()}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex justify-end ">
                <div>
                  <div className="bg-primary inline-block py-5 px-14 rounded-lg relative">
                    <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] right-[-9px] text-primary " />
                    <audio src={item.audio} controls></audio>
                  </div>
                  <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2  ">
                    {moment(item.date, "YYYYMMDDh:mm").fromNow()}
                  </h3>
                </div>
              </div>
            )
          ) : item.msg ? (
            <div>
              <div className="bg-[#F1F1F1] inline-block py-5 px-14 rounded-lg relative">
                <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] left-[-9px] text-[#F1F1F1] " />
                <h2 className=" text-base font-poppins font-medium  ">
                  {item.msg}
                </h2>
              </div>
              <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2 ">
                {moment(item.date, "YYYYMMDDh:mm").fromNow()}
              </h3>
            </div>
          ) : item.img ? (
            <div>
              <div className="bg-[#F1F1F1] inline-block py-2 px-4 rounded-lg relative">
                <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] left-[-9px] text-[#F1F1F1] " />
                <ModalImage
                  small={item.img}
                  large={item.img}
                  alt=""
                  className="w-[250px] h-[300px]   object-cover"
                />
              </div>
              <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2 ">
                {moment(item.date, "YYYYMMDDh:mm").fromNow()}
              </h3>
            </div>
          ) : (
            <div>
              <div className="bg-[#F1F1F1] inline-block py-5 px-14 rounded-lg relative">
                <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] left-[-9px] text-[#F1F1F1] " />
                <audio controls>
                  <source src={item.audio} type="audio/mpeg" />
                </audio>
              </div>
              <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2 ">
                {moment(item.date, "YYYYMMDDh:mm").fromNow()}
              </h3>
            </div>
          )
        )}

        {/* ================msg box end ================== */}
        <div></div>
      </ScrollToBottom>
      {/* msg box */}
      <div>
        <div className=" relative">
          <input
            onKeyUp={handlePress}
            onChange={handleMsg}
            className=" w-[90%] border border-solid py-4 rounded-md px-5 "
            type="text"
            value={msg}
          />
          <FaRegSmile
            onClick={handleEmojiModal}
            className=" text-2xl absolute top-[50%] translate-y-[-50%] right-[150px] "
          />
          <AiFillAudio className=" text-2xl absolute top-[50%] translate-y-[-50%] right-[230px] " />
          <label>
            <input onChange={handleImageFile} className="hidden" type="file" />
            <GrGallery className=" text-2xl absolute top-[50%] translate-y-[-50%] right-[190px] " />
          </label>
          <div className=" absolute top-[50%] translate-y-[-50%] right-7 z-1 bg-primary p-4 rounded-md">
            <IoSend onClick={handleMsgSend} className="text-white text-2xl " />
            {emojiModal && (
              <div className=" absolute  bottom-[60px] right-[50px] ">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
          <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadOnSavePress={false}
            downloadFileExtension="mp3"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
