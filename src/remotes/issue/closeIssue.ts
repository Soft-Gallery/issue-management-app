import {client} from "../axios";

export default async function closeIssue(issueId:number, token: string) {
    try {
        const response = await client.get(
            `/issue/closing/${issueId}`,
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
