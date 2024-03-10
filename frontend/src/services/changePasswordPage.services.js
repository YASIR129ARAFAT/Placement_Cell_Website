import axios from "axios";

async function changePassword(formVal) {
    try {
        const response = await axios.post(`http://localhost:3000/api/user/changePassword`,
            formVal,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        )

        const data = response?.data;

        return data;

    } catch (error) {
        console.log(error);
    }
}

export { changePassword }