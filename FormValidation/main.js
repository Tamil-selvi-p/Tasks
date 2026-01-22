const Form = document.querySelector('.form-form');
const Username = document.querySelector('#username');
const Email = document.querySelector('#email');
const Password = document.querySelector('#password');

Form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateInputs();
    Username.innerHTML = '';
    Email.innerHTML = '';
    Password.innerHTML = '';
});

function validateInputs() {
    const userNameValue = Username.value.trim();
    const emailValue = Email.value.trim();
    const passwordValue = Password.value.trim();

    if(userNameValue === ''){
        setError(Username, 'User name is required');
    } else if(!validateUserName(userNameValue)) {
        setError(Username, 'Special Characters or Numeric Value not Allowed')
    }else {
        setSuccess(Username);
    }

    if(emailValue === '') {
        setError(Email, 'Email Id is required');
    } else if(!validateEmail(emailValue)) {
        setError(Email, 'Please Enter a valid Email ID')
    } else {
        setSuccess(Email);
    }

    if(passwordValue === '') {
        setError(Password, 'Password is required');
    } else if(!isValidPassword(passwordValue)) {
        setError(Password, 'Atleast One Upper Case, one special Charecter, one digit and 8+ characters must be present');
    } else {
        setSuccess(Password);
    }
}

function setError (element, message) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerHTML = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function setSuccess (element) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerHTML = '';
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
}

const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
}

const validateUserName = (name) => {
    return String(name).match(/^[a-zA-Z_-]{3,16}$/);
}

// function validateUserName(name) {
//     const userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

//     return userNameRegex.test(name);
// }

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  return passwordRegex.test(password);
}