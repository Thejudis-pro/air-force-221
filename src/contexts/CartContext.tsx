
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isCustom: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: number, quantity: number) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

// Create context
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0
});

// Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Update localStorage and calculate total when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product: Product, size: number, quantity: number) => {
    setCartItems(prevItems => {
      // Check if product with same ID and size already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        toast.success(`Quantité mise à jour (${newItems[existingItemIndex].quantity})`);
        return newItems;
      } else {
        // Add new item
        toast.success(`${product.name} ajouté au panier`);
        return [...prevItems, { product, size, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: string, size: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.product.id === productId && item.size === size))
    );
    toast.info("Produit retiré du panier");
  };

  // Update quantity of an item
  const updateQuantity = (productId: string, size: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.info("Panier vidé");
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        cartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
