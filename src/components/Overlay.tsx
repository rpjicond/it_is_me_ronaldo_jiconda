import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Wifi, Server, Layers, Github, Linkedin, Mail, Globe, ChevronRight, ExternalLink, Network, Terminal, Activity, Lock, X, ChevronLeft, Home, Database, Map, HeartPulse, Satellite, Shield, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../translations';

// --- DADOS DOS PROJETOS ---
const portfolioProjects = [
  {
    id: 0,
    title: "Déploiement Infrastructure Réseau (WorldSkills)",
    description: "Déploiement complet d'une infrastructure multi-sites (HQ, Remote, Internet) avec backbone Cisco, VRF, OSPF/BGP et virtualisation hybride (ESXi/Proxmox).",
    fullDescription: "Projet SAE inspiré des épreuves WorldSkills France (Administration Systèmes et Réseaux). L'objectif était de déployer, configurer et valider une infrastructure d'entreprise réaliste soumise à des contraintes professionnelles. En tant que responsable du backbone réseau, j'ai implémenté un plan d'adressage complexe, le routage interne/externe (OSPF/BGP) et l'isolation stricte des flux via VRF. L'infrastructure intègre une couche de virtualisation hybride (VMware ESXi pour le siège, Proxmox VE pour les services Internet/Distants) et une gestion automatisée des équipements via des playbooks Ansible.",
    features: [
      "Déploiement Backbone Cisco avec routage avancé (OSPF, BGP) et segmentation par VRF.",
      "Mise en place d'une virtualisation hybride : Cluster VMware ESXi (Siège) et Proxmox VE (Datacenter/Remote).",
      "Configuration des services de connectivité : NAT/PAT pour l'accès Internet et tunnels VPN.",
      "Automatisation de la configuration et du monitoring des équipements réseau avec Ansible."
    ],
    tags: ["Cisco", "Ansible", "BGP/OSPF", "VRF", "ESXi / Proxmox"],
    images: [
      "assets/worldskills/001.png"
    ],
    github: "https://github.com/rpjicond/sae-worldskills-network-backbone",
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 1,
    title: "Design d'Architecture Réseau Haute Disponibilité",
    description: "Conception et simulation d'une infrastructure réseau d'entreprise multi-sites avec redondance WAN, pare-feu HA et DMZ Zero-Trust.",
    fullDescription: "Conception avancée d'une architecture réseau d'entreprise complète (Campus et Datacenter) axée sur la haute disponibilité et la sécurité. L'infrastructure est connectée à de multiples FAI (Orange, SFR, Bouygues) pour assurer une redondance WAN. La topologie suit le modèle hiérarchique classique (Core, Distribution, Accès) avec une forte résilience via l'agrégation de liens (LACP/PAgP). Une politique de sécurité stricte est appliquée avec une ségrégation poussée par VLANs (Utilisateurs, VoIP, Invités, Serveurs, Admin), une zone DMZ isolée (Zero-Trust) pour les services front-end, et l'intégration de vSwitches pour l'environnement de virtualisation.",
    features: [
      "Topologie hiérarchique redondante avec Core/Distribution/Access et agrégation de liens (LACP/PAgP).",
      "Redondance WAN multi-ISP (AS100, AS200, AS300) et cluster de pare-feu en bordure (FW-EDGE HA).",
      "Segmentation réseau avancée (VLAN 802.1Q) isolant trafic corporatif, VoIP, gestion et Datacenter.",
      "Sécurisation des accès (Port-Security, DHCP Snooping) et implémentation d'une DMZ stricte avec approche Zero-Trust."
    ],
    tags: ["Network Design", "VLAN / LACP", "Firewall HA", "Zero-Trust", "Enterprise"],
    images: [
      "assets/enterprise-network/001.png"
    ],
    github: "https://github.com/rpjicond/labs-CISCO-CCNA-CCNP/blob/main/Lab%20d'Infrastructure%20R%C3%A9seaux/README.md",
    icon: <Network className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Infrastructure IAM & Sécurité Réseau (Nexus)",
    description: "Architecture Linux sécurisée avec pare-feu (Iptables), Proxy filtrant (Squid), annuaire LDAP et outils CLI sur mesure.",
    fullDescription: "Conception et déploiement de 'Toulouse Identity Nexus', une infrastructure réseau d'entreprise sécurisée virtualisée sous Debian 12. Le système est segmenté en trois serveurs clés : une passerelle (Gateway) gérant le routage et le NAT via Iptables, un serveur d'authentification centralisé (OpenLDAP), et un serveur Proxy (Squid). L'accès à Internet depuis le réseau local nécessite une authentification LDAP stricte, avec un filtrage granulaire des domaines (ex: blocage systématique des réseaux sociaux). Pour faciliter l'administration, j'ai développé des interfaces CLI interactives ('Nexus Sentry' et 'Identity Nexus') permettant le monitoring du trafic en temps réel et la gestion des utilisateurs.",
    features: [
      "Conception d'une architecture LAN/WAN segmentée avec passerelle Linux (Debian 12) et Iptables.",
      "Déploiement d'un annuaire OpenLDAP centralisé pour la gestion des identités (IAM).",
      "Mise en place d'un proxy Squid avec authentification LDAP et règles de contrôle d'accès (ACLs) pour le filtrage web.",
      "Développement d'outils d'administration en ligne de commande (Bash/CLI) pour l'audit des logs et la gestion des accès."
    ],
    tags: ["Linux / Debian", "LDAP", "Squid Proxy", "Iptables", "Bash CLI"],
    images: [
      "assets/nexus/001.png", "assets/nexus/002.png", "assets/nexus/003.png", "assets/nexus/004.png",
      "assets/nexus/005.png", "assets/nexus/006.png", "assets/nexus/007.png", "assets/nexus/008.png",
      "assets/nexus/009.png", "assets/nexus/010.png", "assets/nexus/011.png", "assets/nexus/012.png",
      "assets/nexus/013.png", "assets/nexus/014.png"
    ],
    github: "https://github.com/rpjicond/labs-CISCO-CCNA-CCNP/blob/main/Toulouse%20Identity%20Nexus%20(T.I.N.)%20%26%20Sentry%20Proxy/README.md",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Centre de Contrôle Satellite 3D (Télémétrie)",
    description: "Dashboard 3D interactif pour le suivi orbital et la télémétrie de satellites en temps réel, propulsé par Redis.",
    fullDescription: "Développement d'un centre de contrôle de mission (MCC) complet pour le suivi satellitaire. L'interface 3D interactive, construite avec React Three Fiber, affiche l'orbite terrestre et la position spatiale en temps réel de multiples constellations de satellites (Starlink, ISS, GPS). Le backend traite les flux de télémétrie (batterie, température CPU, altitude, force du signal) en utilisant un cache Redis pour garantir une synchronisation ultra-rapide et à très faible latence entre les systèmes de bord (OBC) et le client web.",
    features: [
      "Visualisation 3D fluide de la Terre et des orbites satellitaires calculées en temps réel.",
      "Suivi de télémétrie critique (batterie, température, signal) pour diverses constellations de satellites.",
      "Ingestion et synchronisation haute performance des paquets de données grâce à l'utilisation du cache Redis.",
      "Console de logs intégrée pour le monitoring des événements de mission et des processus backend."
    ],
    tags: ["React 3D", "Redis", "SpaceTech", "Telemetry", "Backend"],
    images: [
      "assets/satellite/001.png", "assets/satellite/002.png", "assets/satellite/003.png", "assets/satellite/004.png",
      "assets/satellite/005.png", "assets/satellite/006.png", "assets/satellite/007.png", "assets/satellite/008.png",
      "assets/satellite/009.png", "assets/satellite/010.png", "assets/satellite/011.png", "assets/satellite/012.png"
    ],
    github: "https://github.com/rpjicond/satellite-mission-control",
    icon: <Satellite className="w-5 h-5" />
  },
  {
    id: 4,
    title: "EcoAngola Control Center (Smart City)",
    description: "Dashboard interactif (Mapbox) et application mobile IoT pour la gestion intelligente des déchets et suivi de réseau hybride.",
    fullDescription: "Conception et développement du 'EcoAngola Control Center', une plateforme de supervision Smart City avancée. Ce système cartographique interactif simule et surveille une infrastructure réseau hybride (LoRaWAN + 5G) à l'échelle de Luanda. La communication IoT en temps réel est gérée via le protocole MQTT. De plus, pour optimiser la logistique urbaine, une application mobile dédiée a été développée pour les agents de terrain : grâce à la géolocalisation, ils reçoivent des notifications push en temps réel dès qu'un conteneur à déchets à proximité atteint sa capacité maximale.",
    features: [
      "Communication IoT asynchrone et performante via le protocole MQTT.",
      "Application mobile de géolocalisation avec notifications push pour la gestion intelligente des déchets.",
      "Cartographie 2D/3D dynamique développée avec Mapbox GL (suivi de flotte et capteurs critiques).",
      "Analyse de couverture réseau LoRaWAN (zones d'ombre, connectivité des nœuds en étoile)."
    ],
    tags: ["Mapbox", "LoRaWAN", "MQTT", "Mobile App", "React"],
    images: [
      "assets/ecoangola/001.png", "assets/ecoangola/002.png", "assets/ecoangola/003.png", "assets/ecoangola/004.png",
      "assets/ecoangola/005.png", "assets/ecoangola/006.png", "assets/ecoangola/007.png", "assets/ecoangola/008.png",
      "assets/ecoangola/009.png", "assets/ecoangola/010.png", "assets/ecoangola/011.png", "assets/ecoangola/012.png"
    ],
    github: "",
    icon: <Map className="w-5 h-5" />
  },
  {
    id: 5,
    title: "Smart Home Digital Twin (3D Real-time)",
    description: "Jumeau numérique interactif pour la surveillance IoT en temps réel, propulsé par MQTT, Spring Boot et API Gateway.",
    fullDescription: "Développement d'un Jumeau Numérique (Digital Twin) d'une maison intelligente utilisant React Three Fiber. Le système permet un contrôle bidirectionnel : les interactions dans l'interface 3D déclenchent des appareils physiques, et les capteurs réels mettent à jour le modèle 3D instantanément. L'architecture est conçue pour une latence minimale avec un backend robuste développé en Java (Spring Boot), intégrant une API Gateway pour le routage et la sécurité, ainsi qu'un Broker MQTT pour la messagerie asynchrone.",
    features: [
      "Backend performant et scalable développé avec le framework Java Spring Boot.",
      "Communication bidirectionnelle en temps réel via MQTT et WebSockets.",
      "Architecture micro-services avec API Gateway pour la gestion des requêtes et la sécurité.",
      "Intégration matérielle (Edge) utilisant des microcontrôleurs ESP32 et rendu 3D fluide dans le navigateur."
    ],
    tags: ["React 3D", "Spring Boot", "MQTT", "API Gateway", "ESP32"],
    images: [
      "assets/smarthome/001.png", "assets/smarthome/002.png", "assets/smarthome/003.png", "assets/smarthome/004.png",
      "assets/smarthome/005.png", "assets/smarthome/006.png", "assets/smarthome/007.png", "assets/smarthome/008.png",
      "assets/smarthome/009.png", "assets/smarthome/010.png", "assets/smarthome/011.png", "assets/smarthome/012.png",
      "assets/smarthome/013.png"
    ],
    github: "",
    icon: <Home className="w-5 h-5" />
  },
  {
    id: 6,
    title: "Architecture Réseau Multi-AS (BGP/OSPF/EIGRP)",
    description: "Simulation d'une infrastructure réseau d'entreprise complexe inter-connectant plusieurs systèmes autonomes avec redistribution de routes.",
    fullDescription: "Mise en place et simulation d'une architecture réseau avancée interconnectant plusieurs sites d'entreprise répartis sur différents Systèmes Autonomes (AS65000, AS65001, AS65002). Le projet illustre la maîtrise du routage dynamique interne (IGP) avec OSPF et EIGRP, ainsi que du routage externe (EGP) via BGP (eBGP et iBGP). L'infrastructure inclut des optimisations critiques telles que l'implémentation de Route Reflectors (RR) pour le maillage iBGP et la redistribution complexe des tables de routage entre les différents protocoles pour assurer une connectivité de bout en bout.",
    features: [
      "Configuration avancée des protocoles de routage dynamique (OSPF, EIGRP, BGP) sur routeurs Cisco.",
      "Mise en œuvre d'un Route Reflector (RR) BGP pour optimiser l'architecture iBGP du backbone.",
      "Redistribution contrôlée des routes entre OSPF, EIGRP et BGP avec validation des tables de routage.",
      "Analyse du trafic et validation de la topologie via CLI (Ping, Traceroute, debug BGP/OSPF)."
    ],
    tags: ["Cisco CLI", "BGP / OSPF / EIGRP", "Network Architecture", "Routing", "Simulation"],
    images: [
      "assets/networking/001.png", "assets/networking/002.png", "assets/networking/003.png",
      "assets/networking/004.png", "assets/networking/005.png", "assets/networking/006.png"
    ],
    github: "https://github.com/rpjicond/labs-CISCO-CCNA-CCNP/tree/main/Inter-AS-Routing-BGP-OSPF-EIGRP",
    icon: <Network className="w-5 h-5" />
  },
  {
    id: 7,
    title: "Plateforme de Gestion Médicale (Medicare RFND)",
    description: "Système d'information hospitalier avec intégration IoT de montres connectées via API pour le suivi des signaux vitaux (Backend Django).",
    fullDescription: "Développement de Medicare RFND, un système d'information hospitalier complet orienté télémédecine. Une innovation majeure du projet est son intégration IoT : les patients sont équipés de montres connectées qui transmettent leurs signaux vitaux (rythme cardiaque, oxygénation, calories) en temps réel vers le backend via une API REST. Le backend, construit en Python (Django), repose sur une modélisation de base de données relationnelle gérant ces flux de données complexes. Le frontend propose un tableau de bord analytique permettant aux médecins de surveiller l'état de santé des patients instantanément.",
    features: [
      "Intégration matérielle IoT : ingestion en temps réel des signaux vitaux via des montres connectées et une API REST.",
      "Backend robuste développé avec Python (Django) pour le traitement des données de santé et la gestion des rôles.",
      "Modélisation avancée d'une base de données relationnelle SQL (patients, consultations, signaux vitaux de la montre).",
      "Tableau de bord interactif pour le suivi clinique (composition corporelle, évolution mensuelle, alertes)."
    ],
    tags: ["Python", "Django", "IoT / Smartwatch", "REST API", "HealthTech"],
    images: [
      "assets/medicare/001.png", "assets/medicare/002.png", "assets/medicare/003.png"
    ],
    github: "https://github.com/rpjicond/Hospital-System",
    icon: <HeartPulse className="w-5 h-5" />
  },
  {
    id: 8,
    title: "Système de Monitoring Industriel (Proteus)",
    description: "Simulation complète d'un nœud IoT industriel. Lecture de capteurs multiples gérée par Arduino UNO et transmission via Ethernet.",
    fullDescription: "Simulation complète d'un nœud IoT industriel. Lecture de capteurs multiples (DHT22, ACS712, SW-420) gérée par Arduino UNO. Transmission de données via Ethernet (ENC28J60) avec stack TCP/IP optimisée. Ce projet démontre la capacité à maquetter et valider des architectures réseaux complexes avant le déploiement matériel.",
    features: [
      "Simulation logicielle complète sous Proteus.",
      "Mise en place d'une stack TCP/IP optimisée pour microcontrôleur.",
      "Validation de la latence réseau (<1ms) en environnement simulé.",
      "Génération de logs système et traitement des alertes en temps réel."
    ],
    tags: ["Proteus", "C++", "Ethernet", "Sensors"],
    images: [
      "assets/proteus/001.png", "assets/proteus/002.png", "assets/proteus/003.png",
      "assets/proteus/004.png", "assets/proteus/005.png", "assets/proteus/006.png",
      "assets/proteus/007.png", "assets/proteus/008.png", "assets/proteus/009.png"
    ],
    github: "",
    icon: <Activity className="w-5 h-5" />
  },
  {
    id: 9,
    title: "Station Météo LoRaWAN",
    description: "Station météorologique autonome alimentée par énergie solaire, transmettant des données via LoRaWAN sur de longues distances.",
    fullDescription: "Conception et déploiement d'une station météorologique totalement autonome. Alimentée par des panneaux solaires, elle collecte des données environnementales précises (température, humidité, pression atmosphérique) et les transmet de manière sécurisée via le protocole LoRaWAN sur de longues distances (jusqu'à 15 km en zone rurale).",
    features: [
      "Alimentation solaire avec système de gestion de batterie (BMS).",
      "Transmission de données longue portée et basse consommation via LoRaWAN.",
      "Programmation en C++ sur ESP32 avec utilisation poussée du mode Deep Sleep."
    ],
    tags: ["ESP32", "LoRaWAN", "C++", "Solar Power"],
    images: [
      "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/station-meteo",
    icon: <Wifi className="w-5 h-5" />
  },
  {
    id: 10,
    title: "Passerelle Edge Industrielle",
    description: "Passerelle basée sur Raspberry Pi collectant des données Modbus de PLC et les transmettant de manière sécurisée au cloud.",
    fullDescription: "Développement d'une passerelle industrielle (Edge Gateway) basée sur un Raspberry Pi. Ce système est chargé d'interroger les automates programmables industriels (PLC) via le protocole Modbus RTU/TCP, de traiter et filtrer les données localement (Edge Computing), puis de les transmettre de façon sécurisée vers une plateforme Cloud pour le monitoring global.",
    features: [
      "Acquisition de données industrielles fiables via le protocole Modbus.",
      "Traitement local des données avec des scripts Python.",
      "Déploiement conteneurisé avec Docker pour faciliter la maintenance.",
      "Transmission sécurisée TLS/SSL vers l'infrastructure Cloud."
    ],
    tags: ["Raspberry Pi", "Python", "Docker", "Modbus"],
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/edge-gateway",
    icon: <Server className="w-5 h-5" />
  },
  {
    id: 11,
    title: "Tracker BLE Wearable",
    description: "Dispositif portable basse consommation pour le suivi des actifs en intérieur utilisant des balises BLE et FreeRTOS.",
    fullDescription: "Création d'un dispositif portable (wearable) ultra-basse consommation destiné au suivi d'équipements et de personnel en intérieur (Indoor Tracking). Basé sur la puce nRF52840, il utilise la technologie Bluetooth Low Energy (BLE) et communique avec des balises (beacons) pour un positionnement précis.",
    features: [
      "Conception complète du circuit imprimé (PCB) avec KiCad.",
      "Développement de firmware temps réel basé sur FreeRTOS.",
      "Optimisation drastique de la consommation d'énergie pour une longue durée de vie.",
      "Communication BLE 5.0 pour un suivi de position précis."
    ],
    tags: ["nRF52840", "BLE", "KiCad", "FreeRTOS"],
    images: [
      "https://images.unsplash.com/photo-1572294121516-3e0544521715?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80"
    ],
    github: "https://github.com/rpjicond/ble-tracker",
    icon: <Cpu className="w-5 h-5" />
  },
  {
    id: 12,
    title: "Système de Surveillance IoT (Web)",
    description: "Plateforme web complète (PHP/MySQL) pour la gestion, l'analyse et la visualisation de données de capteurs IoT.",
    fullDescription: "Développement d'une plateforme web complète (Full-Stack) pour la supervision de capteurs IoT. Le frontend propose un tableau de bord analytique interactif avec des graphiques générés en temps réel. Le backend gère l'authentification des utilisateurs, le stockage sécurisé des données structurées et la génération de rapports automatisés.",
    features: [
      "Architecture logicielle robuste basée sur le modèle MVC en PHP.",
      "Tableau de bord interactif de Data Visualisation utilisant Chart.js.",
      "Base de données relationnelle MySQL optimisée pour le stockage de séries temporelles.",
      "Scripts d'automatisation pour l'exportation des historiques de données au format JSON."
    ],
    tags: ["PHP", "MySQL", "Chart.js", "Data Viz"],
    images: [
      "assets/web-monitoring/001.png", "assets/web-monitoring/002.png", "assets/web-monitoring/003.png",
      "assets/web-monitoring/004.png", "assets/web-monitoring/005.png"
    ],
    github: "https://github.com/rpjicond/Monitoring_IoT",
    icon: <Database className="w-5 h-5" />
  },
  {
    id: 13,
    title: "Jeu de Tic-Tac-Toe & IA (Python)",
    description: "Implémentation classique avec interface graphique (Pygame) et Intelligence Artificielle invulnérable (Minimax).",
    fullDescription: "Projet personnel développé en Python utilisant la bibliothèque Pygame. Le jeu propose une interface graphique interactive et une Intelligence Artificielle robuste basée sur l'algorithme Minimax, rendant l'ordinateur invincible. Ce projet a servi à consolider les compétences en logique algorithmique, en programmation orientée objet et en développement d'interfaces.",
    features: [
      "Interface graphique fluide et réactive développée avec Pygame.",
      "Intelligence Artificielle basée sur l'algorithme Minimax pour un adversaire optimal.",
      "Gestion complète des états de jeu, des tours et de la logique de victoire.",
      "Code structuré et modulaire suivant les bonnes pratiques Python."
    ],
    tags: ["Python", "Pygame", "AI / Minimax", "Algorithmie"],
    images: [
      "assets/tictactoe/001.png", "assets/tictactoe/002.png"
    ],
    github: "https://github.com/rpjicond/tic-tac",
    icon: <Gamepad2 className="w-5 h-5" />
  },
  {
    id: 14,
    title: "Minecraft IoT Multiplayer (Gants Connectés)",
    description: "Jeu Minecraft contrôlé par des gants physiques IoT (ESP8266) déclenchant des pouvoirs via MQTT et Python.",
    fullDescription: "Projet 'Phygital' innovant connectant le monde physique au virtuel. Deux joueurs s'affrontent dans Minecraft Pi Edition en portant des gants connectés équipés de boutons poussoirs et de microcontrôleurs ESP8266. Chaque action physique envoie un message MQTT (via broker Mosquitto) traité par un script Python sur Raspberry Pi, déclenchant des super-pouvoirs (ascenseur d'eau, mur de glowstone) ou des malus (lave, TNT) en temps réel dans le jeu.",
    features: [
      "Interface physique IoT : Gants équipés d'ESP8266 Feather Huzzah et boutons poussoirs.",
      "Architecture événementielle temps réel basée sur le protocole MQTT (Mosquitto).",
      "Scripting Python avancé pour l'interaction dynamique avec l'API Minecraft Pi.",
      "Logique de jeu multijoueur (course au diamant) avec détection automatique de victoire."
    ],
    tags: ["IoT", "MQTT", "Python", "ESP8266", "Minecraft API"],
    images: [
      "assets/minecraft-iot/001.png", "assets/minecraft-iot/002.png", "assets/minecraft-iot/003.png", "assets/minecraft-iot/004.png"
    ],
    github: "https://github.com/rpjicond/minecraft-iot-gloves-mqtt",
    icon: <Gamepad2 className="w-5 h-5" />
  },
  {
    id: 15,
    title: "Sécurisation IoT & Supervision Datacenter",
    description: "Système de sécurité critique (RFID, capteurs) avec supervision temps réel (Node-RED, InfluxDB, Grafana) et haute disponibilité (VRRP).",
    fullDescription: "Conception d'un système de sécurisation IoT complet pour un datacenter. Le système assure une surveillance environnementale continue (température, fumée, chocs, mouvements) et gère le contrôle d'accès physique via RFID avec protection anti-clonage. L'architecture est conçue pour la résilience : les services de supervision (Node-RED, InfluxDB, Grafana) sont hébergés sur une grappe de Raspberry Pi configurée en Haute Disponibilité (HA) grâce au protocole VRRP, garantissant un basculement en moins de 50ms en cas de panne.",
    features: [
      "Supervision temps réel multi-capteurs : Température (DHT22), Fumée (MQ135), Mouvement (PIR), Chocs.",
      "Contrôle d'accès physique sécurisé via badges RFID (PN532) avec journalisation MySQL.",
      "Architecture Haute Disponibilité (HA) : Redondance des serveurs via VRRP (Keepalived).",
      "Stack de Monitoring centralisée : Node-RED (Logique/Alertes), InfluxDB (Time-series) et Grafana (Dashboards)."
    ],
    tags: ["IoT / ESP8266", "Node-RED", "InfluxDB & Grafana", "VRRP / HA", "Security"],
    images: [
      "assets/datacenter-security/001.png", "assets/datacenter-security/002.png"
    ],
    github: "https://github.com/rpjicond/Securisation-IoT-d-un-Datacenter",
    icon: <Lock className="w-5 h-5" />
  }
];

// --- COMPONENTE DE SECÇÃO ---
const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`min-h-screen flex flex-col px-8 md:px-16 lg:px-24 xl:px-32 w-full mx-auto ${className}`}>
    {children}
  </section>
);

