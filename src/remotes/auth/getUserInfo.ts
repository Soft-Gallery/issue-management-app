import { client} from "../axios";
import { UserRole, UserWithRole} from "../../types/user";
import {useRecoilValue} from "recoil";
import {userTokenState} from "../../recoil/atom";

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
