
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isCustom: boolean;
  slogan?: string;
  description?: string;
  highlights?: string[];
  slug?: string;
  seo?: {
    title: string;
    metaDescription: string;
  };
  materials?: string[];
  details?: string;
}

export interface CartItem {
  product: Product;
  size: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
    
    // Calculate total whenever cart changes
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const addToCart = (product: Product, size: number, quantity: number) => {
    // Check if product with same size already exists in cart
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id && item.size === size
    );
    
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item
      setCartItems([...cartItems, { product, size, quantity }]);
    }
  };
  
  const removeFromCart = (index: number) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };
  
  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) return;
    
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = quantity;
    setCartItems(updatedItems);
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        total 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
