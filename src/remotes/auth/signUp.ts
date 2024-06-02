import { client} from "../axios";

interface UserAccountType {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
}

export default function postSignUp(id: string, name: string, email: string, password: string, role: string) {

    const userData = {
        "id": id,
        "name": name,
        "email": email,
        "password": password,
        "role": role,
    }

    const registerUser = async (userData: UserAccountType) => {
        try {
            console.log(userData)
            const response = await client.post('/user/signup', userData);
            return response.data;
        } catch (error) {
            return error;
        }
    };

    return registerUser(userData);
}
