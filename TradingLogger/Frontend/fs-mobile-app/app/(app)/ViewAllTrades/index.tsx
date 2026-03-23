import { Text, useColorScheme, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ViewAllTrades() {

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [trades, setTrades] = useState([]);


    useEffect(() => {
        const run = async () => {
            const hostUri = Constants.expoConfig?.hostUri;
            const ipAddress = hostUri ? hostUri.split(":")[0] : null;
            const apiPort = "8080";
            const tempURL = ipAddress ? `http://${ipAddress}:${apiPort}` : null;

            if (!tempURL) {
                console.log("No API URL");
                return;
            }

            const storedUserId = await AsyncStorage.getItem("userId");
            const id = storedUserId ?? "";

            if (!id) {
                console.log("No userId in storage");
                setTrades([]);
                return;
            }

            const res = await fetch(`${tempURL}/trades/all/${id}`);
            const data = await res.json();

            // @ts-ignore
            setTrades(Array.isArray(data) ? data : []);
        };

        run();
    }, []);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 32,
        },
        containerLight: {
            backgroundColor: '#FFFFFF',
        },
        containerDark: {
            backgroundColor: '#131722',
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 24,
            letterSpacing: 0.5,
        },
        titleLight: {
            color: '#2A2E39',
        },
        titleDark: {
            color: '#FFFFFF',
        },
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            paddingBottom: 24,
        },
        tradeCard: {
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
        },
        tradeCardLight: {
            backgroundColor: '#F8F9FD',
            borderColor: '#E0E3EB',
        },
        tradeCardDark: {
            backgroundColor: '#1E222D',
            borderColor: '#2A2E39',
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        stockName: {
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 0.5,
        },
        stockNameLight: {
            color: '#2A2E39',
        },
        stockNameDark: {
            color: '#FFFFFF',
        },
        resultBadge: {
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 4,
        },
        resultBadgePositive: {
            backgroundColor: 'rgba(38, 166, 154, 0.15)',
        },
        resultBadgeNegative: {
            backgroundColor: 'rgba(239, 83, 80, 0.15)',
        },
        resultText: {
            fontSize: 12,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        resultTextPositive: {
            color: '#26A69A',
        },
        resultTextNegative: {
            color: '#EF5350',
        },
        detailsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
        },
        detailItem: {
            flex: 0,
            minWidth: '45%',
        },
        detailLabel: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 4,
            letterSpacing: 0.3,
        },
        detailLabelLight: {
            color: '#5D667B',
        },
        detailLabelDark: {
            color: '#9598A1',
        },
        detailValue: {
            fontSize: 16,
            fontWeight: '500',
        },
        detailValueLight: {
            color: '#2A2E39',
        },
        detailValueDark: {
            color: '#D1D4DC',
        },
        pnlPositive: {
            color: '#26A69A',
            fontWeight: '600',
        },
        pnlNegative: {
            color: '#EF5350',
            fontWeight: '600',
        },
        descriptionContainer: {
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#E0E3EB',
        },
        description: {
            fontSize: 14,
            lineHeight: 20,
            opacity: 0.8,
        },
        descriptionLight: {
            color: '#5D667B',
        },
        descriptionDark: {
            color: '#9598A1',
        },
    });

    return (
        <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
            <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>
                Trade History
            </Text>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {trades.map((trade: any) => (
                    <TouchableOpacity
                        key={trade.id}
                        style={[styles.tradeCard, isDark ? styles.tradeCardDark : styles.tradeCardLight]}
                        onPress={() => router.navigate(`/ViewTrade/${trade.id}`)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={[styles.stockName, isDark ? styles.stockNameDark : styles.stockNameLight]}>
                                {trade.stockName}
                            </Text>
                            <View style={[
                                styles.resultBadge,
                                trade.positive ? styles.resultBadgePositive : styles.resultBadgeNegative
                            ]}>
                                <Text style={[
                                    styles.resultText,
                                    trade.positive ? styles.resultTextPositive : styles.resultTextNegative
                                ]}>
                                    {trade.positive ? 'Profit' : 'Loss'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.detailsGrid}>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                                    Amount
                                </Text>
                                <Text style={[styles.detailValue, isDark ? styles.detailValueDark : styles.detailValueLight]}>
                                    ${trade.amount.toFixed(2)}
                                </Text>
                            </View>

                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                                    PnL
                                </Text>
                                <Text style={[
                                    styles.detailValue,
                                    trade.positive ? styles.pnlPositive : styles.pnlNegative
                                ]}>
                                    {trade.positive ? '+' : '-'}${Math.abs(trade.pnl).toFixed(2)}
                                </Text>
                            </View>

                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                                    Leverage
                                </Text>
                                <Text style={[styles.detailValue, isDark ? styles.detailValueDark : styles.detailValueLight]}>
                                    {trade.leverage}x
                                </Text>
                            </View>

                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                                    Date
                                </Text>
                                <Text style={[styles.detailValue, isDark ? styles.detailValueDark : styles.detailValueLight]}>
                                    {new Date(trade.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </Text>
                            </View>
                        </View>

                        {trade.description && (
                            <View style={styles.descriptionContainer}>
                                <Text style={[styles.description, isDark ? styles.descriptionDark : styles.descriptionLight]} numberOfLines={2}>
                                    {trade.description}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}