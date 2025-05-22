// EmailJS implementation using the provided credentials

import emailjs from '@emailjs/browser';
import { CartItem } from "@/contexts/CartContext";

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

interface OrderData {
  orderNumber: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
}

// EmailJS credentials
const EMAIL_SERVICE_ID = "service_8qbo8gk";
const EMAIL_TEMPLATE_ID = "template_cvz40cl";
const EMAIL_PUBLIC_KEY = "RRGU2JfdURI9HROs3";

// Adresse email du propriétaire du site
const OWNER_EMAIL = "judismetognon2@gmail.com";

/**
 * Envoie un email de confirmation de commande au propriétaire du site
 * 
 * @param orderData Les données de la commande
 * @returns Une promesse qui se résout lorsque l'email est envoyé
 */
export const sendOrderConfirmationEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    console.log("Tentative d'envoi d'email avec les paramètres:", {
      service_id: EMAIL_SERVICE_ID,
      template_id: EMAIL_TEMPLATE_ID,
      user_id: EMAIL_PUBLIC_KEY,
      recipient: OWNER_EMAIL
    });
    
    // Important: EmailJS v3 utilise la propriété "to_name" pour le destinataire
    // et a besoin des propriétés spécifiques selon le template
    const templateParams = {
      order_number: orderData.orderNumber,
      customer_name: orderData.customer.fullName,
      customer_email: orderData.customer.email,
      customer_phone: orderData.customer.phone,
      customer_address: `${orderData.customer.address}, ${orderData.customer.postalCode} ${orderData.customer.city}, ${orderData.customer.country}`,
      customer_notes: orderData.customer.notes || "Aucune note",
      order_items: formatOrderItems(orderData.items),
      order_total: orderData.total.toFixed(2) + " €",
      to_name: "Administrateur", // Nom du destinataire (à adapter selon votre template)
      to_email: OWNER_EMAIL,
      // Utilise la syntaxe correcte pour le destinataire dans EmailJS
      reply_to: orderData.customer.email
    };
    
    console.log("Paramètres du template:", templateParams);
    
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams,
      EMAIL_PUBLIC_KEY
    );
    
    console.log("Email envoyé avec succès:", response);
    return response.status === 200;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return false;
  }
};

/**
 * Formate le corps de l'email avec les détails de la commande
 */
const formatEmailBody = (orderData: OrderData): string => {
  const { customer, items, orderNumber, total } = orderData;
  
  const itemsDescription = items.map(item => 
    `Produit : ${item.product.name} – Taille: ${item.size} – Quantité : ${item.quantity} – Prix : ${(item.product.price * item.quantity).toFixed(2)} €`
  ).join('\n');
  
  return `
Une nouvelle commande vient d'être passée :

Commande n° ${orderNumber}
Client : ${customer.fullName}
Email : ${customer.email}
Téléphone : ${customer.phone}
Adresse : ${customer.address}, ${customer.postalCode} ${customer.city}, ${customer.country}

${itemsDescription}

Total : ${total.toFixed(2)} €

${customer.notes ? `Message client : ${customer.notes}` : 'Aucun message du client'}

Préparez la commande dès que possible. 🙌
  `;
};

/**
 * Formate les articles de la commande pour l'email
 */
const formatOrderItems = (items: CartItem[]): string => {
  return items.map(item => 
    `${item.product.name} - Taille ${item.size} - Qté: ${item.quantity} - ${(item.product.price * item.quantity).toFixed(2)} €`
  ).join(', ');
};

// Export the CustomerInfo type so it can be used in other files
export type { CustomerInfo, OrderData };
