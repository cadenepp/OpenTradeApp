import { View, Text, StyleSheet, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
        },
        containerLight: {
            backgroundColor: '#FFFFFF',
        },
        containerDark: {
            backgroundColor: '#131722',
        },
        content: {
            maxWidth: 400,
            alignItems: 'center',
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 16,
            letterSpacing: 0.5,
        },
        titleLight: {
            color: '#2A2E39',
        },
        titleDark: {
            color: '#FFFFFF',
        },
        description: {
            fontSize: 16,
            lineHeight: 24,
            textAlign: 'center',
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
            <View style={styles.content}>
                <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>
                    Trade Logger
                </Text>
                <Text style={[styles.description, isDark ? styles.descriptionDark : styles.descriptionLight]}>
                    Track and analyze your trading performance with detailed trade logs.
                    Monitor your wins, losses, and patterns to improve your trading strategy
                    and make data-driven decisions.
                </Text>
            </View>
        </View>
    );

}