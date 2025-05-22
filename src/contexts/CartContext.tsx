import React, { createContext, useContext, useState, useEffect } from 'react';

// Product type definition
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  productImages?: string[]; // Added productImages as an optional property
  category: string;
  isCustom: boolean;
  slogan?: string;
  description: string;
  highlights?: string[];
  slug: string;
  seo?: {
    title: string;
    metaDescription: string;
  };
  materials?: string[];
  details?: string;
}

// Cart item type
export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
}

// Cart context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: number, quantity: number) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: Product, size: number, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, update the quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevItems, { product, quantity, size }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: string, size: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId || item.size !== size)
    );
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId: string, size: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId && item.size === size) {
          return { ...item, quantity: quantity };
        }
        return item;
      })
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate subtotal of items in the cart
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
