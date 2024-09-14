import React from "react";
import { StyleSheet, View } from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import DetailListItem from "../components/DetailListItem";
import { useTheme } from "../components/ThemeContext";
import Call from "./Call";// Import the functions
import { Email } from "./Call";

const Profile = ({ route }) => {
  const { contact } = route.params;
  const { avatar, name, email, phone, cell } = contact;
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.avatarSection, { backgroundColor: colors.primary }]}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={[styles.detailsSection, { backgroundColor: colors.background }]}>
        <DetailListItem 
          icon="mail" 
          title="Email" 
          subtitle={email}
          onPress={() => Email(email)} // Handle email press
        />
        <DetailListItem 
          icon="phone" 
          title="Work" 
          subtitle={phone}
          onPress={() => Call(phone)} // Handle call press
        />
        <DetailListItem 
          icon="smartphone" 
          title="Personal" 
          subtitle={cell}
          onPress={() => Call(cell)} // Handle call press
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  detailsSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Profile;
