import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons'; // For heart icon
import { useTheme } from "../components/ThemeContext";

const ContactListItem = ({ name, avatar, phone, onPress, isFavorite, onFavoriteToggle, onLongPress }) => {
  const [scaleValue] = useState(new Animated.Value(1)); // For animation
  const { colors } = useTheme();

  const handleFavoritePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    onFavoriteToggle();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.contactInfo} onPress={onPress} onLongPress={onLongPress}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <View style={styles.details}>
          <Text onPress={onPress} style={[styles.name, { color: colors.text }]}>{name}</Text>
          <Text onPress={onPress} style={[styles.phone, { color: colors.accent }]}>{phone}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={30}
            color={isFavorite ? colors.accent : colors.text}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};


ContactListItem.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  onPress: PropTypes.func,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
  onLongPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 55, // Slightly larger avatar
    height: 55,
    borderRadius: 27.5,
  },
  details: {
    marginLeft: 15,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333', // Darker color for text contrast
  },
  phone: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(0, 122, 255, 0.8)', // Blue with slight transparency
  },
  favoriteButton: {
    marginLeft: 16,
  },
});

export default ContactListItem;
