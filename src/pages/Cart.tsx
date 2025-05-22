
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MinusCircle, PlusCircle, X, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { sendOrderConfirmationEmail } from '@/utils/emailService';

// Schéma de validation pour le formulaire client
const customerFormSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez saisir une adresse email valide" }),
  phone: z.string().min(8, { message: "Veuillez saisir un numéro de téléphone valide" }),
  address: z.string().min(5, { message: "Veuillez saisir une adresse complète" }),
  city: z.string().min(2, { message: "Veuillez saisir une ville valide" }),
  postalCode: z.string().min(3, { message: "Veuillez saisir un code postal valide" }),
  country: z.string().min(2, { message: "Veuillez saisir un pays valide" }),
  notes: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      notes: "",
    },
  });
  
  const handleRemoveItem = (productId: string, size: number) => {
    removeFromCart(productId, size);
  };
  
  const handleQuantityChange = (productId: string, size: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, size, newQuantity);
    }
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Panier vide",
        description: "Veuillez ajouter des articles à votre panier avant de passer commande.",
        variant: "destructive",
      });
      return;
    }
    
    setShowCustomerForm(true);
  };
  
  const onSubmitCustomerForm = async (data: CustomerFormValues) => {
    setIsCheckingOut(true);
    
    try {
      // Générer un numéro de commande
      const orderNumber = `AF${Math.floor(1000 + Math.random() * 9000)}`;
      const totalPrice = subtotal >= 100 ? subtotal : subtotal + 4.99;
      
      // Créer les données de la commande
      const orderData = {
        orderNumber,
        customer: data,
        items: cartItems,
        total: totalPrice,
        date: new Date().toISOString(),
      };
      
      // Envoyer l'email au propriétaire
      const emailSent = await sendOrderConfirmationEmail({
        orderNumber,
        customer: data,
        items: cartItems,
        total: totalPrice
      });
      
      if (emailSent) {
        // Stocker les données de commande dans le localStorage pour la page de confirmation
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        // Afficher un toast de succès
        toast({
          title: "Commande validée",
          description: "Votre commande a été enregistrée avec succès.",
        });
        
        // Vider le panier
        clearCart();
        
        // Rediriger vers la page de confirmation
        navigate('/merci');
      } else {
        throw new Error("Échec de l'envoi de l'email");
      }
    } catch (error) {
      console.error('Erreur lors de la finalisation de la commande:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la validation de votre commande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Panier | AirForce 221</title>
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
                <Button>Voir les produits</Button>
              </Link>
            </div>
          ) : showCustomerForm ? (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Informations de livraison</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitCustomerForm)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro de téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="+221 77 123 45 67" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="24 Rue des Palmiers" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ville</FormLabel>
                          <FormControl>
                            <Input placeholder="Dakar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code postal</FormLabel>
                          <FormControl>
                            <Input placeholder="10000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <Input placeholder="Sénégal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes pour la livraison (optionnel)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Instructions spéciales pour la livraison..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowCustomerForm(false)}
                      className="flex-1"
                    >
                      Retour au panier
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isCheckingOut} 
                      className="flex-1"
                    >
                      {isCheckingOut ? (
                        <>Traitement en cours...</>
                      ) : (
                        <>
                          Finaliser la commande
                          <Check className="ml-2" size={18} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
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
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full"
                    disabled={cartItems.length === 0}
                  >
                    <span>Passer à la commande</span>
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                  
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
