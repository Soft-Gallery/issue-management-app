import {client} from "../axios";

export default async function assignDev(issueId:number, devId:string, token: string) {
    try {
        const response = await client.get(
            `/issue/assignment/${issueId}/${devId}`,
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
