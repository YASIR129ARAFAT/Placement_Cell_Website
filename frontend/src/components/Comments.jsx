import React, { useState } from "react";
import MessageCard from "./MessageCard";
import { MdDelete } from "react-icons/md";
import { deleteComment } from "../services/deleteComment.services.js";
function Comments({ commentsArray, setAllComments, className = "" }) {
  // const [commentsArray2,setCommentsArray2] = useState(commentsArray)
  const handleClick = async(id)=>{
    try{
      const data = await deleteComment(id);
      // console.log("sjhdbhjsd",data?.success);
      if(data?.success === 1){
        // console.log("innn");
        const filteredCommentsArray = commentsArray.filter((ele)=>{
          return ele?._id !== id;
        })
        setAllComments(filteredCommentsArray)
      }
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div
      className={`w-[80%] flex flex-col justify-center rounded-lg border border-gray-200 bg-white  ${className}`}
    >
      <div className="mb-0 flex justify-center w-full p-2">
        <b>Comments</b>
      </div>
      <div className="w-full">
        {commentsArray.map((obj) => {
          obj.isResultsAnnouncement = 1;
          return (
            <div
              key={obj?.commentorId}
              className="flex flex-col justify-center w-full mb-2"
            >
              <MessageCard obj={obj} className="rounded-full p-0 m-0">
                <button
                  className="m-0 pt-2"
                  onClick={() => {
                    handleClick(obj?._id);
                  }}
                >
                  <MdDelete color="grey" size={20} />
                </button>
              </MessageCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
