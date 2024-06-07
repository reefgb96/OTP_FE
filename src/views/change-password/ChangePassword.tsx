import React, {ChangeEvent, FormEvent, useState} from "react";
import {UseQueryOptions} from "react-query";

// Custom imports
import {Header} from "../../ui/components/texts";
import {Text} from "../../ui/components/texts/Text";
import {Container} from "./Wrappers";
import {GenericTextInput} from "../../ui/components/Inputs";
import {Button} from "../../ui/components/buttons";
import {validatePassword} from "../../helpers/regex";
import {QueryUpdateUserPassword} from "../../services/API/query.service";
import {ChangePasswordPageEnums} from "../../enums";
import {PageBase} from "../PagesBase";

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
    const {ERROR_MSG_COLOR, ERROR_MESSAGE, TITLE, SUB_TITLE, PLACEHOLDER, KEY, NAME} = ChangePasswordPageEnums;
    
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
            await changePassword();
            
            // Reset input value after successful submission
            setInputValue("");
        } catch (error) {
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
            inputValidation={validatePassword}
            apiCall={QueryUpdateUserPassword}
            onSubmit={handleSubmit}
        />
    );
};

export {ChangePassword};
