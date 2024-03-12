import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import UserInfoCard from "../components/UserInfoCard";
import { SiGoogledocs } from "react-icons/si";

import { RiLockPasswordLine } from "react-icons/ri";


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
          <div className="flex flex-row mt-2">
          <Link to={`/changePassword`} className="mr-2"><RiLockPasswordLine size={24}/></Link>
          <Link to={`/resume`} className="ml-0 "><SiGoogledocs size={24}/></Link>
          </div>
        </UserInfoCard>
        
      </Sidebar>
    </>
  );
}

export default UserProfilePage;


