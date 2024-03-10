import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";

import Sidebar from "../components/Sidebar";

import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import { getUserData } from "../services/getUserData.services.js";
import {
  handleSubmit,
  handleChange,
} from "../handlers/updateUserData.handler.js";

function UpdateUserDataPage() {
  let navigate = useNavigate();

  const [formVal, setFormVal] = useState({
    email: "",
    dob: "",
    mobile: "",
  });

  const [error, setError] = useState({
    emailError: "",
    dobError: "",
    mobileError: "",
    otherError: "",
  });

  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function loadLoggedInUserDetails() {
      const data = await getLoggedInUserDetails();
      setLoggedInUserDetails(data);
    }
    loadLoggedInUserDetails();

    async function loadUserDetails() {
      const data = await getUserData(id);

      const dob = data?.dob;

      const formattedDate = dob.slice(0, 10);

      setFormVal({
        email: data?.email,
        mobile: data?.mobile,
        dob: formattedDate,
      });
    }
    loadUserDetails();
  }, []);
  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails} className="">
      <div className="w-full mt-20">
        <div className="mb-10 ml-4">
          {/* <Link
            className="hover:bg-blue-700 rounded-2xl m-2 p-2 hover:text-white"
            to={`/userprofile`}
          >
            &#8249;
          </Link> */}
          <Link
            className="rounded-2xl m-2 p-2 "
            to={`/userprofile`}
          >
            <IoReturnDownBack className=" size-5 hover:text-white  hover:bg-blue-700 rounded-md" />
          </Link>
        </div>
        <div className="flex flex-col items-center mb-10 text-2xl text-blue-800">
          Update Your Details
        </div>
        <form class="max-w-sm mx-auto">
          <div class="mb-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Your email"
              value={formVal?.email}
              onChange={(e) => {
                handleChange(e, setError, setFormVal);
              }}
            />
            {error?.emailError !== "" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {error?.emailError}
              </p>
            )}
          </div>
          <div class="mb-5">
            <label
              for="mobile"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mobile No
            </label>
            <input
              type="string"
              id="mobile"
              name="mobile"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formVal?.mobile}
              onChange={(e) => {
                handleChange(e, setError, setFormVal);
              }}
              placeholder="Enter Your Mobile no"
            />
            {error?.mobileError !== "" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {error?.mobileError}
              </p>
            )}
          </div>
          <div class="mb-5">
            <label
              for="dob"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formVal?.dob}
              onChange={(e) => {
                handleChange(e, setError, setFormVal);
              }}
            />
            {error?.dobError !== "" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span> {error?.dobError}
              </p>
            )}
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              handleSubmit(e, id, formVal, error, setError, navigate);
            }}
          >
            Update Details
          </button>
        </form>
      </div>
    </Sidebar>
  );
}
export default UpdateUserDataPage;
