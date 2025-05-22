
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/90 shadow-sm sticky-nav' : 'py-5 bg-transparent'}`}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-montserrat font-bold tracking-tight">
          AIR <span className="text-gold">FORCE</span> 221
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-gold transition-colors">
            ACCUEIL
          </Link>
          <Link to="/boutique" className="text-sm font-medium hover:text-gold transition-colors">
            BOUTIQUE
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-gold transition-colors">
            À PROPOS
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-gold transition-colors">
            CONTACT
          </Link>
          <Link to="/panier" className="relative">
            <ShoppingBag className="h-5 w-5 hover:text-gold transition-colors" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-gold text-white h-5 w-5 flex items-center justify-center rounded-full text-xs p-0">
                {totalItems}
              </Badge>
            )}
          </Link>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Link to="/panier" className="relative mr-4">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-gold text-white h-5 w-5 flex items-center justify-center rounded-full text-xs p-0">
                {totalItems}
              </Badge>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-20">
          <div className="container-custom flex flex-col space-y-6 py-8">
            <Link 
              to="/" 
              className="text-2xl font-medium hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ACCUEIL
            </Link>
            <Link 
              to="/boutique" 
              className="text-2xl font-medium hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              BOUTIQUE
            </Link>
            <Link 
              to="/about" 
              className="text-2xl font-medium hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              À PROPOS
            </Link>
            <Link 
              to="/contact" 
              className="text-2xl font-medium hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
