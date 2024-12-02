function sendForgot() {
    let emailInput = document.querySelector('#email').value;
    
    if (emailInput === '') {
        alert('Email field must NOT be empty!\nTry again!');
    } else {
        alert('A code has been sent to: ' + emailInput + '.\nIf this email was found in our database!');
    }
}