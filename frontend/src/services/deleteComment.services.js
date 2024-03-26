import axios from "axios";

async function deleteComment(_id) {
    try {
        const response = await axios
            .delete(`http://localhost:3000/api/comments/deleteComment/${_id}`,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            )
        
        const data = response?.data;
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {deleteComment}