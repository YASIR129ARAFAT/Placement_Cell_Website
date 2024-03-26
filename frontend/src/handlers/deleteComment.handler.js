import { deleteComment } from "../services/deleteComment.services.js";
const deleteHandler = async (id, commentsArray, setAllComments) => {
    try {
        const data = await deleteComment(id);

        if (data?.success === 1) {
            const filteredCommentsArray = commentsArray.filter((ele) => {
                return ele?._id !== id;
            })
            setAllComments(filteredCommentsArray)
        }
    }
    catch (error) {
        console.log(error);
    }
}

export { deleteHandler }