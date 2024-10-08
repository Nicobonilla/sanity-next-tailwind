import { NavProps } from "@/types";
import Simple from "./Simple";
import SubsectionsFullWidth from './SubsectionsFullWidth'


const DeskNav: React.FC<NavProps> = ({ links }) => {
    return <>
        {/* <Simple links={links} /> */}
        <SubsectionsFullWidth links={links}/>
    </>

}
export default DeskNav;