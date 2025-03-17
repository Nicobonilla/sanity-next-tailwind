import Overlay from "./Overlay";
import type { NavbarProps } from "..";
import MenuButtonSkeleton from "./MenuButtonSkeleton";
import DrawerContentSk from "./DrawerContentSk";

export default function MobileNavSkeleton({
    pages,
    unitBusinessList,
    logo,
    slogan }: NavbarProps) {

    return (
        <>
            <MenuButtonSkeleton />
            <Overlay isMenuOpen={false} />
            <div >
                <DrawerContentSk
                    isMenuOpen={false}
                    pages={pages}
                    unitBusinessList={unitBusinessList}
                    logo={logo}
                    slogan={slogan}
                />
            </div>
        </>
    );
}