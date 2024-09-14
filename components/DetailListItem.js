import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { useTheme } from '../components/ThemeContext'; // Import ThemeContext

const DetailListItem = ({ icon, title, subtitle, onPress }) => {
  const { colors } = useTheme(); // Get colors from ThemeContext

  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, { borderBottomColor: colors.border }]}>
      <View style={styles.container}>
        {icon && (
          <Icon
            name={icon}
            size={24}
            style={{
              color: colors.accent,
              marginRight: 20,
            }}
          />
        )}
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.subtitle, { color: colors.text }]}>{subtitle}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

DetailListItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onPress: PropTypes.func, // Add onPress prop type
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
  },
});

export default DetailListItem;
