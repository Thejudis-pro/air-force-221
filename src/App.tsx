
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

// Pages
import Index from "./pages/Index";
import Boutique from "./pages/Boutique";
import ProductDetail from "./pages/ProductDetail";
import DedicatedProductPage from "./pages/DedicatedProductPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Helmet>
          <title>AirForce 221 | Sneakers Air Force 1 Classiques et Custom</title>
          <meta name="description" content="Découvrez notre collection de sneakers Air Force 1 classiques et personnalisées. Livraison rapide, qualité premium." />
        </Helmet>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/produit/:productId" element={<ProductDetail />} />
              <Route path="/produits/:productSlug" element={<DedicatedProductPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/merci" element={<ThankYou />} />
              <Route path="/commande-confirmee" element={<Navigate to="/merci" replace />} />
              
              {/* Routes de redirection SEO-friendly */}
              <Route path="/air-force-1-blanche" element={<Navigate to="/produits/air-force-1-blanche" replace />} />
              <Route path="/air-force-1-noire" element={<Navigate to="/produits/air-force-1-noire" replace />} />
              <Route path="/air-force-1-blanche-custom" element={<Navigate to="/produits/air-force-1-blanche-custom-corde" replace />} />
              <Route path="/air-force-1-noire-custom" element={<Navigate to="/produits/air-force-1-noire-custom-corde" replace />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
