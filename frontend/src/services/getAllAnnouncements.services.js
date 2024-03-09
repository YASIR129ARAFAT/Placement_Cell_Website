import axios from "axios";
const getAllAnnouncements = async () => {

    try {
      // console.log("localStorage.getItem('token')");
      // console.log(localStorage.getItem("token"));
      // this is not a result so is result must be false in the string params
      const response = await axios.get(
        `http://localhost:3000/api/announcements/getallannouncements/${false}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (response?.status === 200) {
        // console.log(response?.data);
        // setAllAnnouncements(response.data);
        return response?.data;
      } else {
        // navigate("/error");
        return {};
      }
    } catch (error) {
      console.log(error);
    //   navigate("/error");
    }
  };

  export {getAllAnnouncements}