"use client";
import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    // Initialize count from localStorage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistCount(JSON.parse(storedWishlist).length);
    }
  }, []);

  const updateWishlistCount = () => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistCount(JSON.parse(storedWishlist).length);
    } else {
      setWishlistCount(0);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistCount, updateWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
} 