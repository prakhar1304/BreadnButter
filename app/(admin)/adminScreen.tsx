import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";

import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/const/color";

const AdminPanel = () => {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [priceType, setPriceType] = useState("single");
  const [price, setPrice] = useState("");
  const [sizePrices, setSizePrices] = useState<{ [key: string]: string }>({});
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Add this to your component temporarily to test the configuration
  // const testFirebaseStorage = async () => {
  //   try {
  //     const testRef = ref(storage, "test/test.txt");
  //     const message = new Blob(["Hello, World!"], { type: "text/plain" });
  //     await uploadBytes(testRef, message);
  //     console.log("Test upload successful!");
  //   } catch (error) {
  //     console.log("-----------");
  //     console.error("Firebase Storage Test Error:", error);
  //     if (error.code === "storage/no-default-bucket") {
  //       console.error("Storage bucket not properly configured");
  //     }
  //   }
  // };

  // // Call this in useEffect or a button press to test
  // useEffect(() => {
  //   testFirebaseStorage();
  // }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to enable permission to access your photos"
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return null;

    try {
      setUploading(true);
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const filename = `party_items/${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.jpg`;
      const imageRef = ref(storage, filename);

      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!category || !itemName || !description || !key) {
      Alert.alert("Error", "Please fill all required fields!");
      return;
    }

    try {
      let imageUrl = null;
      if (imageUri) {
        imageUrl = await uploadImage();
      }

      const itemData = {
        itemName,
        description,
        key,
        image: imageUrl || "",
        colors,
        pricing: priceType === "single" ? price : sizePrices,
        createdAt: new Date().toISOString(),
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
      Alert.alert(
        "Error",
        "Failed to add item. Please check your connection and try again."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Panel - Add Item</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter category name"
          value={category}
          onChangeText={setCategory}
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Item Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={itemName}
          onChangeText={setItemName}
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Key (Unique ID):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item key"
          value={key}
          onChangeText={setKey}
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Colors (comma-separated):</Text>
        <TextInput
          style={styles.input}
          placeholder="Red, Blue, Green"
          value={colors.join(", ")}
          onChangeText={(text) =>
            setColors(text.split(",").map((c) => c.trim()))
          }
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pricing Type:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setPriceType(priceType === "single" ? "size" : "single")
          }
        >
          <Text style={styles.buttonText}>
            {priceType === "single"
              ? "Switch to Size-based Pricing"
              : "Switch to Single Price"}
          </Text>
        </TouchableOpacity>
      </View>

      {priceType === "single" ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Size-based Pricing (Format: S=100, M=150, L=200)
          </Text>
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
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
      )}

      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePickerPlaceholder}>
              <Ionicons name="image-outline" size={40} color={Colors.primary} />
              <Text style={styles.imagePickerText}>Pick an Image</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.submitButton]}
        onPress={handleSubmit}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Uploading..." : "Add Item"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    // marginBottom: 200,
    // paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.inputBackground,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: Colors.inputBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  imagePickerPlaceholder: {
    alignItems: "center",
  },
  imagePickerText: {
    marginTop: 10,
    color: Colors.primary,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: Colors.primaryDark,
    marginBottom: 30,
  },
});

export default AdminPanel;
