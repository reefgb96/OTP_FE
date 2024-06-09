// React imports

// Custom imports
import axios, {AxiosInstance} from "axios";

class ApiService {
    
    _apiClient: AxiosInstance;
    _baseURL: string | undefined;
    
    constructor() {
        
        this._baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081/";
        
        if (!this._baseURL) {
            const errorMsg = "Error: no baseURL provided"
            console.error(errorMsg)
            alert(errorMsg)
        }
        
        this._apiClient = axios.create({
            baseURL: this._baseURL,
            headers: {
                "Content-type": "application/json",
            },
        });
    }
    
    public async updateUserPass(newPass: string, userEmail: string | null): Promise<boolean> {
        const response = await this._apiClient.put(`api/users/updatePass`, {userEmail, newPass});
        return response.data;
    };
    
    public async requestOTP(emailTo: string): Promise<boolean> {
        const response = await this._apiClient.post(`api/otp/requestNew`, emailTo);
        return response.data;
    };
    
    public async verifyOTP(otp: string, userEmail: string | null): Promise<boolean> {
        const response = await this._apiClient.post(`api/otp/verify`, {otp, userEmail});
        return response.data;
    };
    
};

export default ApiService;
