import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IoReturnDownBack } from "react-icons/io5";

import Input from "../components/Input.jsx";
import Label from "../components/Label.jsx";
import Button from "../components/Button.jsx";
import TextArea from "../components/TextArea.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";

function alphaOpenning() {
  const initialRegistrationErrorMessage = {
    companyError: "",
    durationError: "",
    stipendError: "",
    cgpaCriteriaError: "",
    locationError: "",
    applicationDeadlineError: "",
    branchesAllowedError: "",
    additionInfoError: "",
  };
  const initialRegistrationFormData = {
    company: "",
    duration: "",
    stipend: "",
    cgpaCriteria: "",
    location: "",
    branchesAllowed: "",
    applicationDeadline: "",
    additionInfo: "",
  };

  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});

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
  }, []);

  const [errorMessage, setErrorMessage] = useState(
    initialRegistrationErrorMessage
  );
  const [formData, setFormData] = useState(initialRegistrationFormData);
  const [successMessage, setSuccessMessage] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
    } catch (error) {
      console.log("error from log:", error);
    }
  }

  setTimeout(() => {
    setSuccessMessage("");
  }, 5000);

  const handleChange = (e) => {
    console.log(formData);
    // console.log("formData");

    setFormData({ ...formData, [e.target.name]: e.target.value });

    const new_key = e.target.name + "Error";
    setErrorMessage({ ...errorMessage, [new_key]: "" });
  };
  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <section className="mt-10 w-full pt-10 bg-blue-50 dark:bg-gray-900">
        <div className=" ml-4">
          <Link className="rounded-2xl m-2 p-2 " to={`/openings`}>
            <IoReturnDownBack className=" size-5 hover:text-white  hover:bg-blue-700 rounded-md" />
          </Link>
        </div>
        <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-max lg:py-0">
          <Link
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Add New Opening
          </Link>
          {successMessage !== "" && (
            <p className="mt-2 mb-2 text-base text-red-600 dark:text-red-500">
              <span className="font-medium">hurrrayy!</span> {successMessage}
            </p>
          )}
          <div className="w-[80%] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className=" w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1> */}
              <form
                className="w-full space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
              >

                  <div>
                    <Label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Company Name
                    </Label>
                    <Input
                      type="text"
                      name="company"
                      id="company"
                      value={formData?.company}
                      onChange={handleChange}
                      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="eg: Atlassian"
                    />
                    {errorMessage.companyError !== "" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {errorMessage.companyError}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="duration"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Duration
                    </Label>
                    <Input
                      type="textArea"
                      name="duration"
                      id="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="6 months + full time"
                    />
                    {errorMessage.durationError !== "" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {errorMessage.durationError}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="stipend"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Stipend
                    </Label>
                    <Input
                      type="text"
                      name="stipend"
                      value={formData.stipend}
                      id="stipend"
                      onChange={handleChange}
                      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="25 lpa"
                    />
                    {errorMessage.stipendError !== "" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {errorMessage.stipendError}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Location
                    </Label>
                    <Input
                      type="text"
                      name="location"
                      value={formData.location}
                      id="location"
                      onChange={handleChange}
                      placeholder="Bengaluru"
                      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errorMessage.locationError !== "" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {errorMessage.locationError}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="cgpaCriteria"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CGPA Criteria
                    </Label>
                    <TextArea
                      type="text"
                      name="cgpaCriteria"
                      id="cgpaCriteria"
                      value={formData.cgpaCriteria}
                      onChange={handleChange}
                      placeholder="7.5 or above"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                    />
                    {errorMessage.cgpaCriteriaError !== "" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {errorMessage.cgpaCriteriaError}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="mobile"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Deadline
                    </Label>
                    <Input
                      type="text"
                      name="applicationDeadline"
                      id="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleChange}
                      placeholder="eg. 7382976363"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                    />
                    {errorMessage.applicationDeadlineError !== "" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {errorMessage.applicationDeadlineError}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="dob"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Branches Allowed
                    </Label>
                    <Input
                      type="text"
                      name="branchesAllowed"
                      id="branchesAllowed"
                      value={formData.branchesAllowed}
                      onChange={handleChange}
                      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="IT, ECE"
                    />
                    {errorMessage.branchesAllowedError !== "" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {errorMessage.branchesAllowedError}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="additionInfo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Addition Details
                    </Label>
                    <TextArea
                      type="text"
                      name="additionInfo"
                      id="additionInfo"
                      value={formData.additionInfo}
                      onChange={handleChange}
                      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errorMessage.additionInfoError !== "" && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oops!</span>{" "}
                        {errorMessage.additionInfoError}
                      </p>
                    )}
                  </div>


                <Button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add Openning
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Sidebar>
  );
}

export default alphaOpenning;
