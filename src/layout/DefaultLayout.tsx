import React from "react";
import {useNavigate} from "react-router-dom";
// Custom imports
import {Content, DefaultLayoutWrapper} from "../ui/components/styled-components";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const DefaultLayout = () => {
    const navigate = useNavigate();

    return (
        <DefaultLayoutWrapper>
            <ToastContainer />
            <Content/>
        </DefaultLayoutWrapper>
    );
};

export default DefaultLayout;
