// React imports
import styled from "styled-components";

// Custom imports


const StyledHeader = styled.header`
    font-size: 30px;
`;

const StyledText = styled.p<{ color?: string }>`
    font-size: 20px;
    color: ${({color}) => color || ""};
`;


export {
    StyledHeader,
    StyledText,
}
