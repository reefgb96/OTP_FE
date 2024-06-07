

// Validate email format
const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("regex test: ", regex.test(email.trim()))
    return regex.test(email);
};

// Validate OTP format.
const validateOTP = (input: string): boolean => {
    // Regular expression to match a string with exactly 4 digits
    const regex = /^\d{4}$/;
    return regex.test(input);
};

const validateOTPInput = (input: string): boolean => {
    // Regular expression to match a string with exactly 4 digits
    const regex = /^\d$/;
    return regex.test(input);
};

// Validate a password format.
const validatePassword = (password: string): boolean => {
    // Regular expressions to match each condition
    const minLength = /.{8,20}/; // Minimum length 8, maximum length 20
    const capitalLetter = /[A-Z]/; // At least one capital letter
    const smallLetter = /[a-z]/; // At least one small letter
    const number = /\d/; // At least one number
    const symbol = /[!@#$]/; // At least one symbol
    
    // Check if the password meets all conditions
    return (
        minLength.test(password) &&
        capitalLetter.test(password) &&
        smallLetter.test(password) &&
        number.test(password) &&
        symbol.test(password) &&
        !/\s/.test(password) // No spaces
    );
};




export {
    validateEmail,
    validateOTP,
    validatePassword,
    validateOTPInput,
}
