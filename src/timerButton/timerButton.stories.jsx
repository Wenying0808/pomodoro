import TimerButton from "./timerButton";

import { faPlay } from '@fortawesome/free-solid-svg-icons';


export default {
    title: 'Components/Timer Button',
    component: TimerButton,
};

export const Default = {
    args:{
        icon: faPlay,
        disabled: false,
    }
};