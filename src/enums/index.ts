// React imports

// Custom imports


export enum ERROR_PAGE {
    TITLE = "OOOOPSSS...!",
    SUBTITLE = "It looks like you'r lost in space...",
    CONTENT = "The page you are looking for no longer exists.",
}

export enum ForgotPasswordPageEnums {
    TITLE = "Forgot Password",
    SUB_TITLE = "Enter your email address.",
    KEY = "text-input",
    NAME = "Forgot password input",
    PLACEHOLDER = "Email address",
    ERROR_MESSAGE = "Please enter a valid email address.",
    ERROR_MSG_COLOR = "red",
}

export enum VerifyOtpPageEnums {
    TITLE = "Enter OTP Code",
    KEY = "text-input",
    NAME = "Change password input",
    PLACEHOLDER = "1234",
    ERROR_MESSAGE = "Only digits are allowed.",
    ERROR_MSG_COLOR = "red",
}

export enum ChangePasswordPageEnums {
    TITLE = "Change Password",
    SUB_TITLE = "Enter a new password.",
    KEY = "text-input",
    NAME = "Change password input",
    PLACEHOLDER = "NOT password123...",
    ERROR_MESSAGE = "8-20 chars, one capital case, one number, one symbol and no spaces.",
    ERROR_MSG_COLOR = "red",
}

export enum OtpEnums {
    OTP_KEY = "otpKey",
    OTP_VALUE = "1",
    OTP_EXPIRY_KEY = "Otp expiry",
    OTP_EXPIRY_DURATION = 5
}
