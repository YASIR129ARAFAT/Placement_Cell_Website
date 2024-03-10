import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import UserInfoCard from "../components/UserInfoCard";
import { TbSettings } from "react-icons/tb";

import { Link, useParams } from "react-router-dom";
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
        <UserInfoCard userData={userData}>
          <Link to={`/changePassword`} className="mt-2 "><TbSettings size={24}/></Link>
        </UserInfoCard>
        
      </Sidebar>
    </>
  );
}

export default UserProfilePage;


