import {atom} from "recoil";
import {UserInfo} from "../types/user";
import {Project} from "../types/project";

export const userInfoState = atom<UserInfo>({
    key: 'userInfoState',
    default: {
        id: 0,
        name: '',
        password: '',
        email: '',
    }
})

export const userRoleState = atom<string>({
    key: 'userRoleState',
    default: '',
})

export const userTokenState = atom<string>({
    key: 'userToken',
    default: '',
})

export const projectsState = atom<Project[]>({
    key: 'projectsState',
    default: [],
});
