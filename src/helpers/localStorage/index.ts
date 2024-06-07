// React imports
import {useNavigate} from "react-router-dom";

// Custom imports
import {ROUTES} from "../../constants";



export const cleanUpStorage = (): void => {
    localStorage.clear();
};


export const getLocalStorageValue = (key: string): string | null => {
    return localStorage.getItem(key);
}

export const setLocalStorageValue = (key: string, value: string): void => {
    return localStorage.setItem(key, value);
}
