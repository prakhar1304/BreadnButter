import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateClub = () => {
  const router = useRouter();
  const [clubName, setClubName] = useState("");
  const [clubLeader, setClubLeader] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Select Image from Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload Image to Firebase Storage & Save Club Info
  const handleCreateClub = async () => {
    if (!clubName || !clubLeader || !description || !image) {
      alert("Please fill all fields and select an image!");
      return;
    }

    setLoading(true);
    try {
      // Upload Image
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `clubs/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);

      // Save to Firestore
      await addDoc(collection(db, "clubs"), {
        clubName,
        clubLeader,
        description,
        imageUrl,
        createdAt: new Date(),
      });

      alert("Club Created Successfully!");
      router.back();
    } catch (error) {
      alert("Error creating club: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Club</Text>

      <TextInput placeholder="Club Name" value={clubName} onChangeText={setClubName} style={styles.input} />
      <TextInput placeholder="Club Leader" value={clubLeader} onChangeText={setClubLeader} style={styles.input} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      {/* Image Upload */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text>Select Image</Text>}
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleCreateClub} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Create Club</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "white", padding: 15, borderRadius: 8, marginBottom: 10 },
  imagePicker: {
    backgroundColor: "#DDDDDD",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  image: { width: "100%", height: "100%", borderRadius: 8 },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default CreateClub;
