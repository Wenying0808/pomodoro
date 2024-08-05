import React from 'react';
import { colors } from '../colors/colors';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AlarmIcon from '@mui/icons-material/Alarm';
import ListAltIcon from '@mui/icons-material/ListAlt';


const CustomToggleButton = ({value, onChange}) => {
    return (
        <ToggleButtonGroup size="small" value={value} onChange={onChange} exclusive>
            <ToggleButton 
                value="clock" 
                sx={{ 
                    gap:"8px",
                    color: colors.RoyalBlue,
                    backgroundColor: colors.White,
                    '&:hover':{
                        backgroundColor: colors.Zumtho
                    },
                    '&.Mui-selected': {
                        color: colors.White,
                        backgroundColor: colors.RoyalBlue,
                        '&:hover':{
                        backgroundColor: colors.RoyalBlue
                    },
                    },
                }}
            >
                <AlarmIcon fontSize="small"/>
                Clock
            </ToggleButton>
            <ToggleButton 
                value="tasks" 
                sx={{ 
                    gap:"8px",
                    color: colors.RoyalBlue,
                    backgroundColor: colors.White,
                    '&:hover':{
                        backgroundColor: colors.Zumtho
                    },
                    '&.Mui-selected': {
                        color: colors.White,
                        backgroundColor: colors.RoyalBlue,
                        '&:hover':{
                        backgroundColor: colors.RoyalBlue
                        }
                    },
                }}
            >
                <ListAltIcon fontSize="small"/>
                Tasks
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default CustomToggleButton;