// --- MODAL GRANDE DE PROJETOS ---
function ProjectModal({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  const nextImage = () => setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 transition-all duration-300 pointer-events-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[85vh] md:h-[80vh] overflow-hidden relative flex flex-col md:flex-row animate-in zoom-in-95 duration-200">

        <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition backdrop-blur-sm">
          <X className="w-6 h-6" />
        </button>

        {/* Lado Esquerdo - Galeria de Imagens */}
        <div className="relative w-full md:w-[60%] h-1/2 md:h-full bg-slate-900 flex-shrink-0 group flex items-center justify-center">
          <img
            src={project.images[currentImageIndex]}
            alt={project.title}
            className="w-full h-full object-contain transition-opacity duration-300"
            onError={(e) => {
              // Fallback para imagem caso não carregue
              e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
            }}
          />

          {project.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-3 transition backdrop-blur-sm border border-white/20">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-3 transition backdrop-blur-sm border border-white/20">
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm overflow-x-auto max-w-[90%]">
                {project.images.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all flex-shrink-0 ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Lado Direito - Informações do Projeto */}
        <div className="w-full md:w-[40%] flex flex-col h-1/2 md:h-full bg-white relative">
          <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">

            <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">{project.title}</h2>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag: string) => (
                <span key={tag} className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono px-3 py-1.5 rounded-lg font-bold">
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-slate">
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">À propos du projet</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-8">
                {project.fullDescription || project.description}
              </p>

              {project.features && project.features.length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Fonctionnalités Clés</h3>
                  <ul className="space-y-3 mb-6">
                    {project.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start text-slate-600 text-[14px] leading-relaxed">
                        <span className="text-emerald-500 mr-3 mt-0.5 font-bold text-lg leading-none">▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full gap-3 bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold text-[15px] transition shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <Github className="w-5 h-5" />
                Voir le Code sur GitHub
              </a>
            ) : (
              <button disabled className="flex items-center justify-center w-full gap-3 bg-slate-200 text-slate-500 border border-slate-300 px-6 py-4 rounded-xl font-bold text-[15px] cursor-not-allowed">
                <Lock className="w-5 h-5" />
                Code Privé / Infrastructure Interne
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- OVERLAY PRINCIPAL ---
export default function Overlay({ scenario, setScenario }: { scenario: number, setScenario: (s: number) => void }) {
  const { t, language, setLanguage } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const toggleLanguage = () => {
    const langs: Language[] = ['pt', 'en', 'fr'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-y-auto z-10 scroll-smooth pointer-events-none">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full p-6 px-8 md:px-12 flex justify-between items-center z-50 pointer-events-auto">
        <div className="flex items-center gap-4">
          <div className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-md border border-slate-200/50 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-600">IOT</span><span className="text-slate-900">.DEV</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/50 border border-emerald-200/50 backdrop-blur-md shadow-sm">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-emerald-700 text-[10px] tracking-wider font-bold">
              {t.nav?.system || "SYSTEM ONLINE"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 bg-white/50 px-4 md:px-6 py-2 rounded-full backdrop-blur-md border border-slate-200/50 shadow-sm">
          <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-slate-600">
            <a href="#about" className="hover:text-emerald-600 transition-colors font-semibold">
              {t.nav?.about || "SOBRE"}
            </a>
            <a href="#stack" className="hover:text-emerald-600 transition-colors font-semibold">
              {t.nav?.stack || "STACK"}
            </a>
            <a href="#projects" className="hover:text-emerald-600 transition-colors font-semibold">
              {t.nav?.projects || "PROJETOS"}
            </a>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 hover:bg-white text-slate-700 transition-colors font-mono text-xs font-bold"
          >
            <Globe className="w-3.5 h-3.5" />
            {language.toUpperCase()}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <Section id="about" className="justify-start pt-32 md:pt-40 pb-12 relative min-h-screen pointer-events-none">
        <div className="flex flex-col lg:flex-row justify-between items-start w-full h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full text-left pointer-events-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.95] text-slate-900">
              RONALDO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                JICONDA
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-8 font-medium">
              {t.hero?.role || "Développeur Embarqué, IoT & Ingénieur Réseaux."}
              <br />
              {t.hero?.sub || "Conception de solutions connectées, du capteur au cloud."}
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white text-sm font-bold rounded-full hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 hover:scale-105">
                {t.hero?.cta_projects || "VER PROJETOS"}
                <ChevronRight className="w-4 h-4" />
              </a>
              <a href="https://github.com/rpjicond" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-sm font-bold rounded-full hover:bg-slate-50 transition-all text-slate-800 shadow-sm hover:scale-105">
                <Github className="w-4 h-4" />
                {t.hero?.cta_github || "GITHUB"}
              </a>
            </div>
          </motion.div>

          <div className="flex-grow"></div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-72 flex flex-col gap-4 pointer-events-auto mt-8 lg:mt-0"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl p-5 rounded-3xl">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <h3 className="text-[10px] font-bold font-mono text-slate-400 tracking-widest uppercase">CENÁRIO ATIVO</h3>
                <span className="text-[10px] font-mono text-emerald-600 font-black bg-emerald-50 px-2 py-1 rounded">0{scenario + 1}/07</span>
              </div>

              <h4 className="text-xl font-bold mb-2 text-slate-900 leading-tight">{t.scenarios[scenario]?.title || "Cenário"}</h4>
              <p className="text-slate-500 text-[11px] mb-4 leading-relaxed font-medium min-h-[50px]">
                {t.scenarios[scenario]?.description || ""}
              </p>

              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
                {t.scenarios.map((s: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setScenario(i)}
                    className={`text-left px-3 py-2.5 rounded-lg transition-all text-[11px] font-bold flex items-center justify-between group ${scenario === i
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                  >
                    <span>{s.title}</span>
                    {scenario === i && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-400 font-mono text-[10px] tracking-widest uppercase pointer-events-none"
        >
          <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-transparent"></div>
        </motion.div>
      </Section>

      {/* Resto do Site */}
      <div className="pointer-events-auto bg-white/80 backdrop-blur-sm">

        {/* STACK SECTION */}
        <Section id="stack" className="border-y border-slate-200 py-24 justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight text-slate-900 uppercase">
                {t.stack?.title || "STACK TECHNIQUE"}
              </h2>
              <div className="space-y-8">
                {[
                  { label: t.stack?.firmware || "Développement Firmware (C/C++)", value: 95 },
                  { label: t.stack?.pcb || "Conception PCB (KiCad)", value: 85 },
                  { label: t.stack?.protocols || "Protocoles IoT (MQTT, CoAP, LoRaWAN)", value: 90 },
                  { label: t.stack?.backend || "Backend & Cloud (API Gateway, Spring, Django)", value: 80 },
                  { label: t.stack?.network || "Réseaux & Systèmes (Linux, VLAN, Docker)", value: 85 },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-3 font-mono text-sm">
                      <span className="text-slate-600 font-bold tracking-tight">{item.label}</span>
                      <span className="text-[#10b981] font-bold">{item.value}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-[#10b981] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 xl:mt-0">
              {[
                { icon: Cpu, title: t.stack?.microcontrollers || "Microcontrôleurs", desc: "ESP32, STM32, nRF52" },
                { icon: Wifi, title: t.stack?.connectivity || "Connectivité", desc: "WiFi, BLE, LoRaWAN" },
                { icon: Layers, title: t.stack?.rtos || "Systèmes Temps Réel (RTOS)", desc: "FreeRTOS, Zephyr" },
                { icon: Server, title: t.stack?.cloud || "Cloud & Edge", desc: "API Gateway, Spring Boot" },
                { icon: Network, title: t.stack?.network_sec || "Réseau & Sécurité", desc: "VLAN, VPN, Firewall" },
                { icon: Terminal, title: t.stack?.sysadmin || "Administration Système", desc: "Linux, Docker, Bash" },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-400 hover:shadow-lg transition-all group">
                  <div className="p-4 bg-slate-50 rounded-full group-hover:bg-emerald-50 transition-colors">
                    <item.icon className="w-8 h-8 text-slate-400 group-hover:text-[#10b981] transition-colors" />
                  </div>
                  <span className="font-bold text-[15px] text-slate-900">{item.title}</span>
                  <span className="text-[12px] text-slate-400 font-mono tracking-wider">{item.desc}</span>
                </div>
              ))}
            </div>

          </div>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects" className="py-24 bg-slate-50/50 justify-center">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 uppercase">
              {t.projects.title || "PROJETS RÉCENTS"}
            </h2>
            <a href="https://github.com/rpjicond" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1 tracking-wider uppercase">
              VIEW ALL ON GITHUB
              <span className="text-lg leading-none">&rsaquo;</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {portfolioProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-xl transition duration-300 cursor-pointer group h-full overflow-hidden"
              >
                <div className="h-48 overflow-hidden relative border-b border-slate-100 bg-slate-100">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-[#10b981] shadow-sm">
                    {project.icon}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{project.title}</h3>
                    <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition flex-shrink-0 ml-2" />
                  </div>

                  <p className="text-[14px] text-slate-500 mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex gap-2 flex-wrap mt-auto">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="border border-slate-200 text-slate-500 bg-slate-50 text-[10px] font-mono px-2 py-1 rounded font-bold">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="border border-slate-200 text-slate-400 bg-slate-50 text-[10px] font-mono px-2 py-1 rounded font-bold">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <ProjectModal
            project={selectedProject}
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
          />
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact" className="items-center text-center py-24 bg-white justify-center">
          <div className="max-w-4xl w-full bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-2xl p-12 md:p-20 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">{t.contact.title}</h2>
            <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto font-medium">
              {t.contact.desc}
            </p>

            <div className="flex justify-center gap-6 mb-12">
              <a href="https://github.com/rpjicond" target="_blank" rel="noopener noreferrer" className="p-5 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:-translate-y-1 shadow-lg transition-all group">
                <Github className="w-7 h-7" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-5 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:-translate-y-1 shadow-lg transition-all group">
                <Linkedin className="w-7 h-7" />
              </a>
              <a href="mailto:contact@iot.dev" className="p-5 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:-translate-y-1 shadow-lg transition-all group">
                <Mail className="w-7 h-7" />
              </a>
            </div>

            <div className="font-mono text-xs text-slate-400 tracking-widest uppercase font-bold">
              <p>{t.contact.location}</p>
            </div>
          </div>
        </Section>

        <footer className="py-8 text-center text-slate-400 font-mono text-xs border-t border-slate-100 bg-white">
          {t.footer}
        </footer>
      </div>
    </div>
  );
}