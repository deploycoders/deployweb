export const projects = [
  {
    id: "clinixai",
    title: "Clinic AI",
    category: "Panel de Salud AI",
    year: "2024",
    role: "Diseño & Desarrollo",
    services: ["UI/UX Design", "Next.js Development", "AI Integration"],
    description: "Una plataforma revolucionaria que utiliza inteligencia artificial para diagnosticar y gestionar el historial clínico de pacientes con precisión sin precedentes. Clinic AI centraliza datos médicos fragmentados y los convierte en información accionable para los profesionales de la salud.",
    challenge: "El desafío principal era presentar datos médicos complejos de una manera intuitiva para los doctores, manteniendo la seguridad de los datos y una velocidad de respuesta instantánea en entornos de alta presión.",
    solution: "Implementamos un diseño minimalista con visualizaciones de datos dinámicas y una arquitectura serverless que garantiza escalabilidad y seguridad de grado médico (HIPAA compliant).",
    images: [
      "/projects/clinixai-1.png",
      "/projects/clinixai-2.png",
      "/projects/2.png"
    ],
    heroImage: "/projects/2.png",
    color: "#748fff"
  },
  {
    id: "agileskills",
    title: "Agile Skills",
    category: "Plataforma E-learning",
    year: "2023",
    role: "Desarrollo Fullstack",
    services: ["Web App Development", "LMS Integration", "Custom Branding"],
    description: "Plataforma educativa enfocada en metodologías ágiles, diseñada para empresas que buscan capacitar a sus equipos de forma eficiente y medible. Agile Skills combina el aprendizaje tradicional con herramientas de gestión de proyectos en tiempo real.",
    challenge: "Crear una experiencia de aprendizaje que no se sintiera como una tarea, fomentando la participación a través de gamificación y rutas de aprendizaje personalizadas para diferentes perfiles técnicos.",
    solution: "Desarrollamos un sistema de micro-learning con dashboards de progreso interactivos, integraciones con Slack/Discord y una interfaz optimizada para el aprendizaje enfocado.",
    images: [
      "/projects/agileskills-1.png",
      "/projects/agileskills-2.png",
      "/projects/1.png"
    ],
    heroImage: "/projects/1.png",
    color: "#b9c6ff"
  },
  {
    id: "vanguard",
    title: "Vanguard Finance",
    category: "Fintech Dashboard",
    year: "2024",
    role: "Diseño & Estrategia",
    services: ["Data Visualization", "Financial UX", "Next.js"],
    description: "Un ecosistema financiero de alto nivel diseñado para inversores institucionales. Vanguard Finance combina analítica predictiva con una interfaz de trading ultra-rápida, permitiendo la gestión de activos globales en tiempo real con una claridad visual absoluta.",
    challenge: "El principal reto fue unificar flujos de datos heterogéneos de múltiples mercados globales en una sola vista coherente, sin sacrificar el rendimiento del navegador ni abrumar al usuario con exceso de información.",
    solution: "Desarrollamos un sistema de diseño basado en capas de información dinámicas, utilizando WebSockets para actualizaciones en tiempo real y una arquitectura de componentes optimizada que reduce la latencia de renderizado.",
    images: [
      "/projects/2.png",
      "/projects/1.png",
      "/projects/clinixai-1.png"
    ],
    heroImage: "/projects/2.png",
    color: "#4f46e5"
  },
  {
    id: "nebula",
    title: "Nebula OS",
    category: "Cloud Operating System",
    year: "2024",
    role: "Fullstack Development",
    services: ["Cloud Architecture", "System Design", "UI/UX"],
    description: "Nebula es una visión del futuro de la computación en la nube. Un sistema operativo que vive enteramente en el navegador, ofreciendo una experiencia de escritorio fluida con acceso instantáneo a herramientas de desarrollo y colaboración distribuida.",
    challenge: "Simular la respuesta y robustez de un sistema operativo nativo dentro de las limitaciones de un entorno web, gestionando eficientemente el estado de múltiples aplicaciones virtuales simultáneas.",
    solution: "Implementamos un micro-kernel en Javascript que gestiona el ciclo de vida de los procesos y una interfaz basada en canvas/webgl para asegurar que las animaciones y transiciones mantengan 60fps constantes.",
    images: [
      "/projects/1.png",
      "/projects/2.png",
      "/projects/agileskills-1.png"
    ],
    heroImage: "/projects/1.png",
    color: "#06b6d4"
  }
];
