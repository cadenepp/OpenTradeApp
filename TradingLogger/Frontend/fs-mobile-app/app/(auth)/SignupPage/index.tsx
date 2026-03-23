import { View, Text, StyleSheet, useColorScheme, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from "expo-constants";

export default function SignUp() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [fName, setFName] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [apiUrl, setApiUrl] = useState("");
    const [sUped, setSUped] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        const hostUri = Constants.expoConfig.hostUri;
        const ipAddress = hostUri ? hostUri.split(":")[0] : null;

        // hardcode the port number form API
        const apiPort = "8080";

        const tempURL = ipAddress ? `http://${ipAddress}:${apiPort}` : null;
        // @ts-ignore
        setApiUrl(tempURL);

    }, []);

    useEffect(() => {
        if (sUped) {
            router.replace("/(app)/Home");
        }
    }, [sUped])

    const handleSignUp = async () => {
        try {
            const res = await fetch(`${apiUrl}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fName,
                    lName,
                    email,
                    password
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.log("Signup failed: ", res.status, text);
                return;
            }

            const id = (await res.text());
            console.log("Created User: ", id);

            if (!id) {
                console.log("Server returned an empty id");
                return;
            }

            await AsyncStorage.setItem("userId", id);

            setSUped(true);
        } catch (e) {
            console.log("Error: ", e);
        }
    };


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
        scrollView: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 24,
        },
        title: {
            fontSize: 32,
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
        formCard: {
            borderRadius: 8,
            padding: 20,
            borderWidth: 1,
        },
        formCardLight: {
            backgroundColor: '#F8F9FD',
            borderColor: '#E0E3EB',
        },
        formCardDark: {
            backgroundColor: '#1E222D',
            borderColor: '#2A2E39',
        },
        fieldContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 8,
            letterSpacing: 0.3,
        },
        labelLight: {
            color: '#5D667B',
        },
        labelDark: {
            color: '#9598A1',
        },
        input: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 6,
            borderWidth: 1,
        },
        inputLight: {
            backgroundColor: '#FFFFFF',
            borderColor: '#E0E3EB',
            color: '#2A2E39',
        },
        inputDark: {
            backgroundColor: '#131722',
            borderColor: '#2A2E39',
            color: '#D1D4DC',
        },
        button: {
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 24,
            borderWidth: 1,
        },
        buttonLight: {
            backgroundColor: '#2962FF',
            borderColor: '#2962FF',
        },
        buttonDark: {
            backgroundColor: '#2962FF',
            borderColor: '#1E4FCC',
        },
        buttonText: {
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        buttonTextLight: {
            color: '#FFFFFF',
        },
        buttonTextDark: {
            color: '#FFFFFF',
        },
        linkContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
        },
        linkText: {
            fontSize: 14,
        },
        linkTextLight: {
            color: '#5D667B',
        },
        linkTextDark: {
            color: '#9598A1',
        },
        linkButton: {
            fontSize: 14,
            fontWeight: '600',
        },
        linkButtonLight: {
            color: '#2962FF',
        },
        linkButtonDark: {
            color: '#2962FF',
        },
    });

    return (
        <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>
                    Create Account
                </Text>

                <View style={[styles.formCard, isDark ? styles.formCardDark : styles.formCardLight]}>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                            First Name
                        </Text>
                        <TextInput
                            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                            placeholder="Enter first name"
                            placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                            value={fName}
                            onChangeText={setFName}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                            Last Name
                        </Text>
                        <TextInput
                            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                            placeholder="Enter last name"
                            placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                            value={lName}
                            onChangeText={setLName}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                            Email
                        </Text>
                        <TextInput
                            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                            placeholder="Enter email address"
                            placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                            Password
                        </Text>
                        <TextInput
                            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                            placeholder="Enter password"
                            placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, isDark ? styles.buttonDark : styles.buttonLight]}
                        onPress={handleSignUp}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.buttonText, isDark ? styles.buttonTextDark : styles.buttonTextLight]}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.linkContainer}>
                    <Text style={[styles.linkText, isDark ? styles.linkTextDark : styles.linkTextLight]}>
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => router.navigate("/LoginPage")}>
                        <Text style={[styles.linkButton, isDark ? styles.linkButtonDark : styles.linkButtonLight]}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );

}