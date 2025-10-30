import React, { useRef, useEffect, useState } from 'react';

interface ServiceItem {
  icon: string; // Placeholder for icon, e.g., '💡' or '🛠️'
  title: string;
  description: string;
}

interface ServicesProps {
  services: ServiceItem[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after it's visible once
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`py-16 bg-gradient-to-br from-[#FF8000] to-[#CC6600] text-white
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white text-[#00345E] p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
            >
              <div className="text-5xl mb-4 text-[#FF8000]">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-base leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;