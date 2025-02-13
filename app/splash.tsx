import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useStore } from "@/src/stores/UserStore";
// import useStore from "../../src/stores/UserStore";

export default function SplashScreen() {
  const router = useRouter();
  const user = useStore((state) => state.user);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        if (user) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.error("Error checking user data", error);
        router.replace("/(auth)/login");
      }
    };

    setTimeout(() => {
      checkUserData();
    }, 2000);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Abbibo</Text>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
