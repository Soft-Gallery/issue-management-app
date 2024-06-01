import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {StyleSheet, View, FlatList, Text, ScrollView, ActivityIndicator} from "react-native";
import BubbleChart from "../ component/BubbleChart";
import theme from "../style/theme";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../recoil/atom";
import { StatisticMainCause, StatisticPriority, StatisticState } from "../types/statistic";
import getState from "../remotes/statistic/getState";
import {WINDOW_WIDTH} from "../const/window";

type StatisticPageScreenProp = NativeStackScreenProps<RootStackParamList, 'StatisticPage'>;

const StatisticPage = () => {
    const userToken = useRecoilValue(userTokenState);
    const [state, setState] = useState<StatisticState | null>(null);
    const [priority, setPriority] = useState<StatisticPriority | null>(null);
    const [mainCause, setMainCause] = useState<StatisticMainCause | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAll = async () => {
            const st = await getState('state', userToken);
            const pr = await getState('priority', userToken);
            const ma = await getState('mainCause', userToken);

            setState(st);
            setPriority(pr);
            setMainCause(ma);
            setLoading(false);
        };
        void getAll();
    }, [userToken]);

    const data = [
        { key: '이슈 현황', data: state },
        { key: '우선 순위', data: priority },
        { key: '주요 원인', data: mainCause }
    ];

    const renderItem = ({ item }) => (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{item.key}</Text>
            {item.data && <BubbleChart data={item.data} />}
            <View style={styles.itemList}>
                {Object.entries(item.data).map(([name, value]) => (
                    <Text key={name} style={styles.itemText}>{`${name}: ${value}`}</Text>
                ))}
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={theme.color.main} />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    horizontal
                    keyExtractor={(item) => item.key}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.color.background,
    },
    chartContainer: {
        width: WINDOW_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    chartTitle: {
        fontSize: 25,
        color: theme.color.white,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemList: {
        marginTop: 20,
    },
    itemText: {
        fontSize: 18,
        color: theme.color.white,
    },
});

export default StatisticPage;
