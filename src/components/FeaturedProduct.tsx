
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/contexts/CartContext';

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
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h3>
          <p className="text-xl font-semibold text-gold mb-4">{product.price.toFixed(2)} €</p>
          <p className="text-gray-600 mb-6">
            {product.isCustom 
              ? "Version premium avec lacets épais style corde pour un style unique et différenciant."
              : "Modèle standard iconique, indémodable et parfait pour tous les styles urbains."
            }
          </p>
          <Link 
            to={`/produit/${product.id}`} 
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
