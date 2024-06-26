import Sidebar from "../components/Sidebar";

import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import { addSelections } from "../services/addSelections.services.js";

function AddSelectionsPage() {
  const [enrolmentNo, setEnrolmentNo] = useState([{ enrolmentNo: "" }]);
  const [loading,setLoading] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const { _id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    async function loadLoggedInUserDetails() {
      try {
        const data = await getLoggedInUserDetails();
        if(data?.success === 0){
          navigate(`/errorPage/${data?.message}`)
        }
        else{
          setLoggedInUserDetails(data);
        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal error occured`)
      }
    }
    loadLoggedInUserDetails();
  }, []);
  const handleEnrolmentNoChange = (index, ele) => {
    const updatedEnrolmentNo = [...enrolmentNo];

    updatedEnrolmentNo[index] = { enrolmentNo: ele };

    setEnrolmentNo(updatedEnrolmentNo);
    console.log(updatedEnrolmentNo);
    setErrorMessage("");
  };

  const addEnrolmentNoField = () => {
    setEnrolmentNo([...enrolmentNo, { enrolmentNo: "" }]);
  };

  const removeEnrolmentNoField = (index) => {
    const updatedEnrolmentNo = [...enrolmentNo];
    updatedEnrolmentNo.splice(index, 1);

    setEnrolmentNo(updatedEnrolmentNo);

    setErrorMessage("");
  };
  const handleSubmit = async (e, _id, enrolmentNo) => {
    e.preventDefault();
    try {
      setLoading(1);
      const data = await addSelections(_id, enrolmentNo);
      setLoading(0);
      if (data?.success === 1) {
        setSuccessMessage(data?.message);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        setErrorMessage("");
        setEnrolmentNo([{ enrolmentNo: "" }]);
      } else {
        setErrorMessage(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar loggedInUserDetails={loggedInUserDetails}>
      {successMessage !== "" && (
        <p className=" sticky top-20 bg-green-100 w-full p-2 ml-4 flex flex-row text-black dark:text-black">
          <IoMdDoneAll size={20} color="green" />
          {successMessage}
        </p>
      )}
      <form className="flex flex-col justify-center items-center mt-40 md:w-[50%] sm:w-[98%] lg:w-[40%] mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Add Selected students</h3>
          {enrolmentNo.map((ele, index) => {
            return (
              <div key={index} className="flex items-center mb-2">
                <div className="mr-4">
                  <label
                    htmlFor={`enrolmentNo-${index}`}
                    className="block text-gray-700 text-sm font-bold"
                  >
                    Enrolment No:
                  </label>
                  <input
                    id={`enrolmentNo-${index}`}
                    name={`enrolmentNo-${index}`}
                    type="text"
                    value={ele?.enrolmentNo}
                    onChange={(e) =>
                      handleEnrolmentNoChange(index, e.target.value)
                    }
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-primary-600 focus:border-primary-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeEnrolmentNoField(index)}
                  className="mt-6 bg-red-400 hover:bg-red-700 text-white font-bold p-2 rounded"
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={addEnrolmentNoField}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 text-xs rounded"
          >
            Add more
          </button>
          {errorMessage !== "" && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span> {errorMessage}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => {
              handleSubmit(e, _id, enrolmentNo);
            }}
          >
            <div className="flex flex-row justify-center">
                  <Spinner text={"Add Selections"} loading={loading} ></Spinner>
                </div>
          </button>
        </div>
      </form>
    </Sidebar>
  );
}

export default AddSelectionsPage;
