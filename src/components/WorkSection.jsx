"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

// Registrar ScrollTrigger localmente para asegurar disponibilidad
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "clinixai",
    displayId: "01",
    title: "Clinic AI",
    category: "Panel de Salud AI",
    image: "/projects/2.png",
  },
  {
    id: "agileskills",
    displayId: "02",
    title: "Agile Skills",
    category: "Plataforma E-learning",
    image: "/projects/1.png",
  },
  {
    id: "agileskills",
    displayId: "03",
    title: "Agile Skills",
    category: "Plataforma E-learning",
    image: "/projects/1.png",
  },
  {
    id: "clinixai",
    displayId: "04",
    title: "Clinic AI",
    category: "Panel de Salud AI",
    image: "/projects/2.png",
  },
  {
    id: "clinixai",
    displayId: "05",
    title: "Clinic AI",
    category: "Panel de Salud AI",
    image: "/projects/2.png",
  },
  {
    id: "agileskills",
    displayId: "06",
    title: "Agile Skills",
    category: "Plataforma E-learning",
    image: "/projects/1.png",
  },
];

export default function WorkSection() {
  const container = useRef();
  const cursorRef = useRef();

  useGSAP(
    () => {
      const cursor = cursorRef.current;

      // Configuración inicial del cursor
      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
      });

      const moveCursor = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", moveCursor);

      // --- ANIMACIONES DE ENTRADA (ScrollTrigger) ---

      // Animación del título WORK
      gsap.from(".work-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".work-title",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Animación de los proyectos (staggered)
      gsap.from(".project-card", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      return () => window.removeEventListener("mousemove", moveCursor);
    },
    { scope: container },
  );

  const onMouseEnter = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "expo.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "expo.in",
    });
  };

  return (
    <section
      ref={container}
      className="relative w-full bg-[#09090b] py-24 md:py-32 overflow-hidden border-t border-white/5"
      id="work"
    >
      {/* Título WORK gigante */}
      <div className="px-6 md:px-12 mb-12 md:mb-20 select-none overflow-hidden">
        <h2 className="work-title text-[9vw] md:text-[7vw] font-bold uppercase leading-[0.8] tracking-tighter text-white/90">
          PROYECTOS
        </h2>
      </div>

      {/* Contenedor de proyectos con Flex Wrap para permitir múltiples filas */}
      <div className="projects-container flex flex-wrap gap-y-12 gap-x-6 lg:gap-x-10 px-6 md:px-12 w-full">
        {projects.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={`/projects/${project.id}`}
            className="project-card relative w-full lg:w-[calc(50%-1.25rem)] group h-[60vh] md:h-[80vh] overflow-hidden rounded-3xl cursor-none border border-white/5 block"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {/* Número del proyecto */}
            <div className="absolute top-8 left-8 z-20">
              <span className="text-xs font-mono text-white/40 tracking-[0.3em]">
                {project.displayId}
              </span>
            </div>

            {/* Contenedor de Imagen */}
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
              {/* Overlay degradado para profundidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </div>

            {/* Info del Proyecto */}
            <div className="absolute bottom-10 left-10 z-20 transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                {project.title}
              </h3>
              <p className="text-[10px] text-white/50 uppercase tracking-[0.4em] font-medium">
                {project.category}
              </p>
            </div>

            {/* Línea decorativa que se expande al hover */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white/30 group-hover:w-full transition-all duration-700 ease-in-out" />
          </Link>
        ))}
      </div>

      {/* Cursor Personalizado con Efecto Inverse (mix-blend-difference) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-32 h-32 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center opacity-0 scale-0"
        style={{ willChange: "transform" }}
      >
        <span className="text-black text-[10px] font-bold uppercase tracking-[0.3em]">
          Ver Caso
        </span>
      </div>
    </section>
  );
}
