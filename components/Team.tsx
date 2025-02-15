import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZE, SPACING } from "./designSystem/styles";

type TeamProps = {
  teamNumber: number;
  members: string[];
};

export function Team({ teamNumber, members }: TeamProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.teamTitle}>Équipe {teamNumber}</Text>
      {members.map((member, index) => (
        <Text style={styles.teamMember} key={index}>
          {member}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: SPACING.l,
    backgroundColor: COLORS.grey,
    borderRadius: 16,
  },
  teamTitle: {
    fontSize: FONT_SIZE.l,
    fontWeight: "bold",
    color: COLORS.purple,
    marginBottom: SPACING.m,
  },
  teamMember: {
    fontSize: FONT_SIZE.m,
    color: COLORS.white,
  },
});
