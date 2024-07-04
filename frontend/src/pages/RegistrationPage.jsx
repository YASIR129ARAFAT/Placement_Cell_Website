import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdDoneAll } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { IoReturnDownBack } from "react-icons/io5";
import {
  initialRegistrationErrorMessage,
  initialRegistrationFormData,
} from "../assets/initialStates.jsx";
import { getLoggedInUserDetails } from "../utils/getLoggedInUserDetails.js";
import Input from "../components/Input.jsx";
import Label from "../components/Label.jsx";
import Button from "../components/Button.jsx";
import getAllBranches from "../services/getAllBranches.services.js";
import Spinner from "../components/Spinner.jsx";


function Registration() {
  const [errorMessage, setErrorMessage] = useState(
    initialRegistrationErrorMessage
  );
  const [formData, setFormData] = useState(initialRegistrationFormData);
  const [successMessage, setSuccessMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [loggedInUserDetails,setLoggedInUserDetails] = useState({})
  const [branches,setBranches] = useState([]);
  const [loading,setLoading] = useState(0);

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(1);
      const res = await axios.post(
        "http://localhost:3000/auth/signup",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLoading(0);
      // console.log(res?.data);
      console.log(errorMessage);

      setErrorMessage({ ...errorMessage, ...res?.data?.error });
      // setFormData(initialRegistrationFormData);

      if (res?.data?.successMessage) {
        // console.log(res.data.successMessage)
        setSuccessMessage("User registrated succesfully!!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      }
      

      // console.log(res);
    } catch (error) {
      console.log("error from log:", error);
      setGeneralErrorMessage(error?.response?.data?.message || "Internal Server Error!!")
      setTimeout(()=>{
        setGeneralErrorMessage("")
      },6000)
    }
  }

  const handleChange = (e) => {
    // console.log("formData");
    // console.log(formData);

    setFormData({ ...formData, [e.target.name]: e.target.value });

    const new_key = e.target.name + "Error";
    setErrorMessage({ ...errorMessage, [new_key]: "" });
  };

  useEffect(()=>{
    async function loadLoggedInUserDetails(){
      try {
        const data = await getLoggedInUserDetails();
        // console.log(data);
        if(data?.success === 0){
          navigate(`/errorPage/${data?.message}`)
        }
        else{
          setLoggedInUserDetails(data)
          // console.log(data);
          if(data?.userType === "student"){
            navigate(`/errorPage/Unauthorised Access!!`)
          }
        }
      } catch (error) {
        console.log(error);
        navigate(`/errorPage/internal error occured`)
      }
    }
    loadLoggedInUserDetails()
  },[])

  useEffect(()=>{
    async function loadAllBranches(){
      try {
        const data = await getAllBranches()
        setBranches(data?.branches)
      } catch (error) {
        console.log(error);
        navigate('/errorPage/internal server error')
      }
    }
    loadAllBranches()
  },[])
  return (
    <section className="w-full pt-0 bg-white-50 dark:bg-gray-900">
      {successMessage !== "" && (
        <p className=" sticky top-0 bg-green-200 w-full p-2 flex flex-row text-black dark:text-black">
          <IoMdDoneAll size={20} color="green" />
          {successMessage}
        </p>
      )}
      {generalErrorMessage !== "" && (
        <p className=" sticky top-0 bg-red-200 w-full p-2 flex flex-row text-black dark:text-black">
          <RxCross2 size={20} color="red" />
          {generalErrorMessage}
        </p>
      )}
      <div className="mb-10 ml-4">
          <Link className="rounded-2xl m-2 p-2 " to={`/userprofile`}>
            <IoReturnDownBack className=" size-5 hover:text-white  hover:bg-blue-700 rounded-md" />
          </Link>
        </div>
      <div className="w-full mt-10 flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-max lg:py-0">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </Link>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* email */}
              <div>
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                {errorMessage.emailError !== "" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {errorMessage.emailError}
                  </p>
                )}
              </div>

              {/* fullname */}
              <div>
                <Label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                />
                {errorMessage.nameError !== "" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {errorMessage.nameError}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enrolment Number
                </Label>
                <Input
                  type="text"
                  name="enrolmentNo"
                  value={formData.enrolmentNo}
                  id="enrolmentNo"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="eg. IIT2021182"
                />
                {errorMessage.enrolment_NoError !== "" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {errorMessage.enrolment_NoError}
                  </p>
                )}
              </div>

             

              {/* mobile  */}
              <div>
                <Label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile Number
                </Label>
                <Input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="eg. 7382976363"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errorMessage.mobileError !== "" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {errorMessage.mobileError}
                  </p>
                )}
              </div>

              {/* dob */}
              <div>
                <Label
                  htmlFor="dob"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </Label>
                <Input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="DOB"
                />
                {errorMessage.dobError !== "" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {errorMessage.dobError}
                  </p>
                )}
              </div>
              {/* gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  value={formData.gender}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue="prefer not to say">
                    prefer not to say
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errorMessage.genderError !== "" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {errorMessage.genderError}
                  </p>
                )}
              </div>

              {/* image */}
              {/* <div className="max-w-lg mx-auto">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="user_avatar"
                >
                  Upload Profile pic..
                </label>
                <Input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help"
                  id="image"
                  name="image"
                  type="file"
                  accept='image/*, .png' // /* means any type of image but .png is not present in it so we need to incklude it separately
                  value={formData.image}
                  onChange={handleChange}
                />
                <div
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="user_avatar_help"
                >
                  Add profile picture
                </div>
              </div> */}

              {/* branch */}
              <div>
                <label
                  htmlFor="branch"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue="">Not Selected</option>
                  
                  {
                    branches.map((ele,ind)=>{
                      return(
                        <option key={ind} value={ele?._id}>{ele?.branchCode}</option>
                      )
                    })
                  }
                </select>
                {errorMessage.branchError !== "" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {errorMessage.branchError}
                  </p>
                )}
              </div>

              {/* batch */}
              <div>
                <label
                  htmlFor="branch"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Batch
                </label>
                <select
                  id="batch"
                  name="batch"
                  onChange={handleChange}
                  value={formData.batch}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                </select>
                {errorMessage.batchError !== "" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {errorMessage.batchError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <div className="flex flex-row justify-center">
                  <Spinner text={"Create an Account"} loading={loading} ></Spinner>
                </div>
              </Button>
              
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
