import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import { getAllSelections } from "../services/getAllSelections.services.js";
import { handleDelete } from "../handlers/AllSelectionsPage.handler.js";

function AllSelectionsPage() {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [allSelections, setAllSelections] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    async function loadLoggedInUserDetails() {
      try {
        const data = await getLoggedInUserDetails();
        if(data?.success === 0){
          navigate(`/errorPage/${data?.message}`)
        }else{
          setLoggedInUserDetails(data);

        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal server error`)
      }
    }
    loadLoggedInUserDetails();

    async function loadAllSelections() {
      try {
        const data = await getAllSelections();
        // console.log("lll", data);
        if(data?.success === 0){
          navigate(`/errorPage/${data?.message}`)
        }
        else{
          setAllSelections(data?.newSelection);
        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal server error`)
      }
    }
    loadAllSelections();
  }, []);

  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      {successMessage !== "" && (
        <p className=" sticky top-20 bg-green-100 w-full p-2 ml-4 flex flex-row text-black dark:text-black">
          <IoMdDoneAll size={20} color="green" />
          {successMessage}
        </p>
      )}
      {errorMessage !== "" && (
        <p className=" sticky top-20 bg-red-100 w-full p-2 ml-4 flex flex-row text-black dark:text-black">
          <RxCross2 size={20} color="red" />
          {errorMessage}
        </p>
      )}
      <div className=" shadow-md sm:rounded-lg mt-28 w-full">
      <div className="mb-8 flex justify-center text-xl"><b>Placed Students</b></div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Enrolment No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Branch
              </th>
              <th scope="col" className="px-6 py-3">
                Company Name
              </th>
              <th scope="col" className="px-6 py-3">
                Offer Type
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          {allSelections.length > 0
            ? allSelections.map((ele) => {
                return (
                  <tbody key={ele?.studentDetails?._id}>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {ele?.studentDetails?.enrolmentNo}
                      </th>
                      <td className="px-6 py-4">
                        {" "}
                        {ele?.studentDetails?.name}
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        {ele?.studentDetails?.branch?.branchCode}
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        {ele?.companyDetails?.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {ele?.companyDetails?.offerType}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            handleDelete(ele?._id,allSelections,setAllSelections,setSuccessMessage,setErrorMessage);
                          }}
                        >
                          <MdDelete size={24}></MdDelete>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            : ""}
        </table>
        {allSelections.length === 0 && (
          <h1 className="text-red-700 text-3xl flex justify-center items-center">
            No selections yet
          </h1>
        )}
      </div>
    </Sidebar>
  );
}

export default AllSelectionsPage;
