import { COLORS } from "@/components/designSystem/styles";
import { Stack } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

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
