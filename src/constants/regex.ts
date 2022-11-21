export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const MOBILE_NUMBER_REGEX = /^[9][678][0-9]{8}$/;
//* check for special characters
export const specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//*This regex will validate a date in the format YYYY-MM-DD
export const DATE_FORMAT_REGEX=/\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])/