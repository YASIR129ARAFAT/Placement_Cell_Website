import { deleteSelection } from "../services/deleteSelection.services.js";

const handleDelete = async (_id, allSelections,
    setAllSelections, setSuccessMessage,
    setErrorMessage) => {
    try {
        const data = await deleteSelection(_id);

        console.log(data);
        if (data?.success === 1) {
            const newAllSelections = allSelections.filter((ele) => {
                return ele?._id !== _id;
            });

            setAllSelections(newAllSelections);

            setSuccessMessage(data?.message);

            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        } else {
            setErrorMessage(data?.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    handleDelete
}