import React, { useRef, useEffect, useState } from 'react';

interface AboutProps {
  title: string;
  description: string;
  imageUrl: string;
}

const About: React.FC<AboutProps> = ({ title, description, imageUrl }) => {
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
      id="about"
      ref={sectionRef}
      className={`py-16 bg-gray-100
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img
            src={imageUrl}
            alt="Eletricista da HPE realizando instalação elétrica."
            className="rounded-lg shadow-xl w-full h-auto object-cover"
          />
        </div>
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-[#00345E] mb-6">{title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;