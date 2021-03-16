const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const loginForm = qs("#loginForm")

const user = qs('#user')
const userError = qs('#userError')
const password = qs('#password')
const passwordError = qs('#passwordError')

var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passwordformat = /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

user.addEventListener('change', (e) => {
    if (!user.value.match(mailformat)) {
        console.log('EL MAIL NO PASA');
        userError.innerHTML = `<p> Debe ingresar un mail valido </p>`
        userError.style.textAlign = "center"
        userError.style.color = "red"
        userError.style.margin = "10px"

    } else {
        console.log('EL MAIL PASA');
        userError.innerHTML = "" 
    }
})
password.addEventListener('change', (e) => {
    if (!password.value.match(passwordformat)) {
        console.log('LA PASS NO PASA');
        passwordError.innerHTML = `<p> Debe tener 8 caracteres, incluyendo una mayúscula, una minúscula, un numero y un simbolo </p>`
        passwordError.style.textAlign = "center"
        passwordError.style.color = "red"
        passwordError.style.margin = "10px"

    } else {
        console.log('LA PASS PASA');
        passwordError.innerHTML = "" 
    }
})

loginForm.addEventListener('submit', (e) => {
    console.log(!user.value.match(mailformat));
    console.log(!user.value.match(passwordformat));
    if(!user.value.match(mailformat) || !password.value.match(passwordformat)) {
        e.preventDefault()
       if(!password.value.match(passwordformat)) {
        passwordError.innerHTML = `<p> Debe tener 8 caracteres, incluyendo una mayúscula, una minúscula, un numero y un simbolo </p>`
        passwordError.style.textAlign = "center"
        passwordError.style.color = "red"
        passwordError.style.margin = "10px" 
       }
    } 

})
