// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (existingItemIndex !== -1) {
        // If item already exists, update quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Otherwise add new item
        state.items.push(newItem);
      }

      // Update totals
      state.totalQuantity += newItem.quantity;
      state.totalAmount += newItem.price * newItem.quantity;
    },

    removeFromCart: (state, action) => {
      const { id, color, size } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === id && item.color === color && item.size === size
      );

      if (existingItemIndex !== -1) {
        const itemToRemove = state.items[existingItemIndex];
        state.totalQuantity -= itemToRemove.quantity;
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },

    updateCartItemQuantity: (state, action) => {
      const { id, color, size, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === id && item.color === color && item.size === size
      );

      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        const quantityDifference = quantity - item.quantity;

        state.totalQuantity += quantityDifference;
        state.totalAmount += item.price * quantityDifference;
        item.quantity = quantity;

        // Remove item if quantity is 0
        if (quantity <= 0) {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartReducer from "./cartSlice";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart"], // Only persist cart reducer
};

// Create persisted reducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for Redux-Persist
    }),
});

// Create the persisted store
export const persistor = persistStore(store);
