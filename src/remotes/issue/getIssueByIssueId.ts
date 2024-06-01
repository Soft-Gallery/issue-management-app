import { client } from "../axios";

export default async function getIssueByIssueId(issueId: number, token: string) {
    try {
        const data = await client.get(`/issue/searching/id/${issueId}`, {
            headers: {
                Authorization: `${token}`,
            }
        });
        return data.data;
    } catch (error) {
        console.error('error', error);
        throw error;
    }
}
