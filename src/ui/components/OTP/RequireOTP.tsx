import React from "react";
import { Navigate } from "react-router-dom";
import {getLocalStorageValue} from "../../../helpers/localStorage";
import {OtpEnums} from "../../../enums";

const RequireOTP = ({ children }: { children: JSX.Element }) => {
    const isOtpGenerated: boolean = !!getLocalStorageValue(OtpEnums.OTP_EXPIRY_KEY)
    
    if (!isOtpGenerated) {
        return <Navigate to="/404" />;
    }
    
    return children;
};

export {RequireOTP};
