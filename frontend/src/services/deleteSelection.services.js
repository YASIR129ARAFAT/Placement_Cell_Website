import axios from "axios";

async function deleteSelection(_id) {
    try {
        const response = await axios
            .delete(`http://localhost:3000/api/selection/deleteSelection/${_id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
        console.log(response?.data);
        return response?.data;
    } catch (error) {
        console.log(error);
        return error?.response?.data;
    }
}

export {deleteSelection}