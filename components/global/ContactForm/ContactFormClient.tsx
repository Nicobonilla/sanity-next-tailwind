"use client";

import { Suspense, useEffect, useState } from "react";
import { useSanityContext } from "@/context/SanityContext";
import { useContactDrawerContext } from "@/context/ContactDrawerContext";
import { useContactForm } from "@/hooks/useContactForm";
import type { NavbarProps } from "../Navbar";
import dynamic from "next/dynamic";
import { ContactFormSkeleton } from "./ContactFormSkeleton";

const LazyFormComponents = dynamic(() => import("./FormComponents"), { ssr: false });

export default function ContactFormClient({ logo, slogan }: Omit<NavbarProps, "pages" | "unitBusinessList">) {
    const { isOpen, closeDrawer } = useContactDrawerContext();
    const { unitBusinessList } = useSanityContext();
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
    } = useContactForm();

    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        if (isOpen && !shouldLoad) setShouldLoad(true);
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isOpen && !(e.target as Element)?.closest(".contact-drawer")) closeDrawer();
        }; if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeDrawer]);

    useEffect(() => {
        if (isOpen) {
            const firstFocusable = document.querySelector(".contact-drawer button") as HTMLElement;
            firstFocusable?.focus();
        }
    }, [isOpen]);

    return (
        <div className="relative z-50">
            <div
                className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                aria-hidden="true"
            />
            <div
                className={`contact-drawer fixed right-0 top-0 z-50 h-screen w-full sm:w-[480px] overflow-hidden bg-black shadow-lg ${isOpen ? "open" : ""
                    }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-form-title"
            >
                {shouldLoad && (
                    <Suspense fallback={<div className="p-8"><ContactFormSkeleton /></div>}>
                        <LazyFormComponents
                            logo={logo}
                            slogan={slogan}
                            unitBusinessList={unitBusinessList}
                            formData={formData}
                            errors={errors}
                            touched={touched}
                            isLoading={isLoading}
                            formSubmitted={formSubmitted}
                            selectedServiceDisplay={selectedServiceDisplay}
                            handleFormChange={handleFormChange}
                            handleBlur={handleBlur}
                            handleSubmit={handleSubmit}
                            closeDrawer={closeDrawer}
                        />
                    </Suspense>
                )}
            </div>
        </div>
    );
}