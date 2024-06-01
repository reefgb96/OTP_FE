// React imports
import React from "react";

// Custom imports
import {Tooltip as ReactTooltip} from "react-tooltip";
import {Tooltip as TooltipTheme} from "../../../theme";

const Tooltip = () => {
    return (
        < ReactTooltip id="custom-tooltip"
                       style={{
                           backgroundColor: TooltipTheme.background,
                           color: TooltipTheme.text,
                           borderRadius:"0.5em",
                           padding:"0.625em",
                           zIndex:"999"
                       }}
                       noArrow={true}
                       place={"top"}
                       opacity={1}
        />
    
    );
};
export {Tooltip}
