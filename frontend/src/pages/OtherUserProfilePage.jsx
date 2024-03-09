import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails";
import { getUserData } from "../services/getUserData.services";
import { useParams, useNavigate } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard.jsx";

function otherUserProfilePage() {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    async function setData() {
      try {
        let data = await getLoggedInUserDetails();
        setLoggedInUserDetails(data);

        // id of the user whose profile you want to view
        console.log(id);
        data = await getUserData(id);

        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
    setData();
  }, []);
  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <div className="mt-20 w-full">
        <Button
          className={"text-gray-950 font-extrabold border-none w-6 bg-primary-50 px-1 hover:bg-blue-200"}
          type="button"
          onClick={() => {
            navigate(`/alluser`);
          }}
        >
          &#8249;
        </Button>
        {/* <Button className="text-black font-extrabold w-40 bg-blue-100 hover:bg-blue-400">&#8249;</Button> */}
        <UserInfoCard userData={userData}></UserInfoCard>
      </div>
    </Sidebar>
  );
}

export default otherUserProfilePage;
