
import { instagramPosts } from '@/data/products';
import { Instagram } from 'lucide-react';

const InstagramSection = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Instagram className="h-6 w-6" />
          <h2 className="text-3xl md:text-4xl font-bold">Vu sur Instagram</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              key={post.id} 
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img 
                src={post.image} 
                alt={`Instagram post by ${post.username}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {post.username}
                </span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary px-6 py-2 inline-flex items-center gap-2"
          >
            <Instagram className="h-4 w-4" />
            Suivez-nous sur Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
