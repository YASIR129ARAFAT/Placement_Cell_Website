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
      <Sidebar loggedInUserDetails={userData}>
        <UserInfoCard userData={userData}>
          <div className="flex flex-row mt-2">
            <Link to={`/changePassword`} className="mr-2">
              <RiLockPasswordLine size={24} />
            </Link>
            <Link
              type="button"
              className=" text-base text-blue-700 "
              onClick={() => {
                let url = userData?.resume || "";
                if (!url) {
                  alert("No resume URL available");
                  return;
                }
                if (!url.startsWith("http://") && !url.startsWith("https://")) {
                  url = "http://" + url;
                }
                try {
                  window.open(url, "_blank", "noopener,noreferrer");
                } catch (error) {
                  console.error("Error opening URL:", error);
                  alert("Unable to open the resume. Please check the URL.");
                }
              }}
            >
              Resume
            </Link>
          </div>
        </UserInfoCard>
      </Sidebar>
    </>
  );
}

export default UserProfilePage;
