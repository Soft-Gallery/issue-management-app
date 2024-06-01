import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../style/theme';
import updateIssueState from '../remotes/issue/updateIssueState';
import {IssueBrowse} from "../pages/TesterPage";
import closeIssue from "../remotes/issue/closeIssue";

interface ConfirmClosePopupProps {
    visible: boolean;
    onClose: () => void;
    issue: IssueBrowse;
    userToken: string;
}

const ConfirmClosePopup = ({ visible, onClose, issue, userToken }: ConfirmClosePopupProps) => {
    const handleConfirm = async () => {
        await closeIssue(issue.id, userToken);
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.popup}>
                    <Text style={styles.title}>Close Issue</Text>
                    <Text style={styles.description}>Do you want to change the status of this issue to closed?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
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

export default ConfirmClosePopup;
