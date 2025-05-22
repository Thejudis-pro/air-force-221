
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedProduct from '@/components/FeaturedProduct';
import TestimonialSection from '@/components/TestimonialSection';
import InstagramSection from '@/components/InstagramSection';

const Index = () => {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/b9d43192-5b4a-43e7-9a7a-62fda8ee531e.png" 
            alt="Nike Air Force 1" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-text mb-6">
              FAIS LA<br />
              DIFFÉRENCE.<br />
              <span className="text-gold">MARQUE TON STYLE.</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-lg">
              Des sneakers iconiques customisées pour ceux qui veulent se démarquer.
            </p>
            
            <Link 
              to="/boutique" 
              className="btn btn-gold px-8 py-4 text-base flex items-center gap-2 group"
            >
              Découvre la collection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Notre Collection</h2>
          
          {products.map((product, index) => (
            <FeaturedProduct key={product.id} product={product} index={index} />
          ))}
          
          <div className="text-center mt-16">
            <Link to="/boutique" className="btn btn-primary px-8 py-3 text-base">
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Instagram Gallery */}
      <InstagramSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à affirmer ton style ?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Des sneakers iconiques, un style unique, une qualité premium. C'est le moment de faire la différence.
          </p>
          <Link 
            to="/boutique" 
            className="btn btn-gold px-8 py-3 text-base inline-flex items-center gap-2 group"
          >
            Shop maintenant
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
