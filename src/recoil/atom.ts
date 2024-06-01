import {atom} from "recoil";
import {UserInfo} from "../types/user";
import {Proj, Project} from "../types/project";

export const userInfoState = atom<UserInfo>({
    key: 'userInfoState',
    default: {
        id: 0,
        name: '',
        password: '',
        email: '',
    }
})

export const userIdState = atom<string>({
    key: 'userIdState',
    default: '',
})

export const projectCreateIdState = atom<number>({
    key: 'projectCreateIdState',
    default: 0,
})

export const userRoleState = atom<string>({
    key: 'userRoleState',
    default: '',
})

export const userTokenState = atom<string>({
    key: 'userToken',
    default: '',
})

export const projectState = atom<Proj>({
    key: 'projectState',
    default: {
        id: 0,
        name: '',
        description: '',
        projectState: 'Closed',
        adminId: '',
    },
});

export const projectsState = atom<Project[]>({
    key: 'projectsState',
    default: [],
});

export const projectCreateState = atom<number>({
    key: 'projectCreateState',
    default: 1,
})
