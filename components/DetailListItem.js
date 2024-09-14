import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { useTheme } from '../components/ThemeContext'; // Import ThemeContext

const DetailListItem = ({ icon, title, subtitle }) => {
  const { colors } = useTheme(); // Lấy màu sắc từ ThemeContext

  return (
    <View style={[styles.borderContainer, { borderBottomColor: colors.border }]}>
      <View style={styles.wrapper}>
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
      </View>
    </View>
  );
};

DetailListItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

const styles = StyleSheet.create({
  borderContainer: {
    paddingLeft: 24,
  },
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
