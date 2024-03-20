import axios from "axios";
async function getAllOpenings(){
    try {
        const response = await axios.get('http://localhost:3000/api/opening/getAllOpenings',{
            headers:{
                token:localStorage.getItem("token")
            }
        }) 

        console.log("data from services: ",typeof response?.data.allOpenings);
        return response?.data?.allOpenings

    } catch (error) {
        console.log(error);
    }
}

export {getAllOpenings}