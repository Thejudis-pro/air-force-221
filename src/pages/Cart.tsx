
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MinusCircle, PlusCircle, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleRemoveItem = (productId: string, size: number) => {
    removeFromCart(productId, size);
  };
  
  const handleQuantityChange = (productId: string, size: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, size, newQuantity);
    }
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      // Navigate to thank you page or show success message
      alert('Commande passée avec succès !');
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Panier | AirSneak</title>
        <meta name="description" content="Validez votre panier et finalisez votre commande de sneakers Air Force 1." />
      </Helmet>
      
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-10">Votre Panier</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
              <p className="text-gray-600 mb-8">Parcourez notre boutique et ajoutez des articles à votre panier.</p>
              <Link to="/boutique" className="btn btn-primary">
                Voir les produits
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Cart Items */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left pb-4">Produit</th>
                        <th className="text-center pb-4">Taille</th>
                        <th className="text-center pb-4">Quantité</th>
                        <th className="text-right pb-4">Prix</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <motion.tr 
                          key={`${item.product.id}-${item.size}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="border-b"
                        >
                          <td className="py-4">
                            <div className="flex items-center">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-16 h-16 object-cover rounded mr-4"
                              />
                              <div>
                                <h3 className="font-medium">{item.product.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {item.product.isCustom ? "Édition custom" : "Édition standard"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            {item.size}
                          </td>
                          <td className="text-center">
                            <div className="flex items-center justify-center">
                              <button 
                                onClick={() => handleQuantityChange(item.product.id, item.size, item.quantity - 1)}
                                className="text-gray-500 hover:text-black"
                              >
                                <MinusCircle size={18} />
                              </button>
                              <span className="mx-3 w-6 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.product.id, item.size, item.quantity + 1)}
                                className="text-gray-500 hover:text-black"
                              >
                                <PlusCircle size={18} />
                              </button>
                            </div>
                          </td>
                          <td className="text-right font-medium">
                            {(item.product.price * item.quantity).toFixed(2)} €
                          </td>
                          <td className="text-right">
                            <button 
                              onClick={() => handleRemoveItem(item.product.id, item.size)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Cart Summary */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Livraison</span>
                      <span>{subtotal >= 100 ? 'Gratuite' : '4.99 €'}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{(subtotal >= 100 ? subtotal : subtotal + 4.99).toFixed(2)} €</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className={`btn w-full ${
                      isCheckingOut 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'btn-primary'
                    } flex items-center justify-center`}
                  >
                    {isCheckingOut ? (
                      <span>Traitement en cours...</span>
                    ) : (
                      <>
                        <span>Valider la commande</span>
                        <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    En validant votre commande, vous acceptez nos conditions générales de vente.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Cart;
