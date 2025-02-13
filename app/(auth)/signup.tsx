"use client";

import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import uuid from "react-native-uuid";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStore } from "@/src/stores/UserStore";

// import { useFont } from "expo-dynamic-fonts";

export default function Signup() {
  // let [fontsLoaded] = useFonts({
  //   Inter_900Black,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const setUser = useStore((state) => state.setUser);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !phoneNumber) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      Alert.alert("Error", "Invalid phone number");
      return;
    }
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        Alert.alert("Error", "Email already registered");
        return;
      }
      const userId = uuid.v4();
      const userRef = doc(db, "users", userId);
      const userData = {
        userId,
        email,
        password,
        phoneNumber,
        role,
        createdAt: new Date().toISOString(),
      };

      await setDoc(userRef, userData);
      setUser(userData);
      Alert.alert("Success", "Account created successfully!");
      router.push("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP._NTp9HATk_rYOYB17GSjuAHaDO?rs=1&pid=ImgDetMain",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.subText}>to Abbibo</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.input}
              placeholderTextColor="#666"
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#8A2BE2" />
          ) : (
            <TouchableOpacity onPress={handleSignup}>
              <LinearGradient
                colors={["#8A2BE2", "#4B0082"]}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.footerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  subText: {
    fontSize: 28,
    color: "#8A2BE2",
    marginTop: 5,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  footerLink: {
    color: "#8A2BE2",
    textDecorationLine: "underline",
    marginTop: 5,
    fontSize: 14,
  },
});
