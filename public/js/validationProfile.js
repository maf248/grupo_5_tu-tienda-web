const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);


/*----Validación front de edicion de perfil usuario----*/

const profileForm = qs("#profileForm")
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

const imagenPerfilInput = qs('#imagenPerfilInput');
const imageForm = qs('#imageForm');

var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passwordformat = /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
let verificationPassword = [true, true]


firstName.addEventListener('change', (e) => {
    if (firstName.value.length < 3) {
        firstNameError.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
        firstNameError.style.textAlign = "center"
        firstNameError.style.color = "red"
        firstNameError.style.margin = "10px"
        
    } else {
        firstNameError.innerHTML = "" 
    }
})
lastName.addEventListener('change', (e) => {
    if (lastName.value.length < 3) {
        lastNameError.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
        lastNameError.style.textAlign = "center"
        lastNameError.style.color = "red"
        lastNameError.style.margin = "10px"

    } else {
        lastNameError.innerHTML = "" 
    }
})
email.addEventListener('change', (e) => {
    if (!email.value.match(mailformat)) {
        emailError.innerHTML = `<p> Debe tener un mail valido</p>`
        emailError.style.textAlign = "center"
        emailError.style.color = "red"
        emailError.style.margin = "10px"

    } else {
        emailError.innerHTML = "" 
    }
})

password.addEventListener('change', (e) => {
    if (!password.value.match(passwordformat)) {
        passwordError.innerHTML = `<p> Debe tener una mayuscula, una miniscula, 8 caracteres, un numero y un simbolo</p>`
        passwordError.style.textAlign = "center"
        passwordError.style.color = "red"
        passwordError.style.margin = "10px"
        verificationPassword[0] = false

    } else {
        passwordError.innerHTML = "" 
        verificationPassword[0] = true
    }
})
passwordRepeat.addEventListener('change', (e) => {
    if (passwordRepeat.value != password.value) {
        passwordRepeatError.innerHTML = `<p> Las contraseñas no coinciden</p>`
        passwordRepeatError.style.textAlign = "center"
        passwordRepeatError.style.color = "red"
        passwordRepeatError.style.margin = "10px"
        verificationPassword[1] = false

    } else {
        passwordRepeatError.innerHTML = "" 
        verificationPassword[1] = true
    
    }
})


profileForm.addEventListener('submit', (e) => {
    
    if(firstName.value.length < 3 || lastName.value.length < 3 || !email.value.match(mailformat) || verificationPassword.includes(false)) {

        e.preventDefault()

    }

})


/*----Se valida el cambio de avatar solo a formatos permitidos----*/
let imagenPerfilInputOK = false;

imagenPerfilInput.addEventListener('change', (e) => {
    if (imagenPerfilInput.value.split('.')[1] != "jpg" && imagenPerfilInput.value.split('.')[1] != "jpeg" && imagenPerfilInput.value.split('.')[1] != "png") {   
        let messageToShow = qs('#imagenPerfilInputError')
        messageToShow.innerHTML = `<p> - La imagen debe estar en formato JPG, JPEG o PNG </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"
        imagenPerfilInputOK = false;

    } else {
        let messageToShow = qs('#imagenPerfilInputError')
        messageToShow.innerHTML = ""
        imagenPerfilInputOK = true;
    }
})

imageForm.addEventListener('submit', (e) => {
    
    if(!imagenPerfilInputOK) {

        e.preventDefault()

    }

})



/*----Sweet alert al eliminar usuario----*/
const deleteButton = qs('#delete');
const deleteForm = qs('#deleteForm');


deleteForm.addEventListener('submit', (e) => {

    e.preventDefault()

    swal({
        title: "Esta acción es irreversible",
        text: "¿Estas seguro que deseas eliminar tu cuenta de usuario?",
        icon: "warning",
        buttons: ["Cancelar", "Eliminar"],
        dangerMode: true,
      })
      .then((willDelete) => {
        
        if (willDelete) {
            swal("Tu cuenta ha sido eliminada correctamente", {
                icon: "success",
            })
            .then(() => {
                deleteForm.submit()
            })
            
            
        } else {
            swal("Tu cuenta de usuario NO se ha eliminado");
            
        }
      })
      
})

