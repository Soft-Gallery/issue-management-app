import { client } from "../axios";

export default async function getIssueDev(projectId: number, token: string) {
    try {
        const data = await client.get(`/issue/searching/${projectId}/state/assigned/me`, {
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
