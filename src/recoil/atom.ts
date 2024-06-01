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

export const projectState = atom<Project>({
    key: 'projectState',
    default: {
        title: 'Project',
        description: '설명임',
        pl: [],
        dev: [],
        tester: [],
        issues: []
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
