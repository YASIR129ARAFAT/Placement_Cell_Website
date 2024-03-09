import axios from "axios";
async function updateUserDetails(id, formData) {
    try {

    const response = await axios.patch(`http://localhost:3000/api/user/updateUserDetails/${id}`,
            formData,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        )

        // console.log('uuu',response?.data);
        return response?.data
    } catch (error) {
        console.log(error);
    }
}

export { updateUserDetails }