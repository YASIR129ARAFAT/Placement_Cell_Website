import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails";

const AddOpeningPage = () => {
  const [offerType, setOfferType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [internshipDuration, setInternshipDuration] = useState("");
  const [stipendPerMonth, setStipendPerMonth] = useState("");
  const [ctc, setCtc] = useState("");
  const [location, setLocation] = useState("");
  const [branchesAllowed, setBranchesAllowed] = useState("");
  const [cgpaCriteria, setCgpaCriteria] = useState([{branch:"",cgpa:""}]);
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loggedInUserDetails,setLoggedInUserDetails] = useState({})

  const handleOfferTypeChange = (e) => {
    setOfferType(e.target.value);
    console.log(offerType);
  };
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleInternshipDurationChange = (e) => {
    setInternshipDuration(e.target.value);
  };

  const handleStipendPerMonthChange = (e) => {
    setStipendPerMonth(e.target.value);
  };

  const handleCtcChange = (e) => {
    setCtc(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleBranchesAllowedChange = (e) => {
    setBranchesAllowed(e.target.value);
  };

  const handleCgpaCriteriaChange = (index, branch, cgpa) => {
    const updatedCgpaCriteria = [...cgpaCriteria];
    updatedCgpaCriteria[index] = { branch, cgpa };
    setCgpaCriteria(updatedCgpaCriteria);
  };

  const addCgpaCriteriaField = () => {
    setCgpaCriteria([...cgpaCriteria, { branch: "", cgpa: "" }]);
  };

  const removeCgpaCriteriaField = (index) => {
    const updatedCgpaCriteria = [...cgpaCriteria];
    updatedCgpaCriteria.splice(index, 1);
    setCgpaCriteria(updatedCgpaCriteria);
  };

  const handleApplicationDeadlineChange = (e) => {
    setApplicationDeadline(e.target.value);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      companyName,
      offerType,
      internshipDuration,
      stipendPerMonth,
      ctc,
      location,
      branchesAllowed,
      cgpaCriteria,
      applicationDeadline,
      additionalInfo,
    });
  };

  useEffect(()=>{
    async function loadLoggedInUserDetails(){
      try {
        const data = await getLoggedInUserDetails()
        setLoggedInUserDetails(data)
      } catch (error) {
        console.log(error);
      }
    }
    loadLoggedInUserDetails()
  },[])

  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      <form
        onSubmit={handleSubmit}
        className="mt-20 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <div className="flex flex-col text-blue-700 text-xl items-center">Add Opening</div>
        <div className="mb-4">
        <label
            htmlFor="companyName"
            className="block text-gray-700 font-bold mb-2"
          >Company Name</label>
        <input 
            type="text"
            name="companyName"
            id="companyName"
            value={companyName}
            onChange={handleCompanyNameChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600 mb-2"
        />
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
            <option value="Internship+Full-time">Internship + Full-time</option>
          </select>
        </div>

        {(offerType === "Internship" ||
          offerType === "Internship+Full-time") && (
          <div className="mb-4">
            <label
              htmlFor="internshipDuration"
              className="block text-gray-700 font-bold mb-2"
            >
              Internship Duration:
            </label>
            <input
              id="internshipDuration"
              type="text"
              value={internshipDuration}
              onChange={handleInternshipDurationChange}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
            />
          </div>
        )}

        {(offerType === "Internship" ||
          offerType === "Internship+Full-time") && (
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
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
            />
          </div>
        )}

        {(offerType === "Full-time" ||
          offerType === "Internship+Full-time") && (
          <div className="mb-4">
            <label htmlFor="ctc" className="block text-gray-700 font-bold mb-2">
              CTC:
            </label>
            <input
              id="ctc"
              type="number"
              value={ctc}
              onChange={handleCtcChange}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
            />
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
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
          />
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
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Add Opening
          </button>
        </div>
      </form>
    </Sidebar>
  );
};

export default AddOpeningPage;
