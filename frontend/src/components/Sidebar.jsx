import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profilePicPlaceholder from "../assets/profile_pic_placeholder.jpeg";
import { GrTableAdd } from "react-icons/gr";
import { MdGroupAdd } from "react-icons/md";
import {
  FaUser,
  FaUsers,
  FaBriefcase,
  FaBell,
  FaPoll,
  FaUserShield,
  FaSignOutAlt,
  // FaInfo,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from "react-icons/fa";

function Sidebar({ children = "", loggedInUserDetails = {} }) {
  const location = useLocation();
  const sidebarUncollapsedText = [
    "My Profile",
    "Announcements",
    "Openings",
    "results",
    "Other Users",
    "Admin Profile",
    // "About",
    "Placed Students",
  ];
  const correspondingPaths = [
    "/userprofile",
    "/allannouncements",
    "/openings",
    "/results",
    "/alluser",
    "/alladmins",
    // "/about",
    "/allSelections",
  ];
  const sidebarCollapsedText = [
    <FaUser />,
    <FaBell />,
    <FaBriefcase />,
    <FaPoll />,
    <FaUsers />,
    <FaUserShield />,
    // <FaInfo />,
    <GrTableAdd />,
  ];
  const [sidebarText, setSidebarText] = useState(sidebarCollapsedText);
  const [isCollapsed, setIsCollapsed] = useState(1);
  const handleClick = () => {
    setIsCollapsed((prev) => !prev);
    if (!isCollapsed) setSidebarText(sidebarCollapsedText);
    else setSidebarText(sidebarUncollapsedText);
  };

  let navigate = useNavigate();
  const clickLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("token", null);
      navigate("/");
      alert("logged out successfull");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <>
      <nav className="border-b-2 h-20 border-blue-700 fixed top-0 left-0 right-0 bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={`/allannouncements`}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              company
            </span>
          </Link>

          <div className="flex flex-row items-center space-x-3">
            <Link
              href="#"
              className="text-gray-900 rounded hover:bg-blue-700 hover:text-white dark:text-white dark:hover:text-blue-500 hidden sm:inline"
            >
              {loggedInUserDetails?.name}
            </Link>

            <img
              className="w-12 h-12 flex rounded-full items-center justify-center border-2 border-blue-700"
              src={loggedInUserDetails?.image || `https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg`}
              alt="profile pic"
            />
          </div>
        </div>
      </nav>

      <div className="w-full h-full flex bg-blue-50">
        <div
          className={`overflow-y-auto border-r-2 mt-20 overflow-hidden h-screen border-blue-700 bg-white ${
            isCollapsed == 1 ? "w-[10%]" : "w-[20%]"
          }`}
        >
          <Link
            onClick={handleClick}
            className="mt-2 text-black overflow-hidden py-3 w-full flex justify-center text-center rounded-xl hover:bg-blue-500 hover:text-white "
          >
            {isCollapsed == 0 ? (
              <FaArrowAltCircleLeft className="h-4 w-4" />
            ) : (
              <FaArrowAltCircleRight className="h-4 w-4" />
            )}
          </Link>

          <div className="pt-48 w-full flex flex-col flex-grow">
            <hr />
            {sidebarText.map((ele, ind) => {
              const path = correspondingPaths[ind];

              return (
                <div key={path}>
                  <Link to={path} key={path}>
                    <div
                      className={`overflow-hidden py-3 w-full text-center rounded-xl hover:bg-blue-500 hover:text-white flex justify-center ${
                        location.pathname === path
                          ? "bg-blue-500 text-white "
                          : ""
                      }`}
                    >
                      {ele}
                    </div>
                  </Link>
                  <hr />
                </div>
              );
            })}

            {/**register user */}
            {loggedInUserDetails?.userType==="admin" && <>
              <Link to={`/register`} key={"/register"}>
                <div
                  className={`overflow-hidden py-3 w-full text-center rounded-xl hover:bg-blue-500 hover:text-white flex justify-center `}
                >
                  {isCollapsed == 1 ? <MdGroupAdd /> : "Register"}
                </div>
              </Link>
              <hr />
            </>}

            {/* sign out button */}
            <>
              <button onClick={clickLogout} key={"/signout"}>
                <div
                  className={`overflow-hidden py-3 w-full text-center rounded-xl hover:bg-blue-500 hover:text-white flex justify-center `}
                >
                  {isCollapsed == 1 ? <FaSignOutAlt /> : "sign-out"}
                </div>
              </button>
              <hr />
            </>
          </div>
        </div>

        <div
          className={`md:w-full sm:w-full bg-blue-50 p-4 h-screen ${
            isCollapsed == 1 ? "w-[90%]" : "w-[80%]"
          } overflow-y-auto `}
        >
          <div className="flex flex-col w-full items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
