import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import theme from '../style/theme';
import { Project } from '../types/project';
import { ProjectDummy} from "../dummy/projectDummy";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {useRecoilState, useRecoilValue} from "recoil";
import {projectsState, projectState, userRoleState} from "../recoil/atom";
import {useNavigation} from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

const ProjectPage = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userRole = useRecoilValue(userRoleState);
    const [selectedProject, setSelectedProject] = useRecoilState(projectState);

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project);
        navigateToRolePage();
    };

    const navigateToRolePage = () => {
        if (userRole === 'ROLE_PL') {
            navigation.navigate('PL');
        } else if (userRole === 'ROLE_DEVELOPER') {
            navigation.navigate('Developer');
        } else if (userRole === 'ROLE_TESTER') {
            navigation.navigate('Tester');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Project</Text>
            <FlatList
                data={ProjectDummy}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.projectButton,
                            selectedProject?.title === item.title && styles.selectedProjectButton,
                        ]}
                        onPress={() => handleProjectSelect(item)}
                    >
                        <Text style={styles.projectButtonText}>{item.title}</Text>
                        <Text style={styles.projectDescription}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: theme.color.background,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.color.white,
        marginBottom: 16,
    },
    projectButton: {
        padding: 16,
        height: 160,
        borderWidth: 1,
        borderColor: theme.color.gray3,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: theme.color.gray1,
    },
    selectedProjectButton: {
        backgroundColor: theme.color.main,
    },
    projectButtonText: {
        fontSize: 18,
        color: theme.color.white,
    },
    projectDescription: {
        fontSize: 14,
        color: theme.color.white,
    },
});

export default ProjectPage;
