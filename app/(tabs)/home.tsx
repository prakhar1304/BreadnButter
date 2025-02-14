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
import Colors from "@/src/const/color";

// Dummy data remains the same
const items = [
  {
    id: "1",
    name: "Wireless Earbuds",
    price: "$79.99",
    rating: 4.5,
    image: "https://example.com/wireless-earbuds.jpg",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: "$129.99",
    rating: 4.2,
    image:
      "https://th.bing.com/th/id/OIP.hSfIIiyfbb7HyzJ5mvO2CAHaHa?rs=1&pid=ImgDetMain",
  },
  // Add more items as needed
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
];

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Header */}

      <StatusBar backgroundColor={"#4c669f"} />
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.header}
      >
        <Text style={styles.headerText}>Discover</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
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

        {/* Poster */}
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/realistic-horizontal-sale-banner_23-2150277668.jpg",
          }}
          style={styles.poster}
        />

        <View style={{ paddingHorizontal: 21, marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>Categories</Text>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity key={index}>
              <LinearGradient
                colors={["#FF9966", "#FF5E62"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.categoryItem}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Items Grid */}
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <View style={styles.ratingContainer}>
                  <Feather name="star" size={14} color="#FFD700" />
                  <Text style={styles.itemRating}>{item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 12,
    color: "#333333",
  },
  poster: {
    width: "92%",
    height: 180,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 10,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  itemCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: "100%",
    height: 150,
  },
  itemDetails: {
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4c669f",
    marginBottom: 4,
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

export default Home;
