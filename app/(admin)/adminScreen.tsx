import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig"; // Import your Firebase config

const AdminPanel = () => {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [priceType, setPriceType] = useState("single"); // "single" or "size"
  const [price, setPrice] = useState(""); // For single price
  const [sizePrices, setSizePrices] = useState<{ [key: string]: string }>({}); // For size-based pricing
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle Image Selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Upload Image to Firebase Storage
  const uploadImage = async () => {
    if (!imageUri) return null;

    setUploading(true);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageRef = ref(storage, `party_items/${Date.now()}.jpg`);

    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);

    setUploading(false);
    return downloadURL;
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    if (!category || !itemName || !description || !key) {
      Alert.alert("Error", "Please fill all required fields!");
      return;
    }

    try {
      const imageUrl = await uploadImage();
      const itemData = {
        itemName,
        description,
        key,
        image: imageUrl || "",
        colors,
        pricing: priceType === "single" ? price : sizePrices,
      };

      const categoryRef = doc(collection(db, "PARTY_ITEM"), category);
      const itemRef = doc(collection(categoryRef, "Items"), key);

      await setDoc(itemRef, itemData);
      Alert.alert("Success", "Item added successfully!");

      // Reset form
      setCategory("");
      setItemName("");
      setDescription("");
      setKey("");
      setColors([]);
      setPrice("");
      setSizePrices({});
      setImageUri(null);
    } catch (error) {
      console.error("Error adding item: ", error);
      Alert.alert("Error", "Failed to add item.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Admin Panel - Add Item
      </Text>

      {/* Category Input */}
      <Text>Category:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter category name"
        value={category}
        onChangeText={setCategory}
      />

      {/* Item Details */}
      <Text>Item Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />

      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />

      <Text>Key (Unique ID):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item key"
        value={key}
        onChangeText={setKey}
      />

      {/* Colors Input */}
      <Text>Colors (comma-separated):</Text>
      <TextInput
        style={styles.input}
        placeholder="Red, Blue, Green"
        value={colors.join(", ")}
        onChangeText={(text) => setColors(text.split(",").map((c) => c.trim()))}
      />

      {/* Pricing Section */}
      <Text>Pricing Type:</Text>
      <Button
        title={
          priceType === "single"
            ? "Switch to Size-based Pricing"
            : "Switch to Single Price"
        }
        onPress={() => setPriceType(priceType === "single" ? "size" : "single")}
      />

      {priceType === "single" ? (
        <>
          <Text>Price:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </>
      ) : (
        <>
          <Text>Size-based Pricing (Format: S=100, M=150, L=200)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter size prices"
            onChangeText={(text) => {
              const newSizePrices = text.split(",").reduce((acc, item) => {
                const [size, price] = item.split("=");
                if (size && price) acc[size.trim()] = price.trim();
                return acc;
              }, {} as { [key: string]: string });
              setSizePrices(newSizePrices);
            }}
          />
        </>
      )}

      {/* Image Upload */}
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      )}

      {/* Submit Button */}
      <Button
        title={uploading ? "Uploading..." : "Add Item"}
        onPress={handleSubmit}
        disabled={uploading}
      />
    </ScrollView>
  );
};

// Styles
const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
};

export default AdminPanel;
