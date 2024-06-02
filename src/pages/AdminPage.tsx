import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProjectCreationPage from './ProjectCreationPage';
import ProjectListPage from './ProjectListPage';
import AddMemberPage from "./AddMemberPage";
import theme from "../style/theme";
import { WINDOW_WIDTH } from "../const/window";
import { useRecoilValue } from "recoil";
import { projectCreateState } from "../recoil/atom";

const AdminPage = () => {
    const createStep = useRecoilValue(projectCreateState);
    const [view, setView] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Page</Text>
            <TouchableOpacity onPress={() => setView('create')} style={styles.button}>
                <Text style={styles.buttonText}>Create Project</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setView('list')} style={styles.button}>
                <Text style={styles.buttonText}>View Projects</Text>
            </TouchableOpacity>
            {view === 'create' && createStep === 1 && <ProjectCreationPage />}
            {view === 'create' && createStep === 2 && <AddMemberPage />}
            {view === 'list' && <ProjectListPage />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: WINDOW_WIDTH,
        padding: 32,
        backgroundColor: theme.color.background,
    },
    title: {
        fontSize: 24,
        color: theme.color.white,
        fontWeight: 'bold',
        marginBottom: 16,
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
});

export default AdminPage;

