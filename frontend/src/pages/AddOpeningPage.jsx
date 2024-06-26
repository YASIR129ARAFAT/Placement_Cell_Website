import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Spinner from "../components/Spinner.jsx";
import Sidebar from "../components/Sidebar";


import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails";
import { addOpening } from "../services/addOpening.services.js";

const AddOpeningPage = () => {
  const [offerType, setOfferType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [internshipDuration, setInternshipDuration] = useState("");
  const [stipendPerMonth, setStipendPerMonth] = useState("");
  const [ctc, setCtc] = useState("");
  const [location, setLocation] = useState("");
  const [branchesAllowed, setBranchesAllowed] = useState([]);
  const [cgpaCriteria, setCgpaCriteria] = useState([]);
  const [testDateAndTime, setTestDateAndTime] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [formLink, setFormLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const[loading,setLoading] = useState(0);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});

  const intialErrorMessage = {
    offerTypeError: "",
    companyNameError: "",
    internshipDurationError: "",
    stipendPerMonthError: "",
    ctcError: "",
    locationError: "",
    branchesAllowedError: "",
    cgpaCriteriaError: "",
    testDateAndTimeError: "",
    applicationDeadlineError: "",
    formLinkError:"",
    additionalInfoError: "",
  };
  const [errorMessage, setErrorMessage] = useState(intialErrorMessage);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate()

  const handleOfferTypeChange = (e) => {
    setOfferType(e.target.value);
    // console.log(offerType);
  };
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, companyNameError: "" };
    });
  };

  const handleInternshipDurationChange = (e) => {
    setInternshipDuration(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, internshipDurationError: "" };
    });
  };

  const handleStipendPerMonthChange = (e) => {
    setStipendPerMonth(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, stipendPerMonthError: "" };
    });
  };

  const handleCtcChange = (e) => {
    setCtc(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, ctcError: "" };
    });
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, locationError: "" };
    });
  };

  const handleBranchesAllowedChange = (e) => {
    setBranchesAllowed(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, branchesAllowedError: "" };
    });
  };

  const handleCgpaCriteriaChange = (index, branch, cgpa) => {
    const updatedCgpaCriteria = [...cgpaCriteria];
    updatedCgpaCriteria[index] = { branch, cgpa };
    setCgpaCriteria(updatedCgpaCriteria);
    setErrorMessage((prev) => {
      return { ...prev, cgpaCriteriaError: "" };
    });
  };

  const addCgpaCriteriaField = () => {
    setCgpaCriteria([...cgpaCriteria, { branch: "", cgpa: "" }]);
  };

  const removeCgpaCriteriaField = (index) => {
    const updatedCgpaCriteria = [...cgpaCriteria];
    updatedCgpaCriteria.splice(index, 1);
    setCgpaCriteria(updatedCgpaCriteria);
    setErrorMessage((prev) => {
      return { ...prev, cgpaCriteriaError: "" };
    });
  };

  const handleApplicationDeadlineChange = (e) => {
    setApplicationDeadline(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, applicationDeadlineError: "" };
    });
  };
  const handleTestDateAndTimeChange = (e) => {
    setTestDateAndTime(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, testDateAndTimeError: "" };
    });
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, additionalInfoError: "" };
    });
  };
  const handleFormLinkChange = (e) => {
    setFormLink(e.target.value);
    setErrorMessage((prev) => {
      return { ...prev, formLinkError: "" };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("inside handler");

    try {
      setLoading(1);
      const data = await addOpening({
        companyName,
        offerType,
        internshipDuration,
        stipendPerMonth,
        ctc,
        location,
        branchesAllowed,
        cgpaCriteria,
        testDateAndTime,
        applicationDeadline,
        formLink,
        additionalInfo,
      });
      setLoading(0);
      
      // console.log("data from handler", data);

      if (data?.success === 0) {
        setErrorMessage((prev) => {
          return { ...prev, ...data?.error };
        });
      } else {
        setOfferType("");
        setCompanyName("");
        setInternshipDuration("");
        setStipendPerMonth("");
        setCtc("");
        setLocation("");
        setBranchesAllowed([]);
        setCgpaCriteria([]);
        setTestDateAndTime("");
        setApplicationDeadline("");
        setFormLink("");
        setAdditionalInfo("");

        setSuccessMessage("Added Successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log("from handleSubmit of add opening", error);
    }
  };

  useEffect(() => {
    async function loadLoggedInUserDetails() {
      try {
        const data = await getLoggedInUserDetails();
        console.log("front end: ",data);
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
  }, []);

  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      {successMessage !== "" && (
        <p className=" sticky top-20 bg-green-100 w-full p-2 ml-4 flex flex-row text-black dark:text-black">
          <IoMdDoneAll size={20} color="green" />
          {successMessage}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-20 w-[50%] mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <div className="flex flex-col text-blue-700 text-xl items-center">
          Add Opening
        </div>
        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-gray-700 font-bold mb-2"
          >
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={companyName}
            onChange={handleCompanyNameChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600 mb-2"
          />
          {errorMessage.companyNameError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.companyNameError}
            </p>
          )}
          <label
            htmlFor="offerType"
            className="block text-gray-700 font-bold mb-2"
          >
            Offer Type:
          </label>
          <select
            id="offerType"
            value={offerType}
            onChange={handleOfferTypeChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
          >
            <option value="">Select Offer Type</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship + Full-time">
              Internship + Full-time
            </option>
          </select>
          {errorMessage.offerTypeError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.offerTypeError}
            </p>
          )}
        </div>

        {(offerType === "Internship" ||
          offerType === "Internship + Full-time") && (
          <div className="mb-4">
            <label
              htmlFor="internshipDuration"
              className="block text-gray-700 font-bold mb-2"
            >
              Internship Duration:
            </label>
            <input
              id="internshipDuration"
              type="number"
              value={internshipDuration}
              onChange={handleInternshipDurationChange}
              placeholder="in months"
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
            />
            {errorMessage.internshipDurationError !== "" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span>{" "}
                {errorMessage.internshipDurationError}
              </p>
            )}
          </div>
        )}

        {(offerType === "Internship" ||
          offerType === "Internship + Full-time") && (
          <div className="mb-4">
            <label
              htmlFor="stipendPerMonth"
              className="block text-gray-700 font-bold mb-2"
            >
              Stipend Per Month:
            </label>
            <input
              id="stipendPerMonth"
              type="number"
              value={stipendPerMonth}
              onChange={handleStipendPerMonthChange}
              placeholder="In thousands per month"
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
            />
            {errorMessage.stipendPerMonthError !== "" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span>{" "}
                {errorMessage.stipendPerMonthError}
              </p>
            )}
          </div>
        )}

        {(offerType === "Full-time" ||
          offerType === "Internship + Full-time") && (
          <div className="mb-4">
            <label htmlFor="ctc" className="block text-gray-700 font-bold mb-2">
              CTC:
            </label>
            <input
              id="ctc"
              type="number"
              value={ctc}
              onChange={handleCtcChange}
              placeholder="In LPA"
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
            />
            {errorMessage.ctcError !== "" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span>{" "}
                {errorMessage.ctcError}
              </p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location:
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder={`'Not Specified' if not specified`}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
          />
          {errorMessage.locationError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.locationError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="branchesAllowed"
            className="block text-gray-700 font-bold mb-2"
          >
            Branches Allowed (comma-separated):
          </label>
          <input
            id="branchesAllowed"
            type="text"
            value={branchesAllowed}
            onChange={handleBranchesAllowedChange}
            placeholder="Ex: IT,ECE,IT-BI"
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
          />
          {errorMessage.branchesAllowedError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.branchesAllowedError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">CGPA Criteria:</h3>
          {cgpaCriteria.map((criteria, index) => {
            return (
              <div key={index} className="flex items-center mb-2">
                <div className="mr-4">
                  <label
                    htmlFor={`branch-${index}`}
                    className="block text-gray-700 font-bold"
                  >
                    Branch:
                  </label>
                  <input
                    id={`branch-${index}`}
                    type="text"
                    value={criteria.branch}
                    onChange={(e) =>
                      handleCgpaCriteriaChange(
                        index,
                        e.target.value,
                        criteria.cgpa
                      )
                    }
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
                  />
                </div>
                <div className="mr-4">
                  <label
                    htmlFor={`cgpa-${index}`}
                    className="block text-gray-700 font-bold"
                  >
                    CGPA:
                  </label>
                  <input
                    id={`cgpa-${index}`}
                    type="number"
                    step="0.01"
                    value={criteria.cgpa}
                    onChange={(e) =>
                      handleCgpaCriteriaChange(
                        index,
                        criteria.branch,
                        e.target.value
                      )
                    }
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCgpaCriteriaField(index)}
                  className="mt-6 bg-red-400 hover:bg-red-700 text-white font-bold p-2 rounded"
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={addCgpaCriteriaField}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            Add CGPA Criteria
          </button>
          {errorMessage.cgpaCriteriaError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.cgpaCriteriaError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="formLink"
            className="block text-gray-700 font-bold mb-2"
          >
            Form Link:
          </label>
          <input
            id="formLink"
            type="text"
            value={formLink}
            onChange={handleFormLinkChange}
            placeholder="enter form link"
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
          />
          {errorMessage.formLinkError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.formLinkError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="applicationDeadline"
            className="block text-gray-700 font-bold mb-2"
          >
            Application Deadline:
          </label>
          <input
            id="applicationDeadline"
            type="datetime-local"
            value={applicationDeadline}
            onChange={handleApplicationDeadlineChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
          />
          {errorMessage.applicationDeadlineError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.applicationDeadlineError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="testDateAndTime"
            className="block text-gray-700 font-bold mb-2"
          >
            Test date and Time:
          </label>
          <input
            id="testDateAndTime"
            type="datetime-local"
            value={testDateAndTime}
            onChange={handleTestDateAndTimeChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
          />
          {errorMessage.testDateAndTimeError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.testDateAndTimeError}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="additionalInfo"
            className="block text-gray-700 font-bold mb-2"
          >
            Additional Information:
          </label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={handleAdditionalInfoChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
          />
          {errorMessage.additionalInfoError !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span>{" "}
              {errorMessage.additionalInfoError}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            <div className="flex flex-row justify-center">
                  <Spinner text={"Add Opening"} loading={loading} ></Spinner>
                </div>
          </button>
        </div>
      </form>
    </Sidebar>
  );
};

export default AddOpeningPage;
