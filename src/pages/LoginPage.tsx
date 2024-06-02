import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import theme from "../style/theme";
import {WINDOW_WIDTH} from "../const/window";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

type LoginScreenProp = NativeStackScreenProps<RootStackParamList, 'Home'>;

const LoginPage = ({ navigation }: LoginScreenProp) => {
  return (
      <View style={styles.container}>
        <View style={styles.uiContainer}>
          <Image source={require('../assets/project_panda_without_background.png')} style={styles.logo} />
          <Text style={styles.normalText}>Project Panda</Text>
          <View style={styles.socialButtonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.socialButton}
            >
              <Text style={styles.socialText}>로그인!</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.socialButton}
            >
              <Text style={styles.socialText}>회원가입!</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  uiContainer: {
    width: WINDOW_WIDTH - 52,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 120,
  },
  normalText: {
    color: theme.color.gray6,
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
    lineHeight: 21,
    letterSpacing: -0.42,
  },
  socialButtonContainer: {
    display: 'flex',
    width: '100%',
    marginTop: 14,
    gap: 16,
  },
  socialButton: {
    width: '100%',
    borderRadius: 5,
    height: 48,
    backgroundColor: theme.color.gray2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 13,
  },
  gradientBorder: {
    padding: 1,
    borderRadius: 7,
  },
  socialText: {
    color: theme.color.white,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22.5,
    letterSpacing: -0.45,
    marginLeft: 12,
  },
});

export default LoginPage;
