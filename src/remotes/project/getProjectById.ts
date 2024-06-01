import { client } from "../axios";

export default async function getProjectById(userId: string, token: string) {
    try {
        const data = await client.get(`/member/get/project/${userId}`, {
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
