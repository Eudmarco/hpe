import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EmergencyPopup from './components/EmergencyPopup'; // New import

const App: React.FC = () => {
  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'services', label: 'Serviços' },
    { id: 'about', label: 'Sobre Nós' },
    { id: 'contact', label: 'Contato' },
  ];

  const servicesList = [
    {
      icon: '💡', // Unicode lightning icon
      title: 'Instalações Elétricas',
      description: 'Projetos e instalações para residências, comércios e indústrias, garantindo segurança e eficiência energética.',
    },
    {
      icon: '🛠️', // Unicode wrench icon
      title: 'Manutenção Preventiva e Corretiva',
      description: 'Reparos, substituição de fiação, quadros de disjuntores e outros serviços para manter suas instalações em perfeito estado.',
    },
    {
      icon: '🏠', // Unicode house icon
      title: 'Automação Residencial',
      description: 'Soluções inteligentes para tornar sua casa mais confortável, segura e econômica, com controle de iluminação, tomadas e mais.',
    },
    {
      icon: '📄', // Unicode document icon
      title: 'Laudos e ART',
      description: 'Emissão de laudos técnicos elétricos e Anotação de Responsabilidade Técnica (ART) para conformidade com normas regulatórias.',
    },
    {
      icon: '⚡', // Unicode high voltage sign
      title: 'Padrão de Entrada CPFL',
      description: 'Adequação e instalação de padrões de entrada de energia conforme as exigências da CPFL e outras concessionárias.',
    },
    {
      icon: '✨', // Unicode sparkles
      title: 'Iluminação LED',
      description: 'Projetos e instalação de sistemas de iluminação LED, otimizando o consumo de energia e valorizando seus ambientes.',
    },
  ];

  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/5519994984539', icon: 'fab fa-whatsapp' },
    { name: 'Instagram', url: 'https://instagram.com/hpeeletrica', icon: 'fab fa-instagram' },
    { name: 'Facebook', url: 'https://facebook.com/hpeeletrica', icon: 'fab fa-facebook-f' },
  ];

  const [showEmergencyPopup, setShowEmergencyPopup] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmergencyPopup(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const emergencyPhoneNumber = '(19) 99498-4539'; // Using the first number from contact details

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        logoSrc="https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/Fotos%20HPE/Logo%20HPE.webp"
        navItems={navItems}
      />
      <main className="flex-grow">
        <Hero
          title="HPE Instalação e Manutenção Elétrica"
          subtitle="Qualidade, segurança e eficiência em serviços elétricos para Jaguariúna e Região."
          ctaText="Solicite um Orçamento"
          ctaLink="https://wa.me/5519994984539?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20servi%C3%A7os%20el%C3%A9tricos."
          backgroundImage="https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/Fotos%20HPE/pexels-pok-rie-33563-157827.webp"
        />
        <Services services={servicesList} />
        <About
          title="Sobre a HPE Elétrica"
          description="A HPE Instalação e Manutenção Elétrica é uma empresa dedicada a oferecer soluções completas e seguras no setor elétrico. Com anos de experiência em Jaguariúna e região, atuamos em projetos residenciais, comerciais e industriais, sempre priorizando a qualidade, o cumprimento das normas técnicas e a satisfação total de nossos clientes. Nossa equipe é composta por profissionais qualificados e comprometidos com a excelência, utilizando materiais de primeira linha para garantir durabilidade e segurança em cada serviço prestado. Seja para uma nova instalação, uma manutenção complexa ou um projeto de automação, a HPE Elétrica é a sua parceira confiável."
          imageUrl="https://kjunynajewbtxqojxbok.supabase.co/storage/v1/object/public/Fotos%20HPE/pexels-pixabay-257736.webp"
        />
        <Contact
          phoneNumbers={['(19) 99498-4539', '(19) 99703-5247']}
          email="contato@hpeeletrica.com.br"
          address={{
            street: 'R. Joaquim Bueno, 199, Praça Santa Cruz',
            city: 'Jaguariúna',
            state: 'SP',
            zip: '13910-022',
          }}
        />
      </main>
      <Footer
        companyName="HPE Instalação e Manutenção Elétrica"
        socialLinks={socialLinks}
      />
      <EmergencyPopup
        isVisible={showEmergencyPopup}
        onClose={() => setShowEmergencyPopup(false)}
        phoneNumber={emergencyPhoneNumber}
      />
    </div>
  );
};

export default App;