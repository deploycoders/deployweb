"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  const items = [
    { label: "Proyectos", href: "/#work", dropdown: true },
    { label: "Servicios", href: "/#services" },
    { label: "Tecnologías", href: "/#tecnologias" },
    { label: "Contacto", href: "/#contact" },
  ];

  useGSAP(() => {
    if (isProjectsOpen) {
      gsap.to(dropdownRef.current, {
        opacity: 1,
        y: 10,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "expo.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, { dependencies: [isProjectsOpen] });

  return (
    <nav
      ref={navRef}
      data-navbar
      className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6"
    >
      <div className="mx-auto flex w-[94%] max-w-[1440px] items-center justify-between rounded-full border border-white/5 bg-black/20 px-6 py-3 backdrop-blur-md sm:px-8 sm:py-4">
        {/* Logo */}
        <div className="pointer-events-auto text-xl font-bold tracking-[0.2em] text-white sm:text-2xl">
          <Link href="/" data-nav-logo className="nav-logo-text inline-block">
            DEPLOY
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="pointer-events-auto hidden items-center gap-8 lg:flex">
          {items.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setIsProjectsOpen(true)}
              onMouseLeave={() => item.dropdown && setIsProjectsOpen(false)}
            >
              {item.dropdown ? (
                <div className="flex items-center gap-1 cursor-pointer py-2">
                  <span className="nav-link text-sm font-medium tracking-wide text-zinc-400 transition-colors hover:text-white">
                    {item.label}
                  </span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 ${isProjectsOpen ? "rotate-180" : ""}`} 
                  />
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="nav-link text-sm font-medium tracking-wide text-zinc-400 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              )}

              {item.dropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute left-1/2 top-full w-64 -translate-x-1/2 opacity-0 pointer-events-none"
                  style={{ transform: "translateX(-50%)" }}
                >
                  <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 p-2 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col gap-1">
                      {projects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/projects/${project.id}`}
                          className="group flex flex-col rounded-xl p-3 transition-colors hover:bg-white/5"
                          onClick={() => setIsProjectsOpen(false)}
                        >
                          <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {project.title}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                            {project.category}
                          </span>
                        </Link>
                      ))}
                      <div className="mt-1 border-t border-white/5 pt-1">
                        <Link
                          href="/#work"
                          className="flex items-center justify-center py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
                          onClick={() => setIsProjectsOpen(false)}
                        >
                          Ver Todos
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="nav-cta pointer-events-auto hidden items-center gap-4 lg:flex">
          <Link
            href="/#contact"
            className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
          >
            Contáctanos
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`pointer-events-auto absolute inset-x-0 top-full mt-2 overflow-hidden px-4 transition-all duration-500 lg:hidden ${
          isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 rounded-3xl border border-white/5 bg-black/90 p-6 backdrop-blur-xl overflow-y-auto max-h-[70vh]">
          {items.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                    className="flex items-center justify-between w-full text-lg font-medium text-zinc-300"
                  >
                    {item.label}
                    <ChevronDown className={`w-5 h-5 transition-transform ${isProjectsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`flex flex-col gap-3 pl-4 transition-all duration-300 overflow-hidden ${isProjectsOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    {projects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="text-base text-zinc-400 hover:text-white"
                        onClick={() => {
                          setIsOpen(false);
                          setIsProjectsOpen(false);
                        }}
                      >
                        {project.title}
                      </Link>
                    ))}
                    <Link
                      href="/#work"
                      className="text-sm font-bold text-cyan-500 uppercase tracking-widest"
                      onClick={() => {
                        setIsOpen(false);
                        setIsProjectsOpen(false);
                      }}
                    >
                      Explorar Galería
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="text-lg font-medium text-zinc-300 hover:text-white block py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex justify-center items-center rounded-full bg-white py-3 font-bold text-black"
          >
            Despliega Tu Proyecto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

