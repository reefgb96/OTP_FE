import styled from "styled-components";
import {Outlet} from "react-router-dom";

const DefaultLayoutWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
    color: #ffffff;

    background-size: cover;
    background-position: center;
    background-image: url(https://static.vecteezy.com/system/resources/previews/005/592/877/original/abstract-dark-purple-background-overlap-layer-on-dark-space-for-background-design-exclusive-wallpaper-design-for-poster-brochure-presentation-website-etc-vector.jpg);
    opacity: 0.95;
    z-index: -111;
`;

const Content = styled(Outlet)`
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export {
    DefaultLayoutWrapper,
    Content,
}
