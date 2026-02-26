import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import { LanguageProvider } from './contexts/LanguageContext';

// --- 1. DADOS DOS PROJETOS (Com o seu GitHub rpjicond) ---
const projectsData = [
  {
    title: "IoT Architecture",
    description: "Uma arquitetura completa de Internet of Things. Utiliza concentradores ESP32 e Raspberry Pi para colher dados de dezenas de sensores em tempo real, enviados via MQTT para um backend centralizado em Spring Boot.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/iot-architecture" // Altere o nome do repo se necessário
  },
  {
    title: "Réseau d'Entreprise",
    description: "Design e simulação de uma infraestrutura de rede corporativa avançada. Inclui configuração de firewalls de borda (Edge), zona DMZ para serviços expostos e segmentação rigorosa de utilizadores e servidores via VLANs.",
    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/enterprise-network"
  },
  {
    title: "Smart City",
    description: "Conceito de cidade inteligente interligada. Múltiplos nós espalhados pela cidade enviam dados de tráfego, qualidade do ar e energia para um Data Lake central para análise preditiva.",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/smart-city"
  },
  {
    title: "Industrial Automation",
    description: "Simulação de uma linha de montagem industrial com braços robóticos e esteiras automatizadas, todas controladas e monitorizadas por um Master PLC e painel SCADA de supervisão.",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/industrial-automation"
  },
  {
    title: "Data Center",
    description: "Arquitetura de racks de servidores de alta disponibilidade interligados por um Core Gateway de altíssima velocidade, focado em redundância e balanceamento de carga.",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/data-center"
  },
  {
    title: "School Microservices",
    description: "Backend moderno distribuído em microsserviços para gestão escolar. Utiliza um API Gateway em Spring Cloud para rotear chamadas aos serviços de Autenticação, Alunos e Cursos.",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/school-microservices"
  },
  {
    title: "Analytics Stack",
    description: "Pipeline completo de análise de dados em tempo real. Os dados passam pelo Node-RED, são armazenados de forma eficiente no InfluxDB (TimeSeries) e visualizados em painéis Grafana.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/analytics-stack"
  }
];

// --- 2. COMPONENTE DO MODAL ---
function ProjectModal({ scenario, isOpen, onClose }: { scenario: number, isOpen: boolean, onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [scenario, isOpen]);

  if (!isOpen || scenario < 0 || scenario >= projectsData.length) return null;

  const project = projectsData[scenario];

  const nextImage = () => setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300 pointer-events-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200">

        {/* Botão Fechar Modal */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Lado Esquerdo: SLIDER DE IMAGENS */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-slate-100 flex-shrink-0 group">
          <img
            src={project.images[currentImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition opacity-0 group-hover:opacity-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition opacity-0 group-hover:opacity-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>

        {/* Lado Direito: CONTEÚDO (Texto + Botão do Git) */}
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
              Projeto {scenario + 1}
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{project.title}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full gap-3 bg-[#24292F] hover:bg-[#0f1113] text-white px-6 py-4 rounded-xl font-medium transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Ver Código no GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 3. APP PRINCIPAL ---
export default function App() {
  const [scenario, setScenario] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // IMPORTANTE: Pausa a rotação de cenário se o Modal estiver aberto!
    if (isModalOpen) return;

    const interval = setInterval(() => {
      // Atualizado para usar o tamanho do array de projetos dinamicamente (7 cenários)
      setScenario((prev) => (prev + 1) % projectsData.length);
    }, 10000); // Muda de cenário a cada 10 segundos

    return () => clearInterval(interval);
  }, [isModalOpen]); // Adicionamos isModalOpen como dependência para recriar o intervalo

  return (
    <LanguageProvider>
      <div className="relative w-full h-screen bg-[#050505] overflow-hidden">

        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Suspense fallback={null}>
              <Scene scenario={scenario} />
            </Suspense>
          </Canvas>
        </div>

        {/* UI Overlay - O seu Overlay original mantido e protegido */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Adicionamos a div wrapper com pointer-events-none para que os cliques
              possam "atravessar" e atingir o botão flutuante e o Canvas */}
          <Overlay scenario={scenario} setScenario={setScenario} />
        </div>

        {/* Botão Flutuante (Por cima de tudo exceto do Modal) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 z-40 flex items-center gap-3 bg-white text-slate-800 px-6 py-4 rounded-full font-bold shadow-2xl transition transform hover:scale-105 border border-slate-100 hover:border-blue-200 hover:text-blue-600 pointer-events-auto"
        >
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Explicar este Projeto</span>
        </button>

        {/* Modal Overlay */}
        <ProjectModal
          scenario={scenario}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

      </div>
    </LanguageProvider>
  );
}