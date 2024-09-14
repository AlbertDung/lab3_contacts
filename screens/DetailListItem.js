import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { useTheme } from '../components/ThemeContext'; // Import ThemeContext

const DetailListItem = ({ icon, title, subtitle }) => {
  const { colors } = useTheme(); // Lấy màu từ ThemeContext

  return (
    <View style={styles.container}>
      <Icon name={icon} size={24} color={colors.accent} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>{subtitle}</Text>
      </View>
    </View>
  );
};

DetailListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

DetailListItem.defaultProps = {
  subtitle: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default DetailListItem;
