// React imports
import React, {ChangeEvent, useState} from 'react';
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
    const {refetch: verifyOTP} = QueryVerifyOTP(otp, options)
    
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
    
    return (
        <Container onSubmit={handleSubmit}>
            <Text text={"Enter OTP Code"}/>
            <Countdown minutes={minutes} seconds={seconds} color={color}></Countdown>
            <GenericTextInput
                key={"text-input"}
                onChange={handleChange}
                value={otp}
                type={"text"}
                disabled={false}
                name={"change password input"}
                placeholder={"1234"}
                {...{error}}
            />
            <Button type="submit">Verify OTP</Button>
            {error && <Text color={"red"} text={"Only digits are allowed."}/>}
        </Container>
    );
};

export {VerifyOTP};
