import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { COLORS, FONT_SIZE, SPACING } from "./designSystem/styles";

type ParticipantProps = {
  name: string;
  index: number;
  handleNameChange: (newName: string) => void;
  handleDelete: () => void;
};

export function Participant({
  name,
  index,
  handleNameChange,
  handleDelete,
}: ParticipantProps) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={handleNameChange}
        placeholder={`Participant ${index + 1}`}
      />
      <Pressable onPress={handleDelete}>
        <FontAwesome6 name="trash" size={16} color={COLORS.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.l,
  },
  input: {
    fontSize: FONT_SIZE.s,
    borderWidth: 1,
    width: 250,
    height: 50,
    borderRadius: 12,
    padding: 12,
    backgroundColor: COLORS.white,
  },
});
