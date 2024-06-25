import React, { useEffect } from "react";
import MessageCard from "../components/MessageCard";
import Sidebar from "../components/Sidebar";
import WriteComment from "../components/WriteComment";

import { BiSolidCommentDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {useHistory} from 'react-router-dom'

import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import { getAllAnnouncements } from "../services/getAllAnnouncements.services.js";
import { postAnnouncement } from "../services/postAnnouncements.services.js";
import { deleteAnnouncement } from "../services/deleteAnnouncement.services.js";

function AllAnnouncement({ className = "" }) {
  // const history = useHistory();
  const [value, setValue] = useState(""); // this is to set value of comments
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [loggedInUser, setLoggedInUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function setData() {
      try {
        const data = await getLoggedInUserDetails();
        // console.log(data);
        if (data?.success === 0) {
          navigate(`/errorPage/${data?.message}`);
        } else {
          setLoggedInUserDetails(data);
        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal server error`);
      }
    }
    setData();

    async function loadAllAnnouncements() {
      try {
        const data = await getAllAnnouncements();
        if (data?.success === 0) {
          navigate(`/errorPage/${data?.message}`);
        } else {
          setAllAnnouncements(data);
          // console.log(data);
        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal server error`);
      }
    }
    loadAllAnnouncements();
  }, []); // use effect must not be given an async function or promise returning function directly

  return (
    <>
      <Sidebar loggedInUserDetails={loggedInUser}>
        <div
          className={`h-full mt-20 lg:w-[60%] md:w-full sm:w-full rounded-lg p-4`}
        >
          {allAnnouncements.map((obj) => {
            obj.isResultsAnnouncement = 1;

            const handleClick = () => {
              //send to page /singleannouncement/:_id
              navigate(`/singleannouncement/${obj?._id}`);
            }; // this is for comment button
            return (
              <MessageCard obj={obj} className="w-full" key={obj?._id}>
                <div className="flex flex-row">
                  <button
                    className="mt-4 "
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <BiSolidCommentDetail color="grey" size={20} />
                  </button>

                  {/* delete and update button should be visible to the one who made the announcement */}
                  {loggedInUser?._id === obj?.writer?._id && (
                    <>
                      <button
                        className="mt-4 ml-2"
                        onClick={(e) => {
                          e.preventDefault();
                          // editOnClick(obj?._id);
                          const id = obj?._id;
                          navigate(`/editAnnouncement/${id}`);
                        }}
                      >
                        <RiEdit2Fill color="green" size={20} />
                      </button>
                      <button
                        className="mt-4 ml-2"
                        onClick={(e) => {
                          e.preventDefault();
                          // deleteOnClick(obj?._id);
                          deleteAnnouncement(obj?._id, setAllAnnouncements);
                        }}
                      >
                        <MdDelete color="red" size={20} />
                      </button>
                    </>
                  )}
                </div>
              </MessageCard>
            );
          })}
        </div>
      </Sidebar>
      {/* if user is admin then show the option to write announcement */}
      {loggedInUser?.isAdmin && (
        <div className="sticky bottom-0 left-0 bg-blue-50 w-full flex justify-center pb-4 border border-t-2 border-blue-700 ">
          <WriteComment
            value={value}
            setValue={setValue}
            className="w-[60%]"
            handleClick={(e) => {
              postAnnouncement(e, setValue, value, setAllAnnouncements);
            }}
          ></WriteComment>
        </div>
      )}
    </>
  );
}

export default AllAnnouncement;
