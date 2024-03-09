import axios from "axios";
const getAllResults = async () => {
    try {
      // console.log("localStorage.getItem('token')");
      // console.log(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:3000/api/announcements/getallannouncements/${true}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (response?.status === 200) {
        console.log(response);
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

  export {getAllResults}