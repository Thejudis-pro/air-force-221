import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <Header />
      
      {/* About Hero Section */}
      <section className="pt-28 pb-16 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Notre Histoire</h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Passionnés de sneakers et de culture urbaine, nous créons des produits stylés, accessibles, pour tous les amateurs d'Air Force 1.
          </p>
        </div>
      </section>
      
      {/* Brand Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Passion</h2>
              <div className="prose prose-lg">
                <p>
                  Tout a commencé par une passion commune pour les sneakers, et plus particulièrement pour un modèle qui a révolutionné la culture urbaine : la Nike Air Force 1.
                </p>
                <p>
                  En 2020, nous avons décidé de transformer cette passion en projet. Notre ambition ? Proposer non seulement ces chaussures iconiques dans leur version classique, mais aussi créer des éditions personnalisées avec un souci du détail qui fait toute la différence.
                </p>
                <p>
                  Nous croyons fermement qu'une paire de sneakers n'est pas qu'un simple accessoire de mode. C'est une expression de soi, un marqueur culturel, et parfois même une déclaration. C'est cette philosophie qui nous guide dans notre travail quotidien.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/images/about-image-1.webp" 
                  alt="Notre passion pour les sneakers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold/20 rounded-lg -z-10"></div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-black/10 rounded-lg -z-10"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-24">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/images/about-image-2.webp" 
                  alt="Notre approche" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/20 rounded-lg -z-10"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-black/10 rounded-lg -z-10"></div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Notre Approche</h2>
              <div className="prose prose-lg">
                <p>
                  Nous sélectionnons uniquement des produits de première qualité, avec une attention particulière aux matériaux et à la finition. Que ce soit pour les modèles standards ou nos versions customs avec des lacets style corde, chaque paire est minutieusement inspectée.
                </p>
                <p>
                  Notre mission est de rendre ces chaussures iconiques accessibles tout en proposant une expérience d'achat simple et agréable. Nous souhaitons que chaque client trouve chaussure à son pied, au propre comme au figuré !
                </p>
                <p>
                  Aujourd'hui, notre petite entreprise continue de grandir, mais notre philosophie reste la même : passion, qualité et authenticité. Nous sommes fiers de chaque paire que nous vendons et de la communauté que nous construisons autour de notre marque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Nos Valeurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Authenticité</h3>
              <p className="text-gray-300">
                Nous restons fidèles à notre passion et à notre vision. Pas de compromis sur la qualité ou le service client.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-300">
                Nous cherchons constamment à nous réinventer tout en respectant le design classique qui a fait le succès des AF1.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Communauté</h3>
              <p className="text-gray-300">
                Nous créons plus qu'une marque, nous bâtissons une communauté de passionnés qui partagent notre amour pour la culture sneaker.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoins la communauté</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tu partages notre passion ? Découvre notre collection et fais partie de l'aventure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary px-6 py-3">
              Suis-nous sur Instagram
            </a>
            <a href="/boutique" className="btn btn-primary px-6 py-3">
              Voir la collection
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
