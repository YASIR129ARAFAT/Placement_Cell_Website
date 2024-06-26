import axios from "axios";

async function getAllBranches (){
    try {
        const res = await axios.get("http://localhost:3000/api/branch/getBranches")
        return res?.data
    } catch (error) {
        console.log(error);
        throw new Error("Internal server Error!!")
    }
}

export default getAllBranches