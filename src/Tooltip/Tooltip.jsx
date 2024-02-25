import React, { useState } from "react";
import './Tooltip.css';

const Tooltip = ({tooltipText, children, delay=100 }) => {
  let timeout;
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setIsVisible(false);
  };

  return (
    <div className="tooltip-div"
    onMouseEnter={showTooltip}
    onMouseLeave={hideTooltip}
    >
    {children}
    {isVisible && <div className="tooltip">{tooltipText}</div>}
    </div>
  );
};

export default Tooltip;
