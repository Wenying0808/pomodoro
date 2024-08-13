import React, { useState }  from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Tooltip } from '@mui/material';
import CustomTooltip from '../Tooltip/customTooltip';
import { ReactComponent as LowPriorityIcon } from './ic_priority_low.svg';
import { ReactComponent as MediumPriorityIcon } from './ic_priority_medium.svg';
import { ReactComponent as HighPriorityIcon } from './ic_priority_high.svg';

export default function PriorityButton({ priority, onPriorityChange }){

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePriorityMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePriorityMenuClose = () => {
        setAnchorEl(null);
    };
    const handlePriorityChange = (newPriority) => {
        onPriorityChange(newPriority);
        handlePriorityMenuClose();
    };
    const open = Boolean(anchorEl);
    const handleClose = () => {
    setAnchorEl(null);
    };

return(
    <div>
        <CustomTooltip title="Set Priority" placement="top" arrow>
            <IconButton onClick={handlePriorityMenuOpen }>
                {priority === "low" && <LowPriorityIcon/>}
                {priority === "medium" && <MediumPriorityIcon/>}
                {priority === "high" && <HighPriorityIcon/>}
            </IconButton>
        </CustomTooltip>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={() => handlePriorityChange('low')}>Low</MenuItem>   
            <MenuItem onClick={() => handlePriorityChange('medium')}>Medium</MenuItem>
            <MenuItem onClick={() => handlePriorityChange('high')}>High</MenuItem>
        </Menu>

    </div>
    
);
}