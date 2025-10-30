import React, { useRef, useEffect, useState } from 'react';

interface FooterProps {
  companyName: string;
  socialLinks: { name: string; url: string; icon: string }[];
}

const Footer: React.FC<FooterProps> = ({ companyName, socialLinks }) => {
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
    <footer
      ref={sectionRef}
      className={`bg-[#00284A] text-white py-8
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg mb-4">
          &copy; {new Date().getFullYear()} {companyName}. Todos os direitos reservados.
        </p>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF8000] transition duration-300 transform hover:scale-110"
              aria-label={link.name}
            >
              <i className={`${link.icon} text-3xl`}></i> {/* Assuming Font Awesome or similar */}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;