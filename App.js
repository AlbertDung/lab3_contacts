import React from "react";
import { View, Text } from "react-native";
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import DrawerNavigator from "./components/routes";
import Favorites from "./screens/Favorites";
import User from "./screens/User";
import Options from "./screens/Options";
import Store from "./components/store";
import { Provider } from "react-redux";
import { StatusBar } from "react-native"; // Importing StatusBar
import { ThemeProvider } from "./components/ThemeContext";
import TabNavigator from "./components/routes";
const App = () => {
  return (
    <ThemeProvider>
      <Provider store={Store}>
        <StatusBar barStyle="dark-content" backgroundColor="black" />
        <DrawerNavigator />
      </Provider>
    </ThemeProvider>
  );
};
export default App;
