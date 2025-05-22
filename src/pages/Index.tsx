
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
      <section className="relative h-auto min-h-[80vh] flex items-center overflow-hidden bg-black 
        pt-8 pb-8
        xs:pt-10 xs:pb-10
        sm:pt-14 sm:pb-12
        ">
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
            
            {/* Hero Image bien visible sur mobile */}
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
              className="flex justify-center items-center mt-8 md:mt-12"
            >
              <div className="relative w-full flex justify-center items-center">
                {/* Fond dégradé uniquement visible si utile */}
                <div
                  className="
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[95vw] h-[35vw] min-h-[120px] max-h-[180px]
                    rounded-full
                    bg-gradient-to-b from-gold/30 via-white/40 to-transparent
                    blur-lg
                    z-0
                    pointer-events-none
                  "
                  style={{
                    filter: 'blur(16px) opacity(0.5)'
                  }}
                />
                <img
                  alt="Nike Air Force 1"
                  src="/lovable-uploads/03983684-4b14-4dfb-a925-37a1aadb29e3.jpg"
                  className="
                    relative z-10
                    w-[90vw] xs:w-[92vw] sm:w-[85vw] md:w-full
                    max-w-[350px] xs:max-w-[380px] sm:max-w-[410px] md:max-w-[450px]
                    mx-auto
                    rounded-lg
                    object-contain
                    transition-transform duration-500
                    rotate-[-3deg] md:rotate-[0deg]
                    translate-y-0 md:translate-y-[30px]
                    hover:scale-[1.02]
                    shadow-xl
                    border border-white/60
                  "
                  style={{ boxShadow: '0 8px 44px 3px rgba(0,0,0,0.13)' }}
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
