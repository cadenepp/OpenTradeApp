import { Stack } from "expo-router";
import Header from "@/components/header";

export default function AppLayout() {
    return (
        <Stack
            screenOptions={{
                header: () => <Header />,
            }}
        />
    );
}
