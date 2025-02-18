import { PARTICIPANT_ANIMATION_DURATION } from "@/utils/constants";
import { useTranslation } from "@/utils/useTranslation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { forwardRef, useEffect } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS, FONT_SIZE, SPACING } from "./designSystem/styles";
import { en } from "./en";
import { fr } from "./fr";

type ParticipantProps = {
  name: string;
  index: number;
  handleNameChange: (newName: string) => void;
  handleDelete: () => void;
  isAnimated?: boolean;
  isWinner?: boolean;
  isDrawInProgress: boolean;
};

export const Participant = forwardRef<TextInput, ParticipantProps>(
  (
    {
      name,
      index,
      handleNameChange,
      handleDelete,
      isAnimated,
      isWinner,
      isDrawInProgress,
    },
    ref
  ) => {
    const { t } = useTranslation({ fr, en });
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const config = {
      duration: PARTICIPANT_ANIMATION_DURATION,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: withTiming(scale.value, config) }],
        opacity: withTiming(opacity.value, config),
      };
    });

    useEffect(() => {
      if (isAnimated) {
        scale.value = 1.2;
        opacity.value = 0.5;
      } else {
        scale.value = 1;
        opacity.value = 1;
      }
    }, [isAnimated]);

    return (
      <View style={styles.wrapper}>
        {isWinner && (
          <FontAwesome6
            name="crown"
            size={16}
            color={COLORS.white}
            style={styles.crownIcon}
          />
        )}
        <Animated.View style={[animatedStyle]}>
          <TextInput
            value={name}
            style={[
              styles.input,
              (isWinner || isAnimated) && styles.isSpotlighted,
            ]}
            onChangeText={handleNameChange}
            placeholder={t("participant.placeholder", { index: index + 1 })}
            ref={ref}
            editable={!isDrawInProgress}
          />
        </Animated.View>
        {!isDrawInProgress && (
          <Pressable onPress={handleDelete}>
            <FontAwesome6 name="trash" size={16} color={COLORS.white} />
          </Pressable>
        )}
      </View>
    );
  }
);

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
  isSpotlighted: {
    backgroundColor: COLORS.purple,
    color: COLORS.white,
    fontWeight: "bold",
  },
  crownIcon: {
    position: "absolute",
    top: 15,
    left: -25,
  },
});
