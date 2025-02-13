import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Define the available screens for typescript safety
type TabName = "home" | "list" | "profile" | "adminScreen";

const TabLayout = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem("userRole");
        if (storedRole) {
          setRole(storedRole);
        }
      } catch (error) {
        console.error("Failed to fetch role from AsyncStorage", error);
      }
    };

    getUserRole();
  }, []);

  // Dynamically render the 'adminScreen' based on role
  const renderAdminTab = role === "admin";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,

        lazy: true,
        tabBarStyle: { backgroundColor: "#fff" }, // Customizing tab bar style
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      {renderAdminTab && (
        <Tabs.Screen
          name="adminScreen"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="shield-account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      )}
    </Tabs>
  );
};

export default TabLayout;
