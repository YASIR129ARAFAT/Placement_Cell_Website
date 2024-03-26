import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BiSolidCommentDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import SingleOpening from "../components/SingleOpening.jsx";

import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails";
import { getAllOpenings } from "../services/getAllOpenings.services";
import { deleteOpening } from "../services/deleteOpening.services.js";

function OpeningsPage({ className = "" }) {
  const navigate = useNavigate();
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [openings, setOpenings] = useState([]);

  const handleClickComment = (_id) => {
    navigate(`/singleOpening/${_id}`);
  };
  const handleClickDelete = async (e, _id) => {
    e.preventDefault();
    // console.log("Delete");
    try {
      const data = await deleteOpening(_id);
      const newOpenings = openings.filter((ele) => {
        return ele?._id !== _id;
      });
      setOpenings(newOpenings);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickEdit = (e) => {
    e.preventDefault();
    // console.log("Edit");
  };
  const handleClick2 = (e) => {
    navigate("/addOpening");
  };

  const handleClickAddSelections = (_id) => {
    navigate(`/addSelections/${_id}`); // id of the opening
  };

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

    async function loadOpenings() {
      try {
        const data = await getAllOpenings();
        // console.log(data);
        setOpenings(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadOpenings();
  }, []);

  return (
    <>
      <Sidebar loggedInUserDetails={loggedInUserDetails} className="mb-0 pb-0">
        <>
          {" "}
          <div className={`h-full mt-20 w-[70%] rounded-lg p-4`}>
            {openings.map((pp) => {
              pp.isResultsAnnouncement = 0;
              return (
                <SingleOpening key={pp?._id} obj={pp} className="w-full">
                  <div className="flex flex-row justify-between">
                    {/* //comment */}
                    <div className="flex flex-row">
                      <button
                        className="mt-4 p-0 m-0"
                        onClick={() => {
                          handleClickComment(pp?._id);
                        }}
                      >
                        <BiSolidCommentDetail color="grey" size={24} />
                      </button>

                      {/* //delete */}
                      <button
                        className="mt-4 p-0 m-0 ml-2"
                        onClick={(e) => {
                          handleClickDelete(e, pp?._id);
                        }}
                      >
                        <MdDelete color="red" size={24} />
                      </button>

                      {/* //edit */}
                      <button
                        className="mt-4 p-0 m-0 ml-2"
                        onClick={handleClickEdit}
                      >
                        <RiEdit2Fill color="darkgreen" size={24} />
                      </button>
                    </div>
                      
                      {/* add selections */}
                    <button
                      className="mt-4 p-0 m-0 ml-2"
                      onClick={(e) => {
                        handleClickAddSelections(pp?._id); // id of the opening
                      }}
                    >
                      <AiOutlineUsergroupAdd color="darkblue" size={24} />
                    </button>
                  </div>
                </SingleOpening>
              );
            })}
          </div>
          {loggedInUserDetails?.isAdmin === true ? (
            <div className="ml-[87%] sticky bottom-0 bg-blue-50 left-0 w-[10%] flex justify-center pb-4 rounded-full">
              <Button onClick={handleClick2} className="rounded-xl">
                +
              </Button>
            </div>
          ) : (
            ""
          )}
        </>
      </Sidebar>
    </>
  );
}

export default OpeningsPage;
