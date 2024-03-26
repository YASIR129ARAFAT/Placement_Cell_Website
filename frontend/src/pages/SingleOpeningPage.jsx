import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import SingleOpening from "../components/SingleOpening.jsx";
import WriteComment from "../components/WriteComment.jsx";
import Comments from "../components/Comments";
import { getAllComments } from "../services/getAllComments.services.js";
import { handleClick } from "../handlers/singleOpeningPage.handler.js";
import { useParams } from "react-router-dom";
function SingleOpeningPage() {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [comments, setComments] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { _id } = useParams();
  const id = _id;
  useEffect(() => {
    async function loadLoggedInUserDetails() {
      try {
        const data = await getLoggedInUserDetails();
        setLoggedInUserDetails(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadLoggedInUserDetails();
    async function loadAllComments(id) {
      try {
        const data = await getAllComments(id);
        setAllComments(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadAllComments(id);
  }, []);
  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <div
        className={`h-full mt-20 lg:w-[70%] flex md:w-full sm:w-[100%] justify-center rounded-lg p-4`}
      >
        <SingleOpening>
          <WriteComment
            value={comments}
            setValue={setComments}
            handleClick={(e) => {
              handleClick(e, comments, setComments, setAllComments, id);
            }}
          ></WriteComment>
        </SingleOpening>
      </div>
      <Comments
        commentsArray={allComments}
        className="mt-10 lg:w-[68%] sm:w-full md:w-full"
      ></Comments>
    </Sidebar>
  );
}

export default SingleOpeningPage;
