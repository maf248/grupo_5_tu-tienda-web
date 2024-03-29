const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);



const editTitleInput = qs('#editSectionTitle');
const editImageInput = qs('#editSectionImage');
const createTitleInput = qs('#sectionTitle');
const createImageInput = qs('#sectionImage');
const formToSubmit = qs('#formToEdit');
const formToCreate = qs('#formToCreate');

const reactivarFormulario = qs('#botonDeMierda');

let variable1 = false;
let variable2 = true;

if (window.location.pathname.includes('edit')) {

    // Acá manejamos todo lo que pasa cuando en la ventana se está editando contenido

    
    editTitleInput.addEventListener('change', (e) => {
        if (editTitleInput.value.length < 3) {
            let messageToShow = qs('#editSectionTitleContainer')
            messageToShow.innerHTML = `<p> El título debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            variable1 = false;

    
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

        } else {
            let messageToShow = qs('#editSectionImageContainer')
            messageToShow.innerHTML = "" 
            variable2 = true
            
        }
    })

    formToSubmit.addEventListener('submit', (e) => {

        if( variable1 == false || variable2 == false) {
    
            e.preventDefault()
    
        }
    
    })
} 

else {

    // Acá manejamos todo lo que pasa cuando en la ventana se está creando contenido


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
    formToCreate.addEventListener('submit', (e) => {

        if( variable1 == false || variable2 == false) {
    
            e.preventDefault()
            
        }
    
    })
}

// Implementación de Sweet alert para eliminar una sección

const deleteForm = qs('#deleteForm');


deleteForm.addEventListener('submit', (e) => {

    e.preventDefault()

    swal({
        title: "¿Estas seguro que deseas eliminar la sección?",
        text: "Esta acción es irreversible",
        icon: "warning",
        buttons: ["Cancelar", "Eliminar"],
        dangerMode: true,
      })
      .then((willDelete) => {
        
        if (willDelete) {
            swal("Se ha eliminado la sección seleccionada", {
                icon: "success",
            })
            .then(() => {
                deleteForm.submit()
            })
            
            
        } else {
            swal("La sección NO se ha eliminado");
            
        }
      })
      
})







