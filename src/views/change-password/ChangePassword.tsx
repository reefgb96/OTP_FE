import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {UseQueryOptions} from "react-query";

// Custom imports
import {Header} from "../../ui/components/texts";
import {Text} from "../../ui/components/texts/Text";
import {Container} from "./Wrappers";
import {GenericTextInput} from "../../ui/components/Inputs";
import {Button} from "../../ui/components/buttons";
import {validatePassword} from "../../helpers/regex";
import {QueryUpdateUserPassword} from "../../services/API/query.service";
import {ChangePasswordPageEnums, OtpEnums} from "../../enums";
import {PageBase} from "../PagesBase";
import {getLocalStorageValue} from "../../helpers/localStorage";
import {ROUTES} from "../../constants";
import {useNavigate} from "react-router-dom";
import {OtpErrorToast, OtpSuccessToast} from "../../helpers/Toasts";

const ChangePassword = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false);
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);
    const options: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined = {
        enabled: false,
        retry: false,
        keepPreviousData: false,
        refetchOnWindowFocus: false,
    }
    const {refetch: changePassword} = QueryUpdateUserPassword(options, inputValue)
    const {PASSWORD, ERROR_MSG_COLOR, ERROR_MESSAGE, TITLE, SUB_TITLE, PLACEHOLDER, KEY, NAME} = ChangePasswordPageEnums;
    const navigate = useNavigate();
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setInputError(false);
    };
    
    const validateNewPassword = () => {
        const isValidPass: boolean = validatePassword(inputValue);
        if (!isValidPass) {
            setInputError(true);
            return;
        }
    }
    
    const updateUserPass = async () => {
        try {
            await changePassword().then(() =>{
                OtpSuccessToast("Password updated successfully. 😊");
                setInputValue("");
                navigate(ROUTES.FORGOT_PASSWORD);
            })
            
            // Reset input value after successful submission
        } catch (error) {
            OtpErrorToast("Error updating password 😥");
            console.error("Error:", error);
        }
    }
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Check if the input value is a valid email
        validateNewPassword();
        
        // Make a React Query call to the API to generate OTP.
        !inputError && await updateUserPass();
    };
    
    useEffect(() => {
        const otpKey = getLocalStorageValue(OtpEnums.OTP_KEY)
        if (!otpKey) {
            navigate(ROUTES.VERIFY_OTP)
        }
    },[])
    
    return (
        <PageBase
            title={TITLE}
            subTitle={SUB_TITLE}
            placeholder={PLACEHOLDER}
            key={KEY}
            name={NAME}
            inputType={PASSWORD}
            errorMsgColor={ERROR_MSG_COLOR}
            errorMessage={ERROR_MESSAGE}
            onInputChange={handleInputChange}
            inputValidation={validatePassword}
            apiCall={QueryUpdateUserPassword}
            onSubmit={handleSubmit}
            {...{inputValue}}
        />
    );
};

export {ChangePassword};
