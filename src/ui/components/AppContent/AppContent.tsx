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
import {ROUTES} from "../../../constants";

const Page404 = React.lazy(() => import("../../../views/page404"));

// const ForgotPassword = React.lazy(() => import("../../../views/forgot-password/ForgotPassword"));

// const LoginPage = React.lazy(() => import("../../../views/login"));
const {VERIFY_OTP, CHANGE_PASSWORD, FORGOT_PASSWORD, NOT_FOUND, DEFAULT, HOME} = ROUTES;
export const AppContent = () => {
    const initialRoutes: RouteType[] = [
        {path: HOME, element: <Navigate to={ROUTES.FORGOT_PASSWORD}/>},
        {path: FORGOT_PASSWORD, element: <ForgotPassword />},
        {path: CHANGE_PASSWORD, element: <ChangePassword />},
        {path: VERIFY_OTP, element: <VerifyOTP />},
        {path: NOT_FOUND, element: <Page404/>},
        {path: DEFAULT, element: <Page404/>}
    ];
    
    const [routesObject, setRoutesObject] = useState(initialRoutes);
    
    useEffect(() => {
        rebuildRoutes();
    }, []);
    const rebuildRoutes = () => {
        const updatedRoutes = [
            {
                path: HOME,
                element: <DefaultLayout/>,
                children: [
                    {
                        path: FORGOT_PASSWORD,
                        element:
                            <ForgotPassword/>
                    },
                    {
                        path: CHANGE_PASSWORD,
                        element:
                            <RequireOTP>
                                <ChangePassword/>
                            </RequireOTP>
                    },
                    {
                        path: VERIFY_OTP,
                        element:
                            <RequireOTP>
                                <VerifyOTP/>
                            </RequireOTP>
                    },
                    {
                        path: NOT_FOUND,
                        element: <Page404/>
                    },
                    {
                        path: DEFAULT,
                        element: <Page404/>
                    }
                ]
            },
        ];
        
        setRoutesObject(updatedRoutes);
    }
    
    return useRoutes(routesObject);
};

