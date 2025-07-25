/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AllImages } from "../../../public/images/AllImages";

const notifications = [
  {
    id: 1,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 2,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 3,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 4,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 5,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
];

const Topbar = ({ collapsed, setCollapsed }: any) => {
  const user = JSON.parse(localStorage.getItem("user_data") || "null");
  const [notificationCount, setNotificationCount] = useState(
    notifications.length
  );

  console.log("notificationCount:", notificationCount);

  const handleMenuClick = () => {
    setNotificationCount(0); // Reset notification count when the menu is clicked
    setCollapsed(false);
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      onClick={handleMenuClick}
    >
      {notifications.map((notification) => (
        <div className="test-start" key={notification.id}>
          <div className="flex gap-2">
            <BellFilled className="!text-secondary-color " />
            <div className="flex flex-col items-start">
              <p>{notification.message}</p>
              <p className="text-gray-400">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto bg-[#022940] !text-primary-color rounded h-8 py-1"
      >
        See More
      </Link>
    </div>
  );
  return (
    <div className=" mx-auto flex justify-between gap-0 items-center mt-2">
      <div className="flex items-center gap-2 text-primary-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl !text-base-color"
        />
      </div>
      <div className="flex items-center justify-center  gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <BellFilled
            shape="circle"
            className="bg-primary-color py-[18px] px-2 text-xl rounded-full h-6 font-bold !text-secondary-color "
          />
        </Dropdown>
        <Link to="profile">
          <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1  border border-secondary-color ">
            <img
              src={AllImages.profile}
              alt="profile_pic"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p className="text-base-color font-semibold text-sm">
                David Wilson
              </p>
              <p className="text-base-color text-xs">Admin</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
