import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, textbold } from "../../assets/constants";
import { BackSpaceIcon } from "../../assets/icons";

export interface KeyBoardComponentProps {
  handleIncludeValue: (digit: string) => void;
  handlePopeValue: () => void;
  setDecimalClicked: React.Dispatch<React.SetStateAction<boolean>>;
  decimalClicked: boolean;
  setDecimalPlaceIndex: React.Dispatch<React.SetStateAction<number>>;
  numberOfQuilloShares: string;
}

export const KeyBoardComponent = ({
  handleIncludeValue,
  handlePopeValue,
  setDecimalClicked,
  setDecimalPlaceIndex,
  decimalClicked,
  numberOfQuilloShares,
}: KeyBoardComponentProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("1");
          }}
        >
          <Text style={textbold}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("2");
          }}
        >
          <Text style={textbold}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("3");
          }}
        >
          <Text style={textbold}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("4");
          }}
        >
          <Text style={textbold}>4</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("5");
          }}
        >
          <Text style={textbold}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("6");
          }}
        >
          <Text style={textbold}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("7");
          }}
        >
          <Text style={textbold}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("8");
          }}
        >
          <Text style={textbold}>8</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("9");
          }}
        >
          <Text style={textbold}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            handleIncludeValue("0");
          }}
        >
          <Text style={textbold}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            if (decimalClicked) {
              return;
            }
            setDecimalClicked(true);
            setDecimalPlaceIndex(numberOfQuilloShares.length);
            handleIncludeValue(".");
          }}
        >
          <Text style={textbold}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handlePopeValue}>
          <BackSpaceIcon />
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
