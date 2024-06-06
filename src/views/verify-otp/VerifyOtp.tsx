// React imports
import React, {ChangeEvent, useEffect, useState} from 'react';
import {UseQueryOptions} from 'react-query';
import {Button} from "../../ui/components/buttons";

// Custom imports
import {Text} from "../../ui/components/texts/Text";
import {GenericTextInput} from "../../ui/components/Inputs";
import {validateOTPInput} from "../../helpers/regex";
import {QueryVerifyOTP} from "../../services/API/query.service";
import useCountdown from '../../hooks/countdown';
import Countdown from "../../ui/components/counters/CountDown";
import {Container} from "../change-password/Wrappers";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants";
import {VerifyOtpPageEnums} from "../../enums";

const VerifyOTP: React.FC = () => {
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const {minutes, seconds, color} = useCountdown(1);
    
    const options: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined = {
        enabled: false,
        retry: false,
        keepPreviousData: false,
        refetchOnWindowFocus: false,
    }
    const {refetch: verifyOTP} = QueryVerifyOTP(otp, options);
    const navigate = useNavigate();
    
    const {ERROR_MSG_COLOR, ERROR_MESSAGE, PLACEHOLDER, KEY, TITLE, NAME} = VerifyOtpPageEnums;
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const isValidInput: boolean = validateOTPInput(e.target.value);
        if (!isValidInput) {
            setError(true);
            return;
        }
        
        setError(false);
        setOtp(prev => prev + e.target.value);
    };
    
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        
        await verifyOTP();
    };
    
    const navigateToChangePassword = (): void => {
        if (minutes == 0 && seconds == 0) {
            navigate(ROUTES.FORGOT_PASSWORD)
        }
    };
    
    useEffect(() => {
        navigateToChangePassword();
    }, [minutes, seconds]);
    
    return (
        <Container onSubmit={handleSubmit}>
            <Text text={TITLE}/>
            <Countdown minutes={minutes} seconds={seconds} color={color}></Countdown>
            <GenericTextInput
                key={KEY}
                onChange={handleChange}
                value={otp}
                type={"text"}
                disabled={false}
                name={KEY}
                placeholder={PLACEHOLDER}
                {...{error}}
            />
            <Button type="submit">Verify OTP</Button>
            {error && <Text color={ERROR_MSG_COLOR} text={ERROR_MESSAGE}/>}
        </Container>
    );
};

export {VerifyOTP};
