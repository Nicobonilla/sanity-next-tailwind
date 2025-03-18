import Overlay from "./Overlay";
import MenuButtonSkeleton from "./MenuButtonSkeleton";
import DrawerContentSk from "./DrawerContentSk";

export default function MobileNavSkeleton() {

    return (
        <>
            <MenuButtonSkeleton />
            <Overlay isMenuOpen={false} />
            <div >
                <DrawerContentSk
                    isMenuOpen={false}
                />
            </div>
        </>
    );
}