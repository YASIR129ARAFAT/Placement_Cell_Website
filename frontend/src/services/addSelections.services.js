import axios from "axios";

async function addSelections(_id,enrolmentNo) {
    try {
        const response = await axios
            .post(`http://localhost:3000/api/selection/addSelections/${_id}`,
                {
                    enrolmentNo,
                },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            )
        
            console.log(response?.data);
            return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export { addSelections }