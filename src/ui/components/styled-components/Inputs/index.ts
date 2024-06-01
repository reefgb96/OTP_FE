// React imports
import styled from "styled-components";

// Custom imports


const StyledInput = styled.input<{ error?: boolean }>`
    padding: 8px;
    border-radius: 4px;
    border: ${({error}) => (error ? '1px solid red' : '1px solid #ccc')}; /* Conditional border color */
    width: 30%;
    box-sizing: border-box;
    margin: 20px;

    &:disabled {
        background-color: #da0d0d;
    }

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export {
    StyledInput,
}
