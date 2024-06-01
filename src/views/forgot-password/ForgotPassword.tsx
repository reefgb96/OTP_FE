import React, {ChangeEvent, FormEvent, useState} from "react";
import {useQueryClient, UseQueryOptions} from "react-query";

// Custom imports
import {Header} from "../../ui/components/texts";
import {Text} from "../../ui/components/texts/Text";
import {Container} from "./Wrappers";
import {GenericTextInput} from "../../ui/components/Inputs";
import {Button} from "../../ui/components/buttons";
import {validateEmail} from "../../helpers/regex";
import {QueryRequestNewOTP} from "../../services/API/query.service";

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
    const {refetch: generateOTP} = QueryRequestNewOTP(options)
   
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setInputError(false);
    };
    
    const isValidEmail = () => {
        const isValidEmail = validateEmail(inputValue);
        if (!isValidEmail) {
            setInputError(true);
            return;
        }
    }
    const fetchNewOTP = async () => {
        try {
            // Example API call using React Query
            await generateOTP();
            
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
        
        // Check if the input value is a valid email.
        isValidEmail();
        
        // Make a React Query call to the API to generate OTP.
        await fetchNewOTP();
    };
    
    return (
        <Container onSubmit={handleSubmit}>
            <Header text={"Forgot Password"}/>
            <Text text={"If your email exists in our records you'll get an email from us."}/>
            <GenericTextInput
                key={"text-input"}
                onChange={handleInputChange}
                value={inputValue}
                type={"text"}
                disabled={inputDisabled}
                name={"forgot password input"}
                placeholder={"example@mail.com"}
                error={inputError}
            />
            {inputError &&
                <Text text={"Please enter a valid email address."} color="red"/>} {/* Display error message */}
            <Button type="submit" disabled={!inputValue}>
                Submit
            </Button>
        </Container>
    );
};

export {ForgotPassword};
