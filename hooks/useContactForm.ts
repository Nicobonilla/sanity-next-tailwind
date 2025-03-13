"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useContactDrawerContext } from "@/context/ContactDrawerContext"
import { object as zobject, string as zstring, type infer as zinfer, ZodError } from "zod"

// Define Zod schema for form validation
const formSchema = zobject({
  name: zstring().min(3, { message: "El nombre es requerido (mínimo 3 caracteres)" }),
  rut: zstring().refine(
    (value) => {
      // Basic RUT validation (Chilean ID)
      if (!value) return false
      const cleanRut = value.replace(/[.-]/g, "")
      const rutRegex = /^(\d{1,8})([0-9K])$/
      return rutRegex.test(cleanRut)
    },
    { message: "RUT inválido" },
  ),
  phone: zstring().refine(
    (value) => {
      // Chilean phone number validation
      const phoneRegex = /^(\+?56)?(\s?)(9)(\s?)[98765432]\d{7}$/
      return phoneRegex.test(value)
    },
    { message: "Número de teléfono inválido (debe tener 9 dígitos)" },
  ),
  comuna: zstring().min(2, { message: "Comuna es requerida" }),
  email: zstring().email({ message: "Email inválido" }),
  mainCategory: zstring().optional(),
  serviceCategory: zstring().min(1, { message: "Selecciona un servicio" }),
  message: zstring().optional(),
})

// Infer the type from the schema
type TForm = zinfer<typeof formSchema>

// Type for form errors
type TFormErrors = {
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
        // If there's an error parsing, clear the localStorage
        localStorage.removeItem(FORM_STORAGE_KEY)
      }
    }
  }, [])

  // Display text for the selected service
  const selectedServiceDisplay = formData.serviceCategory
    ? `${formData.serviceCategory}${formData.mainCategory ? ` - ${formData.mainCategory}` : ""}`
    : null

  // Validate a single field using Zod
  const validateField = (name: keyof TForm, value: string): string => {
    // Create a partial schema for just this field
    const fieldSchema = zobject({ [name]: formSchema.shape[name] })

    try {
      // Validate just this field
      fieldSchema.parse({ [name]: value })
      return ""
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract the error message for this field
        const fieldError = error.errors.find((err) => err.path[0] === name)
        return fieldError?.message || ""
      }
      return ""
    }
  }

  // Validate all fields using Zod
  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        // Convert Zod errors to our error format
        const newErrors: TFormErrors = {}
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof TForm
          newErrors[field] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  }

  const handleBlur = (name: keyof TForm) => {
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
  }

  const resetForm = () => {
    setFormData(initialForm)
    setErrors(initialErrors)
    setTouched(initialTouched)
    setFormSubmitted(false)
    // Clear localStorage
    localStorage.removeItem(FORM_STORAGE_KEY)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    //trackFormSubmit('submited');

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
  }

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

