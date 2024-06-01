import { client } from "../axios";

export default async function getAllIssueById(projectId: number, token: string) {
    try {
        const data = await client.get(`/issue/searching/${projectId}/all`, {
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
