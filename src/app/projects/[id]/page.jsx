"use client";

import { useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

// Registrar ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const runtime = "edge";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  const containerRef = useRef(null);

  const { project, prevProject, nextProject } = useMemo(() => {
    const idx = projects.findIndex((p) => p.id === id);
    const currIdx = idx !== -1 ? idx : 0;
    return {
      project: projects[currIdx],
      prevProject: projects[currIdx > 0 ? currIdx - 1 : projects.length - 1],
      nextProject: projects[currIdx < projects.length - 1 ? currIdx + 1 : 0]
    };
  }, [id]);

  useGSAP(
    () => {
      // Asegurar que el Navbar sea visible si venimos de la home (limpiar estado de HeroSection)
      const navEl = document.querySelector("[data-navbar]");
      const navLinks = document.querySelectorAll(".nav-link");
      const navCta = document.querySelector(".nav-cta");
      const navLogo = document.querySelector(".nav-logo-text");

      if (navEl) gsap.set(navEl, { opacity: 1, y: 0 });
      if (navLinks.length) gsap.set(navLinks, { opacity: 1, y: 0 });
      if (navCta) gsap.set(navCta, { opacity: 1, y: 0 });
      if (navLogo) gsap.set(navLogo, { opacity: 1, y: 0 });

      // Animación del Hero
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.2,
      });

      gsap.from(".hero-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      // Animaciones de las secciones al hacer scroll
      const sections = gsap.utils.toArray(".reveal-section");
      sections.forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Animación de las imágenes de la galería
      const galleryImages = gsap.utils.toArray(".gallery-image-wrap");
      galleryImages.forEach((img) => {
        gsap.from(img, {
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef, dependencies: [project] }
  );

  return (
    <main ref={containerRef} className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30">

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="hero-image absolute inset-0 z-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover brightness-[0.4]"
            priority
            loading="eager"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 text-[10px] uppercase tracking-[0.6em] text-white/50">
            {project.category}
          </span>
          <h1 className="hero-title text-[12vw] font-black leading-[0.9] tracking-tighter sm:text-[10vw]">
            {project.title}
          </h1>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* Overview Section */}
      <section className="reveal-section container mx-auto px-6 py-24 md:px-12 md:py-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Metadata */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Año</span>
              <p className="text-lg font-medium">{project.year}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Rol</span>
              <p className="text-lg font-medium">{project.role}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Servicios</span>
              <ul className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <li key={service} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-8">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-5xl">El Proyecto</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Challenge & Solution Section */}
      <section className="bg-zinc-900/30 py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
            <div className="reveal-section">
              <span className="mb-4 inline-block text-[10px] uppercase tracking-widest text-indigo-400">01 / Desafío</span>
              <h3 className="mb-6 text-2xl font-bold md:text-4xl">La Complejidad</h3>
              <p className="text-zinc-400 leading-relaxed md:text-lg">
                {project.challenge}
              </p>
            </div>
            <div className="reveal-section">
              <span className="mb-4 inline-block text-[10px] uppercase tracking-widest text-emerald-400">02 / Solución</span>
              <h3 className="mb-6 text-2xl font-bold md:text-4xl">La Respuesta</h3>
              <p className="text-zinc-400 leading-relaxed md:text-lg">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6 py-24 md:px-12 md:py-40">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {project.images.map((img, idx) => (
            <div 
              key={idx} 
              className={`gallery-image-wrap relative w-full overflow-hidden rounded-3xl border border-white/5 ${
                idx % 3 === 0 ? "h-[60vh] md:h-[90vh]" : "h-[50vh] md:h-[70vh]"
              }`}
            >
              <Image
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Prev / Next Project Links */}
      <section className="reveal-section border-t border-white/5 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            {/* Previous */}
            <Link 
              href={`/projects/${prevProject.id}`}
              className="group flex-1 flex flex-col md:items-start w-full"
            >
              <span className="mb-4 md:mb-6 inline-block text-[10px] uppercase tracking-[0.4em] text-white/30 transition-colors group-hover:text-white/50">Anterior Proyecto</span>
              <h2 className="text-[6vw] md:text-[4vw] font-black tracking-tighter transition-all duration-500 group-hover:text-indigo-400">
                <span className="mr-4 inline-block translate-y-[-0.1em] opacity-0 transition-all duration-500 group-hover:-translate-x-4 group-hover:opacity-100">←</span>
                {prevProject.title}
              </h2>
            </Link>

            {/* Separator for mobile */}
            <div className="w-16 h-[1px] bg-white/10 md:hidden"></div>
            {/* Separator for desktop */}
            <div className="hidden md:block w-[1px] h-32 bg-white/10"></div>

            {/* Next */}
            <Link 
              href={`/projects/${nextProject.id}`}
              className="group flex-1 flex flex-col md:items-end w-full md:text-right text-center"
            >
              <span className="mb-4 md:mb-6 inline-block text-[10px] uppercase tracking-[0.4em] text-white/30 transition-colors group-hover:text-white/50">Próximo Proyecto</span>
              <h2 className="text-[6vw] md:text-[4vw] font-black tracking-tighter transition-all duration-500 group-hover:text-emerald-400">
                {nextProject.title}
                <span className="ml-4 inline-block translate-y-[-0.1em] opacity-0 transition-all duration-500 group-hover:translate-x-4 group-hover:opacity-100">→</span>
              </h2>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer simple para la página de detalle */}
      <footer className="py-12 text-center text-white/20 text-[10px] uppercase tracking-widest border-t border-white/5">
        DEPLOY © {new Date().getFullYear()} — CREANDO REALIDADES DIGITALES
      </footer>
    </main>
  );
}
