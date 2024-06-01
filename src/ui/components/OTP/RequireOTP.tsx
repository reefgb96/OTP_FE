import React from "react";
import { Navigate } from "react-router-dom";

const RequireOTP = ({ children }: { children: JSX.Element }) => {
    const isOtpGenerated = localStorage.getItem('otpKey') === 'true';
    
    if (!isOtpGenerated) {
        return <Navigate to="/404" />;
    }
    
    return children;
};

export {RequireOTP};
