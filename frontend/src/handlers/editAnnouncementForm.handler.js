import { updateAnnouncement } from "../services/updateAnnouncement.services.js";
const handleChange = (e, setFormContent) => {
    setFormContent(e.target.value);
    // console.log(e.target.value);
};

// i cant import and call useNavigate() here because hooks can only be called inside react functional component
const handleClick = async (e, formContent,announcement, navigate) => {
    e.preventDefault();
    try {
        // console.log(formContent);
        const res = await updateAnnouncement(formContent,announcement?._id); // id of the announcement
        navigate('/allannouncements')
        // console.log("submit",res);
    } catch (error) {
        console.log(error);
    }
};

export { handleChange, handleClick }