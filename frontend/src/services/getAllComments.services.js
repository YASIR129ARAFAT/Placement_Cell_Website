import axios from "axios"

const getAllComments = async (id) => {
    try {
      const commentorId = id;
      const res = await axios.get(
        `http://localhost:3000/api/comments/${commentorId}`, // id of announcement
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("from getAllComm",res?.data); // to indicate that it is a comment box

      return res?.data;
    } catch (error) {
      console.log("error getting single announcement", error);
    }
  };


  export {getAllComments}