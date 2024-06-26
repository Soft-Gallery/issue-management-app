import { client } from "../axios";

export default async function getMemberByProjectIdByRole(projectId:number, role:string, token: string) {
    try {
        const data = await client.get(`/member/get/user/${projectId}/${role}`, {
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
