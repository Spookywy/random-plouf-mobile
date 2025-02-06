import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS, FONT_SIZE } from "./styles";

type ButtonProps = {
  label: string;
};

export function Button({ label }: ButtonProps) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.grey,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  label: {
    color: COLORS.white,
    fontSize: FONT_SIZE.s,
    fontWeight: "bold",
  },
});
