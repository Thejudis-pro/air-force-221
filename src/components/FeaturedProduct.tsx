
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/contexts/CartContext';
import { Check } from 'lucide-react';

interface FeaturedProductProps {
  product: Product;
  index: number;
}

const FeaturedProduct = ({ product, index }: FeaturedProductProps) => {
  // Alternate layout direction based on index
  const isReverse = index % 2 !== 0;
  
  return (
    <div 
      className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 my-20`}
    >
      <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative aspect-square overflow-hidden bg-gray-100"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover product-image"
          />
        </motion.div>
      </div>
      
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: isReverse ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h3>
          {product.slogan && (
            <p className="text-lg text-gray-600 mb-3 italic">{product.slogan}</p>
          )}
          <p className="text-xl font-semibold text-gold mb-4">{product.price} FCFA</p>
          <p className="text-gray-600 mb-4">
            {product.description?.substring(0, 150)}...
          </p>
          
          {product.highlights && product.highlights.length > 0 && (
            <div className="mb-6">
              <ul className="space-y-2">
                {product.highlights.slice(0, 2).map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-gold mr-2 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Link 
            to={`/produits/${product.slug}`} 
            className="btn btn-primary px-6 py-3"
          >
            Voir le produit
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
