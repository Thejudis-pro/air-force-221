
import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MinusCircle, PlusCircle, Check, Truck, Shield, RefreshCw, Info } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductBySlug, getSimilarProducts } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Helmet } from 'react-helmet';

const SizeGuide = () => {
  return (
    <div className="p-4 w-[300px]">
      <h3 className="font-bold mb-3">Guide des tailles</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">EU</th>
            <th className="py-2 text-left">US (Homme)</th>
            <th className="py-2 text-left">UK</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-1.5">36</td>
            <td className="py-1.5">4</td>
            <td className="py-1.5">3.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">37</td>
            <td className="py-1.5">5</td>
            <td className="py-1.5">4.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">38</td>
            <td className="py-1.5">6</td>
            <td className="py-1.5">5.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">39</td>
            <td className="py-1.5">7</td>
            <td className="py-1.5">6.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">40</td>
            <td className="py-1.5">8</td>
            <td className="py-1.5">7.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">41</td>
            <td className="py-1.5">9</td>
            <td className="py-1.5">8.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">42</td>
            <td className="py-1.5">10</td>
            <td className="py-1.5">9.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">43</td>
            <td className="py-1.5">11</td>
            <td className="py-1.5">10.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">44</td>
            <td className="py-1.5">12</td>
            <td className="py-1.5">11.5</td>
          </tr>
          <tr className="border-b">
            <td className="py-1.5">45</td>
            <td className="py-1.5">13</td>
            <td className="py-1.5">12.5</td>
          </tr>
          <tr>
            <td className="py-1.5">46</td>
            <td className="py-1.5">14</td>
            <td className="py-1.5">13.5</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-xs text-gray-500">Pour un confort optimal, nous recommandons de prendre votre taille habituelle.</p>
    </div>
  );
};

const DedicatedProductPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = getProductBySlug(productSlug || '');
  const similarProducts = product ? getSimilarProducts(product.id) : [];
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Pour le référencement SEO
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productSlug]);
  
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
    return <Navigate to="/boutique" replace />;
  }
  
  return (
    <>
      <Helmet>
        <title>{product.seo?.title || product.name}</title>
        <meta name="description" content={product.seo?.metaDescription || product.description} />
        <meta property="og:title" content={product.seo?.title || product.name} />
        <meta property="og:description" content={product.seo?.metaDescription || product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
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
                      alt={`${product.name} vue ${index + 1}`} 
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
                
                {/* Product Materials */}
                {product.materials && product.materials.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Matériaux</h3>
                    <ul className="flex flex-wrap gap-2">
                      {product.materials.map((material, index) => (
                        <li key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
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
                
                {/* Additional Details */}
                {product.details && (
                  <div className="mb-8">
                    <h3 className="font-medium mb-3">Détails du produit</h3>
                    <p className="text-gray-700">{product.details}</p>
                  </div>
                )}
                
                {/* Size Selection */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Taille</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="text-sm text-gray-600 underline inline-flex items-center gap-1">
                          <Info className="h-4 w-4" />
                          Guide des tailles
                        </button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <SizeGuide />
                      </PopoverContent>
                    </Popover>
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
              {similarProducts.map((similarProduct) => (
                <Link 
                  to={`/produits/${similarProduct.slug}`} 
                  key={similarProduct.id}
                  className="product-card block"
                >
                  <div className="aspect-square overflow-hidden bg-white">
                    <img 
                      src={similarProduct.image} 
                      alt={similarProduct.name}
                      className="w-full h-full object-cover product-image"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-medium text-lg mb-1">{similarProduct.name}</h3>
                    <p className="text-gold font-semibold">{similarProduct.price.toFixed(2)} €</p>
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

export default DedicatedProductPage;
