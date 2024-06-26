import axios from "axios";
async function updateUserDetails(id, formVal) {
    const formData = new FormData();
    formData.append('email', formVal.email);
    formData.append('dob', formVal.dob);
    formData.append('mobile', formVal.mobile);
    if (formVal.profileImage) {
        formData.append('profileImage', formVal.profileImage);
    }
    try {

        const response = await axios.patch(`http://localhost:3000/api/user/updateUserDetails/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
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