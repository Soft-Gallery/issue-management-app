import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Modal, FlatList } from 'react-native';
import theme from "../style/theme";
import postSignUp from "../remotes/auth/signUp";

const SignUpForm = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('ADMIN');
    const [modalVisible, setModalVisible] = useState(false);

    const roles = ['ROLE_ADMIN', 'ROLE_PL', 'ROLE_DEVELOPER', 'ROLE_TESTER'];

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateUsername = (username: string) => {
        const re = /^[a-zA-Z]{1,20}$/;
        return re.test(username);
    };

    const validatePassword = (password: string) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        return re.test(password);
    };

    const validateID = (id: string) => {
        const re = /^[a-zA-Z0-9]{4,8}$/;
        return re.test(id);
    };

    const handleSignUp = async () => {
        await postSignUp(id, username, email, password, role);
    };

    const renderRoleItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            onPress={() => {
                setRole(item);
                setModalVisible(false);
            }}
            style={styles.modalItem}
        >
            <Text style={styles.modalItemText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>회원가입</Text>
            <TextInput
                style={styles.input}
                placeholder="아이디"
                value={id}
                onChangeText={setId}
                maxLength={8}
                placeholderTextColor={theme.color.gray3}
            />
            <TextInput
                style={styles.input}
                placeholder="이름"
                value={username}
                onChangeText={setUsername}
                maxLength={8}
                placeholderTextColor={theme.color.gray3}
            />
            <TextInput
                style={styles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor={theme.color.gray3}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholderTextColor={theme.color.gray3}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                placeholderTextColor={theme.color.gray3}
            />
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.roleButton}
            >
                <Text style={styles.roleButtonText}>역할 선택: {role}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>역할 선택</Text>
                        <FlatList
                            data={roles}
                            renderItem={renderRoleItem}
                            keyExtractor={(item) => item}
                        />
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.modalCloseButton}
                        >
                            <Text style={styles.modalCloseButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={handleSignUp}
                style={styles.button}
            >
                <Text style={styles.buttonText}>회원가입 하기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.background,
        width: '100%',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.color.gray6,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.color.gray3,
        borderRadius: 5,
        backgroundColor: theme.color.white,
        color: theme.color.black,
    },
    roleButton: {
        width: '100%',
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.color.gray3,
        borderRadius: 5,
        backgroundColor: theme.color.gray2,
        alignItems: 'center',
    },
    roleButtonText: {
        color: theme.color.white,
        fontSize: 16,
    },
    button: {
        backgroundColor: theme.color.main,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.color.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: theme.color.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.color.gray3,
        width: '100%',
        alignItems: 'center',
    },
    modalItemText: {
        fontSize: 18,
        color: theme.color.black,
    },
    modalCloseButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: theme.color.gray2,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: theme.color.white,
        fontSize: 16,
    },
});

export default SignUpForm;

