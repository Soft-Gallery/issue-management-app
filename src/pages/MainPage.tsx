import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../style/theme';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {userIdState, userRoleState, userTokenState} from "../recoil/atom";
import { getUserInfo } from '../remotes/auth/getUserInfo';
import { UserRole, UserWithRole } from '../types/user';
import AdminPage from "./AdminPage";
import ProjectPage from "./ProjectPage";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

type MainScreenProp = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainPage = ({ navigation }: MainScreenProp) => {
    const userTokenValue = useRecoilValue(userTokenState);
    const [userRole, setUserRole] = useRecoilState(userRoleState);
    const setUserId = useSetRecoilState(userIdState);
    const [userInfo, setUserInfo] = useState<UserWithRole<UserRole> | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigateToRolePage = () => {
        if (userRole === 'ROLE_PL') {
            navigation.navigate('PL');
        } else if (userRole === 'ROLE_DEVELOPER') {
            navigation.navigate('Developer');
        } else if (userRole === 'ROLE_TESTER') {
            navigation.navigate('Tester');
        } else {
            console.log("안녕");
        }
    };

    const navigateToStaticticPage = () => {
        navigation.navigate('StatisticPage');
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfoValue = await getUserInfo(userTokenValue);
                setUserInfo(userInfoValue);
                setUserRole(userInfoValue.role);
                setUserId(userInfoValue.id);
                console.log(userInfoValue);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch user info');
            }
        };

        if (userTokenValue) {
            void fetchUserInfo();
        } else {
            setError('User token is missing');
        }
    }, [userTokenValue]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!userInfo) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {userInfo.role === 'ROLE_ADMIN' && <AdminPage />}
            {['ROLE_PL', 'ROLE_DEVELOPER', 'ROLE_TESTER'].includes(userInfo.role) && (
                <ProjectPage navigate={navigateToRolePage} />
            )}
            <TouchableOpacity
                onPress={navigateToStaticticPage}
                style={styles.button}
            >
                <Text style={styles.buttonText}>통계 보기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: theme.color.unReliable,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        color: theme.color.gray6,
        fontSize: 18,
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
});

export default MainPage;
