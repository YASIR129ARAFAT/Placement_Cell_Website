import axios from "axios";
const getAllUsers = async (getAdminsOnly) => {
    // getAdminsOnly give you option to load only admins
    try {
        const response = await axios.get(
            `http://localhost:3000/api/user/${getAdminsOnly}`,
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            }
        );

        console.log(response?.data);
        return response?.data;
    } catch (error) {
        console.log("Failed to load all users page", error);
    }
};

export { getAllUsers }