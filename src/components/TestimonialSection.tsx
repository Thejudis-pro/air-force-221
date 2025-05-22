
import { testimonials } from '@/data/products';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Ce que nos clients disent</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card flex flex-col h-full"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    fill={i < testimonial.rating ? "#D4AF37" : "none"} 
                    stroke={i < testimonial.rating ? "#D4AF37" : "#D1D5DB"}
                    className="h-4 w-4"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 flex-grow">{testimonial.text}</p>
              <div className="font-medium">{testimonial.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
