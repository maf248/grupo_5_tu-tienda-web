const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const loginForm = qs("#loginForm")

const user = qs('#user')
const userError = qs('#userError')
const password = qs('#password')
const passwordError = qs('#passwordError')

const formButton = qs('#formButton')

var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passwordformat = /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
let verification = [false, false]

user.addEventListener('change', (e) => {
    if (!user.value.match(mailformat)) {
        userError.innerHTML = `<p> Debe ingresar un mail valido </p>`
        userError.style.textAlign = "center"
        userError.style.color = "red"
        userError.style.margin = "15px"
        verification[0] = false

    } else {
        userError.innerHTML = "" 
        verification[0] = true
    }
})
password.addEventListener('change', (e) => {
    if (!password.value.match(passwordformat)) {
        passwordError.innerHTML = `<p> Debe tener una mayuscula, una miniscula, 8 caracteres, un numero y un simbolo </p>`
        passwordError.style.textAlign = "center"
        passwordError.style.color = "red"
        passwordError.style.margin = "15px"
        verification[1] = false

    } else {
        passwordError.innerHTML = "" 
        verification[1] = true
    }
})

loginForm.addEventListener('submit', (e) => {

    if(verification.includes(false)) {

        e.preventDefault()

    }

})
