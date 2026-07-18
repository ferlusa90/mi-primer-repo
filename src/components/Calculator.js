"use client";

import { useState, useEffect } from "react";
import { Calendar, AlertCircle, TrendingDown, ArrowRight } from "lucide-react";
import styles from "./Calculator.module.css";

// Helper to format currency in ARS
const formatARS = (amount) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function Calculator({ onValuesChange }) {
  const [rentType, setRentType] = useState("temporario");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nights, setNights] = useState(2);
  const [months, setMonths] = useState(3);
  const [calculation, setCalculation] = useState(null);

  // Set default dates: tomorrow and day after tomorrow
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(tomorrow.getDate() + 2); // default 2 nights

    setStartDate(tomorrow.toISOString().split("T")[0]);
    setEndDate(dayAfter.toISOString().split("T")[0]);
  }, []);

  // Calculate nights based on dates
  useEffect(() => {
    if (!startDate || !endDate || rentType !== "temporario") return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const calculatedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (calculatedNights > 0) {
      setNights(calculatedNights);
    } else {
      setNights(0);
    }
  }, [startDate, endDate, rentType]);

  // Recalculate price whenever inputs change
  useEffect(() => {
    if (rentType === "temporario") {
      if (nights < 2) {
        setCalculation({ error: "La estadía mínima para alquiler temporario es de 2 noches." });
        if (onValuesChange) onValuesChange({ rentType, error: true });
        return;
      }

      // Calculate weekdays (Mon-Thu nights) and weekends (Fri, Sat, Sun nights)
      let current = new Date(startDate || new Date());
      let weekdays = 0;
      let weekends = 0;

      for (let i = 0; i < nights; i++) {
        const day = current.getDay(); // 0 is Sunday, 1-4 is Mon-Thu, 5 is Friday, 6 is Saturday
        // Viernes (5), Sábado (6) y Domingo (0) son de fin de semana.
        // Lunes (1), Martes (2), Miércoles (3) y Jueves (4) son días de semana.
        if (day === 5 || day === 6 || day === 0) {
          weekends++;
        } else {
          weekdays++;
        }
        current.setDate(current.getDate() + 1);
      }

      // Rates: Weekday $60.000, Weekend $75.000
      const standardRate = weekdays * 60000 + weekends * 75000;

      // Promo logic
      // 30 nights: $1.000.000
      // 15 nights: $700.000
      // 7 nights: $350.000
      
      let promoApplied = "";
      let finalPrice = 0;
      let breakdown = [];
      let savings = 0;

      // Calculate using greedy promo blocks
      let remainingNights = nights;
      let count30 = Math.floor(remainingNights / 30);
      remainingNights %= 30;

      let count15 = Math.floor(remainingNights / 15);
      remainingNights %= 15;

      let count7 = Math.floor(remainingNights / 7);
      remainingNights %= 7;

      // For the leftover nights, calculate their individual weekday/weekend rates
      let leftoverWeekdays = 0;
      let leftoverWeekends = 0;
      let tempDate = new Date(startDate || new Date());
      // Fast forward past the promo blocks
      tempDate.setDate(tempDate.getDate() + (nights - remainingNights));
      for (let i = 0; i < remainingNights; i++) {
        const day = tempDate.getDay();
        if (day === 5 || day === 6 || day === 0) {
          leftoverWeekends++;
        } else {
          leftoverWeekdays++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }
      
      const leftoverCost = leftoverWeekdays * 60000 + leftoverWeekends * 75000;

      // Total promo cost
      const promoCost = (count30 * 1000000) + (count15 * 700000) + (count7 * 350000) + leftoverCost;

      // Choose the cheaper option between pure standard rate or promo block combinations
      if (promoCost < standardRate) {
        finalPrice = promoCost;
        savings = standardRate - promoCost;

        if (count30 > 0) breakdown.push({ label: `${count30}x Promo 30 noches`, value: count30 * 1000000 });
        if (count15 > 0) breakdown.push({ label: `${count15}x Promo 15 noches`, value: count15 * 700000 });
        if (count7 > 0) breakdown.push({ label: `${count7}x Promo 7 noches`, value: count7 * 350000 });
        if (remainingNights > 0) {
          breakdown.push({
            label: `${remainingNights} noches adicionales (${leftoverWeekdays} háb. / ${leftoverWeekends} fin de sem.)`,
            value: leftoverCost
          });
        }
        promoApplied = "Promoción combinada automática";
      } else {
        finalPrice = standardRate;
        breakdown.push({ label: `${weekdays} noches de Lunes a Jueves`, value: weekdays * 60000 });
        breakdown.push({ label: `${weekends} noches de Viernes a Domingo`, value: weekends * 75000 });
      }

      // Check for suggestions to buy more nights to save money (Smart Recommendations)
      let suggestion = null;

      // Suggest 7 nights if current is 4, 5, 6 nights and it is cheaper
      if (nights >= 3 && nights < 7) {
        const nextPromoPrice = 350000;
        if (nextPromoPrice < finalPrice) {
          suggestion = {
            targetNights: 7,
            savings: finalPrice - nextPromoPrice,
            text: `¡Agregá ${7 - nights} noche(s) más para acceder a la Promo de 7 noches por ${formatARS(nextPromoPrice)} y ahorrá ${formatARS(finalPrice - nextPromoPrice)}!`
          };
        }
      } 
      // Suggest 15 nights if staying 12, 13, 14 nights and 15 is cheaper
      else if (nights >= 10 && nights < 15) {
        const nextPromoPrice = 700000;
        const currentBestWith7 = 350000 + (getStandardPriceForLeftover(startDate, 7, nights - 7));
        const effectivePrice = Math.min(finalPrice, currentBestWith7);
        if (nextPromoPrice < effectivePrice) {
          suggestion = {
            targetNights: 15,
            savings: effectivePrice - nextPromoPrice,
            text: `¡Reservando 15 noches pagás la Promo de ${formatARS(nextPromoPrice)} y ahorrás ${formatARS(effectivePrice - nextPromoPrice)} en comparación con ${nights} noches!`
          };
        }
      }
      // Suggest 30 nights if staying 22 to 29 nights and 30 is cheaper
      else if (nights >= 20 && nights < 30) {
        const nextPromoPrice = 1000000;
        if (nextPromoPrice < finalPrice) {
          suggestion = {
            targetNights: 30,
            savings: finalPrice - nextPromoPrice,
            text: `¡Reservando 30 noches (1 mes entero) pagás ${formatARS(nextPromoPrice)} y ahorrás ${formatARS(finalPrice - nextPromoPrice)} en comparación con tu estadía de ${nights} noches!`
          };
        }
      }

      const result = {
        rentType,
        nights,
        weekdays,
        weekends,
        standardRate,
        finalPrice,
        breakdown,
        savings,
        promoApplied,
        suggestion,
        startDate,
        endDate
      };
      
      setCalculation(result);
      if (onValuesChange) onValuesChange(result);

    } else {
      // Monthly rent
      if (months < 3) {
        setCalculation({ error: "La estadía mínima para alquiler mensual es de 3 meses." });
        if (onValuesChange) onValuesChange({ rentType, error: true });
        return;
      }

      const pricePerMonth = 800000; // $800.000 ARS per month
      const finalPrice = pricePerMonth * months;
      const breakdown = [
        { label: `${months} meses de alquiler (Bajo Contrato)`, value: finalPrice }
      ];

      const result = {
        rentType,
        months,
        pricePerMonth,
        finalPrice,
        breakdown,
        startDate
      };

      setCalculation(result);
      if (onValuesChange) onValuesChange(result);
    }
  }, [rentType, startDate, endDate, nights, months]);

  // Helper function to calculate standard rates for suggestions
  function getStandardPriceForLeftover(startStr, offset, numNights) {
    let date = new Date(startStr || new Date());
    date.setDate(date.getDate() + offset);
    let w = 0, we = 0;
    for (let i = 0; i < numNights; i++) {
      const d = date.getDay();
      if (d === 5 || d === 6 || d === 0) we++; else w++;
      date.setDate(date.getDate() + 1);
    }
    return w * 60000 + we * 75000;
  }

  const handleTabChange = (type) => {
    setRentType(type);
  };

  const scrollToForm = () => {
    const element = document.getElementById("reservar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.calculatorCard} id="cotizador">
      <div className="text-center" style={{ marginBottom: "2rem" }}>
        <span className="badge badge-accent">Simulador de Costos</span>
        <h3 style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
          Calculá tu estadía
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Seleccioná tus fechas u opciones y estimá el valor del alquiler al instante.
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${rentType === "temporario" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("temporario")}
        >
          Alquiler Temporario
        </button>
        <button
          className={`${styles.tabBtn} ${rentType === "mensual" ? styles.activeTab : ""}`}
          onClick={() => handleTabChange("mensual")}
        >
          Alquiler Mensual (Contrato)
        </button>
      </div>

      <div className={styles.gridInputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Calendar size={16} /> Fecha de Ingreso
          </label>
          <input
            type="date"
            className={styles.input}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {rentType === "temporario" ? (
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <Calendar size={16} /> Fecha de Salida
            </label>
            <input
              type="date"
              className={styles.input}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split("T")[0]}
            />
          </div>
        ) : (
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Cantidad de Meses (Contrato de Mín. 3)
            </label>
            <select
              className={styles.select}
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
            >
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                <option key={m} value={m}>
                  {m} meses
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {calculation?.error ? (
        <div className={styles.resultsSection} style={{ border: "1px solid #fca5a5", backgroundColor: "#fef2f2" }}>
          <p className={styles.errorText}>{calculation.error}</p>
        </div>
      ) : calculation ? (
        <div className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultTitle}>Presupuesto Estimado</span>
            <div className={styles.price}>
              {formatARS(calculation.finalPrice)}
              <span className={styles.priceUnit}>
                {rentType === "temporario" ? ` / ${nights} noches` : ` / ${months} meses`}
              </span>
            </div>
          </div>

          {calculation.savings > 0 && (
            <div className={styles.promoAlert}>
              <TrendingDown size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong>¡Descuento Promocional Aplicado!</strong> Has ahorrado{" "}
                <span className={styles.promoSavings}>{formatARS(calculation.savings)}</span> en comparación con las tarifas diarias estándar.
              </div>
            </div>
          )}

          {calculation.suggestion && (
            <div className={styles.promoAlert} style={{ borderColor: "#b08d42", backgroundColor: "#fdfbfa" }}>
              <TrendingDown size={18} style={{ flexShrink: 0, marginTop: "2px", color: "var(--accent)" }} />
              <div style={{ color: "var(--primary)" }}>
                <strong>Sugerencia de Ahorro:</strong> {calculation.suggestion.text}
              </div>
            </div>
          )}

          <div className={styles.breakdown}>
            <span style={{ fontWeight: 600, color: "var(--primary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Detalle del cálculo:</span>
            {calculation.breakdown.map((item, idx) => (
              <div key={idx} className={styles.breakdownRow}>
                <span>{item.label}</span>
                <span>{formatARS(item.value)}</span>
              </div>
            ))}
            <div className={styles.breakdownTotal}>
              <span>Total Estimado</span>
              <span>
                {formatARS(calculation.finalPrice)}
              </span>
            </div>
          </div>

          <button className={styles.actionBtn} onClick={scrollToForm}>
            Reservar con esta cotización <ArrowRight size={18} />
          </button>

          <p className={styles.disclaimer}>
            <AlertCircle size={14} /> Los precios son orientativos y quedan sujetos a confirmación por WhatsApp según la temporada. En mensual, no incluye servicios ni mantenimiento. Alquiler mensual formalizado bajo contrato.
          </p>
        </div>
      ) : null}
    </div>
  );
}
