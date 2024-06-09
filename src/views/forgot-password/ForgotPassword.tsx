// React imports
import React, {ChangeEvent, FormEvent, useState} from "react";
import {UseQueryOptions} from "react-query";

// Custom imports
import {validateEmail} from "../../helpers/regex";
import {QueryRequestNewOTP} from "../../services/API/query.service";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants";
import {PageBase} from "../PagesBase";
import {ForgotPasswordPageEnums, OtpEnums} from "../../enums";
import {setLocalStorageValue} from "../../helpers/localStorage";
import {toast} from "react-toastify";
import {OtpErrorToast, OtpSuccessToast} from "../../helpers/Toasts";

const ForgotPassword = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false);
    
    const options: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined = {
        enabled: false,
        retry: false,
        keepPreviousData: false,
        refetchOnWindowFocus: false,
    }
    const {refetch: generateOTP } = QueryRequestNewOTP(options, inputValue);
    const {KEY, ERROR_MSG_COLOR, ERROR_MESSAGE, NAME, PLACEHOLDER, TITLE, SUB_TITLE} = ForgotPasswordPageEnums;
    const navigate = useNavigate();
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    
    const isValidEmail = () => {
        const isValidEmail = validateEmail(inputValue);
        if (!isValidEmail) {
            setInputError(true);
            return;
        }
    }
    
    const OtpFetchSuccessHandler = () => {
        OtpSuccessToast("OTP sent successfully");
        setLocalStorageValue(OtpEnums.USER_EMAIL, inputValue)
        setLocalStorageValue(OtpEnums.OTP_EXPIRY_KEY, new Date().getTime().toString())
        !inputError && navigate(ROUTES.VERIFY_OTP)
    }
    const fetchNewOTP = async () => {
        await generateOTP().then((res) => {
            
            if (res.data.data !== null && res.data.result.success) {
                OtpFetchSuccessHandler();
            }
            console.log({res})
        }).catch((err) => {
            OtpErrorToast("Error sending OTP 😥");
            console.log({err})
        })
    }
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Check if the input value is a valid email.
        isValidEmail();
        
        // Make a React Query call to the API to generate OTP.
        await fetchNewOTP();
    };
    
    return (
        <PageBase
            title={TITLE}
            subTitle={SUB_TITLE}
            placeholder={PLACEHOLDER}
            key={KEY}
            name={NAME}
            errorMsgColor={ERROR_MSG_COLOR}
            errorMessage={ERROR_MESSAGE}
            onInputChange={handleInputChange}
            inputValue={inputValue}
            inputValidation={validateEmail}
            apiCall={QueryRequestNewOTP}
            onSubmit={handleSubmit}
        />
    );
};

export {ForgotPassword};
