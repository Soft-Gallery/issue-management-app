import { client } from "../axios";

interface Issue {
    title: string;
    description: string;
    priority: 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'TRIVIAL';
    projectId: number;
    startDate: string;
    endDate: string;
}

interface Comment {
    text: string;
    createdAt: string;
    authorId: string;
}

interface PostData {
    issue: Issue;
    comment: Comment;
}

export default async function postIssue(data: PostData, token: string) {
    try {
        const response = await client.post(
            '/issue/new',
            data,
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
