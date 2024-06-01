// React imports
import React, {useEffect, useState} from "react";
import {Navigate, useRoutes} from "react-router-dom";

// Custom imports
import {RouteType} from "../../../types";
import DefaultLayout from "../../../layout/DefaultLayout";
import {ForgotPassword} from "../../../views/forgot-password/ForgotPassword";
import {ChangePassword} from "../../../views/change-password/ChangePassword";
import {VerifyOTP} from "../../../views/verify-otp";
import {RequireOTP} from "../OTP";

const Page404 = React.lazy(() => import("../../../views/page404"));

// const ForgotPassword = React.lazy(() => import("../../../views/forgot-password/ForgotPassword"));

// const LoginPage = React.lazy(() => import("../../../views/login"));

export const AppContent = () => {
    const initialRoutes: RouteType[] = [
        {path: "/", element: <Navigate to={"/forgot-password"}/>},
        {path: "/forgot-password", element: <ForgotPassword />},
        {path: "/change-password", element: <ChangePassword />},
        {path: "/verify-otp", element: <VerifyOTP />},
        {path: "/404", element: <Page404/>},
        {path: "*", element: <Page404/>}
    ];
    
    const [routesObject, setRoutesObject] = useState(initialRoutes);
    
    useEffect(() => {
        rebuildRoutes();
    }, []);
    const rebuildRoutes = () => {
        const updatedRoutes = [
            {
                path: "/",
                element: <DefaultLayout/>,
                children: [
                    {
                        path: "/forgot-password",
                        element:
                            <ForgotPassword/>
                    },
                    {
                        path: "/change-password",
                        element:
                            <RequireOTP>
                                <ChangePassword/>
                            </RequireOTP>
                    },
                    {
                        path: "/verify-otp",
                        element:
                            <RequireOTP>
                                <VerifyOTP/>
                            </RequireOTP>
                    },
                    {
                        path: "/404",
                        element: <Page404/>
                    },
                    {
                        path: "*",
                        element: <Page404/>
                    }
                ]
            },
        ];
        
        setRoutesObject(updatedRoutes);
    }
    
    return useRoutes(routesObject);
};

