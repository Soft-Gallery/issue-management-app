import {client} from "../axios";

export default async function postComment(comment: string, issueId:number, token: string) {
    const newComment = {
        text: comment,
    }
    try {
        const response = await client.post(
            `/comment/new/${issueId}`,
            newComment,
            {
                headers: {
                    Authorization: `${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('response error', error);
        throw error;
    }
}
