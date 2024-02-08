import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ArrowLeftIcon, ArrowRightIcon } from "../../assets/icons";
import { colors, textbold } from "../../assets/constants";

interface footerProps {
  disablePrev: boolean;
  footerTitle: string;
  footerContent: string;
  onPressPrev: () => void;
  onPressNext: () => void;
}

export const CreateCompanyFooter = ({
  disablePrev,
  footerTitle,
  footerContent,
  onPressNext,
  onPressPrev,
}: footerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.actionsctr}>
        <TouchableOpacity
          onPress={onPressPrev}
          disabled={disablePrev}
          style={[styles.action, { justifyContent: "flex-start" }]}
        >
          <ArrowLeftIcon
            iconColor={
              disablePrev ? colors.text_secondary : colors.text_primary
            }
          />
          <Text
            style={[
              styles.boldtext,
              {
                color: disablePrev
                  ? colors.text_secondary
                  : colors.text_primary,
              },
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          onPress={onPressNext}
          style={[styles.action, { justifyContent: "flex-end" }]}
        >
          <Text style={styles.boldtext}>Next</Text>
          <ArrowRightIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.textcontentctr}>
        <Text style={[textbold, styles.textcenter]}>{footerTitle}</Text>
        <Text
          style={[
            styles.boldtext,
            styles.textcenter,
            { color: colors.text_secondary },
          ]}
        >
          {footerContent}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  boldtext: {
    ...textbold,
    fontSize: 12,
  },
  actionsctr: {
    height: 40,
    marginHorizontal: 10,
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: colors.divider,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.divider,
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.divider,
  },
  action: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  textcontentctr: {
    height: 108,
    marginTop: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.divider,
  },
  textcenter: {
    textAlign: "center",
  },
});
