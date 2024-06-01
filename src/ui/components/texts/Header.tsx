// React imports

// Custom imports
import {StyledHeader} from "../styled-components/texts"
import {TextType} from "../../../types/components/styled-components";


const Header = (props: TextType) => {
    const {text} = props;
    return(
        <StyledHeader >
            {text}
        </StyledHeader>
    )
}

export {Header};
