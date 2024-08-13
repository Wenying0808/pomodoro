import React from "react";
import { Tooltip, styled } from '@mui/material';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top" arrow />
))(() => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: '#333', // Tooltip background color
    color: '#fff', // Tooltip text color
    fontSize: '12px', // Tooltip text size
    borderRadius: '4px', // Tooltip border radius
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Custom box shadow
    padding: '12px 12px', // Padding inside the tooltip
  },
  '& .MuiTooltip-arrow': {
    color: '#333', // Arrow color to match the tooltip background
  },
}));

export default CustomTooltip;
