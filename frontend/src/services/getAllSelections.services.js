import axios from "axios";

async function getAllSelections(){
    try {
        const response = await axios
            .get(`http://localhost:3000/api/selection/getAllSelections`,
                {
                    headers:{
                        token:localStorage.getItem("token")
                    }
                }
            )
        console.log(response?.data);
        return response?.data;
        
    } catch (error) {
        console.log(error);
    }
}

export {getAllSelections}