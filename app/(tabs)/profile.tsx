import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import Colors from "@/src/const/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

type IconProps = {
  icon: string;
  label: string;
  IconComponent: any;
};

const OrderStatusButton: React.FC<IconProps> = ({
  icon,
  label,
  IconComponent,
}) => (
  <TouchableOpacity style={styles.statusButton}>
    <View style={[styles.iconCircle, { backgroundColor: Colors.primary }]}>
      <IconComponent name={icon} size={24} color="white" />
    </View>
    <Text style={styles.statusLabel}>{label}</Text>
  </TouchableOpacity>
);

const ActionButton: React.FC<IconProps> = ({ icon, label, IconComponent }) => (
  <TouchableOpacity style={styles.actionButton}>
    <IconComponent name={icon} size={24} color={Colors.primary} />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    userId: "",
    role: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const UserDetail = await AsyncStorage.multiGet([
          "email",
          "USERID",
          "role",
        ]);
        const data = Object.fromEntries(UserDetail); //array  to obj
        setUserData({
          email: data["email"] || "NO Email",
          userId: data["USERID"] || "No User ID",
          role: data["role"] || "user",
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            style={styles.gradient}
          >
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
          </View>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>John Smith</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>

        <View style={styles.statusGrid}>
          <OrderStatusButton
            icon="credit-card"
            label="Pending Payment"
            IconComponent={MaterialIcons}
          />
          <OrderStatusButton
            icon="truck-delivery"
            label="Order History"
            IconComponent={MaterialCommunityIcons}
          />
          <OrderStatusButton
            icon="package"
            label="Processing"
            IconComponent={Feather}
          />
        </View>

        <View style={styles.actionStack}>
          <ActionButton
            icon="person-outline"
            label="Edit Profile"
            IconComponent={MaterialIcons}
          />
          <ActionButton
            icon="location-on"
            label="Edit Address"
            IconComponent={MaterialIcons}
          />
          <ActionButton
            icon="favorite-border"
            label="Wishlist"
            IconComponent={MaterialIcons}
          />
          <ActionButton
            icon="notifications-none"
            label="Notifications"
            IconComponent={MaterialIcons}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    height: 180,
  },
  gradient: {
    height: 160,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
  },
  settingsButton: {
    position: "absolute",
    top: 40,
    right: 16,
    zIndex: 1,
  },
  profileImageContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.background,
    backgroundColor: Colors.background,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statusGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statusButton: {
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    padding: 16,
    width: "30%",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: Colors.text,
    textAlign: "center",
  },
  actionStack: {
    paddingHorizontal: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
});

export default ProfileScreen;
