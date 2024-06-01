import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import theme from '../style/theme';
import { IssueBrowse } from "../pages/TesterPage";
import postComment from "../remotes/comment/postComment";
import updateIssueState from "../remotes/issue/updateIssueState";

interface IssueDetailPopupProps {
    visible: boolean;
    onClose: () => void;
    issue: IssueBrowse;
    userToken: string;
}

const IssueDetailPopup = ({ visible, onClose, issue, userToken }: IssueDetailPopupProps) => {
    const [comment, setComment] = useState('');
    const [fixComplete, setFixComplete] = useState(false);

    const handleAddComment = async () => {
        if (comment) {
            await postComment(comment, issue.id, userToken);
            if (fixComplete) {
                await updateIssueState(issue.id, userToken);
            }
            onClose();
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.popup}>
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
                        style={styles.commentInput}
                        placeholder="Add a comment"
                        value={comment}
                        onChangeText={setComment}
                    />
                    <TouchableOpacity
                        style={[styles.fixCompleteButton, fixComplete && styles.fixCompleteButtonSelected]}
                        onPress={() => setFixComplete(!fixComplete)}
                    >
                        <Text style={styles.fixCompleteText}>Fix Complete!</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleAddComment} style={styles.button}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        width: '80%',
        backgroundColor: theme.color.background,
        borderRadius: 8,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.color.white,
        marginBottom: 16,
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
        color: theme.color.white,
    },
    commentDate: {
        fontSize: 12,
        color: theme.color.white,
    },
    commentInput: {
        backgroundColor: theme.color.white,
        padding: 8,
        borderRadius: 5,
        marginTop: 8,
        marginBottom: 16,
    },
    fixCompleteButton: {
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: theme.color.gray3,
        marginBottom: 16,
    },
    fixCompleteButtonSelected: {
        backgroundColor: theme.color.main,
    },
    fixCompleteText: {
        fontSize: 16,
        color: theme.color.white,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: theme.color.main,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 8,
        flex: 1,
        marginHorizontal: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default IssueDetailPopup;
