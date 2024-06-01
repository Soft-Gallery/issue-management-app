import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Project } from '../types/project';
import theme from '../style/theme';
import {useRecoilValue} from "recoil";
import {projectState, userTokenState} from "../recoil/atom";
import getAllIssueById from "../remotes/issue/getAllIssueById";

type TesterPageScreenProp = NativeStackScreenProps<RootStackParamList, 'Tester'>;

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'ROLE_DEVELOPER' | 'ROLE_PL' | 'ROLE_TESTER' | 'ROLE_ADMIN';
}

interface Comment {
    id: number;
    text: string;
    createdAt: string;
    authorId: string;
    issueId: number;
}

export interface IssueBrowse {
    id: number;
    title: string;
    description: string;
    reporter: User;
    status: 'NEW' | 'ASSIGNED' | 'RESOLVED' | 'CLOSED' | 'REOPENED';
    priority: 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'TRIVIAL';
    assignee: User;
    fixer: User;
    projectId: number;
    comments: Comment[];
    startDate: string;
    endDate: string;
}

const TesterPage = ({ navigation }: TesterPageScreenProp) => {
    const project = useRecoilValue(projectState);
    const userToken  = useRecoilValue(userTokenState);
    const id = project.id;
    const [issues, setIssues] = useState<IssueBrowse[]>([])

    useEffect(() => {
        const getIssues = async () => {
            const issueBrowse: IssueBrowse[] = await getAllIssueById(id, userToken);
            setIssues(issueBrowse);
        }

        void getIssues();
    }, []);

    const handleIssuePress = (issueId: number) => {
        navigation.navigate('CommentPage', { issueId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.description}>{project.description}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateIssue')} style={styles.button}>
                <Text style={styles.buttonText}>Create Issue</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>There are Issues</Text>
            <ScrollView>
                {issues.map(issue => (
                    <TouchableOpacity
                        key={issue.id}
                        style={styles.issueContainer}
                        onPress={() => handleIssuePress(issue.id)}
                    >
                        <Text style={styles.issueTitle}>{issue.title}</Text>
                        <Text style={styles.issueDescription}>{issue.description}</Text>
                        <Text style={styles.issueDescription}>Status: {issue.status}</Text>
                        <Text style={styles.issueDescription}>Priority: {issue.priority}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.background,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.color.white,
    },
    description: {
        fontSize: 16,
        color: theme.color.white,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.color.white,
        marginTop: 16,
    },
    issueContainer: {
        marginTop: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: theme.color.gray3,
        borderRadius: 8,
        backgroundColor: theme.color.gray1,
    },
    issueTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.color.white,
    },
    issueDescription: {
        fontSize: 14,
        color: theme.color.white,
    },
    button: {
        backgroundColor: theme.color.main,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default TesterPage;
