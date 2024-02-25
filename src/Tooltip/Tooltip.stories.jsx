import Tooltip from "./Tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';


export default {
    title:"Tooltip",
    component: Tooltip,
    parameters: {
        layout: 'centered',
      },
};


export const Default = {
    args:{
        tooltipText: "Tooltip content...",
        children: <FontAwesomeIcon icon={faGear} size="lg"/>,
    }
}