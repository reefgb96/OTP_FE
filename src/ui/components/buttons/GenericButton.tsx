// React imports


// Custom imports
import {StyledButton} from "../styled-components/buttons";
import {ButtonProps} from "../../../types";


const Button = (props: ButtonProps) => {
    const { children, onClick, disabled } = props;
    return (
        <StyledButton onClick={onClick} disabled={disabled}>
            {children}
        </StyledButton>
    );
};

export {Button};
