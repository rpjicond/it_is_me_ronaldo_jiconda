import React, { useState, useEffect } from 'react';

// --- DADOS EXATOS DOS SEUS PROJETOS (Conforme a Imagem) ---
const portfolioProjects = [
    {
        id: 0,
        title: "Station Météo LoRaWAN",
        description: "Station météorologique autonome alimentée par énergie solaire, transmettant des données via LoRaWAN sur 15 km.",
        tags: ["ESP32", "LoRaWAN", "C++", "Solar"],
        images: [
            "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
        ],
        github: "https://github.com/rpjicond/station-meteo",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
        )
    },
    {
        id: 1,
        title: "Passerelle Edge Industrielle",
        description: "Passerelle basée sur Raspberry Pi collectant des données Modbus de PLC et les transmettant de manière sécurisée au cloud.",
        tags: ["Raspberry Pi", "Python", "Docker", "Modbus"],
        images: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80"
        ],
        github: "https://github.com/rpjicond/edge-gateway",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
        )
    },
    {
        id: 2,
        title: "Tracker BLE Wearable",
        description: "Dispositif portable basse consommation pour le suivi des actifs en intérieur utilisant des balises BLE et FreeRTOS.",
        tags: ["nRF52840", "BLE", "KiCad", "FreeRTOS"],
        images: [
            "https://images.unsplash.com/photo-1572294121516-3e0544521715?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
        ],
        github: "https://github.com/rpjicond/ble-tracker",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
        )
    }
];

// --- COMPONENTE DO MODAL REAPROVEITADO PARA ESTES DADOS ---
function ProjectModal({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [project, isOpen]);

    if (!isOpen || !project) return null;

    const nextImage = () => setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
    const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300 pointer-events-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200">

                {/* Botão Fechar */}
                <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Slider de Imagens */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-slate-100 flex-shrink-0 group">
                    <img src={project.images[currentImageIndex]} alt={project.title} className="w-full h-full object-cover transition-opacity duration-300" />
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition opacity-0 group-hover:opacity-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition opacity-0 group-hover:opacity-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {project.images.map((_: any, idx: number) => (
                            <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/80'}`} />
                        ))}
                    </div>
                </div>

                {/* Conteúdo Textual */}
                <div className="p-8 w-full md:w-1/2 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">{project.title}</h2>

                        {/* TAGS */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag: string) => (
                                <span key={tag} className="bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-slate-600 mb-8 leading-relaxed text-[15px]">
                            {project.description}
                        </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 mt-auto">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full gap-3 bg-[#111827] hover:bg-[#1f2937] text-white px-6 py-3 rounded-xl font-medium transition shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                            Voir sur GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SECÇÃO PRINCIPAL (IDÊNTICA À SUA IMAGEM) ---
export default function RecentProjects() {
    const [selectedProject, setSelectedProject] = useState<any>(null);

    return (
        <div className="w-full max-w-7xl mx-auto py-12 px-4 pointer-events-auto">

            {/* HEADER DA SECÇÃO */}
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">PROJETS RÉCENTS</h2>
                <a href="https://github.com/rpjicond" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#10b981] hover:text-[#059669] transition flex items-center gap-1 tracking-wider">
                    VIEW ALL ON GITHUB
                    <span className="text-lg leading-none">&rsaquo;</span>
                </a>
            </div>

            {/* GRID COM OS 3 CARTÕES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {portfolioProjects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer group h-full"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-[#ecfdf5] text-[#10b981] p-3 rounded-lg">
                                    {project.icon}
                                </div>
                                <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">{project.title}</h3>
                            <p className="text-[14px] text-slate-500 mb-6 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex gap-2 flex-wrap mt-auto">
                            {project.tags.map(tag => (
                                <span key={tag} className="border border-slate-200 text-slate-500 bg-transparent text-xs font-medium px-2.5 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* RENDERIZA O MODAL AQUI DENTRO QUANDO ALGUÉM CLICA NUM CARTÃO */}
            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            />

        </div>
    );
}