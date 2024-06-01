// React imports
import styled from 'styled-components';

// Custom imports


export const CountdownWrapper = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

export const CountdownText = styled.span<{ color: string }>`
    color: ${({color}) => color};
    font-size: 20px;
    font-weight: 400;
`;
