import React from "react";
import ProfileCard from "../components/ProfileCard.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useState,useEffect } from "react";
import { getAllAdmins } from "../services/getAllAdmins.services.js";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";

function AllUsersPage({ className = "" }) {

  const [allAdmins, setAllAdmins] = useState([]);
  const [loggedInUserDetails,setLoggedInUserDetails] = useState({});
  
  useEffect(() => {
    async function loadAllAdmins (){
      try {
        const data = await getAllAdmins()
        setAllAdmins(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadAllAdmins()

    async function loadLoggedInUserDetails(){
      try {
        const data = await getLoggedInUserDetails();
        setLoggedInUserDetails(data)
      } catch (error) {
        console.log(error);
      }
    }
    loadLoggedInUserDetails()
  }, []);

  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <div
        className={`mx-auto justify-center mt-20 bg-blue-50 flex flex-row flex-wrap ${className}`}
      >
        {allAdmins.map((ele) => {
          return (
            <ProfileCard userData={ele} className="ml-16 mb-4"></ProfileCard>
          );
        })}
      </div>
    </Sidebar>
  );
}

export default AllUsersPage;
