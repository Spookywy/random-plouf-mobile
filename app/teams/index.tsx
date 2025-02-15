import { Button } from "@/components/designSystem/button";
import { Page } from "@/components/designSystem/page";
import { COLORS, FONT_SIZE, SPACING } from "@/components/designSystem/styles";
import { Team } from "@/components/Team";
import shuffleArray from "@/utils/shuffleArray";
import Slider from "@react-native-community/slider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Teams() {
  const [participantsNames, setParticipantsNames] = useState<string[]>([]);
  const [numberOfTeams, setNumberOfTeams] = useState<number>(3);
  const [teams, setTeams] = useState<Array<Array<string>>>([]);

  const { participants } = useLocalSearchParams();

  useEffect(() => {
    if (participants && typeof participants === "string") {
      setParticipantsNames(participants.split(","));
    }
  }, [participants]);

  function createTeams() {
    const shuffledParticipants = shuffleArray(participantsNames);

    const numberOfTeamToCreate =
      participantsNames.length > numberOfTeams
        ? numberOfTeams
        : participantsNames.length;

    const teams = Array.from<string[], string[]>(
      { length: numberOfTeamToCreate },
      () => []
    );

    for (let i = 0; i < shuffledParticipants.length; i++) {
      teams[i % numberOfTeamToCreate].push(shuffledParticipants[i]);
    }

    setTeams(teams);
  }

  return (
    <Page>
      <Text style={styles.title}>Créer des équipes</Text>
      <Text style={styles.description}>Nombre d’équipe</Text>
      <Text style={styles.numberOfTeams}>{numberOfTeams}</Text>
      <Slider
        minimumValue={2}
        maximumValue={5}
        style={styles.slider}
        minimumTrackTintColor={COLORS.purple}
        maximumTrackTintColor={COLORS.grey}
        thumbTintColor={COLORS.purple}
        step={1}
        value={numberOfTeams}
        onValueChange={setNumberOfTeams}
      />
      <View style={styles.buttonsWrapper}>
        <Button label="Retour" onPress={() => router.back()} />
        <Button
          label={`Créer ${numberOfTeams} équipes`}
          onPress={createTeams}
        />
      </View>
      <ScrollView
        style={styles.teamListWrapper}
        contentContainerStyle={styles.teamList}
      >
        {teams.map((team, index) => (
          <Team key={index} members={team} teamNumber={index + 1} />
        ))}
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.xl,
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
  numberOfTeams: {
    fontSize: FONT_SIZE.l,
    fontWeight: "bold",
    color: COLORS.purple,
  },
  slider: {
    width: "75%",
  },
  buttonsWrapper: {
    gap: SPACING.l,
    flexDirection: "row",
    marginVertical: SPACING.l,
  },
  teamListWrapper: {
    width: "100%",
  },
  teamList: {
    gap: SPACING.l,
    width: "100%",
    padding: SPACING.xl,
  },
});
