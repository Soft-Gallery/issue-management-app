import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {projectCreateIdState, projectCreateState, projectsState, userIdState, userTokenState} from "../recoil/atom";
import theme from "../style/theme";
import AddMemberPage from './AddMemberPage';
import postProject from "../remotes/project/postProject";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

const ProjectCreationPage = () => {
    const userToken = useRecoilValue(userTokenState);
    const setStep = useSetRecoilState(projectCreateState);
    const setProjectCreateId = useSetRecoilState(projectCreateIdState);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const userId = useRecoilValue(userIdState);

    const handleCreateProject = async () => {
        setName('');
        setDescription('');

        const id = await postProject(name, description, "InProgress", userId, userToken);
        setProjectCreateId(id);
        Alert.alert('Success', `project number ${id}`);

        setStep(2);
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.choosePinTextContainer}>
                    <View style={[styles.circle, {backgroundColor: theme.color.main}]}>
                        <Text style={[styles.circleText, {color: theme.color.white}]}>1</Text>
                    </View>
                    <Text style={styles.title}>Create Project</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Project Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={theme.color.gray5}
                />
                <TextInput
                    style={[styles.input, styles.descriptionInput]} // Add a specific style for description
                    placeholder="Project Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true} // Enable multiline input for description
                    placeholderTextColor={theme.color.gray5}
                />
                <TouchableOpacity onPress={handleCreateProject} style={styles.button}>
                    <Text style={styles.buttonText}>Create Project</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        padding: 16,
        borderWidth: 1,
        backgroundColor: theme.color.gray1,
        borderColor: theme.color.gray3,
        borderRadius: 10,
        marginTop: 14,
    },
    title: {
        color: theme.color.white,
        fontSize: 24,
        fontWeight: 'bold',
        height: 52,
        marginLeft: 8,
        marginTop: 4,
    },
    input: {
        width: '100%',
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        color: 'white',
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: theme.color.main,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    choosePinTextContainer: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    choosePinText: {
        marginLeft: 10,
        color: theme.color.white,
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 25.5,
        letterSpacing: -0.51,
    },
    circle: {
        display: 'flex',
        width: 30,
        height: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 300,
        marginVertical: 3,
    },
    circleText: {
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: -0.45,
    },
});

export default ProjectCreationPage;
