export type Language = 'pt' | 'en' | 'fr';

export const translations = {
    pt: {
        nav: {
            about: 'SOBRE',
            stack: 'STACK',
            projects: 'PROJETOS',
            contact: 'CONTATO',
            system: 'SISTEMA ONLINE'
        },
        hero: {
            system_status: 'SISTEMAS ONLINE',
            role: 'Desenv. IoT Full Stack (Spring Boot), Embarcados & Redes.',
            sub: 'Concepção de soluções conectadas, do sensor ao cloud.',
            description: 'Licenciatura Profissional em Redes e Telecomunicações, percurso IoT e Mobile. Especialista em conectar o mundo físico ao digital através de arquiteturas robustas.',
            cta_projects: 'VER PROJETOS',
            cta_github: 'GITHUB',
            scroll: 'ROLE PARA INICIAR',
        },
        scenarios: [
            {
                title: 'Arquitetura IoT',
                description: 'Solução IoT de ponta a ponta com sensores LoRaWAN, nós mesh ESP32 e gateway Raspberry Pi comunicando com backend Spring Boot via MQTT/TLS.',
                tags: ['LoRaWAN', 'MQTT', 'Edge Computing', 'Spring Boot'],
            },
            {
                title: 'Rede Empresarial',
                description: 'Design de rede corporativa com redundância, firewalls, VLANs e roteamento dinâmico (OSPF/BGP).',
                tags: ['Cisco', 'VLAN', 'OSPF', 'BGP', 'Firewall'],
            },
            {
                title: 'Smart City',
                description: 'Rede mesh de sensores urbanos para monitoramento da qualidade do ar, tráfego e iluminação pública.',
                tags: ['Mesh', 'Smart City', 'Sensors', 'Data Analytics'],
            },
            {
                title: 'Automação Industrial',
                description: 'Fábrica integrada SCADA com PLCs controlando braços robóticos e esteiras, com controle de qualidade em tempo real.',
                tags: ['SCADA', 'Modbus', 'PLC', 'Industry 4.0'],
            },
            {
                title: 'Data Center',
                description: 'Arquitetura de data center de alta disponibilidade com switches core 100G e servidores em rack.',
                tags: ['100G', 'High Availability', 'Servers', 'Racks'],
            },
        ],
        stack: {
            title: 'STACK TÉCNICA',
            firmware: 'Desenv. Firmware (C/C++)',
            pcb: 'Design PCB (KiCad)',
            protocols: 'Protocolos IoT (MQTT, LoRa)',
            backend: 'Backend (Spring Boot/Java)',
            network: 'Redes & Sistemas (Linux, VLAN, Docker)',
            microcontrollers: 'Microcontroladores (ESP32/STM32)',
            connectivity: 'Conectividade',
            rtos: 'Sistemas Tempo Real (RTOS)',
            cloud: 'Cloud & Edge Computing',
            network_sec: 'Redes & Segurança',
            sysadmin: 'Admin. de Sistemas (Linux)'
        },
        projects: {
            title: 'PROJETOS RECENTES'
        },
        contact: {
            title: 'INICIAR CONEXÃO',
            desc: 'Pronto para colaborar em projetos IoT inovadores ou discutir oportunidades profissionais.',
            location: 'Baseado na França • Disponível para missões internacionais',
        },
        footer: '© 2026 Ronaldo Jiconda. Todos os direitos reservados.',
    },
    en: {
        nav: {
            about: 'ABOUT',
            stack: 'STACK',
            projects: 'PROJECTS',
            contact: 'CONTACT',
            system: 'SYSTEM ONLINE'
        },
        hero: {
            system_status: 'SYSTEMS ONLINE',
            role: 'Full Stack IoT (Spring Boot), Embedded & Network Eng.',
            sub: 'Designing connected solutions, from sensor to cloud.',
            description: 'Professional Degree in Networks and Telecoms, IoT and Mobile track. Specialist in connecting the physical world to the digital realm via robust architectures.',
            cta_projects: 'VIEW PROJECTS',
            cta_github: 'GITHUB',
            scroll: 'SCROLL TO INITIALIZE',
        },
        scenarios: [
            {
                title: 'IoT Architecture',
                description: 'End-to-end IoT solution including LoRaWAN sensor networks, ESP32 mesh nodes, and a Raspberry Pi Edge gateway communicating with a Spring Boot backend via MQTT/TLS.',
                tags: ['LoRaWAN', 'MQTT', 'Edge Computing', 'Spring Boot'],
            },
            {
                title: 'Enterprise Network',
                description: 'Enterprise network design with redundancy, firewalls, VLANs, and dynamic routing (OSPF/BGP).',
                tags: ['Cisco', 'VLAN', 'OSPF', 'BGP', 'Firewall'],
            },
            {
                title: 'Smart City',
                description: 'Mesh network of urban sensors for air quality, traffic, and street lighting monitoring.',
                tags: ['Mesh', 'Smart City', 'Sensors', 'Data Analytics'],
            },
            {
                title: 'Industrial Automation',
                description: 'SCADA integrated factory with PLCs controlling robotic arms and conveyors, featuring real-time quality control.',
                tags: ['SCADA', 'Modbus', 'PLC', 'Industry 4.0'],
            },
            {
                title: 'Data Center',
                description: 'High availability data center architecture with 100G core switches and rack servers.',
                tags: ['100G', 'High Availability', 'Servers', 'Racks'],
            },
        ],
        stack: {
            title: 'TECH STACK',
            firmware: 'Firmware Dev (C/C++)',
            pcb: 'PCB Design (KiCad)',
            protocols: 'IoT Protocols (MQTT, LoRa)',
            backend: 'Backend (Spring Boot/Java)',
            network: 'Networks & Systems (Linux, VLAN, Docker)',
            microcontrollers: 'Microcontrollers (ESP32/STM32)',
            connectivity: 'Connectivity',
            rtos: 'Real-Time Systems (RTOS)',
            cloud: 'Cloud & Edge Computing',
            network_sec: 'Network & Security',
            sysadmin: 'SysAdmin (Linux)'
        },
        projects: {
            title: 'RECENT PROJECTS'
        },
        contact: {
            title: 'INITIALIZE CONNECTION',
            desc: 'Ready to collaborate on innovative IoT projects or discuss professional opportunities.',
            location: 'Based in France • Available for international missions',
        },
        footer: '© 2026 Ronaldo Jiconda. All rights reserved.',
    },
    fr: {
        nav: {
            about: 'À PROPOS',
            stack: 'STACK',
            projects: 'PROJETS',
            contact: 'CONTACT',
            system: 'SYSTÈME EN LIGNE'
        },
        hero: {
            system_status: 'SYSTÈMES EN LIGNE',
            role: 'Dév. IoT Full Stack (Spring Boot), Embarqué & Réseaux.',
            sub: 'Conception de solutions connectées, du capteur au cloud.',
            description: 'Licence Professionnelle en Réseaux et Télécoms, parcours IoT et Mobile. Spécialiste de la connexion du monde physique au numérique via des architectures robustes.',
            cta_projects: 'VOIR PROJETS',
            cta_github: 'GITHUB',
            scroll: 'DÉFILER POUR INITIALISER',
        },
        scenarios: [
            {
                title: 'Architecture IoT',
                description: 'Solution IoT de bout en bout comprenant des réseaux de capteurs LoRaWAN, des nœuds maillés ESP32 et une passerelle Edge Raspberry Pi communiquant avec un backend Spring Boot via MQTT/TLS.',
                tags: ['LoRaWAN', 'MQTT', 'Edge Computing', 'Spring Boot'],
            },
            {
                title: 'Réseau d\'Entreprise',
                description: 'Conception de réseau d\'entreprise avec redondance, pare-feu, VLANs et routage dynamique (OSPF/BGP).',
                tags: ['Cisco', 'VLAN', 'OSPF', 'BGP', 'Firewall'],
            },
            {
                title: 'Smart City',
                description: 'Réseau maillé de capteurs urbains pour la surveillance de la qualité de l\'air, du trafic et de l\'éclairage public.',
                tags: ['Mesh', 'Smart City', 'Sensors', 'Data Analytics'],
            },
            {
                title: 'Automatisation Industrielle',
                description: 'Usine intégrée SCADA avec des automates contrôlant des bras robotiques et des convoyeurs, avec contrôle qualité en temps réel.',
                tags: ['SCADA', 'Modbus', 'PLC', 'Industry 4.0'],
            },
            {
                title: 'Data Center',
                description: 'Architecture de centre de données haute disponibilité avec commutateurs centraux 100G et serveurs rackables.',
                tags: ['100G', 'High Availability', 'Servers', 'Racks'],
            },
        ],
        stack: {
            title: 'STACK TECHNIQUE',
            firmware: 'Dév. Firmware (C/C++)',
            pcb: 'Conception PCB (KiCad)',
            protocols: 'Protocoles IoT (MQTT, LoRa)',
            backend: 'Backend (Spring Boot/Java)',
            network: 'Réseaux & Systèmes (Linux, VLAN, Docker)',
            microcontrollers: 'Microcontrôleurs (ESP32/STM32)',
            connectivity: 'Connectivité',
            rtos: 'Systèmes Temps Réel (RTOS)',
            cloud: 'Cloud & Edge Computing',
            network_sec: 'Réseau & Sécurité',
            sysadmin: 'Admin. Système (Linux)'
        },
        projects: {
            title: 'PROJETS RÉCENTS'
        },
        contact: {
            title: 'INITIALISER LA CONNEXION',
            desc: 'Prêt à collaborer sur des projets IoT innovants ou à discuter d\'opportunités professionnelles.',
            location: 'Basé en France • Disponible pour des missions internationales',
        },
        footer: '© 2026 Ronaldo Jiconda. Tous droits réservés.',
    },
};