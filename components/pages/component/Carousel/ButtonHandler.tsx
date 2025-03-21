"use client";
import { useEffect } from "react";

export default function ButtonHandler() {
    useEffect(() => {
        const buttons = document.querySelectorAll(".embla_hero .hero-button");

        if (buttons.length > 0) {
            buttons.forEach((button) => {
                button.addEventListener("click", handleClickButton);
            });
        }

        return () => {
            buttons.forEach((button) => {
                button.removeEventListener("click", handleClickButton);
            });
        };
    }, []);

    function handleClickButton(event: Event) {
        console.log("Button clicked:", event.target);
    }

    return null;
}
