import axios from "axios";

async function addComment(commentMessage, announcementId) {
    try {
        const res = await axios.post(
            `http://localhost:3000/api/comments/addComment`,
            {
                content: commentMessage,
                announcementId // single announcement id
            },
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            }
        );

        const addedComment = res?.data?.data;
        return addedComment;
    } catch (error) {
        console.log(error);
    }
}
export { addComment }