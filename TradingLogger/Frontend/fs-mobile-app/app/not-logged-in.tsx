import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { router } from "expo-router";

export default function NotLoggedIn() {
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
            alignItems: 'center',
            maxWidth: 400,
            width: '100%',
        },
        emoji: {
            fontSize: 64,
            marginBottom: 24,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 12,
            letterSpacing: 0.5,
            textAlign: 'center',
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
            marginBottom: 32,
        },
        descriptionLight: {
            color: '#5D667B',
        },
        descriptionDark: {
            color: '#9598A1',
        },
        buttonContainer: {
            width: '100%',
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
        buttonText: {
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        signInButton: {
        },
        signInButtonLight: {
            backgroundColor: '#2962FF',
            borderColor: '#2962FF',
        },
        signInButtonDark: {
            backgroundColor: '#2962FF',
            borderColor: '#1E4FCC',
        },
        signInButtonText: {
            color: '#FFFFFF',
        },
        signUpButton: {
            backgroundColor: 'transparent',
        },
        signUpButtonLight: {
            borderColor: '#E0E3EB',
        },
        signUpButtonDark: {
            borderColor: '#2A2E39',
        },
        signUpButtonTextLight: {
            color: '#2A2E39',
        },
        signUpButtonTextDark: {
            color: '#D1D4DC',
        },
    });

    return (
        <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
            <View style={styles.content}>
                <Text style={[styles.emoji]}>🔒</Text>
                <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>
                    Not Logged In
                </Text>
                <Text style={[styles.description, isDark ? styles.descriptionDark : styles.descriptionLight]}>
                    Please sign in to access your trading logger and track your trades.
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.signInButton, isDark ? styles.signInButtonDark : styles.signInButtonLight]}
                        onPress={() => router.navigate("/LoginPage")}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.buttonText, styles.signInButtonText]}>
                            Sign In
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.signUpButton, isDark ? styles.signUpButtonDark : styles.signUpButtonLight]}
                        onPress={() => router.navigate("/SignupPage")}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.buttonText, isDark ? styles.signUpButtonTextDark : styles.signUpButtonTextLight]}>
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}