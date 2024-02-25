import NavItem from "./navItem";
import { faClock } from '@fortawesome/free-solid-svg-icons';


export default {
    title: 'NavItem',
    component: NavItem,
};

export const Default = {
    args:{
        icon: faClock,
        label: 'Timer',
        active: true,
    }
};