
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, MinusCircle, PlusCircle, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from "@/components/ui/sonner";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simuler le processus de paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Commande validée avec succès !");
    clearCart();
    setIsCheckingOut(false);
  };
  
  return (
    <>
      <Header />
      
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Votre Panier</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-6">Votre panier est vide</h2>
              <p className="text-gray-600 mb-8">Ajoutez des produits à votre panier pour commencer vos achats</p>
              <Link to="/boutique" className="btn btn-primary px-6 py-3">
                Parcourir la collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium">
                    <div className="col-span-2">Produit</div>
                    <div className="text-center">Prix</div>
                    <div className="text-center">Quantité</div>
                    <div className="text-end">Total</div>
                  </div>
                  
                  {cartItems.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="p-4 border-b border-gray-100 last:border-b-0">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        {/* Product */}
                        <div className="col-span-2 flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">Taille: {item.size}</p>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="text-red-500 text-sm flex items-center mt-2 hover:text-red-700 md:hidden"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="md:text-center">
                          <div className="md:hidden text-sm text-gray-500">Prix:</div>
                          {item.product.price.toFixed(2)} €
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:text-center">
                          <div className="md:hidden text-sm text-gray-500">Quantité:</div>
                          <div className="flex items-center md:justify-center">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className={`text-gray-500 hover:text-black transition-colors ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <MinusCircle className="h-5 w-5" />
                            </button>
                            <span className="mx-3 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="text-gray-500 hover:text-black transition-colors"
                            >
                              <PlusCircle className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="md:text-end flex items-center justify-between">
                          <div className="md:hidden text-sm text-gray-500">Total:</div>
                          <span className="font-medium">{(item.product.price * item.quantity).toFixed(2)} €</span>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-red-500 hover:text-red-700 hidden md:block"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-6">
                  <Link to="/boutique" className="btn btn-secondary inline-flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    Continuer les achats
                  </Link>
                  <button onClick={clearCart} className="btn btn-secondary text-red-600 hover:text-red-700">
                    Vider le panier
                  </button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">Résumé de la commande</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{cartTotal.toFixed(2)} €</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison</span>
                      <span>Gratuite</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-xl">{cartTotal.toFixed(2)} €</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || cartItems.length === 0}
                    className={`btn btn-primary w-full py-3 ${(isCheckingOut || cartItems.length === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isCheckingOut ? 'Traitement...' : 'Passer à la caisse'}
                  </button>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-sm text-gray-500">Paiement 100% sécurisé</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="text-sm text-gray-500">Livraison sous 24h</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                      </svg>
                      <span className="text-sm text-gray-500">Retour gratuit sous 14 jours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Cart;
