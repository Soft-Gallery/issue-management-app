import { client } from "../axios";

export default async function getState(key:string, token: string) {
    try {
        const data = await client.get(`/statistics/get/global/${key}`, {
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
