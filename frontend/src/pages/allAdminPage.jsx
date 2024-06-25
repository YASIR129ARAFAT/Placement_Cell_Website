import React from "react";
import ProfileCard from "../components/ProfileCard.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useState,useEffect } from "react";
import { getAllAdmins } from "../services/getAllAdmins.services.js";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import { useNavigate } from "react-router-dom";
function AllUsersPage({ className = "" }) {

  const [allAdmins, setAllAdmins] = useState([]);
  const [loggedInUserDetails,setLoggedInUserDetails] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    async function loadAllAdmins (){
      try {
        const data = await getAllAdmins()
        console.log("all admins ");
        // console.log(data);
        if(data?.success === 0){
          navigate(`/errorPage/${data?.message}`)
        }else{
          setAllAdmins(data);
        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal error occured`)
      }
    }
    loadAllAdmins()

    async function loadLoggedInUserDetails(){
      try {
        const data = await getLoggedInUserDetails();
        if(data?.success === 0){
          navigate(`/errorPage/${data?.message}`)
        }
        else{
          setLoggedInUserDetails(data)
        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal error occured`)
      }
    }
    loadLoggedInUserDetails()
  }, []);

  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <div
        className={`mx-auto justify-center mt-20 bg-blue-50 flex flex-row flex-wrap ${className}`}
      >
        {allAdmins.map((ele,ind) => {
          return (
            <ProfileCard key={ind} userData={ele} className="ml-16 mb-4"></ProfileCard>
          );
        })}
      </div>
    </Sidebar>
  );
}

export default AllUsersPage;
