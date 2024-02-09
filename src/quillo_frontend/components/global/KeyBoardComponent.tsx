import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, textbold } from "../../assets/constants";

export const KeyBoardComponent = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>4</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>8</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={textbold}>back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 32,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 32,
  },
  item: {
    width: 48,
    height: 48,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.divider,
    borderWidth: 0.5,
    borderColor: colors.divider,
  },
});
