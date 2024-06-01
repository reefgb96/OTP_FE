// React imports

// Custom imports
import axios, {AxiosInstance} from "axios";
import {GenerateOTPDataType, UserQueryDataType} from "../../types/API";

class ApiService {
    
    _apiClient: AxiosInstance;
    _baseURL: string | undefined;
    
    constructor() {
        
        this._baseURL = process.env.REACT_APP_API_BASE_URL || "localhost:3000";
        
        // Displaying error when baseURL not provided in the process.env.REACT_APP_API_BASE_URL
        if (!this._baseURL) {
            const errorMsg = "Error:\nno baseURL provided,\ncheck the process.env.REACT_APP_API_BASE_URL"
            console.error(errorMsg)
            alert(errorMsg)
        }
        
        // Creating axios instance with the base URL
        // Axios.create is a feature within Axios used to create a new instance with a custom configuration.
        // With Axios.create, we generate a client for any API and reuse the configuration for any calls using the same client
        this._apiClient = axios.create({
            baseURL: this._baseURL,
            headers: {
                "Content-type": "application/json",
            },
        });
    }
    
    public async updateUserPass(newPass: string): Promise<boolean> {
        const response = await this._apiClient.post(`/users/updatePass`, newPass);
        return response.data;
    };
    
    public async requestOTP(): Promise<boolean> {
        const response = await this._apiClient.post(`/otp/requestNew`);
        return response.data;
    };
    
    public async verifyOTP(otp: string): Promise<boolean> {
        const response = await this._apiClient.post(`/users/updatePass`, otp);
        return response.data;
    };
    
};

export default ApiService;
