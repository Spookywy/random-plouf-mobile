import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZE, SPACING } from "./designSystem/styles";
import { useTranslation } from "@/utils/useTranslation";
import { fr } from "./fr";
import { en } from "./en";

type TeamProps = {
  teamNumber: number;
  members: string[];
};

export function Team({ teamNumber, members }: TeamProps) {
  const { t } = useTranslation({ fr, en });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.teamTitle}>{t("team.title", { teamNumber })}</Text>
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
