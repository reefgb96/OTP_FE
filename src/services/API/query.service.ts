// React imports
import {useQuery, UseQueryOptions} from "react-query";

// Custom imports
import ApiService from "./api.service";
import {getLocalStorageValue} from "../../helpers/localStorage";
import {OtpEnums} from "../../enums";

const apiService: ApiService = new ApiService()

// The functions in this page are using useQuery (hooks)
// I am keeping it as functions instead of classes since hooks aren't supported inside classes


const RaiseQuery = (queryKey: string, queryFunction: () => any, options?: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined) => {
    return useQuery(queryKey, queryFunction, options);
}

export const QueryUpdateUserPassword = (options:Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined, newPass: string) => {
    const userEmail: string | null = getLocalStorageValue(OtpEnums.USER_EMAIL)
    
    return RaiseQuery("query-update-user-password",async () => {
        return await apiService.updateUserPass(newPass, userEmail);
    },options)
};

export const QueryRequestNewOTP = (options:Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined, emailTo: string) => {
    return RaiseQuery("query-get-unread-notifications-count",async () => {
        return await apiService.requestOTP(emailTo);
    },options)
};

export const QueryVerifyOTP = (options:Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined, otp: string) => {
    const userEmail: string | null = getLocalStorageValue(OtpEnums.USER_EMAIL)
    return RaiseQuery("query-get-unread-notifications-count",async () => {
        return await apiService.verifyOTP(otp, userEmail)
    },options)
};
