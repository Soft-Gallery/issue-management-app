import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../style/theme';
import { useRecoilValue } from 'recoil';
import { userTokenState} from "../recoil/atom";
import { getUserInfo } from '../remotes/auth/getUserInfo';
import { UserRole, UserWithRole } from '../types/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type MainScreenProp = NativeStackScreenProps<RootStackParamList, 'Main'>;

const MainPage = ({ navigation }: MainScreenProp) => {
    const userTokenValue = useRecoilValue(userTokenState);
    const [userInfo, setUserInfo] = useState<UserWithRole<UserRole> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfoValue = await getUserInfo(userTokenValue);
                setUserInfo(userInfoValue);
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
            {userInfo.role === 'ROLE_PL' && <PLPage />}
            {userInfo.role === 'ROLE_DEVELOPER' && <DeveloperPage />}
            {userInfo.role === 'ROLE_TESTER' && <TesterPage />}
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
});

export default MainPage;
