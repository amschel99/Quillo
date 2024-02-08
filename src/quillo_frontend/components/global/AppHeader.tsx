import { JSX } from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { SearchIcon } from "../../assets/icons";
import { SCREENWIDTH } from "../../assets/constants";

interface headerProps {
  renderSearch: boolean;
  xstyles?: {};
}

const appIcon = require("../../assets/images/icon.png");

export const AppHeader = ({
  renderSearch,
  xstyles,
}: headerProps): JSX.Element => {
  return (
    <View style={[styles.container, xstyles]}>
      <Image source={appIcon} style={styles.icon} />

      {renderSearch && (
        <TouchableOpacity style={styles.search}>
          <SearchIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREENWIDTH,
    padding: 8,
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 46,
    height: 46,
  },
  search: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 500,
  },
});
