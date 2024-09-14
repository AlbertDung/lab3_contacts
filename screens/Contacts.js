import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { fetchContacts } from "../utils/api";
import ContactListItem from "../components/ContactListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
  toggleFavorite, // Import toggleFavorite action
} from "../components/store";
import CallScreen from "./Call2";
import Call from "./Call";
import { useTheme } from "../components/ThemeContext";


const keyExtractor = ({ phone }) => phone;

// Function to check if a name starts with a special character
const isSpecialChar = (char) => {
  const regex = /^[a-zA-Z]/; // Checks if the first character is a Latin letter
  return !regex.test(char);
};

// Custom sorting function
const sortContacts = (contacts) => {
  return contacts.sort((a, b) => {
    const nameA = a.name.trim().toLowerCase();
    const nameB = b.name.trim().toLowerCase();

    // Handle special characters
    const isSpecialA = isSpecialChar(nameA[0]);
    const isSpecialB = isSpecialChar(nameB[0]);

    if (isSpecialA && !isSpecialB) return 1; // A goes after B
    if (!isSpecialA && isSpecialB) return -1; // A goes before B
    return nameA.localeCompare(nameB); // Compare alphabetically if both are Latin letters
  });
};

const Contacts = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts = [], loading, error } = useSelector((state) => state.contacts);
  const { colors } = useTheme();


  useEffect(() => {
    const loadContacts = async () => {
      dispatch(fetchContactsLoading());
      try {
        const contacts = await fetchContacts();
        const sortedContacts = sortContacts(contacts); // Sort contacts after fetching
        dispatch(fetchContactsSuccess(sortedContacts)); // Dispatch sorted contacts
      } catch (e) {
        dispatch(fetchContactsError());
      }
    };

    loadContacts();
  }, [dispatch]);

  const renderContact = ({ item }) => {
    const { name, avatar, phone, favorite } = item;

    const handleFavoriteToggle = () => {
      dispatch(toggleFavorite({ phone })); // Dispatch the toggleFavorite action
    };

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        isFavorite={favorite}
        onFavoriteToggle={handleFavoriteToggle}
        onPress={() => navigation.navigate("Profile", { contact: item })}
        onLongPress={() => Call(phone)}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading && <ActivityIndicator color={colors.accent} size="large" />}
      {error && <Text style={[styles.errorText, { color: colors.accent }]}>Error loading contacts...</Text>}
      {!loading && !error && (
        <FlatList
          data={contacts}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 10,
  },
});

export default Contacts;
