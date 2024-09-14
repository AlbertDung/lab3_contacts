import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { useTheme } from './ThemeContext';

const ContactThumbnail = ({ name, phone, avatar, onPress, onLongPress }) => {
  const { colors } = useTheme();

  const ImageComponent = onPress || onLongPress ? TouchableOpacity : View;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, shadowColor: colors.text }]}>
      <ImageComponent onPress={onPress} onLongPress={onLongPress} style={[styles.imageWrapper, { borderColor: colors.accent }]}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      </ImageComponent>

      {name !== '' && (
        <Text onPress={onPress} style={[styles.name, { color: colors.primary }]}>
          {name}
        </Text>
      )}

      {phone !== '' && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={[styles.phoneIcon, { color: colors.accent }]} />
          <Text onPress={onPress} style={[styles.phone, { color: colors.text }]}>
            {phone}
          </Text>
        </View>
      )}
    </View>
  );
};

ContactThumbnail.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

ContactThumbnail.defaultProps = {
  name: '',
  phone: '',
  onPress: null,
  onLongPress: null,
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 160,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15, // Làm cho giao diện trông mềm mại hơn
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15, // Bóng đổ giúp tạo chiều sâu và hiện đại
  },
  avatar: {
    width: 70,
    height: 70, // Avatar lớn hơn để tạo điểm nhấn
    borderRadius: 35,
  },
  imageWrapper: {
    padding: 5,
    borderRadius: 40,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 2, // Tạo đường viền để avatar nổi bật
  },
  name: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  phoneSection: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  phoneIcon: {
    marginRight: 6,
    
  },
  phone: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
});

export default ContactThumbnail;
