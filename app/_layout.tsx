import { COLORS } from "@/components/designSystem/styles";
import { Stack } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.nightGrey }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.nightGrey} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
