import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { products } from "@/src/data/mockData"; // Assuming you have mockData
import Colors from "@/src/const/color";

const HomeScreen = () => {
  const router = useRouter();
  const cartItems = useSelector((state: any) => state.cart.items);
  const cartQuantity = useSelector((state: any) => state.cart.totalQuantity);

  const categories = [
    "All",
    "Bakery",
    "Dairy",
    "Beverages",
    "Fruits",
    "Vegetables",
  ];

  const navigateToProductDetail = (product: any) => {
    router.push({
      pathname: "/product/[id]",
      params: { id: product.id },
    });
  };

  const navigateToCart = () => {
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <FlatList
        ListHeaderComponent={
          <>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.header}
            >
              <View style={styles.headerContent}>
                <View>
                  <Text style={styles.welcomeText}>Welcome to</Text>
                  <Text style={styles.headerText}>Discover</Text>
                </View>
                <TouchableOpacity
                  style={styles.cartIconContainer}
                  onPress={navigateToCart}
                >
                  <Feather name="shopping-cart" size={24} color="#FFFFFF" />
                  {cartQuantity > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{cartQuantity}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Search Bar in header */}
              <View style={styles.searchBarContainer}>
                <Feather
                  name="search"
                  size={20}
                  color="#A0A0A0"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search products..."
                  placeholderTextColor="#A0A0A0"
                />
              </View>
            </LinearGradient>

            {/* Poster with overlay text */}
            <View style={styles.posterContainer}>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIP.ISkHo3CnE18OQh0oyxBFzwHaEO?rs=1&pid=ImgDetMain",
                }}
                style={styles.poster}
              />
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                style={styles.posterOverlay}
              >
                <Text style={styles.posterText}>Fresh Deals</Text>
                <Text style={styles.posterSubtext}>
                  Up to 30% off on selected items
                </Text>
              </LinearGradient>
            </View>

            {/* Categories */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryContainer}
                contentContainerStyle={styles.categoryContentContainer}
              >
                {categories.map((category, index) => (
                  <TouchableOpacity key={index} style={styles.categoryWrapper}>
                    <LinearGradient
                      colors={
                        index === 0
                          ? [Colors.primary, Colors.primaryDark]
                          : ["#f8f8f8", "#f0f0f0"]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.categoryItem}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          index !== 0 && styles.inactiveCategoryText,
                        ]}
                      >
                        {category}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Featured Products Header */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Products</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigateToProductDetail(item)}
            activeOpacity={0.7}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <TouchableOpacity style={styles.favoriteButton}>
                <Feather name="heart" size={18} color="#FF5E62" />
              </TouchableOpacity>
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Feather name="star" size={14} color="#FFD700" />
                <Text style={styles.itemRating}>{item.rating}</Text>
              </View>
              <Text style={styles.itemPrice}>
                ₹
                {item.price.fixed ||
                  (item.price.sizes && Object.values(item.price.sizes)[0])}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginHorizontal: -10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cartIconContainer: {
    position: "relative",
    width: 44,
    height: 44,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF5E62",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 12,
    color: "#333333",
    fontSize: 15,
  },
  posterContainer: {
    height: 180,
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  posterOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  posterText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  posterSubtext: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.9,
  },
  sectionContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  categoryContainer: {
    paddingLeft: 16,
    paddingVertical: 2,
  },
  categoryContentContainer: {
    paddingRight: 16,
  },
  categoryWrapper: {
    marginRight: 10,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  inactiveCategoryText: {
    color: "#333333",
  },
  productsList: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  itemCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
  },
  itemImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  itemDetails: {
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemRating: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
});

export default HomeScreen;
