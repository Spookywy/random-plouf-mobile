import { StyleSheet, View } from "react-native";
import { COLORS } from "./styles";

type PageProps = {
  children?: React.ReactNode;
};

export function Page({ children }: PageProps) {
  return <View style={styles.mainView}>{children}</View>;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.nightGrey,
    paddingVertical: 12,
  },
});
