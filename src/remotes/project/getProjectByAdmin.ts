import { client } from "../axios";

export default async function getProjectByAdmin(token: string) {
    try {
        const data = await client.get(`/project/admin`, {
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
