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
    const {refetch: changePassword} = QueryUpdateUserPassword(inputValue, options)
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
            alert("OTP generated successfully. Check your email.");
        } catch (error) {
            console.error("Error generating OTP:", error);
            alert("Failed to generate OTP. Please try again later.");
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
        <Container onSubmit={handleSubmit}>
            <Header text={TITLE}/>
            <Text text={SUB_TITLE}/>
            <GenericTextInput
                key={KEY}
                onChange={handleInputChange}
                value={inputValue}
                type={"text"}
                disabled={inputDisabled}
                name={NAME}
                placeholder={PLACEHOLDER}
                error={inputError}
            />
            {
                inputError &&
                <Text text={ERROR_MESSAGE} color={ERROR_MSG_COLOR} />
            }
            <Button type="submit" disabled={!inputValue}>
                Submit
            </Button>
        </Container>
    );
};

export {ChangePassword};
