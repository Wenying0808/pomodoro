import React from "react";
import { Tooltip, styled } from '@mui/material';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top" arrow />
))(() => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: '#333', 
    color: '#fff', 
    fontSize: '12px', 
    borderRadius: '4px', 
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', 
    padding: '12px 12px', 
  },
  '& .MuiTooltip-arrow': {
    color: '#333', 
  },
}));

export default CustomTooltip;
