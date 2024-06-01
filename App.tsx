import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/pages/LoginPage';
import theme from "./src/style/theme";
import LoginForm from "./src/pages/LoginForm";
import SignUpForm from "./src/pages/SignUpForm";
import MainPage from "./src/pages/MainPage";
import {RecoilRoot} from "recoil";
import { Project } from './src/types/project';
import ProjectPage from "./src/pages/ProjectPage";
import PLPage from "./src/pages/PLPage";
import DeveloperPage from "./src/pages/DeveloperPage";
import TesterPage from "./src/pages/TesterPage";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    Main: undefined;
    Project: { userRole: string };
    PL: undefined;
    Developer: undefined;
    Tester: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: theme.color.background,
                        },
                        headerTintColor: theme.color.white,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen name="Home" component={LoginPage} options={{ title: '' }} />
                    <Stack.Screen name="Login" component={LoginForm} options={{ title: '로그인' }} />
                    <Stack.Screen name="SignUp" component={SignUpForm} options={{ title: '회원가입' }} />
                    <Stack.Screen name="Main" component={MainPage} options={{title: ''}} />
                    <Stack.Screen name="Project" component={ProjectPage} options={{title: ''}}/>
                    <Stack.Screen name="PL" component={PLPage} options={{title: ''}}/>
                    <Stack.Screen name="Developer" component={DeveloperPage} options={{title: ''}}/>
                    <Stack.Screen name="Tester" component={TesterPage} options={{title: ''}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </RecoilRoot>
    );
}
