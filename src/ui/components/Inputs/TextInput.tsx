// React imports
import React from 'react';

// Custom imports
import {GenericTextInputProps} from "../../../types";
import {StyledInput} from "../styled-components/Inputs";


const GenericTextInput = (props: GenericTextInputProps) => {
    const {
        value,
        onChange,
        placeholder = '',
        type = 'text',
        name,
        id,
        className,
        disabled = false,
        error = false
    } = props;
    
    return (
        <StyledInput
            {...{value}}
            {...{onChange}}
            {...{placeholder}}
            {...{type}}
            {...{name}}
            {...{id}}
            {...{className}}
            {...{disabled}}
            {...{error}}
        />
    );
};

export {GenericTextInput};
