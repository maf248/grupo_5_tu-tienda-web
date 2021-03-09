const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const registerForm = qs("#registerForm")
const firstName = qs('#firstName')
const firstNameError = qs('#firstNameError')
const lastName = qs('#lastName')
const lastNameError = qs('#lastNameError')
const email = qs('#email')
const emailError = qs('#emailError')
const password = qs('#password')
const passwordError = qs('#passwordError')
const passwordRepeat = qs('#passwordRepeat')
const passwordRepeatError = qs('#passwordRepeatError')
const formButton = qs('#formButton')

var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passwordformat = /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
let verification = [false]


firstName.addEventListener('change', (e) => {
    if (firstName.value.length < 3) {
        firstNameError.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
        firstNameError.style.textAlign = "center"
        firstNameError.style.color = "red"
        firstNameError.style.margin = "15px"
        verification[0] = false
    } else {
        firstNameError.innerHTML = "" 
        verification[0] = true
    }
})
lastName.addEventListener('change', (e) => {
    if (lastName.value.length < 3) {
        lastNameError.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
        lastNameError.style.textAlign = "center"
        lastNameError.style.color = "red"
        lastNameError.style.margin = "15px"
        verification[1] = false

    } else {
        lastNameError.innerHTML = "" 
        verification[1] = true
    }
})
email.addEventListener('change', (e) => {
    if (!email.value.match(mailformat)) {
        emailError.innerHTML = `<p> Debe tener un mail valido</p>`
        emailError.style.textAlign = "center"
        emailError.style.color = "red"
        emailError.style.margin = "15px"
        verification[2] = false

    } else {
        emailError.innerHTML = "" 
        verification[2] = true
    }
})

password.addEventListener('change', (e) => {
    if (!password.value.match(passwordformat)) {
        passwordError.innerHTML = `<p> Debe tener una mayuscula, una miniscula, 8 caracteres, un numero y un simbolo</p>`
        passwordError.style.textAlign = "center"
        passwordError.style.color = "red"
        passwordError.style.margin = "15px"
        verification[3] = false

    } else {
        passwordError.innerHTML = "" 
        verification[3] = true
    }
})
passwordRepeat.addEventListener('change', (e) => {
    if (passwordRepeat.value != password.value) {
        passwordRepeatError.innerHTML = `<p>las contraseñas no coinciden</p>`
        passwordRepeatError.style.textAlign = "center"
        passwordRepeatError.style.color = "red"
        passwordRepeatError.style.margin = "15px"
        verification[4] = false

    } else {
        passwordRepeatError.innerHTML = "" 
        verification[4] = true
    
    }
})


registerForm.addEventListener('submit', (e) => {

    if(verification.includes(false)) {

        e.preventDefault()

    }

})
