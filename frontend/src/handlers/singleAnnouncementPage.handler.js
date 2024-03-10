import axios from "axios";
import { addComment } from "../services/addComment.services.js";
const handleClick = async (e, commentMessage,setCommentMessage, setAllComments, id) => {
    e.preventDefault();
    try {
        if (commentMessage != "") {
            const addedComment = await addComment(commentMessage, id); // id is announcementId

            setCommentMessage("");
            setAllComments((prev) => {
                return [...prev, addedComment];
            });
        }
    } catch (error) {
        console.log("error is adding comment", error);
    }
};

export { handleClick }