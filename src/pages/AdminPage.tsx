// src/components/AdminPage.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { projectsState, userRoleState} from "../recoil/atom";

const AdminPage = () => {
    const [projectName, setProjectName] = useState('');
    const [newRole, setNewRole] = useState('');
    const [projects, setProjects] = useRecoilState(projectsState);
    const [roles, setRoles] = useRecoilState(userRoleState);

    const handleAddProject = () => {
        setProjects([...projects, { name: projectName }]);
        setProjectName('');
    };

    const handleAddRole = (role: string) => {
        setRoles([...roles, role]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Page</Text>
            <TextInput
                style={styles.input}
                placeholder="Project Name"
                value={projectName}
                onChangeText={setProjectName}
            />
            <TouchableOpacity onPress={handleAddProject} style={styles.button}>
                <Text style={styles.buttonText}>Add Project</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Role (PL, DEV, TESTER)"
                value={newRole}
                onChangeText={setNewRole}
            />
            <TouchableOpacity onPress={() => handleAddRole(newRole)} style={styles.button}>
                <Text style={styles.buttonText}>Add Role</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'blue',
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
