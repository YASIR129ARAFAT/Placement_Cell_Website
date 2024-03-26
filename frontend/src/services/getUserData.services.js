import axios from "axios";

const getUserData = async(id)=>{
    try{
        const _id = id;
        // console.log(_id);
        const response = await axios.get(
            `http://localhost:3000/api/user/otherUserProfile/${_id}`,
            {
                headers:{
                    token:localStorage.getItem("token")
                }
            }
        )

        // console.log(response?.data);
        return response?.data;
        
    }
    catch(error){
        console.log("error in fetching userData",error);
    }
}
export{
    getUserData,
}