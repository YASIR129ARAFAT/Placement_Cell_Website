import axios from "axios";

async function updateAnnouncement(formContent,id){
    try {
        const _id = id; // id of the announcement
        const response = await axios.patch(`http://localhost:3000/api/announcements/${_id}`,{formContent},{
            headers:{
                token:localStorage.getItem("token")
            }
        });
        // console.log(response);
        return response?.data;
    } catch (error) {
        console.log("error in updating announcement",error);
    }
}

export {updateAnnouncement}