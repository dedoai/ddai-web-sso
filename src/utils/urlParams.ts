const urlParams = new URLSearchParams(window.location.search);
export const theme = urlParams.get('t') || 'light'; // Can be 'dark' or 'light'
export const language = urlParams.get('l') || 'en'; // Can be 'en' or 'tr' ecc..
export const mode = urlParams.get('m'); // Can be undefined or 'rp' (reset password)
