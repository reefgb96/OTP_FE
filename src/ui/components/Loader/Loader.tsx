// React imports
import React from "react";

// Custom imports

import {Colors} from "../../../theme";
import {IconSpinner} from "../../../theme";
import {LoaderWrapper, LoadingContainerToPanel, LoadingContainerToPage} from "./LoaderWrappers";



const LoaderPanel = ()=>{

    return(
        <LoaderWrapper>
            <LoadingContainerToPanel>
                <IconSpinner color={Colors.loaderIconColor} size={"100px"}/>
            </LoadingContainerToPanel>
        </LoaderWrapper>
    )
}


const LoaderPage = ()=>{

    return(
        <LoaderWrapper>
            <LoadingContainerToPage>
                <IconSpinner color={Colors.loaderIconColor} size={"100px"}/>
            </LoadingContainerToPage>
        </LoaderWrapper>

    )
}

export {LoaderPanel, LoaderPage}
