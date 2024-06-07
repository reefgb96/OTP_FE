// React imports
import styled from "styled-components";

// Custom imports


const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
`;

const BackgroundOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://steamuserimages-a.akamaihd.net/ugc/1022823759366107824/FBA80E966011F254239BAA427C677DD4F96DBEDC/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false);
    background-size: cover;
    background-position: center;
    opacity: 0.4;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    border-radius: 12px;
    z-index: 100000000;
`;

const HomeButton = styled.button`
    width: 200px;
    height: 50px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
`;

const PageTitle = styled.h1``;

const ErrorTitle = styled.h1``;

const ErrorSubtitle = styled.h1``;

const ErrorContent = styled.h1``;

export {
    PageContainer,
    BackgroundOverlay,
    ContentContainer,
    HomeButton,
    PageTitle,
    ErrorTitle,
    ErrorSubtitle,
    ErrorContent,
}
