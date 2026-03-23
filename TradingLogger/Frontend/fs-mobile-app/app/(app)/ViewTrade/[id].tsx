import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

interface Trade {
    id: string;
    stockName: string;
    amount: number;
    pnl: number;
    leverage: number;
    positive: boolean;
    date: string;
    description: string;
}

export default function ViewTrade() {
    const { id } = useLocalSearchParams();
    const [apiUrl, setApiUrl] = useState();
    const [trade, setTrade] = useState<Trade | null>(null);

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    useEffect(() => {
        // @ts-ignore
        const hostUri = Constants.expoConfig.hostUri;
        const ipAddress = hostUri ? hostUri.split(":")[0] : null;

        const apiPort = "8080";

        const tempURL = ipAddress ? `http://${ipAddress}:${apiPort}` : null;
        // @ts-ignore
        setApiUrl(tempURL);

        fetch(`${tempURL}/trades/${id}`)
            .then((response) => response.json())
            .then((data) => setTrade(data));
    }, [id]);

    const deleteTrade = () => {
        fetch(`${apiUrl}/trades/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                router.replace("/(app)/Home");
            })
            .catch((e) => {
                console.log("Error: ", e);
            });
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        containerLight: {
            backgroundColor: '#FFFFFF',
        },
        containerDark: {
            backgroundColor: '#131722',
        },
        centerContent: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            fontSize: 16,
        },
        textLight: {
            color: '#2A2E39',
        },
        textDark: {
            color: '#D1D4DC',
        },
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 24,
        },
        header: {
            marginBottom: 24,
        },
        stockName: {
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 12,
            letterSpacing: 0.5,
        },
        stockNameLight: {
            color: '#2A2E39',
        },
        stockNameDark: {
            color: '#FFFFFF',
        },
        resultBadge: {
            alignSelf: 'flex-start',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 6,
        },
        resultBadgePositive: {
            backgroundColor: 'rgba(38, 166, 154, 0.15)',
        },
        resultBadgeNegative: {
            backgroundColor: 'rgba(239, 83, 80, 0.15)',
        },
        resultBadgeText: {
            fontSize: 14,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        resultTextPositive: {
            color: '#26A69A',
        },
        resultTextNegative: {
            color: '#EF5350',
        },
        detailsCard: {
            borderRadius: 8,
            padding: 20,
            marginBottom: 16,
            borderWidth: 1,
        },
        detailsCardLight: {
            backgroundColor: '#F8F9FD',
            borderColor: '#E0E3EB',
        },
        detailsCardDark: {
            backgroundColor: '#1E222D',
            borderColor: '#2A2E39',
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(128, 128, 128, 0.1)',
        },
        detailLabel: {
            fontSize: 14,
            fontWeight: '600',
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
        detailValueLarge: {
            fontSize: 20,
            fontWeight: '700',
        },
        pnlPositive: {
            color: '#26A69A',
        },
        pnlNegative: {
            color: '#EF5350',
        },
        descriptionCard: {
            borderRadius: 8,
            padding: 20,
            marginBottom: 24,
            borderWidth: 1,
        },
        descriptionCardLight: {
            backgroundColor: '#F8F9FD',
            borderColor: '#E0E3EB',
        },
        descriptionCardDark: {
            backgroundColor: '#1E222D',
            borderColor: '#2A2E39',
        },
        descriptionLabel: {
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 12,
            letterSpacing: 0.3,
        },
        descriptionText: {
            fontSize: 15,
            lineHeight: 22,
        },
        descriptionTextLight: {
            color: '#2A2E39',
        },
        descriptionTextDark: {
            color: '#D1D4DC',
        },
        actionButtons: {
            gap: 12,
        },
        button: {
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
        },
        editButton: {
            backgroundColor: '#2962FF',
            borderColor: '#2962FF',
        },
        editButtonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        deleteButton: {
            backgroundColor: 'transparent',
            borderColor: '#EF5350',
        },
        deleteButtonText: {
            color: '#EF5350',
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
    });

    if (!trade) {
        return (
            <View style={[styles.container, styles.centerContent, isDark ? styles.containerDark : styles.containerLight]}>
                <Text style={[styles.loadingText, isDark ? styles.textDark : styles.textLight]}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Stock Name and Result Badge */}
                <View style={styles.header}>
                    <Text style={[styles.stockName, isDark ? styles.stockNameDark : styles.stockNameLight]}>
                        {trade.stockName}
                    </Text>
                    <View style={[
                        styles.resultBadge,
                        trade.positive ? styles.resultBadgePositive : styles.resultBadgeNegative
                    ]}>
                        <Text style={[
                            styles.resultBadgeText,
                            trade.positive ? styles.resultTextPositive : styles.resultTextNegative
                        ]}>
                            {trade.positive ? 'Profit' : 'Loss'}
                        </Text>
                    </View>
                </View>

                {/* Main Details Card */}
                <View style={[styles.detailsCard, isDark ? styles.detailsCardDark : styles.detailsCardLight]}>
                    <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                            Amount
                        </Text>
                        <Text style={[styles.detailValue, isDark ? styles.detailValueDark : styles.detailValueLight]}>
                            ${trade.amount.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                            PnL
                        </Text>
                        <Text style={[
                            styles.detailValue,
                            styles.detailValueLarge,
                            trade.positive ? styles.pnlPositive : styles.pnlNegative
                        ]}>
                            {trade.positive ? '+' : '-'}${Math.abs(trade.pnl).toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                            Leverage
                        </Text>
                        <Text style={[styles.detailValue, isDark ? styles.detailValueDark : styles.detailValueLight]}>
                            {trade.leverage}x
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={[styles.detailLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                            Date
                        </Text>
                        <Text style={[styles.detailValue, isDark ? styles.detailValueDark : styles.detailValueLight]}>
                            {new Date(trade.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Text>
                    </View>
                </View>

                {/* Description Card */}
                {trade.description && (
                    <View style={[styles.descriptionCard, isDark ? styles.descriptionCardDark : styles.descriptionCardLight]}>
                        <Text style={[styles.descriptionLabel, isDark ? styles.detailLabelDark : styles.detailLabelLight]}>
                            Description
                        </Text>
                        <Text style={[styles.descriptionText, isDark ? styles.descriptionTextDark : styles.descriptionTextLight]}>
                            {trade.description}
                        </Text>
                    </View>
                )}

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => router.navigate(`/UpdateTrade/${id}`)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.editButtonText}>Edit Trade</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => deleteTrade()}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.deleteButtonText}>Delete Trade</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );

}