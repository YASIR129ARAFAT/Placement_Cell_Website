import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import UserInfoCard from "../components/UserInfoCard";
import { getUserData } from "../services/getUserData.services.js";
import { useParams } from "react-router-dom";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
function UserProfilePage() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function setData() {
      const data = await getLoggedInUserDetails();
      setUserData(data);
    }
    setData();
  }, []);
  return (
    <>
      <Sidebar loggedInUserDetails={userData} >
        <UserInfoCard userData={userData}></UserInfoCard>
      </Sidebar>
    </>
  );
}

export default UserProfilePage;


