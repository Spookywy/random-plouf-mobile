import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

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
        <FontAwesome6 name="trash" size={15} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    width: 200,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
});
