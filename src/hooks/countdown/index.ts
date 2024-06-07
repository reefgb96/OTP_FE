// React imports
import { useState, useEffect } from 'react';

// Custom imports
import {calculateInitialTimeLeft, getOtpExpiryTime, startCountdown, updateColor} from "../../helpers/OTP";
import {ROUTES} from "../../constants";

const initialTime = getOtpExpiryTime('otpExpiryTime') || 5 * 60;
const useCountdown = (expiryKey: string, expiryDuration: number) => {
    const [time, setTime] = useState<number>(initialTime);
    const [color, setColor] = useState<string>('white');
    
    useEffect(() => {
        const otpExpiryTime = getOtpExpiryTime(expiryKey);
        if (otpExpiryTime !== null) {
            const initialTimeLeft = calculateInitialTimeLeft(otpExpiryTime, expiryDuration);
            setTime(initialTimeLeft);
            const clearIntervalFn = startCountdown(setTime);
            return clearIntervalFn;
        }
    }, [expiryKey, expiryDuration]);
    
    useEffect(() => {
        setColor(updateColor(time));
    }, [time]);
    
    return {
        minutes: Math.floor(time / 60),
        seconds: time % 60,
        color,
    };
};

export default useCountdown;
