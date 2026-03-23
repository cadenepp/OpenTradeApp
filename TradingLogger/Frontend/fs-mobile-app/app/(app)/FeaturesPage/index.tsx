import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function TradingFeatures() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

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
            marginBottom: 32,
            letterSpacing: 0.5,
            textAlign: 'center',
        },
        titleLight: {
            color: '#2A2E39',
        },
        titleDark: {
            color: '#FFFFFF',
        },
        featuresContainer: {
            flex: 1,
            justifyContent: 'center',
            gap: 20,
        },
        featureCard: {
            borderRadius: 12,
            padding: 24,
            borderWidth: 1,
            alignItems: 'center',
        },
        featureCardLight: {
            backgroundColor: '#F8F9FD',
            borderColor: '#E0E3EB',
        },
        featureCardDark: {
            backgroundColor: '#1E222D',
            borderColor: '#2A2E39',
        },
        iconContainer: {
            width: 64,
            height: 64,
            borderRadius: 32,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
        },
        iconContainerBlue: {
            backgroundColor: 'rgba(41, 98, 255, 0.15)',
        },
        iconContainerGreen: {
            backgroundColor: 'rgba(38, 166, 154, 0.15)',
        },
        iconContainerPurple: {
            backgroundColor: 'rgba(156, 39, 176, 0.15)',
        },
        iconText: {
            fontSize: 32,
        },
        featureTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
            letterSpacing: 0.5,
        },
        featureTitleLight: {
            color: '#2A2E39',
        },
        featureTitleDark: {
            color: '#FFFFFF',
        },
        featureDescription: {
            fontSize: 14,
            textAlign: 'center',
            lineHeight: 20,
        },
        featureDescriptionLight: {
            color: '#5D667B',
        },
        featureDescriptionDark: {
            color: '#9598A1',
        },
    });

    return (
        <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
            <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>
                Trading Features
            </Text>

            <View style={styles.featuresContainer}>
                <TouchableOpacity
                    style={[styles.featureCard, isDark ? styles.featureCardDark : styles.featureCardLight]}
                    onPress={() => router.navigate("/CreateTrade")}
                    activeOpacity={0.7}
                >
                    <View style={[styles.iconContainer, styles.iconContainerBlue]}>
                        <Text style={styles.iconText}>+</Text>
                    </View>
                    <Text style={[styles.featureTitle, isDark ? styles.featureTitleDark : styles.featureTitleLight]}>
                        Log Trade
                    </Text>
                    <Text style={[styles.featureDescription, isDark ? styles.featureDescriptionDark : styles.featureDescriptionLight]}>
                        Record a new trade with details, PnL, and notes
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.featureCard, isDark ? styles.featureCardDark : styles.featureCardLight]}
                    onPress={() => router.navigate("/ViewAllTrades")}
                    activeOpacity={0.7}
                >
                    <View style={[styles.iconContainer, styles.iconContainerGreen]}>
                        <Text style={styles.iconText}>📊</Text>
                    </View>
                    <Text style={[styles.featureTitle, isDark ? styles.featureTitleDark : styles.featureTitleLight]}>
                        View All Trades
                    </Text>
                    <Text style={[styles.featureDescription, isDark ? styles.featureDescriptionDark : styles.featureDescriptionLight]}>
                        Browse your complete trading history
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.featureCard, isDark ? styles.featureCardDark : styles.featureCardLight]}
                    onPress={() => router.navigate("/CalendarPage")}
                    activeOpacity={0.7}
                >
                    <View style={[styles.iconContainer, styles.iconContainerPurple]}>
                        <Text style={styles.iconText}>📅</Text>
                    </View>
                    <Text style={[styles.featureTitle, isDark ? styles.featureTitleDark : styles.featureTitleLight]}>
                        Calendar
                    </Text>
                    <Text style={[styles.featureDescription, isDark ? styles.featureDescriptionDark : styles.featureDescriptionLight]}>
                        View trades organized by date
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}