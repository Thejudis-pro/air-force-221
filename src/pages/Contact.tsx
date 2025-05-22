import { useState, FormEvent } from 'react';
import { Instagram, Twitter, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from "@/components/ui/sonner";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Message envoyé avec succès!");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };
  return <>
      <Header />
      
      {/* Contact Hero Section */}
      <section className="pt-28 pb-16 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contactez-nous</h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Une question, une suggestion ou besoin d'aide ? Notre équipe est là pour vous répondre.
          </p>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent" placeholder="Votre nom" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent" placeholder="votre@email.com" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <select id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="question">Question sur un produit</option>
                    <option value="order">Suivi de commande</option>
                    <option value="return">Retour produit</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent" placeholder="Votre message..." />
                </div>
                
                <button type="submit" disabled={isSubmitting} className={`btn btn-primary px-6 py-3 w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h3 className="text-lg font-semibold mb-4">Nos coordonnées</h3>
                
                <div className="space-y-4">
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@airforceone.com</span>
                  </p>
                  
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+221 12 123 12 12</span>
                  </p>
                  
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Lun-Ven: 9h à 18h<br />
                      Sam: 10h à 16h
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
                
                <div className="space-y-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white rounded-md hover:bg-gold hover:text-white transition-colors">
                    <Instagram className="h-6 w-6 mr-3" />
                    <span className="font-medium">Instagram</span>
                  </a>
                  
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white rounded-md hover:bg-gold hover:text-white transition-colors">
                    <Twitter className="h-6 w-6 mr-3" />
                    <span className="font-medium">Twitter</span>
                  </a>
                  
                  <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white rounded-md hover:bg-green-500 hover:text-white transition-colors">
                    <Phone className="h-6 w-6 mr-3" />
                    <span className="font-medium">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Comment suivre ma commande ?</h3>
              <p className="text-gray-600">Vous recevrez un email de confirmation avec un numéro de suivi une fois votre colis expédié. </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Quels sont les délais de livraison ?</h3>
              <p className="text-gray-600">Nous expédions toutes les commandes sous 24h (jours ouvrés). </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Comment faire un retour ?</h3>
              <p className="text-gray-600">
                Vous disposez de 14 jours pour nous retourner un article. Contactez-nous par email pour initier le processus de retour et nous vous enverrons une étiquette prépayée.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Les chaussures sont-elles authentiques ?</h3>
              <p className="text-gray-600">
                Oui, tous nos produits sont 100% authentiques. Nous collaborons uniquement avec des fournisseurs agréés pour vous garantir des produits de qualité.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>;
};
export default Contact;