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

let iconsVerifications = [false];
let subtitlesVerifications = [false];
let descriptionsVerifications = [false];


if (window.location.pathname.includes('edit')) {

    // Acá manejamos todo lo que pasa cuando en la ventana se está editando contenido

    // Acá seleccionamos los inputs y formularios correspondientes para trabajar en la EDICIÓN de contenidos.

    const editIconInputs = qsa('#iconToEdit');
    const formToEditIcons = qsa('#formToEditIcon');
    const errorMessageIcons = qsa('#editIconContainer');

    const editSubtitleInputs = qsa('#subtitleToEdit');
    const formToEditSubtitles = qsa('#formToEditSubtitle');
    const errorMessageSubtitles = qsa('#editSubtitleContainer')

    const editDescriptionInputs = qsa('#descriptionToEdit');
    const formToEditDescriptions = qsa('#formToEditDescription');
    const errorMessageDescriptions = qsa('#editDescriptionContainer')
   
    for (let i=0; i < editIconInputs.length; i++) {
        editIconInputs[i].addEventListener('change', (e) => {
            if (editIconInputs[i].value.split('.')[1] != "svg") {   
                errorMessageIcons[i].innerHTML = `<p> La imagen debe estar en formato SVG </p>`
                errorMessageIcons[i].style.textAlign = "center"
                errorMessageIcons[i].style.color = "red"
                errorMessageIcons[i].style.margin = "15px"
                iconsVerifications[i] = false;

            } else {
                errorMessageIcons[i].innerHTML = "" 
                iconsVerifications[i] = true;
                
            }
        })
        formToEditIcons[i].addEventListener('submit', (e) => {

            if(iconsVerifications[i] == false) {
        
                e.preventDefault()
        
            }
        
        })
    }
    
    for (let i=0; i < editSubtitleInputs.length; i++) {
        editSubtitleInputs[i].addEventListener('change', (e) => {
            if (editSubtitleInputs[i].value.length < 3) {
                errorMessageSubtitles[i].innerHTML = `<p> El título debe contener al menos 3 caracteres </p>`
                errorMessageSubtitles[i].style.textAlign = "center"
                errorMessageSubtitles[i].style.color = "red"
                errorMessageSubtitles[i].style.margin = "15px"
                subtitlesVerifications[i] = false;

        
            } else {
                errorMessageSubtitles[i].innerHTML = "" 
                subtitlesVerifications[i] = true;
            }
        })
        formToEditSubtitles[i].addEventListener('submit', (e) => {

            if(subtitlesVerifications[i] == false) {
                e.preventDefault()
            }
        
        })
    }

    for (let i=0; i < editDescriptionInputs.length; i++) {
        editDescriptionInputs[i].addEventListener('change', (e) => {
            if (editDescriptionInputs[i].value.length < 10) {
                errorMessageDescriptions[i].innerHTML = `<p> El título debe contener al menos 10 caracteres </p>`
                errorMessageDescriptions[i].style.textAlign = "center"
                errorMessageDescriptions[i].style.color = "red"
                errorMessageDescriptions[i].style.margin = "15px"
                descriptionsVerifications[i] = false;

        
            } else {
                errorMessageDescriptions[i].innerHTML = "" 
                descriptionsVerifications[i] = true;
            }
        })
        formToEditDescriptions[i].addEventListener('submit', (e) => {

            if(descriptionsVerifications[i] == false) {
                e.preventDefault()
            }
        
        })
    }

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
            iconsVerifications[0] = false;

        } else {
            let messageToShow = qs('#containerOfCreateIconValidation')
            messageToShow.innerHTML = "" 
            iconsVerifications[0] = true;
            
        }
    })

    createSubtitleInput.addEventListener('change', (e) => {
        if (createSubtitleInput.value.length < 3) {
            let messageToShow = qs('#containerOfCreateSubtitleValidation')
            messageToShow.innerHTML = `<p> El título debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            subtitlesVerifications[0] = false;

        } else {
            let messageToShow = qs('#containerOfCreateSubtitleValidation')
            messageToShow.innerHTML = "" 
            subtitlesVerifications[0] = true;
        }
    })

    createDescriptionInput.addEventListener('change', (e) => {
        if (createDescriptionInput.value.length < 10) {
            let messageToShow = qs('#containerOfCreateDescriptionValidation')
            messageToShow.innerHTML = `<p> El título debe contener al menos 10 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            descriptionsVerifications[0] = false;

        } else {
            let messageToShow = qs('#containerOfCreateDescriptionValidation')
            messageToShow.innerHTML = "" 
            descriptionsVerifications[0] = true;
        }
    })
    

    formToCreateContents.addEventListener('submit', (e) => {

        if(iconsVerifications[0] == false || subtitlesVerifications[0] == false || descriptionsVerifications[0] == false ) {
    
            e.preventDefault()
    
        }
    
    })


}
