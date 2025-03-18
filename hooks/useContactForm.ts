"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useContactDrawerContext } from "@/context/ContactDrawerContext"

// Tipos básicos que necesitamos inmediatamente
export type TForm = {
  name: string;
  rut: string;
  phone: string;
  comuna: string;
  email: string;
  mainCategory: string;
  serviceCategory: string;
  message: string;
}

export type TFormErrors = {
  [key in keyof TForm]?: string
}

const initialForm: TForm = {
  name: "",
  rut: "",
  phone: "",
  comuna: "",
  email: "",
  mainCategory: "",
  serviceCategory: "",
  message: "",
}

const initialErrors: TFormErrors = {}

const initialTouched: Record<keyof TForm, boolean> = {
  name: false,
  rut: false,
  phone: false,
  comuna: false,
  email: false,
  mainCategory: false,
  serviceCategory: false,
  message: false,
}

// Storage key for form data
const FORM_STORAGE_KEY = "contact_form_data"

// Implementación de validación propia sin Zod
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateRut = (rut: string): boolean => {
  if (!rut) return false;
  const cleanRut = rut.replace(/[.-]/g, "");
  const rutRegex = /^(\d{1,8})([0-9K])$/;
  return rutRegex.test(cleanRut);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+?56)?(\s?)(9)(\s?)[98765432]\d{7}$/;
  return phoneRegex.test(phone);
};

export const useContactForm = () => {
  const { closeDrawer } = useContactDrawerContext()
  const router = useRouter()
  const [formData, setFormData] = useState<TForm>(initialForm)
  const [errors, setErrors] = useState<TFormErrors>(initialErrors)
  const [touched, setTouched] = useState<Record<keyof TForm, boolean>>(initialTouched)
  const [isLoading, setIsLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Load saved form data from localStorage on initial mount
  useEffect(() => {
    const savedFormData = localStorage.getItem(FORM_STORAGE_KEY)
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData) as TForm
        setFormData(parsedData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
        localStorage.removeItem(FORM_STORAGE_KEY)
      }
    }
  }, [])

  // Display text for the selected service
  const selectedServiceDisplay = formData.serviceCategory
    ? `${formData.serviceCategory}${formData.mainCategory ? ` - ${formData.mainCategory}` : ""}`
    : null

  // Validate a single field using our custom validation
  const validateField = useCallback((name: keyof TForm, value: string): string => {
    switch(name) {
      case 'name':
        return !value || value.length < 3 ? "El nombre es requerido (mínimo 3 caracteres)" : "";
      
      case 'rut':
        return !validateRut(value) ? "RUT inválido" : "";
      
      case 'phone':
        return !validatePhone(value) ? "Número de teléfono inválido (debe tener 9 dígitos)" : "";
      
      case 'comuna':
        return !value || value.length < 2 ? "Comuna es requerida" : "";
      
      case 'email':
        return !validateEmail(value) ? "Email inválido" : "";
      
      case 'serviceCategory':
        return !value ? "Selecciona un servicio" : "";
      
      default:
        return "";
    }
  }, []);

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors: TFormErrors = {};
    
    // Validar cada campo
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof TForm;
      const error = validateField(fieldName, formData[fieldName] || "");
      
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const fieldName = name as keyof TForm

    const updatedFormData = {
      ...formData,
      [fieldName]: value,
    }

    setFormData(updatedFormData)

    // Save to localStorage on each change
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(updatedFormData))

    // Validate on change if the field has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value)
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }))
    }
  }, [formData, touched, validateField])

  const handleBlur = useCallback((name: keyof TForm) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    // Validate on blur
    const error = validateField(name, formData[name] || "")
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }, [formData, validateField])

  const resetForm = useCallback(() => {
    setFormData(initialForm)
    setErrors(initialErrors)
    setTouched(initialTouched)
    setFormSubmitted(false)
    // Clear localStorage
    localStorage.removeItem(FORM_STORAGE_KEY)
  }, [])

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormSubmitted(true)

    // Mark all fields as touched when submitting
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key as keyof TForm] = true
        return acc
      },
      {} as Record<keyof TForm, boolean>,
    )

    setTouched(allTouched)

    // Validate all fields before submission
    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario")
      return
    }

    setIsLoading(true)

    try {
      const success = await sendEmail(formData)
      if (success) {
        // Only reset the form after successful submission
        resetForm()
        closeDrawer()
        router.push("/blog")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Ha ocurrido un error al enviar el formulario")
    } finally {
      setIsLoading(false)
    }
  }, [formData, validateForm, resetForm, closeDrawer, router])

  return {
    formData,
    errors,
    touched,
    isLoading,
    formSubmitted,
    selectedServiceDisplay,
    handleFormChange,
    handleBlur,
    handleSubmit,
    resetForm,
  }
}

// API service function
async function sendEmail(formData: TForm) {
  try {
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al enviar el email")
    }

    const data = await response.json()
    if (data.status === 200) {
      toast.success("Email enviado correctamente")
      return true
    } else {
      toast.error(data.message || "Error al enviar el email")
      return false
    }
  } catch (error) {
    console.error("Network error:", error)
    toast.error(error instanceof Error ? error.message : "Error de red")
    return false
  }
}