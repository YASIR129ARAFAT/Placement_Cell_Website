import axios from "axios";

async function addOpening(formData) {
    try {
        const response = await axios.post(`http://localhost:3000/api/opening/addOpening`,
            formData,
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            }
        )

        // console.log("data from services ",response?.data);
        return response?.data
    } catch (error) {
        console.log("error from addOpening services", error);
    }
}

export {addOpening}