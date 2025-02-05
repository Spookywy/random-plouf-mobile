import { Participant } from "@/components/participant";
import { INITIAL_NUMBER_OF_PARTICIPANTS } from "@/utils/constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [participantsNames, setParticipantsNames] = useState<Array<string>>(
    new Array(INITIAL_NUMBER_OF_PARTICIPANTS).fill("")
  );

  function handleParticipantNameChanged(index: number, newName: string) {
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames[index] = newName;
    setParticipantsNames(newParticipantsNames);
  }

  function addParticipant() {
    setParticipantsNames([...participantsNames, ""]);
  }

  function removeParticipant(index: number) {
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames.splice(index, 1);
    setParticipantsNames(newParticipantsNames);
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>RanDOM Plouf</Text>
      <Text style={styles.text}>Ajouter des participants</Text>
      <View style={styles.participants}>
        {participantsNames.map((name, index) => (
          <Participant
            key={index}
            name={name}
            index={index}
            handleNameChange={(newName) =>
              handleParticipantNameChanged(index, newName)
            }
            handleDelete={() => removeParticipant(index)}
          />
        ))}
      </View>
      <Pressable style={styles.addParticipantButton} onPress={addParticipant}>
        <FontAwesome6 name="user-plus" size={15} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#171717",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#8b5cf6",
  },
  text: {
    color: "white",
  },
  participants: {
    gap: 5,
  },
  addParticipantButton: {
    backgroundColor: "#3F3F46",
    borderRadius: 20,
    padding: 10,
  },
});
