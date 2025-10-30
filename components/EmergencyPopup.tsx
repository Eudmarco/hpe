import React, { useState, useEffect } from 'react';

interface EmergencyPopupProps {
  isVisible: boolean;
  onClose: () => void;
  phoneNumber: string;
}

const EmergencyPopup: React.FC<EmergencyPopupProps> = ({ isVisible, onClose, phoneNumber }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Define mobile breakpoint (e.g., 768px, common for md in Tailwind)
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile(); // Initial check
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  if (!isVisible) return null;

  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  const whatsappLink = `https://wa.me/55${cleanPhoneNumber}?text=Ol%C3%A1!%20Gostaria%20de%20atendimento%20de%20emerg%C3%AAncia%20el%C3%A9trica.`;
  const callLink = `tel:${cleanPhoneNumber}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm mx-auto text-center relative
                  transform transition-transform duration-300 ease-out scale-100 animate-fade-in-scale">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
          aria-label="Fechar"
        >
          &times;
        </button>
        <h3 className="text-3xl font-bold text-[#FF8000] mb-4">Emergência Elétrica?</h3>
        <p className="text-lg text-gray-800 mb-6">
          Precisa de atendimento urgente? {isMobile ? 'Ligue agora' : 'Chame no WhatsApp'}!
        </p>
        <a
          href={isMobile ? callLink : whatsappLink}
          className="inline-block bg-[#FF8000] hover:bg-[#CC6600] text-white font-bold py-3 px-8 rounded-full text-xl
                     transition duration-300 transform hover:scale-105 shadow-md"
          target={isMobile ? '_self' : '_blank'} // Open WhatsApp in a new tab
          rel={isMobile ? '' : 'noopener noreferrer'}
        >
          {isMobile ? (
            <>
              <i className="fas fa-phone-alt mr-3"></i> Ligar Agora
            </>
          ) : (
            <>
              <i className="fab fa-whatsapp mr-3"></i> Chamar no WhatsApp
            </>
          )}
        </a>
      </div>
    </div>
  );
};

export default EmergencyPopup;