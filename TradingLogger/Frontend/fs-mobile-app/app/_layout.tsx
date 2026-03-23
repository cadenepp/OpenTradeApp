import { Redirect, Slot } from "expo-router";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "@/app/authProvider";

function Gate() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { userId, loading } = auth;

  if (loading) return null;

  if (!userId) {
    return <Redirect href="/LoginPage" />;
  }

  return <Redirect href="/(app)/Home" />;
}

export default function RootLayout() {
  return (
      <AuthProvider>
        <Slot />
        <Gate />
      </AuthProvider>
  );
}
