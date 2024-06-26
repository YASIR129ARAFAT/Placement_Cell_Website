import profilePic from "../assets/images.png";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
function ProfileCard({ userData, loggedInUserDetails, className = "" }) {
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <div
      href="#"
      className={`ml-4 mt-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${className}`}
    >
      <img
        className="p-4 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-40 md:rounded-full md:rounded-s-full"
        src={userData?.image || `https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg`}
        alt="ef"
      />
      <div className="mt-2 flex flex-col justify-between p-3 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {userData?.name}
        </h5>
        <p className="mb-1 font-normal text-black dark:text-gray-400">
          {userData?.email}
        </p>
        <p className="mb-1 font-sans text-base text-black dark:text-gray-400">
          <b className="text-base">Enrolment No:</b> {userData?.enrolmentNo}
        </p>
        <p className="mb-1 font-sans text-base text-black dark:text-gray-400">
          {userData?.isAdmin === true ? (
            <b className="text-base text-red-500">Admin</b>
          ) : (
            <b className="text-base text-green-500">Student</b>
          )}
        </p>
        <div className="mt-7 flex flex-row flex-wrap">
          <button
            onClick={() => {
              navigate(`/otheruserprofile/${userData?._id}`);
            }}
            type="button"
            className="text-white bg-[#2563EB] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-sans rounded-lg text-sm px-2  py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Profile
          </button>

          <button
            type="button"
            className="text-white bg-[#2563EB] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
