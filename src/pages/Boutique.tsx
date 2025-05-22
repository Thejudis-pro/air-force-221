
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Boutique = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredProducts = filter 
    ? products.filter(product => 
        filter === 'custom' ? product.isCustom : !product.isCustom
      )
    : products;
  
  return (
    <>
      <Header />
      
      {/* Page Title */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-center">Notre Collection</h1>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-16">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setFilter(null)}
                className={`px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 
                ${!filter ? 'bg-gray-100 text-black' : ''}`}
              >
                Tous
              </button>
              <button
                type="button"
                onClick={() => setFilter('standard')}
                className={`px-5 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 
                ${filter === 'standard' ? 'bg-gray-100 text-black' : ''}`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setFilter('custom')}
                className={`px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 
                ${filter === 'custom' ? 'bg-gray-100 text-black' : ''}`}
              >
                Custom
              </button>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`/produit/${product.id}`} className="product-card block h-full">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover product-image"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    <p className="text-gold font-semibold">{product.price.toFixed(2)} €</p>
                    <div className="mt-3 text-sm text-gray-600">
                      {product.isCustom ? "Édition custom" : "Édition standard"}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust Badges */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">Transactions cryptées et sécurisées</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Expédition sous 24h</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Retour Facile</h3>
              <p className="text-gray-600">14 jours pour changer d'avis</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Boutique;
