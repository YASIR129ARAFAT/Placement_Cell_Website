import React, { useEffect, useState } from "react";
import MessageCard from "../components/MessageCard";
import WriteComment from "../components/WriteComment";
import Sidebar from "../components/Sidebar";
import Comments from "../components/Comments";
import axios from "axios";
import { useParams } from "react-router-dom";

import getSingleAnnouncementData from "../services/getSingleAnnouncementData.services.js";
import { getAllComments } from "../services/getAllComments.services.js";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";

import { handleClick } from "../handlers/singleAnnouncementPage.handler.js";

function SingleAnnouncement() {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [singleAnnouncement, setSingleAnnouncement] = useState(""); // single announcement from db
  const [allComments, setAllComments] = useState([{}]);

  const { _id } = useParams(); //single announcement id
  const id = _id;

  //taking out the comment value
  const [commentMessage, setCommentMessage] = useState(""); // the comment that you will write in comment box

  useEffect(() => {
    async function loadSingleAnnouncement(id) {
      try {
        const data = await getSingleAnnouncementData(id);
        setSingleAnnouncement({ isResultsAnnouncement: 1, ...data }); // to indicate that it is a comment box
      } catch (error) {
        console.log(error);
      }
    }
    loadSingleAnnouncement(id);

    async function loadAllComments(id) {
      try {
        const data = await getAllComments(id);
        setAllComments(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadAllComments(id);

    async function loggedInUser(){
      try {
        const data = await getLoggedInUserDetails();
        setLoggedInUserDetails(data);
      } catch (error) {
        console.log(error);
      }
    }
    loggedInUser();
  }, []);

  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <div
        className={`h-full mt-20 lg:w-[70%] flex md:w-full sm:w-[100%] justify-center rounded-lg p-4`}
      >
        <MessageCard obj={singleAnnouncement}>
          <WriteComment
            value={commentMessage}
            setValue={setCommentMessage}
            handleClick={(e)=>{
              handleClick(e,commentMessage,setCommentMessage,setAllComments,id)
            }}
          ></WriteComment>
        </MessageCard>
      </div>

      <Comments
        commentsArray={allComments}
        className="mt-10 lg:w-[68%] sm:w-full md:w-full"
      ></Comments>
    </Sidebar>
  );
}

export default SingleAnnouncement;
