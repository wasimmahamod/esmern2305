import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const FriendRequest = () => {
  return (
    <div className="mt-10">
      <div className=" p-5 shadow-xl rounded-2xl">
        <div className=" flex  items-center justify-between">
          <h2 className=" font-poppins font-semibold text-[#000000] text-lg mb-4">
            Friend request List
          </h2>
          <BsThreeDotsVertical className=" text-primary" />
        </div>
        <div className="w-full h-[300px] overflow-y-scroll ">
          <div className=" flex items-center justify-between pb-5 border-b">
            <img src="images/groupimg.png" alt="groupimg" />
            <div>
              <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                Friends Reunion
              </h3>
              <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                Hi Guys, Wassup!
              </p>
            </div>

            <button className="bg-primary py-2 px-4 text-white rounded-md font-poppins font-normal text-lg ">
              Join
            </button>
          </div>
          <div className=" flex items-center justify-between py-5  border-b">
            <img src="images/groupimg.png" alt="groupimg" />
            <div>
              <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                Friends Reunion
              </h3>
              <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                Hi Guys, Wassup!
              </p>
            </div>

            <button className="bg-primary py-2 px-4 text-white rounded-md font-poppins font-normal text-lg ">
              Join
            </button>
          </div>
          <div className=" flex items-center justify-between py-5  ">
            <img src="images/groupimg.png" alt="groupimg" />
            <div>
              <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                Friends Reunion
              </h3>
              <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                Hi Guys, Wassup!
              </p>
            </div>

            <button className="bg-primary py-2 px-4 text-white rounded-md font-poppins font-normal text-lg ">
              Join
            </button>
          </div>
          <div className=" flex items-center justify-between py-5  ">
            <img src="images/groupimg.png" alt="groupimg" />
            <div>
              <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                Friends Reunion
              </h3>
              <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                Hi Guys, Wassup!
              </p>
            </div>

            <button className="bg-primary py-2 px-4 text-white rounded-md font-poppins font-normal text-lg ">
              Join
            </button>
          </div>
          <div className=" flex items-center justify-between py-5  ">
            <img src="images/groupimg.png" alt="groupimg" />
            <div>
              <h3 className=" font-poppins font-semibold text-[#000000] text-lg">
                Friends Reunion
              </h3>
              <p className=" font-poppins font-semibold text-[#4D4D4D] text-sm">
                Hi Guys, Wassup!
              </p>
            </div>

            <button className="bg-primary py-2 px-4 text-white rounded-md font-poppins font-normal text-lg ">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
