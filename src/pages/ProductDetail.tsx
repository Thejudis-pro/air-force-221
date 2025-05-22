
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MinusCircle, PlusCircle, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getSimilarProducts } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || '');
  const similarProducts = getSimilarProducts(productId || '');
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Available sizes
  const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  
  // Multiple product images (using different angles for demo)
  const getProductImages = (mainImageUrl: string | undefined) => {
    if (!mainImageUrl) return [];
    
    // Pour le démo, nous utilisons la même image pour toutes les vues
    return [
      mainImageUrl,
      mainImageUrl,
      mainImageUrl,
      mainImageUrl
    ];
  };
  
  const productImages = getProductImages(product?.image);
  
  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize, quantity);
    }
  };
  
  // If product not found
  if (!product) {
    return (
      <>
        <Header />
        <div className="container-custom py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <p className="mb-6">Le produit que vous recherchez n'existe pas.</p>
          <Link to="/boutique" className="btn btn-primary">
            Retourner à la boutique
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      
      {/* Product Section */}
      <section className="pt-28 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Images */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg">
                  <img 
                    src={productImages[activeImageIndex]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square overflow-hidden bg-gray-100 rounded-lg border-2 transition-all ${
                      activeImageIndex === index ? 'border-gold' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                {product.slogan && (
                  <p className="text-xl text-gray-600 mb-4 italic">{product.slogan}</p>
                )}
                <p className="text-2xl font-semibold text-gold mb-6">{product.price.toFixed(2)} €</p>
                
                {/* Product Tags */}
                <div className="flex gap-3 mb-6">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                    {product.isCustom ? "Édition custom" : "Édition standard"}
                  </span>
                  <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-medium text-green-800">
                    En stock
                  </span>
                </div>
                
                {/* Product Description */}
                <div className="prose prose-sm mb-8">
                  <p className="text-gray-700 mb-4">
                    {product.description}
                  </p>
                </div>
                
                {/* Product Highlights */}
                {product.highlights && product.highlights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-medium mb-3">Points forts</h3>
                    <ul className="space-y-2">
                      {product.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-gold mr-2 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Size Selection */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Taille</h3>
                    <button className="text-sm text-gray-600 underline">Guide des tailles</button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`size-selector w-12 h-12 rounded-md border text-center leading-12 transition-all ${
                          selectedSize === size 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-300 hover:border-gray-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && (
                    <p className="text-sm text-red-500 mt-2">Veuillez sélectionner une taille</p>
                  )}
                </div>
                
                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="font-medium mb-3">Quantité</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="text-gray-500 hover:text-black transition-colors"
                      disabled={quantity <= 1}
                    >
                      <MinusCircle className="h-6 w-6" />
                    </button>
                    <span className="mx-6 font-medium text-lg w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-gray-500 hover:text-black transition-colors"
                    >
                      <PlusCircle className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`w-full btn ${
                    selectedSize ? 'btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  } py-4 mb-4`}
                >
                  Ajouter au panier
                </button>
                
                {/* Shipping Info */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">Livraison gratuite à partir de 100€</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="text-gray-700">Retours gratuits sous 14 jours</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Vous pourriez aussi aimer</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((product) => (
                <Link 
                  to={`/produit/${product.id}`} 
                  key={product.id}
                  className="product-card block"
                >
                  <div className="aspect-square overflow-hidden bg-white">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover product-image"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    <p className="text-gold font-semibold">{product.price.toFixed(2)} €</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </>
  );
};

export default ProductDetail;
