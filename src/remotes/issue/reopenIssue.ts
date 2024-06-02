import {client} from "../axios";

export default async function reopenIssue(issueId:number, token: string) {
    try {
        const response = await client.get(
            `/issue/reopening/${issueId}`,
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
