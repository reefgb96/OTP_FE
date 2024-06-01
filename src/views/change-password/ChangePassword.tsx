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
            <Header text={"Change Password"}/>
            <Text text={"Enter a new password."}/>
            <Text text={"Try to remember it this time...."}/>
            <GenericTextInput
                key={"text-input"}
                onChange={handleInputChange}
                value={inputValue}
                type={"text"}
                disabled={inputDisabled}
                name={"change password input"}
                placeholder={"NOT password123...."}
                error={inputError}
                data-tooltip-id={"custom-tooltip"}
                data-tooltip-content={"8-20 chars, one capital case, one number, one symbol and no spaces."}
                data-tooltip-place="top"
            />
            {inputError &&
                <Text text={"Please enter a valid password."} color="red"/>} {/* Display error message */}
            <Button type="submit" disabled={!inputValue}>
                Submit
            </Button>
        </Container>
    );
};

export {ChangePassword};
