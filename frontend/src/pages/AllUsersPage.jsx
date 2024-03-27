import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar.jsx";

import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import { getAllUsers } from "../services/getAllUsers.services.js";

import { useNavigate } from "react-router-dom";
function AllUsersPage({ className = "" }) {
  const [allUsersData, setAllUsersData] = useState([]);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function setData() {
      try {
        const data = await getLoggedInUserDetails();

        if (data?.success === 0) {
          navigate(`/errorPage/${data?.message}`);
        } else {
          setLoggedInUserDetails(data);
        }
      } catch (error) {
        console.log(error);
        navigate('/errorPage/internal server error')
      }
    }
    setData();

    async function loadAllUsers(getAdminsOnly) {
      try {
        const data = await getAllUsers(getAdminsOnly);

        if (data?.success === 0) {
          navigate(`/errorPage/${data?.message}`);
        } else {
          setAllUsersData(data);
        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal server error`);
      }
    }
    loadAllUsers(false); // i want all users including the admins
  }, []);

  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <div
        className={`mx-auto justify-center mt-20 bg-blue-50 flex flex-row flex-wrap ${className}`}
      >
        {allUsersData.map((ele) => {
          return (
            <ProfileCard
              loggedInUserDetails={loggedInUserDetails}
              userData={ele}
              className="ml-16 mb-4"
            ></ProfileCard>
          );
        })}
      </div>
    </Sidebar>
  );
}

export default AllUsersPage;
