import React, { useEffect, useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";

import EditAnnouncementForm from "../components/editAnnouncementForm";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import getSingleAnnouncementData from "../services/getSingleAnnouncementData.services.js";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  handleChange,
  handleClick,
} from "../handlers/editAnnouncementForm.handler";

function EditAnnouncementsPage() {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [announcement, setAnnouncement] = useState({});
  const { id } = useParams(); // id of the announcement
  const navigate = useNavigate();
  // console.log("id from edit annc page",id);

  useEffect(() => {
    async function setData() {
      const data = await getLoggedInUserDetails();
      setLoggedInUserDetails(data);
    }
    setData();

    async function f() {
      try {
        setAnnouncement(await getSingleAnnouncementData(id));
      } catch (error) {
        console.log(error);
      }
    }
    f();
  }, [id]);
  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <div className="mt-20 w-full">
        {/**since height of nav in side bar is 20 and we need the back button jut below it */}
        {/* <Button
          className=" text-black font-extrabold border-none w-[1/2] bg-blue-50 px-1 hover:bg-blue-200"
          type="button"
          onClick={() => {
            navigate("/allannouncements");
          }}
        >
          &#8249;
        </Button> */}
        <Link
            className="rounded-2xl p-2 "
            to={`/allannouncements`}
          >
            <IoReturnDownBack className=" size-5 hover:text-white  hover:bg-blue-700 rounded-md" />
          </Link>
        <EditAnnouncementForm
          announcement={announcement}
          handleChange={handleChange}
          handleClick={handleClick}
        ></EditAnnouncementForm>
      </div>
    </Sidebar>
  );
}

export default EditAnnouncementsPage;
