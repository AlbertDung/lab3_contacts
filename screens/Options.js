import React from "react";
import { StyleSheet, View, Switch, Text } from "react-native";
import DetailListItem from "./DetailListItem";
import { useTheme } from "../components/ThemeContext"; // Import ThemeContext

const Options = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme(); // Sử dụng theme từ context

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DetailListItem title="Update Profile" />
      <DetailListItem title="Change Language" />
      <DetailListItem title="Sign Out" />
      <View style={styles.themeContainer}>
        <Text style={[styles.themeText, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.accent }}
          thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  themeText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Options;
