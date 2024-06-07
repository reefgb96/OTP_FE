import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState} from "react";
import {UseQueryOptions} from "react-query";

// Custom imports
import {validateEmail} from "../../helpers/regex";
import {QueryRequestNewOTP} from "../../services/API/query.service";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants";
import {PageBase} from "../PagesBase";
import {ForgotPasswordPageEnums, OtpEnums} from "../../enums";

const ForgotPassword = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false);
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);
    
    const options: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined = {
        enabled: false,
        retry: false,
        keepPreviousData: false,
        refetchOnWindowFocus: false,
    }
    const {refetch: generateOTP, isFetching: isGeneratingOtp} = QueryRequestNewOTP(options);
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
        localStorage.setItem(OtpEnums.OTP_KEY, OtpEnums.OTP_VALUE)
        localStorage.setItem(OtpEnums.OTP_EXPIRY_KEY, new Date().getTime().toString())
        !inputError && navigate(ROUTES.VERIFY_OTP)
    }
    const fetchNewOTP = async () => {
        await generateOTP().then((res) => {
            
            if (res.data.data !== null && res.data.result.success) {
                OtpFetchSuccessHandler();
            }
            console.log({res})
        }).catch((err) => {
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
            inputValidation={validateEmail}
            apiCall={QueryRequestNewOTP}
            onSubmit={handleSubmit}
        />
    );
};

export {ForgotPassword};
