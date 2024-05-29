import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {StyleSheet, Text, View} from "react-native";
import theme from "../style/theme";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {userRoleState, userTokenState} from "../recoil/atom";
import {getUserInfo} from "../remotes/auth/getUserInfo";
import {UserRole, UserWithRole} from "../types/user";

type MainScreenProp = NativeStackScreenProps<RootStackParamList, 'Main'>;
const MainPage = ({ navigation }: MainScreenProp) => {
    const userTokenValue = useRecoilValue(userTokenState);
    const [userInfo, setUserInfo] = useState<UserWithRole<UserRole> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo(userTokenValue);
                setUserInfo(userInfo);
                console.log(userInfo);
            } catch (err) {
                console.log(err);
            }
        };

        if (userTokenValue) {
            void fetchUserInfo();
        } else {
            setError('User token is missing');
        }
    }, [userTokenValue]);

    return (
        <View style={styles.container}>
            <View></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default MainPage;
