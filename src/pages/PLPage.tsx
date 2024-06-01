import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import theme from '../style/theme';
import { useRecoilValue } from 'recoil';
import { projectState, userTokenState } from '../recoil/atom';
import { IssueBrowse } from './TesterPage';
import getAllIssueById from '../remotes/issue/getAllIssueById';
import AssignDeveloperPopup from '../popup/AssignDeveloperPopup';
import ConfirmClosePopup from "../popup/ConfirmClosePopup";

type PLPageScreenProp = NativeStackScreenProps<RootStackParamList, 'PL'>;

const PLPage = ({ navigation }: PLPageScreenProp) => {
    const project = useRecoilValue(projectState);
    const userToken = useRecoilValue(userTokenState);
    const id = project.id;
    const [issues, setIssues] = useState<IssueBrowse[]>([]);
    const [showNewIssues, setShowNewIssues] = useState(true); // Initial state to show new issues
    const [showResolvedIssues, setShowResolvedIssues] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState<IssueBrowse | null>(null);
    const [popupType, setPopupType] = useState<'assign' | 'close' | null>(null);

    useEffect(() => {
        const getIssues = async () => {
            const issueBrowse: IssueBrowse[] = await getAllIssueById(id, userToken);
            setIssues(issueBrowse);
        };

        void getIssues();
    }, [id, userToken]);

    const handleIssuePress = (issue: IssueBrowse) => {
        if (issue.status === 'NEW') {
            setPopupType('assign');
            setSelectedIssue(issue);
        } else if (issue.status === 'RESOLVED') {
            setPopupType('close');
            setSelectedIssue(issue);
        }
    };

    const handleShowNewIssues = () => {
        setShowNewIssues(true);
        setShowResolvedIssues(false);
    };

    const handleShowResolvedIssues = () => {
        setShowResolvedIssues(true);
        setShowNewIssues(false);
    };

    const handleShowAllIssues = () => {
        setShowNewIssues(false);
        setShowResolvedIssues(false);
    };

    const handleClosePopup = () => {
        setSelectedIssue(null);
        setPopupType(null);
    };

    const filteredIssues = showNewIssues
        ? issues.filter(issue => issue.status === 'NEW')
        : showResolvedIssues
            ? issues.filter(issue => issue.status === 'RESOLVED')
            : issues;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.description}>{project.description}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateIssue')} style={styles.button}>
                <Text style={styles.buttonText}>Create Issue</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleShowNewIssues} style={styles.button}>
                    <Text style={styles.buttonText}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShowResolvedIssues} style={styles.button}>
                    <Text style={styles.buttonText}>Resolved</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShowAllIssues} style={styles.button}>
                    <Text style={styles.buttonText}>All</Text>
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

            {selectedIssue && popupType === 'assign' && (
                <AssignDeveloperPopup
                    visible={!!selectedIssue}
                    onClose={handleClosePopup}
                    issueId={selectedIssue.id}
                    projectId={id}
                    userToken={userToken}
                />
            )}

            {selectedIssue && popupType === 'close' && (
                <ConfirmClosePopup
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

export default PLPage;
