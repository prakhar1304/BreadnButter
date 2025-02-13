import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../const/color";

interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
}
interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.rating}>
          <AntDesign name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    padding: 12,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    marginBottom: 8,
  },
  details: {
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
