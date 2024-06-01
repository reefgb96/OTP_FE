// React imports
import React from "react";
import {CgSpinnerTwoAlt} from "react-icons/cg";

// Custom Imports
import {IconProps} from "../types/components/icons";
import {Colors} from "./Theme";

// Spinner
const IconSpinner = (props: IconProps) => (
    <CgSpinnerTwoAlt
        color={handleIconColor(props)}
        size={handleIcoSize(props)}
        title={handleIconTitle(props)}
    />
);


const handleIconColor = (props: IconProps) => props?.color || Colors.iconDefaultColor;
const handleIcoSize = (props: IconProps) => props?.size || "20px";
const handleIconTitle = (props: IconProps) => props?.title || "";

export {IconSpinner}
