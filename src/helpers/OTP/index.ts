// Helper function to get OTP expiry time from localStorage
import {OtpEnums} from "../../enums";
import {getLocalStorageValue} from "../localStorage";

export const getOtpExpiryTime = (expiryKey: string): number | null => {
    const otpExpiryTime = getLocalStorageValue(expiryKey);
    return otpExpiryTime ? parseInt(otpExpiryTime, 10) : null;
};

// Helper function to calculate the initial time left
export const calculateInitialTimeLeft = (expiryTime: number, expiryDuration: number): number => {
    const now = new Date().getTime();
    const expiryTimestamp = expiryTime + expiryDuration * 60 * 1000;
    const timeLeft = Math.max(0, expiryTimestamp - now);
    return Math.floor(timeLeft / 1000);
};

// Helper function to start the countdown interval
export const startCountdown = (setTime: React.Dispatch<React.SetStateAction<number>>) => {
    const interval = setInterval(() => {
        setTime((prevTime) => {
            if (prevTime <= 1) {
                clearInterval(interval);
                return 0;
            }
            return prevTime - 1;
        });
    }, 1000);
    
    return () => clearInterval(interval);
};

// Helper function to update the color based on the remaining time
export const updateColor = (time: number): string => {
    return time <= 60 ? (time % 2 === 0 ? 'red' : 'white') : 'white';
};

export const getOtpStorageValues = () => {
    const otpExpiryTime = getLocalStorageValue(OtpEnums.OTP_EXPIRY_KEY);
    const otpKey = getLocalStorageValue(OtpEnums.OTP_KEY);
    return {otpExpiryTime, otpKey}
};
