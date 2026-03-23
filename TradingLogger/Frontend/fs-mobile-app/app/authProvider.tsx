import React, { createContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
    userId: string | null;
    loading: boolean;
    setLoggedInUserId: (id: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            const stored = await AsyncStorage.getItem("userId");
            if (!mounted) return;

            setUserId(stored && stored.length ? stored : null);
            setLoading(false);
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const setLoggedInUserId = async (id: string) => {
        await AsyncStorage.setItem("userId", id);
        setUserId(id);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("userId");
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ userId, loading, setLoggedInUserId, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
