function showSignUpForm() {
    document.getElementById('logInFormContainer').style.display = 'none';
    document.getElementById('signUpFormContainer').style.display = 'flex';
}

function showLoginForm() {
    document.getElementById('logInFormContainer').style.display = 'flex';
    document.getElementById('signUpFormContainer').style.display = 'none';
}