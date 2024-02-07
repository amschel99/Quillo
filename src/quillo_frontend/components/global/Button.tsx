import React, { JSX } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, textlight, textlightfaint } from "../../assets/constants";

interface buttonProps {
  dpText: string;
  dpIcon: JSX.Element;
  isDisabled: boolean;
  onPressFunc: () => void;
  xstyles?: {};
}

export const Button = ({
  dpText,
  dpIcon,
  isDisabled,
  onPressFunc,
  xstyles,
}: buttonProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.btnCtr, xstyles]}
      disabled={isDisabled}
      onPress={onPressFunc}
    >
      <Text
        style={[
          isDisabled ? textlightfaint : textlight,
          { fontFamily: "ops-regular" },
        ]}
      >
        {dpText}
      </Text>

      {dpIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnCtr: {
    padding: 8,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    borderWidth: 0.5,
    borderColor: colors.divider,
    borderRadius: 6,
    backgroundColor: colors.divider,
  },
});
