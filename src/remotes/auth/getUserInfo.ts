import { client } from "../axios";
import { UserRole, UserWithRole} from "../../types/user";

export const getUserInfo = async (token: string) => {
    const userTokenValue = token;
    if (!userTokenValue) {
        throw new Error('User token is missing');
    }

    const response = await client.get<UserWithRole<UserRole>>('/user/info', {
        headers: {
            Authorization: `${userTokenValue}`,
        }
    });

    return response.data;
};
