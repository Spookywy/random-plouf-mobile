import { Button } from "@/components/designSystem/button";
import { COLORS, FONT_SIZE, SPACING } from "@/components/designSystem/styles";
import { Participant } from "@/components/participant";
import {
  INITIAL_NUMBER_OF_PARTICIPANTS,
  NUMBER_OF_PARTICIPANT_ANIMATION,
  PARTICIPANT_ANIMATION_DURATION,
} from "@/utils/constants";
import getNewRandomNumber from "@/utils/getNewRandomNumber";
import { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [participantsNames, setParticipantsNames] = useState<Array<string>>(
    new Array(INITIAL_NUMBER_OF_PARTICIPANTS).fill("")
  );
  const [isDrawInProgress, setIsDrawInProgress] = useState<boolean>(false);
  const [participantToAnimate, setParticipantToAnimate] = useState<number>(-1);
  const [winnerIndex, setWinnerIndex] = useState<number>(-1);
  const lastParticipantRef = useRef<TextInput>(null);
  const participantListRef = useRef<ScrollView>(null);

  function handleParticipantNameChanged(index: number, newName: string) {
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames[index] = newName;
    setParticipantsNames(newParticipantsNames);
  }

  function addParticipant() {
    setParticipantsNames([...participantsNames, ""]);
    // The usage of setTimeout is a bit hacky
    setTimeout(() => {
      lastParticipantRef.current?.focus();
    }, 100);
  }

  function removeParticipant(index: number) {
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames.splice(index, 1);
    setParticipantsNames(newParticipantsNames);
  }

  function runRandomDraw() {
    Keyboard.dismiss();
    // Clear previous winner
    if (winnerIndex !== -1) {
      setWinnerIndex(-1);
    }
    // Clear empty participants
    const participants = participantsNames.filter((name) => name.trim() !== "");
    if (participants.length < 2) {
      Alert.alert("Au moins 2 participants sont nécessaires");
      return;
    }
    if (participants.length < participantsNames.length) {
      setParticipantsNames(participants);
    }

    setIsDrawInProgress(true);

    let newRandomNumber = getNewRandomNumber(participants.length);

    const intervalId = setInterval(() => {
      participantListRef.current?.scrollTo({
        y: newRandomNumber * 50, // 50 is the height of a participant
        animated: true,
      });
      setParticipantToAnimate(newRandomNumber);
      newRandomNumber = getNewRandomNumber(
        participants.length,
        newRandomNumber
      );
    }, PARTICIPANT_ANIMATION_DURATION);

    setTimeout(() => {
      clearInterval(intervalId);
      setIsDrawInProgress(false);
      setParticipantToAnimate(-1);
      setWinnerIndex(newRandomNumber);
      participantListRef.current?.scrollTo({
        y: newRandomNumber * 50, // 50 is the height of a participant
        animated: true,
      });
    }, PARTICIPANT_ANIMATION_DURATION * NUMBER_OF_PARTICIPANT_ANIMATION);
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>RanDOM Plouf</Text>
      <Text style={styles.description}>Ajouter des participants</Text>
      <ScrollView
        contentContainerStyle={styles.participantList}
        style={styles.participantListWrapper}
        showsVerticalScrollIndicator={false}
        ref={participantListRef}
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
            isAnimated={index === participantToAnimate}
            isWinner={index === winnerIndex}
            isDrawInProgress={isDrawInProgress}
            ref={
              index === participantsNames.length - 1 ? lastParticipantRef : null
            }
          />
        ))}
      </ScrollView>
      <Button
        iconName="user-plus"
        onPress={addParticipant}
        style={styles.addParticipantButton}
        disabled={isDrawInProgress}
      />
      <View style={styles.buttonsWrapper}>
        <Button
          label="Tirer au sort"
          onPress={runRandomDraw}
          disabled={isDrawInProgress}
        />
        <Button
          label="Créer 2 équipes"
          onPress={() => {}}
          disabled={isDrawInProgress}
        />
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
