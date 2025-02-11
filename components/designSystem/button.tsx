import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { COLORS, FONT_SIZE } from "./styles";

type ButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
} & (
  | {
      label: string;
      iconName?: never;
    }
  | {
      label?: never;
      iconName: string;
    }
);

export function Button({
  label,
  iconName,
  onPress,
  style,
  disabled,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label ?? iconName}
      disabled={disabled}
    >
      {({ pressed }) => (
        <Text style={[styles.label, pressed && styles.labelPressed]}>
          {label ?? (
            <FontAwesome6
              name={iconName}
              size={16}
              color={pressed ? COLORS.grey : COLORS.white}
            />
          )}
        </Text>
      )}
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
  buttonPressed: {
    backgroundColor: COLORS.white,
  },
  label: {
    color: COLORS.white,
    fontSize: FONT_SIZE.s,
    fontWeight: "bold",
  },
  labelPressed: {
    color: COLORS.grey,
  },
});
