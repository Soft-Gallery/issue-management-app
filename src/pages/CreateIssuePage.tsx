import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import theme from '../style/theme';
import { useRecoilValue } from 'recoil';
import { projectState, userIdState, userTokenState } from '../recoil/atom';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import postIssue from "../remotes/issue/postIssue";

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

type CreateIssueScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateIssue'>;

const CreateIssuePage = ({ navigation }: CreateIssueScreenProps) => {
    const project = useRecoilValue(projectState);
    const userId = useRecoilValue(userIdState);
    const userToken = useRecoilValue(userTokenState);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState('');

    const handleCreateIssue = async () => {
        try {
            const issue: Issue = {
                title,
                description,
                priority: 'MAJOR',
                projectId: project.id,
                startDate: new Date().toISOString(),
                endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1주일 후 날짜
            };

            const issueComment: Comment = {
                text: comment,
                createdAt: new Date().toISOString(),
                authorId: userId
            };

            const data: PostData = {
                issue,
                comment: issueComment
            };

            await postIssue(data, userToken);

            Alert.alert('Success', 'Issue created successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Failed to create issue:', error);
            Alert.alert('Error', 'Failed to create issue');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Issue</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={theme.color.gray5}
            />
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                placeholderTextColor={theme.color.gray5}
            />
            <TextInput
                style={styles.input}
                placeholder="Initial Comment"
                value={comment}
                onChangeText={setComment}
                placeholderTextColor={theme.color.gray5}
            />
            <TouchableOpacity onPress={handleCreateIssue} style={styles.button}>
                <Text style={styles.buttonText}>Create Issue</Text>
            </TouchableOpacity>
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
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: theme.color.gray3,
        borderRadius: 5,
        color: theme.color.white,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
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

export default CreateIssuePage;
