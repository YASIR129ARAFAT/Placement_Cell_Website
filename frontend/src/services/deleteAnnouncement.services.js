import axios from "axios";

const deleteAnnouncement = async (id,setAllAnnouncements) => {
    try {
      const _id = id;
      const response = await axios.delete(
        `http://localhost:3000/api/announcements/${_id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log("response from delete button", response);
      if (response?.data?.success === 1) {
        alert("Announcement deleted sucessfully");
        // loadAllAnnouncements()
        /*insteading of load all the data from database using loadAllAnnouncements() we can simply update the state of previously loaded all announcements*/
        setAllAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter((announcement) => announcement._id !== id)
        );
      } else {
        alert("failed!! internal server error");
      }
    } catch (error) {
      console.log("eror in deleting", error);
    }
  };

  export {deleteAnnouncement}