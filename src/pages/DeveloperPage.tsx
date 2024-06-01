import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import theme from '../style/theme';
import { useRecoilValue } from 'recoil';
import { projectState, userTokenState } from '../recoil/atom';
import getIssueDev from "../remotes/issue/getIssueDev";
import {IssueBrowse} from "./TesterPage";
import IssueDetailPopup from "../popup/IssueDetailPopup";
// import getAssignedIssues from '../remotes/issue/getAssignedIssues'; // Assume this function fetches assigned issues
// import IssueDetailPopup from './IssueDetailPopup'; // Popup component

type DeveloperPageScreenProp = NativeStackScreenProps<RootStackParamList, 'Developer'>;

const DeveloperPage = ({ navigation }: DeveloperPageScreenProp) => {
    const project = useRecoilValue(projectState);
    const userToken = useRecoilValue(userTokenState);
    const id = project.id;
    const [issues, setIssues] = useState<IssueBrowse[]>([]);
    const [selectedIssue, setSelectedIssue] = useState<IssueBrowse | null>(null);

    useEffect(() => {
        const fetchIssues = async () => {
            const fetchedIssues = await getIssueDev(id, userToken);
            setIssues(fetchedIssues);
        };

        void fetchIssues();
    }, []);

    const handleIssuePress = (issue:IssueBrowse) => {
        setSelectedIssue(issue);
    };

    const handleClosePopup = () => {
        setSelectedIssue(null)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.description}>{project.description}</Text>
            <Text style={styles.sectionTitle}>Assigned Issues:</Text>
            <ScrollView>
                {issues.map(issue => (
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
                <IssueDetailPopup
                    visible={!!selectedIssue}
                    onClose={handleClosePopup}
                    issue={selectedIssue}
                    userToken={userToken}
                />
            )}
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
});

export default DeveloperPage;

