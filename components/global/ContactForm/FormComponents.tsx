"use client";

import { X } from "lucide-react";
import Logo from "@/components/global/Logo";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SubmitButton from "./SubmitButton";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { TForm, TFormErrors } from "@/hooks/useContactForm";
import { ServiceSelectorSkeleton } from "./ContactFormSkeleton";

const LazyServiceSelector = dynamic(() => import("./ServiceSelector"), { ssr: false });

type Props = {
    logo: string;
    slogan: string;
    unitBusinessList: any[];
    formData: TForm;
    errors: TFormErrors;
    touched: Record<keyof TForm, boolean>;
    isLoading: boolean;
    formSubmitted: boolean;
    selectedServiceDisplay: string | null;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleBlur: (name: keyof TForm) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    closeDrawer: () => void;
};

export default function FormComponents({
    logo,
    slogan,
    unitBusinessList,
    formData,
    errors,
    touched,
    isLoading,
    formSubmitted,
    selectedServiceDisplay,
    handleFormChange,
    handleBlur,
    handleSubmit,
    closeDrawer,
}: Props) {
    return (
        <div className="relative h-full overflow-y-auto p-8">
            <button
                onClick={closeDrawer}
                className="absolute right-4 top-4 rounded-full p-1 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-menuColor2"
                aria-label="Cerrar"
            >
                <X size={24} />
            </button>

            <div className="mb-8 flex justify-center text-white">
                <Logo logo={logo} slogan={slogan} />
            </div>

            <div className="text-white">
                <h3 id="contact-form-title" className="mb-4 text-center font-montserrat text-xl font-light">
                    ¿Quieres Recibir más Información?
                </h3>
                <p className="mb-8 text-center font-robotoslab text-gray-300">
                    Nos contactaremos contigo para resolver tus dudas
                </p>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                    <div className="space-y-1">
                        <Suspense fallback={<ServiceSelectorSkeleton />}>
                            <LazyServiceSelector
                                unitBusinessList={unitBusinessList}
                                selectedService={selectedServiceDisplay}
                                handleFormChange={handleFormChange}
                            />
                        </Suspense>
                        {(touched.serviceCategory || formSubmitted) && errors.serviceCategory && (
                            <p className="text-xs text-red-500">{errors.serviceCategory}</p>
                        )}
                    </div>
                    <TextAreaField
                        id="message"
                        name="message"
                        value={formData.message || ""}
                        placeholder="Escribe tu mensaje aquí..."
                        onChange={handleFormChange}
                        onBlur={() => handleBlur("message")}
                        error={touched.message || formSubmitted ? errors.message || "" : ""}
                    />
                    <SubmitButton isLoading={isLoading} />
                </form>
            </div>
        </div>
    );
}