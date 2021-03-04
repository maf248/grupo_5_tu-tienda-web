const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const contentToClick = qsa('.contentToEdit');
const contentToClickIcon = qsa('.contentIconToEdit');

for (let i = 0; i < contentToClick.length ; i++) {

    contentToClick[i].addEventListener('click', (e) => {
        
        const contentToShow = qsa('.contentToEditContainer');
        
        contentToShow[i].style.display = 'block' 
    })

}

for (let i = 0; i < contentToClickIcon.length ; i++) {

contentToClickIcon[i].addEventListener('click', (e) => {

const contentToShowIcon = qsa('.contentToEditIconContainer');

contentToShowIcon[i].style.display = 'block' 
})

}


//Acá comienza la lógica para validar los imputs


//Acá creamos variables que luego serán utilizadas para hacer o no el preventDefault en el formulario de edición o creación.

let variable1 = true;
let variable2 = false;
let variable3 = false;


if (window.location.pathname.includes('edit')) {

    // Acá manejamos todo lo que pasa cuando en la ventana se está editando contenido

    // Acá seleccionamos los inputs y formularios correspondientes para trabajar en la EDICIÓN de contenidos.

    const editIconInput = qs('#iconToEdit');
    const formToEditIcon = qs('#formToEditIcon');

    const editSubtitleInput = qs('#subtitleToEdit');
    const formToEditSubtitle = qs('#formToEditSubtitle');

    const editDescriptionInput = qs('#descriptionToEdit');
    const formToEditDescription = qs('#formToEditDescription');

    editIconInput.addEventListener('change', (e) => {
        if (editIconInput.value.split('.')[1] != "svg") {   
            let messageToShow = qs('#editIconContainer')
            messageToShow.innerHTML = `<p> La imagen debe estar en formato SVG </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable1 = false

        } else {
            let messageToShow = qs('#editIconContainer')
            messageToShow.innerHTML = "" 
            variable1 = true
            
        }
    })

    formToEditIcon.addEventListener('submit', (e) => {

        if( variable1 == false) {
    
            e.preventDefault()
    
        }
    
    })

    editSubtitleInput.addEventListener('change', (e) => {
        if (editSubtitleInput.value.length < 3) {
            let messageToShow = qs('#editSubtitleContainer')
            messageToShow.innerHTML = `<p> El título debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable2 = false;

    
        } else {
            let messageToShow = qs('#editSubtitleContainer')
            messageToShow.innerHTML = "" 
            variable2 = true;
        }
    })

    formToEditSubtitle.addEventListener('submit', (e) => {

        if( variable2 == false) {
    
            e.preventDefault()
    
        }
    
    })

    editDescriptionInput.addEventListener('change', (e) => {
        if (editDescriptionInput.value.length < 10) {
            let messageToShow = qs('#editDescriptionContainer')
            messageToShow.innerHTML = `<p> El título debe contener al menos 10 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable3 = false;

    
        } else {
            let messageToShow = qs('#editDescriptionContainer')
            messageToShow.innerHTML = "" 
            variable3 = true;
        }
    })
    


    formToEditDescription.addEventListener('submit', (e) => {

        if( variable3 == false) {
    
            e.preventDefault()
    
        }
    
    })


} else {

    // Acá manejamos todo lo que pasa cuando en la ventana se está creando contenido

    // Acá llamamos a los inputs y formularios correspondientes para trabajar en la CREACIÓN de contenidos.

    const createIconInput = qs('#contentIcon'); 

    const createSubtitleInput = qs('#contentSubtitle');

    const createDescriptionInput = qs('#contentDescription');
    const contentToShowDescriptionValidation = qs('#containerOfCreateDescriptionValidation')

    const formToCreateContents = qs('#formToCreateContents');

    createIconInput.addEventListener('change', (e) => {
        if (createIconInput.value.split('.')[1] != "svg") {   
            let messageToShow = qs('#containerOfCreateIconValidation')
            messageToShow.innerHTML = `<p> La imagen debe estar en formato SVG </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable1 = false

        } else {
            let messageToShow = qs('#containerOfCreateIconValidation')
            messageToShow.innerHTML = "" 
            variable1 = true
            
        }
    })

    createSubtitleInput.addEventListener('change', (e) => {
        if (createSubtitleInput.value.length < 3) {
            let messageToShow = qs('#containerOfCreateSubtitleValidation')
            messageToShow.innerHTML = `<p> El título debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable2 = false;

    
        } else {
            let messageToShow = qs('#containerOfCreateSubtitleValidation')
            messageToShow.innerHTML = "" 
            variable2 = true;
        }
    })

    createDescriptionInput.addEventListener('change', (e) => {
        if (createDescriptionInput.value.length < 10) {
            let messageToShow = qs('#containerOfCreateDescriptionValidation')
            messageToShow.innerHTML = `<p> El título debe contener al menos 10 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable3 = false;

    
        } else {
            let messageToShow = qs('#containerOfCreateDescriptionValidation')
            messageToShow.innerHTML = "" 
            variable3 = true;
        }
    })
    


    formToCreateContents.addEventListener('submit', (e) => {

        if (createIconInput.value == "") {
            let messageToShow = qs('#containerOfCreateNoIconValidation')
            messageToShow.innerHTML = `<p>Debés subir una imagen </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            e.preventDefault()
        }
        if (createIconInput.value != "") {
            let messageToShow = qs('#containerOfCreateNoIconValidation')
            messageToShow.innerHTML = ""
        }

        if( variable1 == false || variable2 == false || variable3 == false ) {
    
            e.preventDefault()
    
        }
    
    })


}
