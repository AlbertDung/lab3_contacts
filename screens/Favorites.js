import React from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ContactThumbnail from "../components/ContactThumbnail";
import { toggleFavorite } from "../components/store";
import { useTheme } from "../components/ThemeContext";

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts = [], loading, error } = useSelector((state) => state.contacts);
  const favorites = contacts.filter(contact => contact.favorite);
  const { colors, isDarkMode } = useTheme();

  const showOptions = (contact) => {
    const options = [
      {
        text: "Delete",
        onPress: () => dispatch(toggleFavorite({ phone: contact.phone })),
        style: "destructive",
      },
      {
        text: "Profile",
        onPress: () => navigation.navigate("Profile", { contact }),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ];

    Alert.alert("Options", "What would you like to do?", options, { cancelable: true });
  };

  const handleLongPress = (contact) => showOptions(contact);

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar, name, phone } = item;
    return (
      <ContactThumbnail
        name={name}
        phone={phone}
        avatar={avatar}
        onPress={() => navigation.navigate("Profile", { contact: item })}
        onLongPress={() => handleLongPress(item)}
        textColor={colors.text}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.accent }]}>Favorites</Text>
      {loading && (
        <View style={styles.centerContent}>
          <ActivityIndicator color={colors.accent} size="large" />
        </View>
      )}
      {error && (
        <View style={styles.centerContent}>
          <Text style={[styles.errorText, { color: colors.accent }]}>Couldn't load favorites</Text>
        </View>
      )}
      {!loading && !error && favorites.length === 0 && (
        <View style={styles.centerContent}>
          <Text style={[styles.noFavoritesText, { color: colors.text }]}>No favorites yet</Text>
        </View>
      )}
      {!loading && !error && favorites.length > 0 && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    padding: 20,
    paddingTop: 50,
    textAlign: 'center',
  },
  list: {
    alignItems: "center",
    paddingBottom: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
  },
  noFavoritesText: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default Favorites;