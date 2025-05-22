
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { type CustomerInfo, type OrderData } from '@/utils/emailService';

interface OrderItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    isCustom: boolean;
  };
  quantity: number;
  size: number;
}

// Extend the OrderData interface if needed for any additional properties used in ThankYou.tsx
interface ExtendedOrderData extends OrderData {
  date: string;
}

const ThankYou = () => {
  const [orderData, setOrderData] = useState<ExtendedOrderData | null>(null);
  
  useEffect(() => {
    // Récupérer les données de commande du localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    }
  }, []);
  
  // Extraire le prénom du client
  const firstName = orderData?.customer.fullName.split(' ')[0] || '';
  
  if (!orderData) {
    return (
      <>
        <Helmet>
          <title>Merci pour votre commande | AirForce 221</title>
        </Helmet>
        <Header />
        <div className="pt-32 pb-20">
          <div className="container-custom">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🤔</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Aucune commande trouvée</h1>
              <p className="text-gray-600 mb-8">Nous n'avons pas pu trouver les détails de votre commande.</p>
              <Link to="/boutique">
                <Button>
                  <ArrowLeft className="mr-2" size={18} />
                  Retour à la boutique
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Merci pour votre commande | AirForce 221</title>
        <meta name="description" content="Votre commande a été confirmée. Merci pour votre achat sur AirForce 221." />
      </Helmet>
      
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <motion.div 
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* En-tête avec confettis */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white text-center relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-4xl mb-3">🎉</div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">Merci pour votre commande !</h1>
                <p className="text-xl opacity-90">Commande n° {orderData.orderNumber}</p>
              </div>
            </div>
            
            {/* Corps de la page */}
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Bonjour {firstName},</h2>
                <p className="text-gray-700">
                  Nous avons bien reçu votre commande. Un email récapitulatif a été envoyé à
                  <span className="font-medium"> {orderData.customer.email}</span>.
                </p>
              </div>
              
              {/* Récapitulatif de commande */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Package size={20} className="mr-2" />
                  Récapitulatif de votre commande
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-5 mb-5">
                  <div className="space-y-4">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">
                              Taille: {item.size} | Quantité: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          {(item.product.price * item.quantity)} FCFA
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{orderData.total} FCFA</span>
                    </div>
                  </div>
                </div>
                
                {/* Informations de livraison */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">Adresse de livraison</h4>
                    <p className="text-gray-700">{orderData.customer.fullName}</p>
                    <p className="text-gray-700">{orderData.customer.address}</p>
                    <p className="text-gray-700">
                      {orderData.customer.postalCode}, {orderData.customer.city}
                    </p>
                    <p className="text-gray-700">{orderData.customer.country}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Coordonnées</h4>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> {orderData.customer.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Téléphone:</span> {orderData.customer.phone}
                    </p>
                    {orderData.customer.notes && (
                      <>
                        <h4 className="font-bold mt-4 mb-2">Instructions spéciales</h4>
                        <p className="text-gray-700">{orderData.customer.notes}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Bouton de retour */}
              <div className="text-center mt-10">
                <Link to="/boutique">
                  <Button size="lg">
                    <ArrowLeft className="mr-2" size={18} />
                    Retour à la boutique
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ThankYou;
