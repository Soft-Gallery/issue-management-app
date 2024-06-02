import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import theme from "../style/theme";
import postLogin from "../remotes/auth/postLogin";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {useSetRecoilState} from "recoil";
import {userIdState, userTokenState} from "../recoil/atom";

type LoginFormScreenProp = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginForm = ({ navigation }: LoginFormScreenProp) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const setUserTokenValue = useSetRecoilState(userTokenState);
    const setUserId = useSetRecoilState(userIdState);

    const handleLogin = async () => {
        try {
            const token = await postLogin(id, password);
            if (token) {
                setUserTokenValue(token);
                setUserId(id);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else {
                Alert.alert('로그인 실패', '아이디 또는 비밀번호가 잘못되었습니다.');
            }
        } catch (error) {
            console.error('Login error', error);
            Alert.alert('로그인 실패', '알 수 없는 오류가 발생했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>로그인</Text>
            <TextInput
                style={styles.input}
                placeholder="아이디"
                value={id}
                onChangeText={setId}
                keyboardType="email-address"
                placeholderTextColor={theme.color.gray3}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={theme.color.gray3}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>로그인 하기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 16,
        backgroundColor: theme.color.background,
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
    button: {
        width: '100%',
        backgroundColor: theme.color.gray2,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 60,
    },
    buttonText: {
        color: theme.color.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginForm;
