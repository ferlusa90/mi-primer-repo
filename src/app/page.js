"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Phone, 
  ArrowRight, 
  Check, 
  Wifi, 
  Shield, 
  Waves, 
  Compass, 
  Sparkles, 
  MapPin, 
  Wind, 
  Info,
  Calendar,
  AlertCircle
} from "lucide-react";
import styles from "./page.module.css";
import Gallery from "@/components/Gallery";
import Calculator from "@/components/Calculator";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  const [calculatorValues, setCalculatorValues] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={`${styles.navContainer} container`}>
          <div className={styles.logo} onClick={() => scrollToSection("inicio")} style={{ cursor: "pointer" }}>
            FINCACHO <div className={styles.logoDot} />
          </div>
          <nav>
            <ul className={styles.navList}>
              <li>
                <a href="#caracteristicas" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollToSection("caracteristicas"); }}>
                  Características
                </a>
              </li>
              <li>
                <a href="#tarifas" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollToSection("tarifas"); }}>
                  Tarifas
                </a>
              </li>
              <li>
                <a href="#galeria" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollToSection("galeria"); }}>
                  Galería
                </a>
              </li>
              <li>
                <a href="#cotizador" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollToSection("cotizador"); }}>
                  Simulador
                </a>
              </li>
              <li>
                <a href="#normas" className={styles.navLink} onClick={(e) => { e.preventDefault(); scrollToSection("normas"); }}>
                  Información
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <button className={styles.navCTA} onClick={() => scrollToSection("reservar")}>
              Reservar Ahora
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero} id="inicio">
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/foto2.jpg"
            alt="Fachada de la casa y parque arbolado"
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={`${styles.heroContent} container`}>
          <span className={`${styles.heroBadge} badge`}>ALQUILER TEMPORARIO & MENSUAL</span>
          <h1 className={styles.heroTitle}>
            Disfrutá una casa cómoda, privada y lista para descansar
          </h1>
          <p className={styles.heroSubtitle}>
            El refugio perfecto para tus días libres o estadías largas. Amplio parque forestado, piscina privada y todas las comodidades que necesitás en un entorno seguro y exclusivo.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.btnPrimary} onClick={() => scrollToSection("reservar")}>
              <Phone size={18} /> Consultar disponibilidad
            </button>
            <button className={styles.btnSecondary} onClick={() => scrollToSection("cotizador")}>
              Calcular presupuesto <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Highlights / Features Section */}
      <section className={`${styles.featuresSection} container section-padding`} id="caracteristicas">
        <div className="text-center">
          <span className="badge badge-primary">Comodidades Premium</span>
          <h2 style={{ fontSize: "2.5rem", marginTop: "1rem", marginBottom: "1rem" }}>
            Todo lo necesario para tu confort
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
            Diseñada para ofrecer descanso, comodidad y total privacidad en un entorno natural único.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Waves size={24} />
            </div>
            <h3 className={styles.featureTitle}>Piscina Privada</h3>
            <p className={styles.featureDesc}>
              Amplia piscina exclusiva equipada con área de solárium y reposeras para disfrutar de las tardes de sol en completa calma.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Compass size={24} />
            </div>
            <h3 className={styles.featureTitle}>Parque Forestado</h3>
            <p className={styles.featureDesc}>
              Gran terreno parquizado rodeado de árboles frondosos que garantizan una total privacidad y un contacto directo con la naturaleza.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Sparkles size={24} />
            </div>
            <h3 className={styles.featureTitle}>Quincho y Asador</h3>
            <p className={styles.featureDesc}>
              Espacio semicubierto equipado con una gran parrilla tradicional, asador y mesa amplia para compartir inolvidables comidas.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Wifi size={24} />
            </div>
            <h3 className={styles.featureTitle}>Conectividad & Confort</h3>
            <p className={styles.featureDesc}>
              Servicio de internet de alta velocidad (Wifi) y TV inteligente en el living para que sigas conectado y entretenido.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Wind size={24} />
            </div>
            <h3 className={styles.featureTitle}>Climatización Completa</h3>
            <p className={styles.featureDesc}>
              Aire acondicionado frío/calor en los ambientes principales para asegurar tu bienestar en cualquier época del año.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Shield size={24} />
            </div>
            <h3 className={styles.featureTitle}>Seguridad y Privacidad</h3>
            <p className={styles.featureDesc}>
              Ubicada en una zona residencial muy tranquila, con portón de acceso y cerramiento perimetral que asegura tranquilidad absoluta.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing / Rates Section */}
      <section className={`${styles.pricingBg} section-padding`} id="tarifas">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-accent">Opciones de Alquiler</span>
            <h2 style={{ fontSize: "2.5rem", marginTop: "1rem", marginBottom: "1rem" }}>
              Tarifas Transparentes y Flexibles
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>
              Elegí la modalidad que mejor se adapte a tu plan: estadías de fin de semana, semanas completas o contratos mensuales.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {/* Temporario Card */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingName}>Alquiler Temporario</h3>
                <p className={styles.pricingDesc}>Ideal para escapadas de fin de semana, vacaciones familiares o días de descanso.</p>
                <div className={styles.priceTag}>
                  $31.250 <span className={styles.priceSub}>/ noche (Lunes a Jueves)</span>
                </div>
                <div className={styles.priceTag} style={{ marginTop: "0.5rem", fontSize: "1.8rem" }}>
                  $75.000 <span className={styles.priceSub}>/ noche (Viernes a Domingo)</span>
                </div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> Estancia mínima de 2 noches
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> <strong>Promo 7 noches:</strong> $350.000 <span style={{color: "var(--accent)", fontWeight: 650}}>(Ahorro importante)</span>
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> <strong>Promo 15 noches:</strong> $700.000
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> <strong>Promo 30 noches:</strong> $1.000.000
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> Incluye todos los servicios y piletero
                </li>
              </ul>
              <button className={`${styles.pricingBtn} styles.pricingBtnSecondary`} onClick={() => {
                setCalculatorValues({ rentType: "temporario" });
                scrollToSection("cotizador");
              }}>
                Simular Alquiler Temporario
              </button>
            </div>

            {/* Mensual Card */}
            <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
              <div className={styles.pricingBadge}>Estadía Larga</div>
              <div className={styles.pricingHeader}>
                <h3 className={styles.pricingName}>Alquiler Mensual</h3>
                <p className={styles.pricingDesc}>Para quienes buscan una residencia permanente o prolongada con tarifas exclusivas en pesos.</p>
                <div className={styles.priceTag}>
                  $800.000 <span className={styles.priceSub}>/ mes</span>
                </div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> Contrato mínimo de 3 meses
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> Tarifa corporativa/estudiantil/residencial
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> Inquilino abona luz, agua y wifi
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> Inquilino abona corte de pasto (1 vez/mes)
                </li>
                <li className={styles.pricingFeatureItem}>
                  <Check size={18} className={styles.checkIcon} /> Mantenimiento de pileta a cargo del inquilino
                </li>
              </ul>
              <button className={`${styles.pricingBtn} ${styles.pricingBtnPrimary}`} onClick={() => {
                setCalculatorValues({ rentType: "mensual" });
                scrollToSection("cotizador");
              }}>
                Simular Alquiler Mensual
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <div className="container section-padding">
        <Gallery />
      </div>

      {/* Calculator + Booking Section */}
      <section className={`${styles.pricingBg} section-padding`} style={{ borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className={styles.bookingContainer}>
            <Calculator onValuesChange={setCalculatorValues} />
            <BookingForm calculatorValues={calculatorValues} />
          </div>
        </div>
      </section>

      {/* Important Info / Rules Section */}
      <section className={`${styles.infoBg} section-padding`} id="normas">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-accent" style={{ backgroundColor: "rgba(176, 141, 66, 0.15)" }}>Normas e Información</span>
            <h2 style={{ fontSize: "2.5rem", marginTop: "1rem", marginBottom: "1rem", color: "#fff" }}>
              Términos del Alquiler
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto" }}>
              Para garantizar una buena convivencia y el cuidado de la propiedad, solicitamos leer atentamente las condiciones de ingreso.
            </p>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoBox}>
              <h4><Calendar size={20} /> Modalidad Temporaria</h4>
              <ul className={styles.infoList}>
                <li className={styles.infoListItem}>
                  <Check size={16} className={styles.infoIcon} />
                  <span><strong>Estadía Mínima:</strong> El alquiler temporario requiere una permanencia mínima de 2 noches.</span>
                </li>
                <li className={styles.infoListItem}>
                  <Check size={16} className={styles.infoIcon} />
                  <span><strong>Gastos Incluidos:</strong> Las tarifas por noche incluyen luz, agua, wifi, mantenimiento del parque y piletero en temporada.</span>
                </li>
                <li className={styles.infoListItem}>
                  <Check size={16} className={styles.infoIcon} />
                  <span><strong>Reserva:</strong> Se realiza mediante transferencia y se cancela el saldo restante al ingresar a la propiedad.</span>
                </li>
              </ul>
            </div>

            <div className={styles.infoBox}>
              <h4><Info size={20} /> Modalidad Mensual</h4>
              <ul className={styles.infoList}>
                <li className={styles.infoListItem}>
                  <Check size={16} className={styles.infoIcon} />
                  <span><strong>Contrato Mínimo:</strong> Se requiere un período de alquiler mínimo de 3 meses bajo esta tarifa especial.</span>
                </li>
                <li className={styles.infoListItem}>
                  <Check size={16} className={styles.infoIcon} />
                  <span><strong>Servicios no Incluidos:</strong> El inquilino se hace cargo de abonar luz, agua corriente y el servicio de internet.</span>
                </li>
                <li className={styles.infoListItem}>
                  <Check size={16} className={styles.infoIcon} />
                  <span><strong>Mantenimiento de Parque:</strong> A cargo del inquilino. Se debe coordinar el corte de césped al menos 1 vez al mes.</span>
                </li>
                <li className={styles.infoListItem}>
                  <Check size={16} className={styles.infoIcon} />
                  <span><strong>Temporada de Piscina:</strong> En época de pileta, el inquilino contrata al piletero y costea los productos de limpieza necesarios (cloro, alguicidas, clarificador).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.footerContent} container`}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              FINCACHO <span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              Disfrutá una casa cómoda, privada y lista para descansar. Viví una experiencia premium rodeado de naturaleza con las mejores comodidades.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#fff" }}>
              <MapPin size={16} className={styles.infoIcon} />
              <span>Santiago del Estero, Argentina</span>
            </div>
          </div>

          <div>
            <h5 className={styles.footerLinksTitle}>Secciones</h5>
            <ul className={styles.footerLinks}>
              <li><a href="#inicio" className={styles.footerLink} onClick={(e) => { e.preventDefault(); scrollToSection("inicio"); }}>Inicio</a></li>
              <li><a href="#caracteristicas" className={styles.footerLink} onClick={(e) => { e.preventDefault(); scrollToSection("caracteristicas"); }}>Características</a></li>
              <li><a href="#tarifas" className={styles.footerLink} onClick={(e) => { e.preventDefault(); scrollToSection("tarifas"); }}>Tarifas & Promos</a></li>
              <li><a href="#galeria" className={styles.footerLink} onClick={(e) => { e.preventDefault(); scrollToSection("galeria"); }}>Galería</a></li>
              <li><a href="#cotizador" className={styles.footerLink} onClick={(e) => { e.preventDefault(); scrollToSection("cotizador"); }}>Simulador de Costo</a></li>
            </ul>
          </div>

          <div>
            <h5 className={styles.footerLinksTitle}>Contacto Directo</h5>
            <ul className={styles.footerLinks}>
              <li style={{ color: "#fff", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={14} style={{ color: "var(--accent)" }} /> +54 9 385 599-5145
              </li>
              <li>Consultas por WhatsApp las 24 hs.</li>
              <li>Check-in: 14:00 | Check-out: 10:00</li>
              <li style={{ marginTop: "1rem" }}>
                <button className={styles.navCTA} onClick={() => scrollToSection("reservar")}>
                  Consultar Disponibilidad
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles.footerBottom} container`}>
          <p>&copy; {new Date().getFullYear()} Fincacho. Todos los derechos reservados.</p>
          <p>Desarrollado con Next.js y CSS Vainilla</p>
        </div>
      </footer>
    </>
  );
}
