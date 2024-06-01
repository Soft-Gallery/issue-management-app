import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import theme from '../style/theme';
import getMemberByProjectIdByRole from "../remotes/member/getMemberProjectById";
import postComment from "../remotes/comment/postComment";
import assignDev from "../remotes/issue/assignDev";
// import getDevelopersByProjectId from '../remotes/user/getDevelopersByProjectId'; // Assume this function fetches the developers
// import addCommentToIssue from '../remotes/issue/addCommentToIssue';
// import assignIssueToDeveloper from '../remotes/issue/assignIssueToDeveloper';

interface AssignDeveloperProps {
    visible: boolean;
    onClose: () => void;
    issueId: number;
    projectId: number;
    userToken: string;
}

interface Devs {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
}

const AssignDeveloperPopup = ({ visible, onClose, issueId, projectId, userToken }: AssignDeveloperProps) => {
    const [developers, setDevelopers] = useState<Devs[]>([]);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Devs>();
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (visible) {
            const fetchDevelopers = async () => {
                const devs = await getMemberByProjectIdByRole(projectId, 'ROLE_DEVELOPER', userToken);
                setDevelopers(devs);
            };

            void fetchDevelopers();
        }
    }, [visible]);

    const handleAssign = async () => {
        if (selectedDeveloper && comment) {
            await postComment(comment, issueId, userToken);
            await assignDev(issueId, selectedDeveloper.id, userToken);
            onClose();
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.popup}>
                    <Text style={styles.title}>Assign Developer</Text>
                    <ScrollView>
                        {developers.map(developer => (
                            <TouchableOpacity
                                key={developer.id}
                                style={[
                                    styles.developerOption,
                                    selectedDeveloper && selectedDeveloper.id === developer.id && styles.selectedDeveloper
                                ]}
                                onPress={() => setSelectedDeveloper(developer)}
                            >
                                <Text style={styles.developerName}>{developer.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Add a comment"
                        value={comment}
                        onChangeText={setComment}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleAssign} style={styles.button}>
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
    developerOption: {
        padding: 10,
        borderWidth: 1,
        borderColor: theme.color.gray3,
        borderRadius: 8,
        marginVertical: 4,
        backgroundColor: theme.color.gray1,
    },
    selectedDeveloper: {
        borderColor: theme.color.main,
    },
    developerName: {
        fontSize: 16,
        color: theme.color.white,
    },
    commentInput: {
        backgroundColor: theme.color.white,
        padding: 8,
        borderRadius: 5,
        marginTop: 8,
        marginBottom: 16,
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

export default AssignDeveloperPopup;
