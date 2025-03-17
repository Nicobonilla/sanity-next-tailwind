"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import "react-toastify/dist/ReactToastify.css"
import Logo from "@/components/global/Logo"
import { useSanityContext } from "@/context/SanityContext"
import { useContactDrawerContext } from "@/context/ContactDrawerContext"
import InputField from "./InputField"
import ServiceSelector from "./ServiceSelector"
import TextAreaField from "./TextAreaField"
import SubmitButton from "./SubmitButton"
import { useContactForm } from "@/hooks/useContactForm"
import type { NavbarProps } from "../Navbar"

export default function ContactForm({ logo, slogan }: Omit<NavbarProps, 'pages' | 'unitBusinessList'>) {
  const { isOpen, closeDrawer } = useContactDrawerContext()
  const { unitBusinessList } = useSanityContext()
  const {
    formData,
    errors,
    touched,
    isLoading,
    formSubmitted,
    selectedServiceDisplay,
    handleFormChange,
    handleBlur,
    handleSubmit,
  } = useContactForm()

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest(".contact-drawer")) {
        closeDrawer()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, closeDrawer])

  // We removed the reset form effect when drawer closes
  // Now form data persists between drawer sessions

  return (
    <div className="relative z-50">
      {/* Overlay background */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        aria-hidden="true"
      />

      {/* Contact drawer */}
      <div
        className={`contact-drawer fixed right-0 top-0 z-50 h-screen overflow-hidden bg-black shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "w-full translate-x-0 sm:w-[480px]" : "w-0 translate-x-full"
          }`}
      >
        <div className="relative h-full overflow-y-auto p-8">
          {/* Close button */}
          <button
            onClick={closeDrawer}
            className="absolute right-4 top-4 rounded-full p-1 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-menuColor2"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="mb-8 flex justify-center text-white">
            <Logo logo={logo} slogan={slogan} />
          </div>

          {/* Form content */}
          <div className="text-white">
            <h3 className="mb-4 text-center font-montserrat text-xl font-light">¿Quieres Recibir más Información?</h3>
            <p className="mb-8 text-center font-robotoslab text-gray-300">
              Nos contactaremos contigo para resolver tus dudas
            </p>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Name field */}
              <InputField
                name="name"
                icon="user"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleFormChange}
                onBlur={() => handleBlur("name")}
                placeholder="Nombre Completo"
                error={touched.name || formSubmitted ? errors.name || "" : ""}
                required
              />

              {/* RUT field */}
              <InputField
                name="rut"
                icon="text"
                type="text"
                id="rut"
                value={formData.rut}
                placeholder="RUT (ej: 12345678-9)"
                onChange={handleFormChange}
                onBlur={() => handleBlur("rut")}
                error={touched.rut || formSubmitted ? errors.rut || "" : ""}
                required
              />

              {/* Phone field */}
              <InputField
                name="phone"
                icon="phone"
                type="tel"
                id="phone"
                value={formData.phone}
                placeholder="Teléfono (ej: +56 9 12345678)"
                onChange={handleFormChange}
                onBlur={() => handleBlur("phone")}
                error={touched.phone || formSubmitted ? errors.phone || "" : ""}
                required
              />

              {/* Email field */}
              <InputField
                name="email"
                icon="mail"
                type="email"
                id="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleFormChange}
                onBlur={() => handleBlur("email")}
                error={touched.email || formSubmitted ? errors.email || "" : ""}
                required
              />

              {/* Comuna field */}
              <InputField
                name="comuna"
                icon="user"
                type="text"
                id="comuna"
                value={formData.comuna}
                placeholder="Comuna"
                onChange={handleFormChange}
                onBlur={() => handleBlur("comuna")}
                error={touched.comuna || formSubmitted ? errors.comuna || "" : ""}
                required
              />

              {/* Service selector */}
              <div className="space-y-1">
                <ServiceSelector
                  unitBusinessList={unitBusinessList}
                  selectedService={selectedServiceDisplay}
                  handleFormChange={handleFormChange}
                />
                {(touched.serviceCategory || formSubmitted) && errors.serviceCategory && (
                  <p className="text-xs text-red-500">{errors.serviceCategory}</p>
                )}
              </div>

              {/* Message field */}
              <TextAreaField
                id="message"
                name="message"
                value={formData.message || ""}
                placeholder="Escribe tu mensaje aquí..."
                onChange={handleFormChange}
                onBlur={() => handleBlur("message")}
                error={touched.message || formSubmitted ? errors.message || "" : ""}
              />

              {/* Submit button */}
              <SubmitButton isLoading={isLoading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

