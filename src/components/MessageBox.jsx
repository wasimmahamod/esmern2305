import React from "react";
import { TbTriangleFilled } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import ModalImage from "react-modal-image";

const MessageBox = () => {
  return (
    <div className="w-full h-[956px]   bg-white shadow-lg p-10">
      <div className="flex  items-center gap-5 border-b border-solid  pb-5 mb-4">
        <img src="images/profile.png" alt="" />
        <div>
          <h2 className=" text-xl font-bold text-secandary font-poppins ">
            Swathi
          </h2>
          <h3 className=" text-sm  text-secandary font-poppins ">Online</h3>
        </div>
      </div>
      {/* msg box */}
      <div className="h-[80%] overflow-y-scroll px-5">
        {/* ================msg box start ================== */}

        {/* reciver msg  */}
        <div>
          <div className="bg-[#F1F1F1] inline-block py-5 px-14 rounded-lg relative">
            <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] left-[-9px] text-[#F1F1F1] " />
            <h2 className=" text-base font-poppins font-medium  ">Hello</h2>
          </div>
          <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2 ">
            Today, 2:01pm
          </h3>
        </div>
        <div className="mt-4">
          <div className="bg-[#F1F1F1] inline-block py-5 px-14 rounded-lg relative">
            <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] left-[-9px] text-[#F1F1F1] " />
            <h2 className=" text-base font-poppins font-medium  ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              asperiores ipsam earum consequuntur doloribus, quas debitis
              repellat quisquam vero dolore corrupti quaerat porro veritatis
              temporibus sed eum. Cumque enim numquam iste quisquam sed facilis
              quidem? Rem laborum nihil voluptate nemo, at vitae aspernatur,
              optio hic natus voluptatum vel corporis doloremque!
            </h2>
          </div>
          <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2 ">
            Today, 2:01pm
          </h3>
        </div>
        {/* reciver msg  */}

        {/* sender msg */}
        <div className="mt-4 flex justify-end ">
          <div>
            <div className="bg-primary inline-block py-5 px-14 rounded-lg relative">
              <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] right-[-9px] text-primary " />
              <h2 className=" text-base font-poppins font-medium  text-white ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit!
              </h2>
            </div>
            <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2  ">
              Today, 2:01pm
            </h3>
          </div>
        </div>

        {/* sender msg */}
        {/* reciver image  */}
        <div>
          <div className="bg-[#F1F1F1] inline-block py-2 px-4 rounded-lg relative">
            <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] left-[-9px] text-[#F1F1F1] " />
            <ModalImage
                small={"images/singin.png"}
                large={"images/singin.png"}
                alt="Hello World!"
                className="w-[250px] h-[300px]   object-cover"
              />
          </div>
          <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2 ">
            Today, 2:01pm
          </h3>
        </div>
        {/* reciver image  */}

        {/* sender image  */}
        <div className="mt-4 flex justify-end ">
          <div>
            <div className="bg-primary inline-block p-3 rounded-lg relative">
              <TbTriangleFilled className=" text-2xl absolute bottom-[-3px] right-[-9px] text-primary " />
              <div >
              <ModalImage
                small={"images/singin.png"}
                large={"images/singin.png"}
                alt="Hello World!"
                className="w-[250px] h-[300px]   object-cover"
              />

              </div>
         
            </div>
            <h3 className="text-[rgba(0,0,0,.25)] text-base font-poppins font-medium mt-2  ">
              Today, 2:01pm
            </h3>
          </div>
        </div>
        {/* sender image  */}
        {/* ================msg box end ================== */}
        <div></div>
      </div>
      {/* msg box */}
      <div>
        <div className=" relative">
          <input
            className=" w-[90%] border border-solid py-4 rounded-md px-5 "
            type="text"
          />
          <FaRegSmile className=" text-2xl absolute top-[50%] translate-y-[-50%] right-[150px] " />
          <GrGallery className=" text-2xl absolute top-[50%] translate-y-[-50%] right-[190px] " />
          <div className=" absolute top-[50%] translate-y-[-50%] right-7 z-1 bg-primary p-4 rounded-md">
            <IoSend className="text-white text-2xl " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
