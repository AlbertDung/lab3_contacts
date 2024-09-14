import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../components/ThemeContext'; // Import ThemeContext

const DetailListItem = ({ title, onPress }) => {
  const { colors } = useTheme(); // Sử dụng ThemeContext để lấy màu sắc hiện tại

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

DetailListItem.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

DetailListItem.defaultProps = {
  onPress: null,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Bạn có thể điều chỉnh borderColor này để phản hồi chế độ sáng/tối nếu muốn
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DetailListItem;
