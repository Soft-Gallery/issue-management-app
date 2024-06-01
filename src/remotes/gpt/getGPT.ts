import {client} from "../axios";

export default async function getGPT(issueId:number, token: string) {
    try {
        const response = await client.get(
            `/gpt/recommendation/${issueId}`,
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
