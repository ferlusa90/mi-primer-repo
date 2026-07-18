"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import styles from "./Gallery.module.css";

const IMAGES = [
  { id: 1, src: "/images/foto1.jpg", title: "Piscina y Solárium", category: "Exterior", alt: "Piscina rodeada de parque verde y reposeras" },
  { id: 2, src: "/images/foto2.jpg", title: "Parque y Fachada", category: "Exterior", alt: "Vista de la fachada exterior de la casa con amplio parque arbolado" },
  { id: 3, src: "/images/foto3.jpg", title: "Galería Exterior", category: "Exterior", alt: "Galería techada con columnas de ladrillo visto" },
  { id: 4, src: "/images/foto4.jpg", title: "Jardín y Entrada", category: "Exterior", alt: "Vista lateral del jardín y acceso principal a la propiedad" },
  { id: 5, src: "/images/foto5.jpg", title: "Quincho y Parrilla", category: "Comodidades", alt: "Espacio de asador y quincho con mesa para reuniones" },
  { id: 6, src: "/images/foto6.jpg", title: "Área de Descanso", category: "Exterior", alt: "Zona de sombra bajo los árboles para relajarse" },
  { id: 7, src: "/images/foto7.jpg", title: "Living Principal", category: "Interior", alt: "Sala de estar luminosa con sillones y decoración cálida" },
  { id: 8, src: "/images/foto8.jpg", title: "Cocina Comedor", category: "Interior", alt: "Cocina equipada integrada con mesa de comedor diaria" },
  { id: 9, src: "/images/foto9.jpg", title: "Dormitorio Principal", category: "Interior", alt: "Habitación matrimonial amplia con cama doble y ventanal" },
  { id: 10, src: "/images/foto10.jpg", title: "Dormitorio Secundario", category: "Interior", alt: "Habitación adicional con camas individuales ideal para niños" },
  { id: 11, src: "/images/foto11.png", title: "Baño Completo", category: "Interior", alt: "Cuarto de baño completo con sanitarios y grifería moderna" },
  { id: 12, src: "/images/foto12.jpg", title: "Entorno Natural y Privacidad", category: "Exterior", alt: "Parque trasero con frondosos árboles que garantizan la privacidad" },
];

export default function Gallery() {
  const [index, setIndex] = useState(null);

  const handleOpen = (i) => setIndex(i);
  const handleClose = () => setIndex(null);

  const handlePrev = useCallback(() => {
    if (index !== null) {
      setIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
    }
  }, [index]);

  const handleNext = useCallback(() => {
    if (index !== null) {
      setIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
    }
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (index === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Disable scroll when lightbox is open
    if (index !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [index, handleNext, handlePrev]);

  return (
    <section className={styles.gallerySection} id="galeria">
      <div className="text-center">
        <span className="badge badge-primary">Galería de Fotos</span>
        <h2 style={{ fontSize: "2.5rem", marginTop: "1rem", marginBottom: "1rem" }}>
          Explorá tu próximo refugio
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          Imágenes reales de las comodidades y el gran parque forestado pensado para tu total desconexión.
        </p>
      </div>

      <div className={styles.galleryGrid}>
        {IMAGES.map((img, i) => (
          <div
            key={img.id}
            className={styles.galleryItem}
            onClick={() => handleOpen(i)}
            aria-label={`Ver imagen ${img.title}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 33vw"
                className={styles.image}
                priority={i < 2} // Priority for top images to avoid LCP issues
              />
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.overlayTag}>{img.category}</span>
                  <h3 className={styles.overlayTitle}>{img.title}</h3>
                </div>
                <div className={styles.zoomIcon}>
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {index !== null && (
        <div className={styles.lightbox} onClick={handleClose}>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Cerrar galería"
          >
            <X size={24} />
          </button>
          
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={28} />
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={IMAGES[index].src}
                alt={IMAGES[index].alt}
                fill
                sizes="90vw"
                className={styles.lightboxImage}
                priority
              />
            </div>
            <p className={styles.lightboxCaption}>
              <strong>{IMAGES[index].title}</strong> — {IMAGES[index].alt}
            </p>
          </div>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
