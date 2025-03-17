import type { NavbarProps } from ".";
import Logo from "../Logo";
import DeskNav from "./DeskNav";
import MobileNav from "./MobileNav";

export default function NavbarSkeleton({
    logo,
    slogan,
    pages,
    unitBusinessList,
}: Omit<NavbarProps, 'initialScrolling'>): JSX.Element {
    return (
        <div
            className={`h-20 bg-white 2xl:h-24 inset-x-0 
            top-0 z-50 transition-all duration-300 ease-in-out`}>
            <div className={`mx-auto flex h-full max-w-screen-xl 
            items-center justify-between transition-all duration-300
             ease-in-out md:px-4 lg:items-end`}
            >
                <div
                    className={`z-20 ml-2 flex h-full items-center
                         justify-center transition-all duration-700 
                         ease-in-out scale-115 translate-y-1`}
                >
                    <div className="my-auto h-fit" >
                        <Logo logo={logo} slogan={slogan} />
                    </div>
                </div>
                <div className="hidden place-content-end lg:block">
                    <DeskNav pages={pages} unitBusinessList={unitBusinessList} />
                </div>
                <div className="flex items-center gap-2 lg:hidden">
                    <MobileNav pages={pages} unitBusinessList={unitBusinessList} logo={logo} slogan={slogan} />
                </div>
            </div>
        </div>
    );
}