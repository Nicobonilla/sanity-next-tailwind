import { useDrawerNavContext } from "@/context/DrawerNavContext";
import { useEffect, useRef } from "react";
import MenuButton from "./MenuButton";
import Overlay from "./Overlay";
import DrawerContent from "./DrawerContent";
import type { NavbarProps } from "..";

export default function MobileNavClient({
    pages,
    unitBusinessList,
    logo,
    slogan }: NavbarProps) {
    const { isOpen, closeDrawer, toggleDrawerNav } = useDrawerNavContext();
    const drawerRef = useRef<HTMLDivElement>(null);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Don't close if clicking inside drawer or on menu button
            if (
                drawerRef.current?.contains(e.target as Node) ||
                (e.target as HTMLElement).closest('.menu-button')
            ) {
                return;
            }
            closeDrawer();
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closeDrawer]);
    return (
        <>
            <MenuButton isMenuOpen={isOpen} toggleMenu={toggleDrawerNav} />
            <Overlay isMenuOpen={isOpen} />
            <div ref={drawerRef}>
                <DrawerContent
                    isMenuOpen={isOpen}
                    pages={pages}
                    unitBusinessList={unitBusinessList}
                    logo={logo}
                    slogan={slogan}
                    closeMenu={closeDrawer}
                />
            </div>
        </>
    );
}