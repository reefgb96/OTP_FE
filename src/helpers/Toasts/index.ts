import {toast} from "react-toastify";

export const OtpSuccessToast = (msg: string) => {
    return toast.success(msg, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
};

export const OtpErrorToast = (msg: string) => {
    return toast.error(msg, {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
};
