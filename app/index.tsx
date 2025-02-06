import { Button } from "@/components/designSystem/button";
import { COLORS, FONT_SIZE, SPACING } from "@/components/designSystem/styles";
import { Participant } from "@/components/participant";
import { INITIAL_NUMBER_OF_PARTICIPANTS } from "@/utils/constants";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.description}>Ajouter des participants</Text>

      <ScrollView
        contentContainerStyle={styles.participantList}
        style={styles.participantListWrapper}
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>
      <Button
        iconName="user-plus"
        onPress={addParticipant}
        style={styles.addParticipantButton}
      />
      <View style={styles.buttonsWrapper}>
        <Button label="Tirer au sort" onPress={() => {}} />
        <Button label="Créer 2 équipes" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.nightGrey,
    paddingVertical: 12,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: "bold",
    color: COLORS.purple,
    paddingBottom: SPACING.l,
  },
  description: {
    color: COLORS.white,
    fontSize: FONT_SIZE.m,
    fontWeight: "bold",
    paddingBottom: SPACING.m,
  },
  participantListWrapper: {
    width: "100%",
  },
  participantList: {
    gap: SPACING.l,
    width: "100%",
    alignItems: "center",
  },
  addParticipantButton: {
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "center",
    marginTop: SPACING.m,
  },
  buttonsWrapper: {
    flexDirection: "row",
    gap: SPACING.l,
    marginTop: SPACING.l,
  },
});
