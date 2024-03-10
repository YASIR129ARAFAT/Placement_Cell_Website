
import { updateUserDetails } from "../services/updateUserDetails.services.js";
async function handleSubmit(e, id, formVal, error, setError, navigate) {
    e.preventDefault();

    try {
        const response = await updateUserDetails(id, formVal);
        setError({ ...error, ...response?.error })
        console.log(typeof response?.success);
        console.log( response?.success);
        if(response?.success ===1)
        {
            navigate(`/userprofile`)
        }
    } catch (error) {
        console.log(error);
    }
}

function handleChange(e,setError,setFormVal) {
    // console.log(formVal);
    const name = e.target.name + "Error";
    // console.log(name);
    setError((error)=>{
        return {...error, [name]: "", otherError: "" }
    });
    setFormVal((formVal)=>{
        return { ...formVal, [e.target.name]: e.target.value }
    });
  }

export { handleSubmit,handleChange }