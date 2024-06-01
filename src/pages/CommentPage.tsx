import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, Button} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useRecoilValue } from "recoil";
import { userTokenState } from "../recoil/atom";
import {IssueBrowse} from "./TesterPage";
import theme from "../style/theme";

type CommentPageScreenProp = NativeStackScreenProps<RootStackParamList, 'CommentPage'>;

const CommentPage = ({ route }: CommentPageScreenProp) => {
    const { issueId } = route.params;
    const userToken  = useRecoilValue(userTokenState);
    const [issue, setIssue] = useState<IssueBrowse | null>(null);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const fetchIssue = async () => {
            // const fetchedIssue = await getIssueById(issueId, userToken);
            // setIssue(fetchedIssue);
        };

        void fetchIssue();
    }, [issueId, userToken]);

    const handleAddComment = async () => {
        if (issue) {
            // await addCommentToIssue(issueId, commentText, userToken);
            // setCommentText('');
            // // Refresh issue data to show the new comment
            // const updatedIssue = await getIssueById(issueId, userToken);
            // setIssue(updatedIssue);
        }
    };

    return (
        <View style={styles.container}>
            {issue && (
                <>
                    <Text style={styles.title}>{issue.title}</Text>
                    <Text style={styles.description}>{issue.description}</Text>
                    <ScrollView>
                        {issue.comments.map(comment => (
                            <View key={comment.id} style={styles.commentContainer}>
                                <Text style={styles.commentText}>{comment.text}</Text>
                                <Text style={styles.commentAuthor}>By: {comment.authorId}</Text>
                                <Text style={styles.commentDate}>{comment.createdAt}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment"
                        value={commentText}
                        onChangeText={setCommentText}
                    />
                    <Button title="Submit" onPress={handleAddComment} />
                </>
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
    commentContainer: {
        marginTop: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: theme.color.gray3,
        borderRadius: 8,
        backgroundColor: theme.color.gray1,
    },
    commentText: {
        fontSize: 14,
        color: theme.color.white,
    },
    commentAuthor: {
        fontSize: 12,
        color: theme.color.gray2,
    },
    commentDate: {
        fontSize: 12,
        color: theme.color.gray2,
    },
    input: {
        backgroundColor: theme.color.white,
        padding: 8,
        borderRadius: 5,
        marginTop: 8,
        marginBottom: 16,
    },
});

export default CommentPage;
