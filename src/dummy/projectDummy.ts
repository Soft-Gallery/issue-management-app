import {DevUser, PLUser, TesterUser} from "../types/user";
import {Issue} from "../types/issue";

export interface Project {
    title: string;
    description: string;
    pl: PLUser[];
    dev: DevUser[];
    tester: TesterUser[];
    issues: Issue[];
}

export const ProjectDummy: Project[] = [
    {
        title: 'Project 1',
        description: '생애 첫 프로젝트!',
        pl: [
            {
                id: 1,
                name: '재훈_pl',
                email: 'pl1@naver.com',
                password: 'garbage',
                role: 'ROLE_PL'
            },
            {
                id: 2,
                name: '용우_pl',
                email: 'pl2@naver.com',
                password: 'garbage',
                role: 'ROLE_PL'
            },
        ],
        dev: [
            {
                id: 1,
                name: '재훈_dev',
                email: 'dev1@naver.com',
                password: 'garbage',
                role: 'ROLE_DEVELOPER'
            },
            {
                id: 2,
                name: '용우_dev',
                email: 'dev2@naver.com',
                password: 'garbage',
                role: 'ROLE_DEVELOPER'
            },
        ],
        tester: [
            {
                id: 1,
                name: '재훈_t',
                email: 'test1@naver.com',
                password: 'garbage',
                role: 'ROLE_TESTER'
            },
            {
                id: 2,
                name: '용우_t',
                email: 'test2@naver.com',
                password: 'garbage',
                role: 'ROLE_TESTER'
            },
        ],
        issues: [
            {
                id: 0,
                title: '첫 번째 이슈, 두둥탁',
                description: '이 이슈는 미ㅏ얼;마ㅓㄴ;이ㅓㅏㄹ;ㅣㅏㅓㅁㄴ',
                status: 'NEW',
                priority: 'MAJOR',
                reporter: 'tester 민수',
                devs: [
                    {
                        id: 12,
                        name: '민수수',
                        password: 'garbage',
                        email: 'alskd@gmail.com',
                        role: 'ROLE_DEVELOPER',
                    },
                ],
                comments: [
                    {
                        author: '댓글 작성자 1',
                        text: '이슈이슈이슈',
                        createdAt: '2024.05.25. pm 10:10',
                    },
                    {
                        author: '댓글 작성자 2',
                        text: '빨리 고쳐라~',
                        createdAt: '2024.05.24. pm 11:11',
                    },
                ]
            },
            {
                id: 1,
                title: '두 번째 이슈, 두둥탁',
                description: '이 이슈는 미ㅏ얼;마ㅓㄴ;이ㅓㅏㄹ;ㅣㅏㅓㅁㄴ',
                status: 'ASSIGNED',
                priority: 'MAJOR',
                reporter: 'tester 민수',
                devs: [
                    {
                        id: 12,
                        name: '민수수',
                        password: 'garbage',
                        email: 'al@gmail.com',
                        role: 'ROLE_DEVELOPER',
                    },
                ],
                comments: [
                    {
                        author: '댓글 작성자 1',
                        text: '이슈이슈이슈',
                        createdAt: '2024.05.25. pm 10:10',
                    },
                    {
                        author: '댓글 작성자 2',
                        text: '빨리 고쳐라~',
                        createdAt: '2024.05.24. pm 11:11',
                    },
                ]
            },
        ]
    },
    {
        title: 'Project 2',
        description: '두 번째 프로젝트!',
        pl: [
            {
                id: 3,
                name: '현수_pl',
                email: 'pl3@naver.com',
                password: 'garbage',
                role: 'ROLE_PL'
            },
            {
                id: 4,
                name: '지훈_pl',
                email: 'pl4@naver.com',
                password: 'garbage',
                role: 'ROLE_PL'
            },
        ],
        dev: [
            {
                id: 3,
                name: '현수_dev',
                email: 'dev3@naver.com',
                password: 'garbage',
                role: 'ROLE_DEVELOPER'
            },
            {
                id: 4,
                name: '지훈_dev',
                email: 'dev4@naver.com',
                password: 'garbage',
                role: 'ROLE_DEVELOPER'
            },
        ],
        tester: [
            {
                id: 3,
                name: '현수_t',
                email: 'test3@naver.com',
                password: 'garbage',
                role: 'ROLE_TESTER'
            },
            {
                id: 4,
                name: '지훈_t',
                email: 'test4@naver.com',
                password: 'garbage',
                role: 'ROLE_TESTER'
            },
        ],
        issues: [
            {
                id: 2,
                title: '세 번째 이슈, 두둥탁',
                description: '이 이슈는 미ㅏ얼;마ㅓㄴ;이ㅓㅏㄹ;ㅣㅏㅓㅁㄴ',
                status: 'NEW',
                priority: 'MINOR',
                reporter: 'tester 지훈',
                devs: [
                    {
                        id: 13,
                        name: '지훈_dev',
                        password: 'garbage',
                        email: 'alsk@cau.ac.kr',
                        role: 'ROLE_DEVELOPER',
                    },
                ],
                comments: [
                    {
                        author: '댓글 작성자 3',
                        text: '이슈이슈이슈',
                        createdAt: '2024.06.01. am 10:10',
                    },
                    {
                        author: '댓글 작성자 4',
                        text: '빨리 고쳐라~',
                        createdAt: '2024.06.02. am 11:11',
                    },
                ]
            },
            {
                id: 3,
                title: '네 번째 이슈, 두둥탁',
                description: '이 이슈는 미ㅏ얼;마ㅓㄴ;이ㅓㅏㄹ;ㅣㅏㅓㅁㄴ',
                status: 'RESOLVED',
                priority: 'CRITICAL',
                reporter: 'tester 현수',
                devs: [
                    {
                        id: 14,
                        name: '현수_dev',
                        password: 'garbage',
                        email: 'alskdjemail3',
                        role: 'ROLE_DEVELOPER',
                    },
                ],
                comments: [
                    {
                        author: '댓글 작성자 5',
                        text: '이슈이슈이슈',
                        createdAt: '2024.06.03. pm 12:12',
                    },
                    {
                        author: '댓글 작성자 6',
                        text: '빨리 고쳐라~',
                        createdAt: '2024.06.04. pm 01:01',
                    },
                ]
            },
        ]
    },
    {
        title: 'Project 3',
        description: '세 번째 프로젝트!',
        pl: [
            {
                id: 5,
                name: '동현_pl',
                email: 'pl5@naver.com',
                password: 'garbage',
                role: 'ROLE_PL'
            },
            {
                id: 6,
                name: '민수_pl',
                email: 'pl6@naver.com',
                password: 'garbage',
                role: 'ROLE_PL'
            },
        ],
        dev: [
            {
                id: 5,
                name: '동현_dev',
                email: 'dev5@naver.com',
                password: 'garbage',
                role: 'ROLE_DEVELOPER'
            },
            {
                id: 6,
                name: '민수_dev',
                email: 'dev6@naver.com',
                password: 'garbage',
                role: 'ROLE_DEVELOPER'
            },
        ],
        tester: [
            {
                id: 5,
                name: '동현_t',
                email: 'test5@naver.com',
                password: 'garbage',
                role: 'ROLE_TESTER'
            },
            {
                id: 6,
                name: '민수_t',
                email: 'test6@naver.com',
                password: 'garbage',
                role: 'ROLE_TESTER'
            },
        ],
        issues: [
            {
                id: 4,
                title: '다섯 번째 이슈, 두둥탁',
                description: '이 이슈는 미ㅏ얼;마ㅓㄴ;이ㅓㅏㄹ;ㅣㅏㅓㅁㄴ',
                status: 'CLOSED',
                priority: 'BLOCKER',
                reporter: 'tester 민수',
                devs: [
                    {
                        id: 15,
                        name: '민수_dev',
                        password: 'garbage',
                        email: 'alskd4@naver.com',
                        role: 'ROLE_DEVELOPER',
                    },
                ],
                comments: [
                    {
                        author: '댓글 작성자 7',
                        text: '이슈이슈이슈',
                        createdAt: '2024.07.01. pm 02:02',
                    },
                    {
                        author: '댓글 작성자 8',
                        text: '빨리 고쳐라~',
                        createdAt: '2024.07.02. pm 03:03',
                    },
                ]
            },
            {
                id: 5,
                title: '여섯 번째 이슈, 두둥탁',
                description: '이 이슈는 미ㅏ얼;마ㅓㄴ;이ㅓㅏㄹ;ㅣㅏㅓㅁㄴ',
                status: 'NEW',
                priority: 'MAJOR',
                reporter: 'tester 동현',
                devs: [
                    {
                        id: 16,
                        name: '동현_dev',
                        password: 'garbage',
                        email: 'alsk@daum.net',
                        role: 'ROLE_DEVELOPER',
                    },
                ],
                comments: [
                    {
                        author: '댓글 작성자 9',
                        text: '이슈이슈이슈',
                        createdAt: '2024.07.03. pm 04:04',
                    },
                    {
                        author: '댓글 작성자 10',
                        text: '빨리 고쳐라~',
                        createdAt: '2024.07.04. pm 05:05',
                    },
                ]
            },
        ]
    },
];
