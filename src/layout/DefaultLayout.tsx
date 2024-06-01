import React from "react";
import {useNavigate} from "react-router-dom";
import {Content, DefaultLayoutWrapper} from "../ui/components/styled-components";

// Custom imports


const DefaultLayout = () => {
    const navigate = useNavigate();

    return (
        <DefaultLayoutWrapper>
            {/*<Toast />*/}
            {/*<Header/>*/}
            <Content/>
        </DefaultLayoutWrapper>
    );
};

export default DefaultLayout;
