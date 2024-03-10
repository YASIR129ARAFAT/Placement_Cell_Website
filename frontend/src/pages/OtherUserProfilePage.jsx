import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { IoReturnDownBack } from "react-icons/io5";

import Sidebar from "../components/Sidebar";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails";
import { getUserData } from "../services/getUserData.services";
import { useParams, useNavigate } from "react-router-dom";
import UserInfoCard from "../components/UserInfoCard.jsx";
import { Link } from "react-router-dom";

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
        {/* <Button
          className={"text-gray-950 font-extrabold border-none w-6 bg-primary-50 px-1 hover:bg-blue-200"}
          type="button"
          onClick={() => {
            navigate(`/alluser`);
          }}
        >
          &#8249;
        </Button> */}
        <Link
            className="rounded-2xl m-2 p-2 "
            to={`/alluser`}
          >
            <IoReturnDownBack className=" size-5 hover:text-white  hover:bg-blue-700 rounded-md" />
          </Link>
        <UserInfoCard userData={userData}></UserInfoCard>
      </div>
    </Sidebar>
  );
}

export default otherUserProfilePage;
