import axios from "axios";
import {useNavigate} from "react-router-dom"
export const getLoggedInUserDetails = async()=>{
    // let navigate = useNavigate()
    try {
        const response = await axios.get('http://localhost:3000/api/user/loggedInUserDetails',{
            headers:{
                token:localStorage.getItem('token')
            }
        });
        // console.log(response,"from logged in user");
        // set_user_details(response.data);

        return response?.data;
    } catch (error) {
        console.log('error in fetching logged in user details', error);
        // navigate('/error')
    }
}