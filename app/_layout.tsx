import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
