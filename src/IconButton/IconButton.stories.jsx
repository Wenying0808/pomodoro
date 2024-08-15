import IconButton from "./IconButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default {
    title:"Components/Icon Button",
    component: IconButton,
    parameters: {
        layout: 'centered',
      },
};

export const Default = {
    args:{
        disabled: false,
        icon: <FontAwesomeIcon icon={faGear}  size="lg"/>,
        tooltipText: "Settings",
        effectDelay: 100,
    }
};

export const Disabled = {
    args:{
        disabled: true,
        icon: <FontAwesomeIcon icon={faGear} size="lg" />,
        tooltipText: "Settings",
        effectDelay: 100,
    }
};