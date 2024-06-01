// React imports
import React from 'react';

// Custom imports
import {CountdownWrapper, CountdownText} from '../styled-components/counters';
import {CountdownProps} from "../../../types";


const Countdown: React.FC<CountdownProps> = ({minutes, seconds, color}) => {
    return (
        <CountdownWrapper>
            <CountdownText color={color}>
                {"Time until OTP expires: "}
            </CountdownText>
            <CountdownText color={color}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </CountdownText>
        </CountdownWrapper>
    );
};

export default Countdown;
