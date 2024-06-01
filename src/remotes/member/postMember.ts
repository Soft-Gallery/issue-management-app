import {client} from "../axios";
export default async function postMember(projectId: number, userId: string, role: string, token:string) {

    try {
        return await client.post(
            '/member/add',
            {
                projectId,
                userId,
                role
            },
            {
                headers: {
                    Authorization: `${token}`,
                }
            }
        );
    } catch (error) {
        console.error('response error', error);
        throw error;
    }
}
