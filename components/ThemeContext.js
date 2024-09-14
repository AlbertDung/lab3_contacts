import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load the theme preference from AsyncStorage when the app starts
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const value = await AsyncStorage.getItem('@theme_preference');
      if (value !== null) {
        setIsDarkMode(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    try {
      await AsyncStorage.setItem('@theme_preference', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode
      ? {
          primary: '#D72323',
          background: '#303841',
          text: '#EEEEEE',
          accent: '#FF2E63',
        }
      : {
          primary: '#FC5185',
          background: '#F5F5F5',
          text: '#40514E',
          accent: '#FC5185',
        },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);