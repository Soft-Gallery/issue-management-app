import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Project } from '../types/project';
import theme from '../style/theme';
import {useRecoilValue} from "recoil";
import {projectState, userIdState, userTokenState} from "../recoil/atom";
import getAllIssueById from "../remotes/issue/getAllIssueById";
import ConfirmPopup from "../popup/ConfirmPopup";

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
    status: 'NEW' | 'ASSIGNED' | 'RESOLVED' | 'CLOSED' | 'REOPENED' | 'FIXED';
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
    const userToken = useRecoilValue(userTokenState);
    const userId = useRecoilValue(userIdState); // Assuming userTokenState contains userId
    const id = project.id;
    const [issues, setIssues] = useState<IssueBrowse[]>([]);
    const [showFixedIssues, setShowFixedIssues] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState<IssueBrowse | null>(null);

    useEffect(() => {
        const getIssues = async () => {
            const issueBrowse: IssueBrowse[] = await getAllIssueById(id, userToken);
            setIssues(issueBrowse);
        };

        void getIssues();
    }, [id, userToken]);

    const handleShowFixedIssues = () => {
        setShowFixedIssues(true);
    };

    const handleShowAllIssues = () => {
        setShowFixedIssues(false);
    };

    const handleIssuePress = (issue: IssueBrowse) => {
        if (issue.status === 'FIXED' && issue.reporter.id === userId) {
            setSelectedIssue(issue);
        }
    };

    const handleClosePopup = () => {
        setSelectedIssue(null);
    };

    const filteredIssues = showFixedIssues
        ? issues.filter(issue => issue.status === 'FIXED' && issue.reporter.id === userId)
        : issues;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.description}>{project.description}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateIssue')} style={styles.button}>
                <Text style={styles.buttonText}>Create Issue</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleShowFixedIssues} style={styles.button}>
                    <Text style={styles.buttonText}>Show Fixed Issues</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShowAllIssues} style={styles.button}>
                    <Text style={styles.buttonText}>Show All Issues</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Issues</Text>
            <ScrollView>
                {filteredIssues.map(issue => (
                    <TouchableOpacity
                        key={issue.id}
                        style={styles.issueContainer}
                        onPress={() => handleIssuePress(issue)}
                    >
                        <Text style={styles.issueTitle}>{issue.title}</Text>
                        <Text style={styles.issueDescription}>{issue.description}</Text>
                        <Text style={styles.issueDescription}>Status: {issue.status}</Text>
                        <Text style={styles.issueDescription}>Priority: {issue.priority}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedIssue && (
                <ConfirmPopup
                    visible={!!selectedIssue}
                    onClose={handleClosePopup}
                    issue={selectedIssue}
                    userToken={userToken}
                />
            )}
        </ScrollView>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
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
        flex: 1,
        height: 40,
        marginHorizontal: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default TesterPage;
