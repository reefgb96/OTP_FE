// React imports
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {UseQueryOptions} from 'react-query';
import {Button} from "../../ui/components/buttons";

// Custom imports
import {Text} from "../../ui/components/texts/Text";
import {GenericTextInput} from "../../ui/components/Inputs";
import {validateEmail, validateOTP, validateOTPInput} from "../../helpers/regex";
import {QueryVerifyOTP} from "../../services/API/query.service";
import useCountdown from '../../hooks/countdown';
import Countdown from "../../ui/components/counters/CountDown";
import {Container} from "../change-password/Wrappers";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants";
import {OtpEnums, VerifyOtpPageEnums} from "../../enums";
import {PageBase} from "../PagesBase";
import {getOtpStorageValues} from "../../helpers/OTP";
import {cleanUpStorage, getLocalStorageValue, setLocalStorageValue} from "../../helpers/localStorage";
import {OtpErrorToast, OtpSuccessToast} from "../../helpers/Toasts";

const VerifyOTP: React.FC = () => {
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const {minutes, seconds, color} = useCountdown(OtpEnums.OTP_EXPIRY_KEY, OtpEnums.OTP_EXPIRY_DURATION);
    
    const options: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined = {
        enabled: false,
        retry: false,
        keepPreviousData: false,
        refetchOnWindowFocus: false,
    }
    const {refetch: verifyOTP} = QueryVerifyOTP(options, otp);
    const navigate = useNavigate();
    
    const {ERROR_MSG_COLOR, ERROR_MESSAGE, PLACEHOLDER, KEY, TITLE, NAME} = VerifyOtpPageEnums;
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const isValidInput: boolean = validateOTP(e.target.value);
        if (!isValidInput) {
            setError(true);
            return;
        }
        
        setError(false);
        setOtp(prev => prev + e.target.value);
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault(); // Prevent default form submission
        
        // Check if the input value is valid.
        isValidOtp();
        
        // Make a React Query call to the API to verify OTP.
        await verifyOTP().then((res) => {
            OtpSuccessToast("OTP Verified. 😁");
            setLocalStorageValue(OtpEnums.OTP_KEY, OtpEnums.OTP_VALUE)
            navigate(ROUTES.CHANGE_PASSWORD);
        }).catch((err) => {
            // Handle errors
            OtpErrorToast("Invalid OTP. 😭");
            navigate(ROUTES.CHANGE_PASSWORD);
        });
    };

    
    
    const isValidOtp = () => {
        const isValid = validateOTP(otp);
        if (!isValid) {
            setError(true);
            return;
        }
    }
    
    const verifyTime = (): void => {
        if (minutes == 0 && seconds == 0) {
            cleanUpStorage();
            navigate(ROUTES.FORGOT_PASSWORD);
        }
    };
    
    const verifyOTPKey = (): void => {
        const isExpiryKey: boolean = !!getLocalStorageValue(OtpEnums.OTP_EXPIRY_KEY)
        if (!isExpiryKey) {
            cleanUpStorage();
            navigate(ROUTES.FORGOT_PASSWORD);
        }
    };
    
    useEffect(() => {
        console.log({minutes, seconds})
        verifyOTPKey();
        verifyTime();
    }, [seconds]);
    
    return (
        <PageBase
            title={TITLE}
            placeholder={PLACEHOLDER}
            key={KEY}
            name={NAME}
            inputType={"number"}
            errorMsgColor={ERROR_MSG_COLOR}
            errorMessage={ERROR_MESSAGE}
            onInputChange={handleChange}
            inputValidation={validateOTP}
            apiCall={QueryVerifyOTP}
            renderCountdown
            onSubmit={handleSubmit}
            inputValue={otp}
        />
    );
};

export {VerifyOTP};
