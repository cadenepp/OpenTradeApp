import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { router } from "expo-router";
import { Home, TrendingUp, User } from "lucide-react-native";

export default function Header() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const iconColor = isDark ? '#D1D4DC' : '#2A2E39';

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingVertical: 12,
            paddingHorizontal: 12,
            paddingTop: 50,
            borderBottomWidth: 1,
        },
        containerLight: {
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#E0E3EB',
        },
        containerDark: {
            backgroundColor: '#131722',
            borderBottomColor: '#2A2E39',
        },
        tab: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: 8,
        },
        tabContent: {
            alignItems: 'center',
            gap: 4,
        },
        tabText: {
            fontSize: 14,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        tabTextLight: {
            color: '#2A2E39',
        },
        tabTextDark: {
            color: '#D1D4DC',
        },
        divider: {
            width: 1,
            height: 40,
        },
        dividerLight: {
            backgroundColor: '#E0E3EB',
        },
        dividerDark: {
            backgroundColor: '#2A2E39',
        },
    });

    return (
        <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
            <TouchableOpacity style={styles.tab} onPress={() => router.navigate('/(app)/Home')}>
                <View style={styles.tabContent}>
                    <Home size={22} color={iconColor} strokeWidth={2.5} />
                    <Text style={[styles.tabText, isDark ? styles.tabTextDark : styles.tabTextLight]}>
                        Home
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={[styles.divider, isDark ? styles.dividerDark : styles.dividerLight]} />

            <TouchableOpacity style={styles.tab} onPress={() => router.navigate('/FeaturesPage')}>
                <View style={styles.tabContent}>
                    <TrendingUp size={22} color={iconColor} strokeWidth={2.5} />
                    <Text style={[styles.tabText, isDark ? styles.tabTextDark : styles.tabTextLight]}>
                        Trading
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={[styles.divider, isDark ? styles.dividerDark : styles.dividerLight]} />

            <TouchableOpacity style={styles.tab} onPress={() => router.navigate('/UserSettingPage')}>
                <View style={styles.tabContent}>
                    <User size={22} color={iconColor} strokeWidth={2.5} />
                    <Text style={[styles.tabText, isDark ? styles.tabTextDark : styles.tabTextLight]}>
                        User
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}