import React from "react";
import MessageCard from "./MessageCard";

function Comments({ commentsArray, className = "" }) {
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
            <div key={obj?.commentorId} className="flex justify-center w-full mb-2">
              <MessageCard obj={obj} className="rounded-none"></MessageCard>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Comments;
