export function hasSymbol(s) {
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(s);
}
export 
function hasDigit(s) {
    return /\d/.test(s);
}
export 
function hasUppercase(s) {
    return /[A-Z]/.test(s);
}
export 
function hasLowercase(s) {
    return /[a-z]/.test(s);
}
export 
function showError(ref, errorMessage) {
    console.log(ref)
    ref.current.innerHTML = errorMessage;
}
export 
function showSuccess(ref) {
    console.log(ref)
    ref.current.innerHTML = "";
}