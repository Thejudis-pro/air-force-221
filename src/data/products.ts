
import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: "af1-white-standard",
    name: "Air Force 1 – Blanche Classique",
    price: 119.99,
    image: "/lovable-uploads/0785c5d5-ddaa-493d-bade-52f86fba61d9.png",
    productImages: [
      "/lovable-uploads/0785c5d5-ddaa-493d-bade-52f86fba61d9.png", // Vue de dessus
      "/lovable-uploads/ba922830-ba52-47fa-a434-a368bc3922ae.png", // Vue de côté
      "/lovable-uploads/23f58c75-9e59-4328-8c37-fd4fdc38d507.png", // Vue de derrière
      "/lovable-uploads/555acf49-99af-4a2c-8745-89aba5e2c5a4.png", // Vue d'ensemble
    ],
    category: "standard",
    isCustom: false,
    slogan: "L'icône intemporelle qui s'adapte à tous les styles.",
    description: "Élégante, sobre et légendaire. La Air Force 1 blanche est bien plus qu'une sneaker : c'est un classique de la culture urbaine. Avec son design épuré, sa silhouette mythique et son confort durable, elle se porte avec tout, partout, tout le temps. Que tu sois streetwear, casual ou minimaliste, elle s'impose comme la base de toute collection.",
    highlights: [
      "Cuir premium blanc éclatant",
      "Semelle amortissante Nike Air",
      "Polyvalente : s'accorde à toutes les tenues",
      "Facile à entretenir"
    ],
    slug: "air-force-1-blanche",
    seo: {
      title: "Air Force 1 Blanche – Sneaker Nike Classique & Indémodable | Shop AF1",
      metaDescription: "Découvre la Nike Air Force 1 blanche, la sneaker légendaire au style épuré. Confort, design intemporel et qualité premium."
    },
    materials: ["Cuir premium", "Caoutchouc durable", "Textile respirant"],
    details: "Design authentique respectant les codes classiques de Nike. Réputée pour son confort au quotidien et sa durabilité."
  },
  {
    id: "af1-black-standard",
    name: "Air Force 1 – Noire Intense",
    price: 119.99,
    image: "/lovable-uploads/ad1ad722-82b7-45f9-9c6b-e05c3192a273.png",
    productImages: [
      "/lovable-uploads/d7d85a1f-a037-4458-8d75-3951d78cb70a.png", // Vue de dessus
      "/lovable-uploads/ad1ad722-82b7-45f9-9c6b-e05c3192a273.png", // Vue d'ensemble
      "/lovable-uploads/3e8a2e5f-88c1-4083-8e4a-f32f27863a15.png", // Vue de derrière
      "/lovable-uploads/e0119833-a038-4033-9a3c-07c5926a4b11.png", // Vue de côté
    ],
    category: "standard",
    isCustom: false,
    slogan: "Discrète. Solide. Inarrêtable.",
    description: "Pour ceux qui veulent rester dans l'ombre tout en faisant une vraie déclaration de style. La Air Force 1 noire est synonyme de puissance et de caractère. Avec son look monochrome et son design robuste, elle apporte une touche sérieuse et affirmée à toutes tes tenues. Parfaite pour un look urbain assumé et sans compromis.",
    highlights: [
      "Look full black élégant et audacieux",
      "Cuir durable et semelle épaisse",
      "Parfaite pour l'hiver ou les looks dark",
      "Facile à porter au quotidien"
    ],
    slug: "air-force-1-noire",
    seo: {
      title: "Air Force 1 Noire – Sneaker Nike Full Black | Style Urbain et Puissant",
      metaDescription: "La Nike Air Force 1 noire est parfaite pour un look sobre et affirmé. Design iconique, confort optimal et style urbain inimitable."
    },
    materials: ["Cuir premium traité", "Caoutchouc résistant", "Semelle Air encapsulée"],
    details: "Finition full black qui ne passera jamais de mode. Construction robuste pensée pour résister à une utilisation intensive."
  },
  {
    id: "af1-white-custom",
    name: "Air Force 1 – Blanche Custom Corde",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
    category: "custom",
    isCustom: true,
    slogan: "Même silhouette, nouvelle attitude.",
    description: "Redécouvre la légendaire AF1 blanche, revisitée avec des lacets style corde ultra stylés. Ce modèle custom apporte une touche unique et créative à une sneaker déjà culte. Idéal pour ceux qui veulent se démarquer sans en faire trop, tout en gardant une base classique et clean. C'est le twist parfait entre tradition et tendance.",
    highlights: [
      "Lacets corde épais pour un look personnalisé",
      "Toujours aussi confortable et épurée",
      "Finition premium, édition limitée",
      "Pour affirmer ton style en toute subtilité"
    ],
    slug: "air-force-1-blanche-custom-corde",
    seo: {
      title: "Air Force 1 Blanche Custom – Lacets Corde Uniques | Édition Limitée",
      metaDescription: "Revisite la AF1 blanche avec un style original. Découvre notre édition avec lacets corde pour un look unique qui te démarque."
    },
    materials: ["Cuir premium", "Lacets style corde épais", "Semelle Air Nike classique"],
    details: "Édition limitée customisée avec des lacets style corde sélectionnés pour leur qualité et leur esthétique distinctive."
  },
  {
    id: "af1-black-custom",
    name: "Air Force 1 – Noire Custom Corde",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?q=80&w=1974&auto=format&fit=crop",
    category: "custom",
    isCustom: true,
    slogan: "Le classique noir, revisité avec du caractère.",
    description: "Cette version custom de la AF1 noire ne laisse personne indifférent. Les lacets corde apportent une nouvelle dimension à cette sneaker mythique, créant un équilibre parfait entre sobriété et originalité. Elle est conçue pour ceux qui n'ont pas peur d'être différents, mais qui le font avec style.",
    highlights: [
      "Design full black + détails uniques",
      "Lacets corde épais en finition brute",
      "Une sneaker custom audacieuse mais sobre",
      "Confort Nike classique + style affirmé"
    ],
    slug: "air-force-1-noire-custom-corde",
    seo: {
      title: "Air Force 1 Noire Custom – Sneaker Originale avec Lacets Corde | Look Unique",
      metaDescription: "Adopte la Air Force 1 noire avec lacets corde pour un style distinctif et personnel. Édition limitée alliant élégance urbaine et détails créatifs."
    },
    materials: ["Cuir premium noir traité", "Lacets corde épais", "Construction renforcée"],
    details: "Version remixée de l'iconique AF1 noire, avec des lacets style corde qui apportent texture et caractère à ce modèle intemporel."
  }
];

// Trouver un produit par son ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Trouver un produit par son slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
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

