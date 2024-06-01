import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Alert} from 'react-native';
import theme from '../style/theme';
import {Proj, Project} from '../types/project';
import { ProjectDummy} from "../dummy/projectDummy";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {useRecoilState, useRecoilValue} from "recoil";
import {projectsState, projectState, userIdState, userRoleState, userTokenState} from "../recoil/atom";
import {useNavigation} from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import postProject from "../remotes/project/postProject";
import getProjectById from "../remotes/project/getProjectById";

interface ProjectPageProps {
    navigate: () => void;
}
const ProjectPage = ({ navigate }: ProjectPageProps) => {
    const [selectedProject, setSelectedProject] = useRecoilState(projectState);
    const userId = useRecoilValue(userIdState);
    const userToken = useRecoilValue(userTokenState);
    const [projects, setProjects] = useState<Proj[]>([]);

    useEffect(() => {
        const handleCreateProject = async () => {
            const pro = await getProjectById(userId, userToken);
            setProjects(pro);
        };

        void handleCreateProject();
    }, []);

    const handleProjectSelect = (project: Proj) => {
        setSelectedProject(project);
        navigate();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Project</Text>
            <FlatList
                data={projects}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.projectButton,
                            selectedProject?.name === item.name && styles.selectedProjectButton,
                        ]}
                        onPress={() => handleProjectSelect(item)}
                    >
                        <Text style={styles.projectButtonText}>{item.name}</Text>
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
        height: 80,
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
