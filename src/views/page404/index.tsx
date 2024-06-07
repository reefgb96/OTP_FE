import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

// Custom imports
import {ERROR_PAGE} from "../../enums";
import {
    PageContainer,
    BackgroundOverlay,
    ContentContainer,
    HomeButton,
    PageTitle,
    ErrorTitle,
    ErrorSubtitle,
    ErrorContent
} from "./Wrapers";
import {ROUTES} from "../../constants";

const Page404 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (location.pathname !== "/404") {
            navigate(ROUTES.NOT_FOUND, {replace: true});
        }
    }, [location, navigate]);
    
    return (
        <PageContainer>
            <BackgroundOverlay/>
            <ContentContainer>
                <HomeButton onClick={() => navigate("/forgot-password")}>To Homepage</HomeButton>
                <PageTitle>404</PageTitle>
                <ErrorTitle>{ERROR_PAGE.TITLE}</ErrorTitle>
                <ErrorSubtitle>{ERROR_PAGE.SUBTITLE}</ErrorSubtitle>
                <ErrorContent>{ERROR_PAGE.CONTENT}</ErrorContent>
                <PageTitle>404</PageTitle>
                <PageTitle>404</PageTitle>
                <PageTitle>404</PageTitle>
            </ContentContainer>
        </PageContainer>
    );
};

export {Page404};
