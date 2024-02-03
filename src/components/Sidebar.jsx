import React, { useState, createRef } from "react";
import { CiHome } from "react-icons/ci";
import { AiFillMessage } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Sidebar = () => {
  const auth = getAuth();
  const storage = getStorage();
  const [imageModal, setImageModal] = useState(false);
  // const [imageInfo, setImageInfo] = useState(null);
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  let [magic, setMagic] = useState(false);
  // end
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  const onChangePic = (e) => {
    setMagic(true);
    console.log(e.target);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, "some-child");
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();

      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setImageModal(false);
          });
        });
      });
    }
  };
  // cropper image

  let name = localStorage.getItem("name");
  console.log(name);

  const handleImageUploadmodal = () => {
    setImageModal(true);
  };

  const handleClose = () => {
    setImageModal(false);
    setCropData("");
    setImage("");
    setMagic(false);
  };
  return (
    <div className=" w-full h-screen bg-[#5F35F5] rounded-3xl ">
      <div className="pt-[38px] ">
        <div className=" w-[100px] h-[100px] mx-auto rounded-full relative group ">
          <img
            className="w-[100px] h-[100px] rounded-full mx-auto"
            src={data.photoURL}
            alt="profile"
          />
          <div
            onClick={handleImageUploadmodal}
            className="w-0 h-[100px] bg-[rgba(0,0,0,.7)] absolute top-0 left-0 rounded-full group-hover:w-[100px] flex justify-center items-center "
          >
            <FaCloudUploadAlt className="text-2xl text-white " />
          </div>
        </div>
      </div>
      <h2 className="mt-3 text-2xl font-bold text-center text-white font-poppins ">
        {data.displayName}
      </h2>
      <div className="bg-white w-[161px] h-[89px] ml-auto mt-[78px] relative  rounded-tl-3xl rounded-bl-3xl    flex justify-center items-center">
        <CiHome className="text-[50px] ml-[-42px] text-[#5F35F5]" />
        <div className=" h-[89px] w-2 bg-[#5F35F5] absolute top-0 right-0 shadow-2xl rounded-tl-[25px] rounded-bl-[25px] "></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto mt-[78px] relative  rounded-tl-3xl rounded-bl-3xl    flex justify-center items-center">
        <AiFillMessage className="text-[50px] ml-[-42px] text-[#BAD1FF]" />
        <div className=" h-[89px] w-2 bg-[#5F35F5] absolute top-0 right-0 shadow-2xl rounded-tl-[25px] rounded-bl-[25px] "></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto mt-[78px] relative  rounded-tl-3xl rounded-bl-3xl    flex justify-center items-center">
        <IoIosNotifications className="text-[50px] ml-[-42px] text-[#BAD1FF]" />
        <div className=" h-[89px] w-2 bg-[#5F35F5] absolute top-0 right-0 shadow-2xl rounded-tl-[25px] rounded-bl-[25px] "></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto mt-[78px] relative  rounded-tl-3xl rounded-bl-3xl    flex justify-center items-center">
        <IoSettings className="text-[50px] ml-[-42px] text-[#BAD1FF]" />
        <div className=" h-[89px] w-2 bg-[#5F35F5] absolute top-0 right-0 shadow-2xl rounded-tl-[25px] rounded-bl-[25px] "></div>
      </div>

      {imageModal && (
        <div className="absolute top-0 left-0 z-50 w-full h-screen bg-[rgba(0,0,0,.8)] flex justify-center items-center">
          <div className="w-[400px]  bg-white rounded-2xl relative p-6">
            <MdOutlineClose
              className="text-[30px] text-red-500 absolute top-0 right-0"
              onClick={handleClose}
            />
            <input onChange={onChangePic} type="file" />
            {magic && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            )}

            <button
              onClick={getCropData}
              className="w-full py-4 mt-5 text-lg text-white bg-primary font-poppins rounded-xl "
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
