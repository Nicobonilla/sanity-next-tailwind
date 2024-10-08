import { NavProps } from "@/types";
import DropDownSlow from "./DropDownSlow";
import DrawerNAv from './DrawerNav'

const MobileNav : React.FC<NavProps> = ({ links }) => {
    return <DrawerNAv links={links}/>

}
export default MobileNav;