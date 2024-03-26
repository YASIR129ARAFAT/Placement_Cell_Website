import axios from "axios";

async function getSingleOpening(_id) {
    try {
        const response = await axios
            .get(`http://localhost:3000/api/opening/getSingleOpening/${_id}`,
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            // console.log("data from services: ",response?.data);
            return response?.data?.opening;
    } catch (error) {
        console.log(error);
    }
}

export {getSingleOpening}