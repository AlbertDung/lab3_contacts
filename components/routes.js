import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Contacts from "../screens/Contacts";
import Profile from "../screens/Profile";
import Favorites from "../screens/Favorites";
import User from "../screens/User";
import Options from "../screens/Options";
import { useTheme } from "./ThemeContext";

const getTabBarIcon = (icon) => ({ color }) => (
  <MaterialIcons name={icon} size={26} style={{ color }} />
);

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const ContactsScreens = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: "Contacts" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(" ")[0],
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.background,
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

const FavoritesScreens = () => (
  <Stack.Navigator
    initialRouteName="Favorites"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Favorites"
      component={Favorites}
      options={{ title: "Favorites" }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile" }}
    />
  </Stack.Navigator>
);

const UserScreens = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User"
        component={User}
        options={{
          headerTitle: "Me",
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerRight: () => (
            <MaterialIcons
              name="settings"
              size={24}
              style={{ color: colors.text, marginRight: 10 }}
              onPress={() => navigation.navigate("Options")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{ title: "Options" }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { colors } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ContactsScreens"
        barStyle={{ backgroundColor: colors.background }}
        activeColor={colors.accent}
        inactiveColor={colors.text}
      >
        <Tab.Screen
          name="ContactsScreens"
          component={ContactsScreens}
          options={{
            tabBarIcon: getTabBarIcon("list"),
          }}
        />
        <Tab.Screen
          name="FavoritesScreens"
          component={FavoritesScreens}
          options={{
            tabBarIcon: getTabBarIcon("star"),
          }}
        />
        <Tab.Screen
          name="UserScreens"
          component={UserScreens}
          options={{
            tabBarIcon: getTabBarIcon("person"),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;