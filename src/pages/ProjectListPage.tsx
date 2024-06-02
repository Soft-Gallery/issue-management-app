import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/atom';
import theme from '../style/theme';
import { client } from '../remotes/axios';

const ProjectListPage = () => {
    const userToken = useRecoilValue(userTokenState);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await client.get('/project/adminid', {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
                alert('Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        void fetchProjects();
    }, [userToken]);

    const renderItem = ({ item }) => (
        <View style={styles.projectItem}>
            <Text style={styles.projectTitle}>{item.name}</Text>
            <Text style={styles.projectDescription}>{item.description}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color={theme.color.main} />;
    }

    return (
        <FlatList
            data={projects}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    projectItem: {
        backgroundColor: theme.color.gray1,
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.color.gray3,
    },
    projectTitle: {
        fontSize: 18,
        color: theme.color.white,
        fontWeight: 'bold',
    },
    projectDescription: {
        fontSize: 14,
        color: theme.color.white,
    },
});

export default ProjectListPage;
