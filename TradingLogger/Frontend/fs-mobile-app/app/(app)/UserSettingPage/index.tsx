import { View, Text, StyleSheet, useColorScheme, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import AuthProvider, {AuthContext} from "@/app/authProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserSettingsPage() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [firstName, setFirstName] = useState<string>('John');
    const [lastName, setLastName] = useState<string>('Doe');
    const [email, setEmail] = useState<string>('john.doe@example.com');
    const [password, setPassword] = useState<string>('');

    const handleUpdateUser = () => {
        const userData = {
            firstName,
            lastName,
            email,
            password
        };
        console.log("Update user:", userData);
    };

    const handleDeleteAccount = () => {
        console.log("Delete account");
    };

    const handleLogOut = async () => {
        await AsyncStorage.removeItem("userId")
        router.navigate("/LoginPage")
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
            paddingTop: 32,
            paddingBottom: 24,
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
        formCard: {
            borderRadius: 8,
            padding: 20,
            borderWidth: 1,
            marginBottom: 24,
        },
        formCardLight: {
            backgroundColor: '#F8F9FD',
            borderColor: '#E0E3EB',
        },
        formCardDark: {
            backgroundColor: '#1E222D',
            borderColor: '#2A2E39',
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 16,
            letterSpacing: 0.5,
        },
        sectionTitleLight: {
            color: '#2A2E39',
        },
        sectionTitleDark: {
            color: '#FFFFFF',
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
            borderWidth: 1,
        },
        buttonText: {
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        updateButton: {
            marginTop: 4,
        },
        updateButtonLight: {
            backgroundColor: '#2962FF',
            borderColor: '#2962FF',
        },
        updateButtonDark: {
            backgroundColor: '#2962FF',
            borderColor: '#1E4FCC',
        },
        updateButtonText: {
            color: '#FFFFFF',
        },
        actionButtons: {
            gap: 12,
        },
        logoutButton: {
            backgroundColor: 'transparent',
        },
        logoutButtonLight: {
            borderColor: '#5D667B',
        },
        logoutButtonDark: {
            borderColor: '#9598A1',
        },
        logoutButtonTextLight: {
            color: '#5D667B',
        },
        logoutButtonTextDark: {
            color: '#9598A1',
        },
        deleteButton: {
            backgroundColor: 'transparent',
            borderColor: '#EF5350',
        },
        deleteButtonText: {
            color: '#EF5350',
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
                    User Settings
                </Text>

                {/* Edit User Form */}
                <View style={[styles.formCard, isDark ? styles.formCardDark : styles.formCardLight]}>
                    <Text style={[styles.sectionTitle, isDark ? styles.sectionTitleDark : styles.sectionTitleLight]}>
                        Edit Profile
                    </Text>

                    {/* First Name */}
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                            First Name
                        </Text>
                        <TextInput
                            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                            placeholder="Enter first name"
                            placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>

                    {/* Last Name */}
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                            Last Name
                        </Text>
                        <TextInput
                            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                            placeholder="Enter last name"
                            placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    {/* Email */}
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

                    {/* Password */}
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                            Password
                        </Text>
                        <TextInput
                            style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                            placeholder="Enter new password"
                            placeholderTextColor={isDark ? '#5D667B' : '#9598A1'}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* Update Profile Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.updateButton, isDark ? styles.updateButtonDark : styles.updateButtonLight]}
                        onPress={handleUpdateUser}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.buttonText, styles.updateButtonText]}>
                            Update Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.actionButtons}>
                    {/* Log Out Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.logoutButton, isDark ? styles.logoutButtonDark : styles.logoutButtonLight]}
                        onPress={handleLogOut}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.buttonText, isDark ? styles.logoutButtonTextDark : styles.logoutButtonTextLight]}>
                            Log Out
                        </Text>
                    </TouchableOpacity>

                    {/* Delete Account Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={handleDeleteAccount}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.buttonText, styles.deleteButtonText]}>
                            Delete Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );

}