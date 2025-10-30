import React, { useRef, useEffect, useState } from 'react';

interface ContactProps {
  phoneNumbers: string[];
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const Contact: React.FC<ContactProps> = ({ phoneNumbers, email, address }) => {
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

  // Using a specific embed URL that doesn't require an explicit API key for basic embedding.
  // This URL targets the exact address with pre-set zoom and view.
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.0537233299713!2d-46.99480152482393!3d-22.698380879482186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8e7655077271b%3A0x6d1f05a9b70b5550!2sR.%20Joaquim%20Bueno%2C%20199%20-%20Pra%C3%A7a%20Santa%20Cruz%2C%20Jaguari%C3%BAna%20-%20SP%2C%2013910-022!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr";
  // The `v` parameter with a large number (e.g., 1700000000000) is a common way to avoid caching issues in some environments.

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-16 bg-[#FF8000] text-white
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">Entre em Contato</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Google Map Embed */}
          <div className="bg-gray-100 p-2 rounded-lg shadow-xl overflow-hidden h-96 lg:h-auto min-h-[300px]">
            <iframe
              title="Google Map of HPE Elétrica"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 rounded-lg"
              allowFullScreen
              aria-label="Localização da HPE Instalação e Manutenção Elétrica no Google Maps"
            ></iframe>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center lg:items-start text-white p-8 rounded-lg shadow-xl bg-[#004A81]">
            <h3 className="text-2xl font-semibold mb-6 text-white">Nossos Detalhes</h3>
            <div className="space-y-4 text-left">
              <p className="flex items-center text-lg">
                <i className="fas fa-phone-alt w-6 h-6 mr-3 text-[#FF8000]"></i>
                Telefones:
              </p>
              {phoneNumbers.map((phone, index) => (
                <a
                  key={index}
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className="block text-lg ml-9 hover:text-[#FF8000] transition duration-300"
                >
                  {phone}
                </a>
              ))}
              <p className="flex items-center text-lg">
                <i className="fas fa-envelope w-6 h-6 mr-3 text-[#FF8000]"></i>
                Email:
                <a href={`mailto:${email}`} className="ml-2 hover:text-[#FF8000] transition duration-300">
                  {email}
                </a>
              </p>
              <p className="flex items-center text-lg">
                <i className="fas fa-map-marker-alt w-6 h-6 mr-3 text-[#FF8000]"></i>
                Endereço:
                <span className="ml-2">
                  {address.street}, {address.city} - {address.state}, {address.zip}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;