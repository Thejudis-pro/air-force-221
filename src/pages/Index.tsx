
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
  return <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-black">
        <div className="container-custom relative z-10 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <h1 className="hero-text mb-6">
                L'INCONTOURNABLE.<br />
                <span className="text-gold">REVISITÉ.</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 max-w-lg">
                Découvrez nos Air Force 1 classiques et modèles à lacets cordes — style unique, qualité premium, livrés partout au Sénégal.
              </p>
              
              <Link to="/boutique" className="btn btn-gold px-8 py-4 text-base flex items-center gap-2 group">
                Découvrir la collection
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{
                opacity: 0,
                x: 30
              }} 
              animate={{
                opacity: 1,
                x: 0
              }} 
              transition={{
                duration: 0.8,
                delay: 0.3
              }} 
              className="hidden md:flex justify-center items-center"
            >
              <div className="relative flex justify-center items-center mt-12">
                <img 
                  src="/lovable-uploads/7ab42e81-b240-43c1-83bc-01e450db79b4.png" 
                  alt="Nike Air Force 1" 
                  className="w-full max-w-[290px] object-contain" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Notre Collection</h2>
          
          {products.map((product, index) => <FeaturedProduct key={product.id} product={product} index={index} />)}
          
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
          <Link to="/boutique" className="btn btn-gold px-8 py-3 text-base inline-flex items-center gap-2 group">
            Shop maintenant
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      
      <Footer />
    </>;
};
export default Index;
