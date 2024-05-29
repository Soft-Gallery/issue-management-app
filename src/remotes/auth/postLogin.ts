import {client} from "../axios";

export default async function postLogin(id: string, password: string) {
    const userData = new FormData();
    userData.append('id', id);
    userData.append('password', password);

    try {
        const response = await client.post('/user/signin', userData);
        return response.headers.authorization;
    } catch (error) {
        console.error('Login error', error);
        throw error;
    }
}
