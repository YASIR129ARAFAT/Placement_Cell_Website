import axios from "axios";

const deleteOpening = async (_id) => {
    try {
        const response = await axios
            .delete(`http://localhost:3000/api/opening/deleteOpening/${_id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
        const data = response?.data
        console.log("deleted data: ",data);

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

export { deleteOpening }