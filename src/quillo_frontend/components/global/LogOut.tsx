import { JSX, useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { LogOutIcon } from "../../assets/icons";
import {
  SCREENWIDTH,
  colors,
  textbold,
  textlight,
  textlightfaint,
} from "../../assets/constants";

export const LogOut = (): JSX.Element => {
  const [showLogOut, setShowLogOut] = useState<boolean>(false);

  const onPressBack = (): boolean => {
    setShowLogOut(false);

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);
  }, []);

  return (
    <View style={styles.container}>
      {showLogOut && (
        <View style={styles.confirmlogout}>
          <Text
            style={[
              textbold,
              { marginBottom: 48, textAlign: "center", fontSize: 14 },
            ]}
          >
            Are you sure you want to Log Out ?
          </Text>

          <View style={styles.actionsctr}>
            <TouchableOpacity
              style={styles.action}
              onPress={() => setShowLogOut(false)}
            >
              <Text style={styles.actiontext}>No, keep me signed in</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={[styles.action, { width: "50%" }]}>
              <Text style={styles.actiontext}>Yes</Text>
              <LogOutIcon />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.logoutctr}>
        <Text style={textlightfaint}>Qwt***yuI</Text>

        <TouchableOpacity
          style={styles.logout}
          onPress={() => setShowLogOut(true)}
        >
          <Text style={textlight}>Log Out</Text>
          <LogOutIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREENWIDTH,
    paddingTop: 4,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 15, 0.85)",
  },
  confirmlogout: {
    width: SCREENWIDTH - 16,
    marginBottom: 8,
    paddingTop: 10,
    alignSelf: "center",
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: colors.divider,
    backgroundColor: colors.divider,
  },
  actionsctr: {
    width: "100%",
    paddingVertical: 2,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopColor: colors.divider,
    backgroundColor: colors.divider,
  },
  action: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actiontext: { ...textbold, fontSize: 12 },
  divider: { width: 1, height: "100%", backgroundColor: colors.divider },
  logoutctr: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: colors.divider,
    backgroundColor: colors.divider,
  },
  logout: {
    width: 180,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.divider,
    backgroundColor: colors.divider,
  },
});
