const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);



const editTitleInput = qs('#editSectionTitle');
const editImageInput = qs('#editSectionImage');
const createTitleInput = qs('#sectionTitle');
const createImageInput = qs('#sectionImage');
const formToSubmit = qs('#formToEdit');

const reactivarFormulario = qs('#botonDeMierda');

let variable1 = false;
let variable2 = true;

if (window.location.pathname.includes('edit')) {
    editTitleInput.addEventListener('change', (e) => {
        if (editTitleInput.value.length < 3) {
            let messageToShow = qs('#editSectionTitleContainer')
            messageToShow.innerHTML = `<p> El título debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable1 = false;

            let botonQueActiva = qs('#botonDeMierda')
            botonQueActiva.addEventListener('click', ev => {
    
                ev.preventDefault()
            })  
    
        } else {
            let messageToShow = qs('#editSectionTitleContainer')
            messageToShow.innerHTML = "" 
            variable1 = true;
        }
    })
    
    editImageInput.addEventListener('change', (e) => {
        if (editImageInput.value.split('.')[1] != "jpg" && editImageInput.value.split('.')[1] != "jpeg" && editImageInput.value.split('.')[1] != "png") {   
            let messageToShow = qs('#editSectionImageContainer')
            messageToShow.innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable2 = false

            let botonQueActiva = qs('#botonDeMierda')
            botonQueActiva.addEventListener('click', ev => {
    
                ev.preventDefault()
            })  

        } else {
            let messageToShow = qs('#editSectionImageContainer')
            messageToShow.innerHTML = "" 
            variable2 = true
            
        }
    })
} else {
    createTitleInput.addEventListener('change', (e) => {
        if (createTitleInput.value.length < 3) {
            const messageToShow = qs('#sectionTitleContainer')
            messageToShow.innerHTML = "<p> El título debe contener al menos 3 caracteres </p>" 
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable1 = false

            let botonQueActiva = qs('#botonDeMierda')
            botonQueActiva.addEventListener('click', ev => {
    
                ev.preventDefault()
            })  

        } else {
            const messageToShow = qs('#sectionTitleContainer')
            messageToShow.innerHTML = "" 
            variable1 = true
        }
    })
    
    createImageInput.addEventListener('change', (e) => {
        console.log(createImageInput.value.split('.')[1])
        if (createImageInput.value.split('.')[1] != "jpg" && createImageInput.value.split('.')[1] != "jpeg" && createImageInput.value.split('.')[1] != "png") {
            const messageToShow = qs('#sectionImageContainer')
            messageToShow.innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable2 = false

            let botonQueActiva = qs('#botonDeMierda')
            botonQueActiva.addEventListener('click', ev => {
    
                ev.preventDefault()
            })  

        } else {
            const messageToShow = qs('#sectionImageContainer')
            messageToShow.innerHTML = "" 
            variable2 = true
        }
    })
}

formToSubmit.addEventListener('change', (e) => {
    console.log(variable1)
    console.log(variable2)
    if( variable1 == true && variable2 == true) {

        console.log('ahora pasa')
        let botonQueActiva = qs('#botonDeMierda')
        botonQueActiva.addEventListener('click', ev => {
            formToSubmit.submit()
        })  
    } else {
        console.log('ahora NO pasa')
        let botonQueActiva = qs('#botonDeMierda')
        botonQueActiva.addEventListener('click', ev => {

            ev.preventDefault()
        })  
    }
})



