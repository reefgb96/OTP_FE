import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Custom imports
import { ERROR_PAGE } from "../../enums";

const Page404 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (location.pathname !== "/404") {
            navigate("/404", { replace: true });
        }
    }, [location, navigate]);
    
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(https://steamuserimages-a.akamaihd.net/ugc/1022823759366107824/FBA80E966011F254239BAA427C677DD4F96DBEDC/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.4,
                }}
            ></div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "40px",
                    borderRadius: "12px",
                    zIndex: 100000000,
                }}
            >
                <button
                    style={{
                        width: "200px",
                        height: "50px",
                        borderRadius: "12px",
                        border: "none",
                    }}
                    onClick={() => navigate("/forgot-password")}
                >
                    To Homepage
                </button>
                <br />
                <br />
                <h1>404</h1>
                <h1>{ERROR_PAGE.TITLE}</h1>
                <h1>{ERROR_PAGE.SUBTITLE}</h1>
                <h1>{ERROR_PAGE.CONTENT}</h1>
                <h1>404</h1>
                <h1>404</h1>
                <h1>404</h1>
            </div>
        </div>
    );
};

export default Page404;
