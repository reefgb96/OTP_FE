import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {UseQueryOptions} from "react-query";
import {useNavigate} from "react-router-dom";

// Custom imports
import {Header, Text} from "../../ui/components/texts";
import {Container} from "./Wrappers";
import {GenericTextInput} from "../../ui/components/Inputs";
import {Button} from "../../ui/components/buttons";
import Countdown from "../../ui/components/counters/CountDown";
import {ROUTES} from "../../constants";
import {BasePageProps} from "../../types/components";
import useCountdown from "../../hooks/countdown";
import {OtpEnums} from "../../enums";

const PageBase = (props: BasePageProps) => {
    const [inputError, setInputError] = useState<boolean>(false);
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);
    
    const {
        title,
        subTitle,
        placeholder,
        key,
        name,
        errorMsgColor,
        errorMessage,
        inputValidation,
        apiCall,
        onSubmit,
        renderCountdown,
        inputType,
        onInputChange,
        inputValue,
    } = props;
    
    const options: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined = {
        enabled: false,
        retry: false,
        keepPreviousData: false,
        refetchOnWindowFocus: false,
    };
    
    // @ts-ignore
    const {refetch: apiRefetch, isFetching: isApiRefetching} = apiCall(options, inputValue);
    const navigate = useNavigate();
    
    // const { minutes, seconds, color } = useCountdown(OtpEnums.OTP_EXPIRY_KEY, OtpEnums.OTP_EXPIRY_DURATION);
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        validateInput();
        onInputChange(e);
    };
    
    const validateInput = (): boolean => {
        const isValidInput = inputValidation(inputValue);
        if (!isValidInput) {
            setInputError(true);
            return false;
        }
        setInputError(false)
        return true;
    };
    
    const handleApiCall = async () => {
        try {
            await apiRefetch();
            // Add any additional logic here after successful API call
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Check if the input value is valid
        const isValid = validateInput();
        console.log({isValid})
        // Make a React Query call to the API
        !inputError && isValid && (await handleApiCall());
    };
    
    return (
        <Container onSubmit={onSubmit}>
            <Header text={title}/>
            {subTitle && <Text text={subTitle}/>}
            {/*{renderCountdown && <Countdown minutes={minutes} seconds={seconds} color={color}/>}*/}
            <GenericTextInput
                key={key}
                onChange={handleInputChange}
                value={inputValue}
                type={inputType || "text"}
                disabled={inputDisabled}
                name={name}
                placeholder={placeholder}
                error={inputError}
            />
            {inputError && <Text text={errorMessage} color={errorMsgColor}/>}
            <Button type="submit" disabled={inputError || !inputValue || isApiRefetching}>
                Submit
            </Button>
        </Container>
    );
};

export {PageBase};
