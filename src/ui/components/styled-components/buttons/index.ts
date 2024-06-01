// React imports
import styled from "styled-components";


// Custom imports



const StyledButton = styled.button`
  /* Define your button styles here */
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  /* Add hover effect */
  &:hover {
    background-color: #0056b3;
  }

  /* Add active effect */
  &:active {
    background-color: #004080;
  }

  /* Add disabled styles */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


export {
    StyledButton,
}
