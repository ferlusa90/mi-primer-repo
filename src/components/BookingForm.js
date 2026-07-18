"use client";

import { useState, useEffect } from "react";
import { MessageSquare, User, Phone, Users, CheckSquare } from "lucide-react";
import styles from "./BookingForm.module.css";

export default function BookingForm({ calculatorValues }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    rentType: "temporario",
    startDate: "",
    endDate: "",
    nights: 2,
    months: 3,
    guests: 2,
    hasChildren: false,
    hasPets: false,
    comments: "",
  });

  const [errors, setErrors] = useState({});

  // Sync form with calculator values when they change
  useEffect(() => {
    if (calculatorValues) {
      setFormData((prev) => ({
        ...prev,
        rentType: calculatorValues.rentType || prev.rentType,
        startDate: calculatorValues.startDate || prev.startDate,
        endDate: calculatorValues.endDate || prev.endDate,
        nights: calculatorValues.nights || prev.nights,
        months: calculatorValues.months || prev.months,
      }));
    }
  }, [calculatorValues]);

  // Recalculate nights if dates change in the form
  useEffect(() => {
    if (formData.rentType === "temporario" && formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = end - start;
      const calculatedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (calculatedNights > 0 && calculatedNights !== formData.nights) {
        setFormData((prev) => ({ ...prev, nights: calculatedNights }));
      }
    }
  }, [formData.startDate, formData.endDate, formData.rentType, formData.nights]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "El nombre es obligatorio.";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
    if (formData.rentType === "temporario") {
      if (!formData.startDate) newErrors.startDate = "Fecha de ingreso obligatoria.";
      if (!formData.endDate) newErrors.endDate = "Fecha de salida obligatoria.";
      if (formData.nights < 2) newErrors.endDate = "Estadía mínima de 2 noches.";
    } else {
      if (!formData.startDate) newErrors.startDate = "Fecha de ingreso obligatoria.";
      if (formData.months < 3) newErrors.months = "Estadía mínima de 3 meses.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Formatting values for message
    const formattedStartDate = formData.startDate.split("-").reverse().join("/");
    const formattedEndDate = formData.rentType === "temporario" && formData.endDate
      ? formData.endDate.split("-").reverse().join("/")
      : "";

    const whatsappNumber = "5493855995145"; // argentina format (+54 9 385 599-5145)

    // Build the message
    let message = `Hola, quiero consultar por la casa.
*Nombre y Apellido:* ${formData.fullName}
*Teléfono:* ${formData.phone}
*Tipo de Alquiler:* ${formData.rentType === "temporario" ? "Temporario" : "Mensual"}
*Fecha de Ingreso:* ${formattedStartDate}`;

    if (formData.rentType === "temporario") {
      message += `\n*Fecha de Salida:* ${formattedEndDate}
*Cantidad de Noches:* ${formData.nights} noches`;
    } else {
      message += `\n*Cantidad de Meses:* ${formData.months} meses`;
    }

    message += `\n*Cantidad de Personas:* ${formData.guests}
*¿Viene con niños?:* ${formData.hasChildren ? "Sí" : "No"}
*¿Viene con mascotas?:* ${formData.hasPets ? "Sí" : "No"}`;

    // Add estimated price if it matches calculator values
    if (calculatorValues && !calculatorValues.error && calculatorValues.finalPrice) {
      const formattedPrice = calculatorValues.rentType === "temporario"
        ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(calculatorValues.finalPrice)
        : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(calculatorValues.finalPrice);
      
      message += `\n*Presupuesto Estimado:* ${formattedPrice}`;
    }

    if (formData.comments.trim()) {
      message += `\n*Comentarios:* ${formData.comments}`;
    }

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={styles.formCard} id="reservar">
      <div className={styles.titleSection}>
        <span className="badge badge-primary">Reserva Inmediata</span>
        <h3>Enviar Consulta</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
          Completá tus datos y recibí una respuesta directa en tu WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="fullName">
              <User size={14} style={{ marginRight: "4px" }} /> Nombre y Apellido
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={styles.input}
              placeholder="Ej. Juan Pérez"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className={styles.errorMsg}>{errors.fullName}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="phone">
              <Phone size={14} style={{ marginRight: "4px" }} /> Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={styles.input}
              placeholder="Ej. +54 9 385 123456"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className={styles.errorMsg}>{errors.phone}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="rentType">
              Tipo de Alquiler
            </label>
            <select
              id="rentType"
              name="rentType"
              className={styles.select}
              value={formData.rentType}
              onChange={handleChange}
            >
              <option value="temporario">Temporario (mínimo 2 noches)</option>
              <option value="mensual">Mensual (mínimo 3 meses)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="startDate">
              Fecha de Ingreso
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className={styles.input}
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.startDate && <p className={styles.errorMsg}>{errors.startDate}</p>}
          </div>

          {formData.rentType === "temporario" ? (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="endDate">
                  Fecha de Salida
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className={styles.input}
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || new Date().toISOString().split("T")[0]}
                />
                {errors.endDate && <p className={styles.errorMsg}>{errors.endDate}</p>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Noches Calculadas
                </label>
                <input
                  type="text"
                  className={styles.input}
                  value={`${formData.nights} noches`}
                  disabled
                  style={{ opacity: 0.8, backgroundColor: "var(--border-color)" }}
                />
              </div>
            </>
          ) : (
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="months">
                Cantidad de Meses
              </label>
              <select
                id="months"
                name="months"
                className={styles.select}
                value={formData.months}
                onChange={handleChange}
              >
                {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                  <option key={m} value={m}>
                    {m} meses
                  </option>
                ))}
              </select>
              {errors.months && <p className={styles.errorMsg}>{errors.months}</p>}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="guests">
              <Users size={14} style={{ marginRight: "4px" }} /> Cantidad de Personas
            </label>
            <select
              id="guests"
              name="guests"
              className={styles.select}
              value={formData.guests}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                <option key={g} value={g}>
                  {g} {g === 1 ? "persona" : "personas"}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup} style={{ justifyContent: "center" }}>
            <span className={styles.label}>Opciones Adicionales</span>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="hasChildren"
                  className={styles.checkbox}
                  checked={formData.hasChildren}
                  onChange={handleChange}
                />
                Vengo con niños
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="hasPets"
                  className={styles.checkbox}
                  checked={formData.hasPets}
                  onChange={handleChange}
                />
                Vengo con mascotas
              </label>
            </div>
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label} htmlFor="comments">
              Comentarios o Consultas Adicionales
            </label>
            <textarea
              id="comments"
              name="comments"
              className={styles.textarea}
              placeholder="Ej. consultas sobre horarios de entrada/salida, requerimientos específicos..."
              value={formData.comments}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className={styles.whatsappBtn}>
          <MessageSquare size={20} /> Enviar consulta por WhatsApp
        </button>
      </form>
    </div>
  );
}
