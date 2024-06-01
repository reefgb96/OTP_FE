// React imports
import {useQuery, UseQueryOptions} from "react-query";

// Custom imports
import ApiService from "./api.service";
import {GenerateOTPDataType, UserQueryDataType} from "../../types/API";

const apiService: ApiService = new ApiService()

// The functions in this page are using useQuery (hooks)
// I am keeping it as functions instead of classes since hooks aren't supported inside classes


const RaiseQuery = (queryKey: string, queryFunction: () => any, options?: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined) => {
    return useQuery(queryKey, queryFunction, options);
}

export const QueryUpdateUserPassword = (newPass: string, options:Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined) => {
    return RaiseQuery("query-update-user-password",async () => {
        return await apiService.updateUserPass(newPass);
    },options)
};

export const QueryRequestNewOTP = (options:Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined) => {
    return RaiseQuery("query-get-unread-notifications-count",async () => {
        return await apiService.requestOTP();
    },options)
};

export const QueryVerifyOTP = (otp: string, options:Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn"> | undefined) => {
    return RaiseQuery("query-get-unread-notifications-count",async () => {
        return await apiService.verifyOTP(otp)
    },options)
};