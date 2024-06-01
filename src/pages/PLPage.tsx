import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import theme from '../style/theme';
import {useRecoilValue} from "recoil";
import {projectState} from "../recoil/atom";

const PLPage = () => {
    const project = useRecoilValue(projectState);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{project.title}</Text>
            <Text style={styles.description}>{project.description}</Text>
            <Text style={styles.sectionTitle}>Project Leads:</Text>
            {project.pl.map(pl => (
                <Text key={pl.id} style={styles.userText}>{pl.name} ({pl.email})</Text>
            ))}
            <Text style={styles.sectionTitle}>Issues:</Text>
            {project.issues.map(issue => (
                <View key={issue.id} style={styles.issueContainer}>
                    <Text style={styles.issueTitle}>{issue.title}</Text>
                    <Text style={styles.issueDescription}>{issue.description}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.background,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.color.white,
    },
    description: {
        fontSize: 16,
        color: theme.color.white,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.color.white,
        marginTop: 16,
    },
    userText: {
        fontSize: 16,
        color: theme.color.white,
    },
    issueContainer: {
        marginTop: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: theme.color.gray3,
        borderRadius: 8,
    },
    issueTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.color.white,
    },
    issueDescription: {
        fontSize: 14,
        color: theme.color.white,
    },
});

export default PLPage;
