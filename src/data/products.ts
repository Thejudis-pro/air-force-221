
import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: "af1-white-standard",
    name: "Nike Air Force 1 Blanche",
    price: 119.99,
    image: "/images/af1-white-standard.webp",
    category: "standard",
    isCustom: false
  },
  {
    id: "af1-black-standard",
    name: "Nike Air Force 1 Noire",
    price: 119.99,
    image: "/images/af1-black-standard.webp",
    category: "standard",
    isCustom: false
  },
  {
    id: "af1-white-custom",
    name: "Nike Air Force 1 Blanche Custom",
    price: 139.99,
    image: "/images/af1-white-custom.webp",
    category: "custom",
    isCustom: true
  },
  {
    id: "af1-black-custom",
    name: "Nike Air Force 1 Noire Custom",
    price: 139.99,
    image: "/images/af1-black-custom.webp",
    category: "custom",
    isCustom: true
  }
];

// Trouver un produit par son ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Obtenir des produits similaires (même catégorie sauf le produit lui-même)
export const getSimilarProducts = (id: string): Product[] => {
  const currentProduct = getProductById(id);
  if (!currentProduct) return [];
  
  return products.filter(product => 
    product.id !== id && 
    (product.category === currentProduct.category || product.isCustom === currentProduct.isCustom)
  );
};

export const testimonials = [
  {
    id: "1",
    name: "Lucas M.",
    text: "Mes Air Force 1 custom sont arrivées en parfait état. La qualité est top et les lacets épais donnent vraiment un style unique. Je recommande !",
    rating: 5
  },
  {
    id: "2",
    name: "Emma D.",
    text: "Service client ultra réactif et livraison rapide. Les AF1 noires sont conformes à la description, rien à redire.",
    rating: 5
  },
  {
    id: "3",
    name: "Théo R.",
    text: "Les meilleures Air Force que j'ai pu acheter. Les lacets style corde sur la version custom changent vraiment tout.",
    rating: 5
  },
  {
    id: "4",
    name: "Sarah L.",
    text: "Achat pour la 2ème fois sur ce site. La qualité est constante, le prix correct pour des AF1 custom aussi stylées.",
    rating: 4
  }
];

export const instagramPosts = [
  {
    id: "insta1",
    image: "/images/insta-1.webp",
    username: "@streetstyle_92"
  },
  {
    id: "insta2",
    image: "/images/insta-2.webp",
    username: "@sneakers.addict"
  },
  {
    id: "insta3",
    image: "/images/insta-3.webp",
    username: "@fashion.daily"
  },
  {
    id: "insta4",
    image: "/images/insta-4.webp",
    username: "@urban.kicks"
  }
];
