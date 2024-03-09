import React, { useEffect } from "react";
import MessageCard from "../components/MessageCard";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import WriteComment from "../components/WriteComment";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {useHistory} from 'react-router-dom'

import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import { getAllResults } from "../services/getAllResults.services.js";
import { deleteAnnouncement } from "../services/deleteAnnouncement.services.js";
import { postResult } from "../services/postResult.services.js";


function AllAnnouncement({ className = "" }) {
  // const history = useHistory();
  const [value, setValue] = useState(""); // this is to set value of comments
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [loggedInUser, setLoggedInUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function setData() {
      const data = await getLoggedInUserDetails();
      setLoggedInUserDetails(data);
    }
    setData();

    async function loadAllAnnouncements() {
      const data = await getAllResults();
      setAllAnnouncements(data);
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
                  <Button
                    className="mt-4 "
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    Comment
                  </Button>

                  {/* delete and update button should be visible to the one who made the announcement */}
                  {loggedInUser?._id === obj?.announcer && (
                    <>
                      <Button
                        className="mt-4 ml-2 bg-green-500 hover:bg-green-600"
                        onClick={(e) => {
                          e.preventDefault();
                          // editOnClick(obj?._id);
                          const id = obj?._id;
                          navigate(`/editResults/${id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="mt-4 ml-2 bg-red-500 hover:bg-red-600"
                        onClick={(e) => {
                          e.preventDefault();
                          // deleteOnClick(obj?._id);
                          deleteAnnouncement(obj?._id, setAllAnnouncements);
                        }}
                      >
                        Delete
                      </Button>
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
              postResult(e, setValue, value, setAllAnnouncements);
            }}
          ></WriteComment>
        </div>
      )}
    </>
  );
}

export default AllAnnouncement;
