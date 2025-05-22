
// Cette implémentation est un exemple utilisant le service EmailJS
// Pour une utilisation réelle, vous devrez créer un compte sur emailjs.com
// et obtenir vos propres identifiants

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

/**
 * Envoie un email de confirmation de commande au propriétaire du site
 * 
 * @param orderData Les données de la commande
 * @returns Une promesse qui se résout lorsque l'email est envoyé
 */
export const sendOrderConfirmationEmail = async (orderData: OrderData): Promise<boolean> => {
  // Dans une implémentation réelle avec EmailJS, vous utiliseriez:
  // 
  // import emailjs from '@emailjs/browser';
  // 
  // const response = await emailjs.send(
  //   "YOUR_SERVICE_ID", // e.g., "service_abc123"
  //   "YOUR_TEMPLATE_ID", // e.g., "template_xyz456"
  //   {
  //     order_number: orderData.orderNumber,
  //     customer_name: orderData.customer.fullName,
  //     customer_email: orderData.customer.email,
  //     customer_phone: orderData.customer.phone,
  //     customer_address: `${orderData.customer.address}, ${orderData.customer.postalCode} ${orderData.customer.city}, ${orderData.customer.country}`,
  //     customer_notes: orderData.customer.notes || "Aucune note",
  //     order_items: formatOrderItems(orderData.items),
  //     order_total: orderData.total.toFixed(2) + " €",
  //   },
  //   "YOUR_USER_ID" // e.g., "user_aaa999"
  // );
  // 
  // return response.status === 200;
  
  // Pour le moment, nous simulons l'envoi d'email avec un délai
  return new Promise((resolve) => {
    console.log("Envoi d'email avec les données suivantes:", {
      to: "proprietaire@boutique.com",
      subject: `Nouvelle commande reçue – n° ${orderData.orderNumber}`,
      body: formatEmailBody(orderData),
    });
    
    // Simuler un délai d'envoi d'email
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
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
