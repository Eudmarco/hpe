import React, { useRef, useEffect, useState } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink, backgroundImage }) => {
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
      id="home"
      ref={sectionRef}
      className={`relative flex items-center justify-center h-screen bg-cover bg-center text-white
        transition-opacity duration-1000 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90">
          {subtitle}
        </p>
        <a
          href={ctaLink}
          className="inline-block bg-[#00345E] hover:bg-[#004A81] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

export default Hero;