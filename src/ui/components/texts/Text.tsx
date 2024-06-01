// React imports

// Custom imports
import {StyledText} from "../styled-components/texts"
import {TextType} from "../../../types/components/styled-components";


const Text = (props: TextType) => {
    const {text, color} = props;
    return(
        <StyledText {...{color}} >
            {text}
        </StyledText>
    )
}

export {Text};
