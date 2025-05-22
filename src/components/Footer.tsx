
import { Link } from 'react-router-dom';
import { Instagram, TikTok, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">AIR<span className="text-gold">FORCE</span>ONE</h3>
            <p className="text-gray-400 mb-6">
              Sneakers premium et customs pour les passionnés de style urbain.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">
                <TikTok />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gold transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/boutique" className="text-gray-400 hover:text-gold transition-colors">Boutique</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-gold transition-colors">À propos</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:info@airforceone.com" className="flex items-center text-gray-400 hover:text-gold transition-colors">
                <Mail className="h-5 w-5 mr-2" />
                info@airforceone.com
              </a>
              <a href="tel:+33612345678" className="flex items-center text-gray-400 hover:text-gold transition-colors">
                <Phone className="h-5 w-5 mr-2" />
                +33 6 12 34 56 78
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} AIRFORCEONE - Tous droits réservés
            </p>
            <div className="flex space-x-6">
              <Link to="/cgv" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                CGV
              </Link>
              <Link to="/confidentialite" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
