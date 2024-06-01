import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import theme from "../style/theme";
import getMemberAll from "../remotes/project/getMemberAll";
import {useRecoilValue} from "recoil";
import {userTokenState} from "../recoil/atom";

const roles = ['ROLE_PL', 'ROLE_DEVELOPER', 'ROLE_TESTER'];

const AddMemberPage = () => {
    const userToken = useRecoilValue(userTokenState);
    const [selectedRole, setSelectedRole] = useState(roles[0]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [plUsers, setPLUsers] = useState([]);
    const [devUsers, setDevUsers] = useState([]);
    const [testerUsers, setTesterUsers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const pl = await getMemberAll('ROLE_PL', userToken);
                const dev = await getMemberAll('ROLE_DEVELOPER', userToken);
                const tester = await getMemberAll('ROLE_TESTER', userToken);

                setPLUsers(pl);
                setDevUsers(dev);
                setTesterUsers(tester);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch users');
            }
        };

        void fetchMembers();
    }, []);

    const handleSelectUser = (user) => {
        if (!selectedUsers.some(u => u.id === user.id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const getUsersByRole = (role) => {
        switch (role) {
            case 'ROLE_PL':
                return plUsers;
            case 'ROLE_DEVELOPER':
                return devUsers;
            case 'ROLE_TESTER':
                return testerUsers;
            default:
                return [];
        }
    };

    const users = getUsersByRole(selectedRole);

    return (
        <View style={styles.container}>
            <View style={styles.choosePinTextContainer}>
                <View style={[styles.circle, {backgroundColor: theme.color.main}]}>
                    <Text style={[styles.circleText, {color: theme.color.white}]}>2</Text>
                </View>
                <Text style={styles.title}>Add Member</Text>
            </View>
            <View style={styles.roleContainer}>
                {roles.map((role, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedRole(role)}
                        style={[
                            styles.roleButton,
                            selectedRole === role && styles.selectedRoleButton,
                        ]}
                    >
                        <Text style={styles.roleButtonText}>{role.replace('ROLE_', '')}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.userButton}
                            onPress={() => handleSelectUser(item)}
                        >
                            <Text style={styles.userButtonText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity
                onPress={() => Alert.alert('Selected Users', JSON.stringify(selectedUsers))}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Confirm Members</Text>
            </TouchableOpacity>
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
    choosePinTextContainer: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'flex-start',
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
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    roleButton: {
        padding: 12,
        borderRadius: 5,
        backgroundColor: theme.color.gray2,
    },
    selectedRoleButton: {
        backgroundColor: theme.color.main,
    },
    roleButtonText: {
        color: 'white',
    },
    listContainer: {
        height: 200, // Set the height of the FlatList container
    },
    userButton: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.color.gray3,
    },
    userButtonText: {
        color: 'white',
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

export default AddMemberPage;
