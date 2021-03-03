const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const editTitleInput = qs('#editSectionTitle');
const editImageInput = qs('#editSectionImage');
const createTitleInput = qs('#sectionTitle');
const createImageInput = qs('#sectionImage');

console.log(editTitleInput)
console.log(editImageInput.value)

editTitleInput.addEventListener('change', (e) => {
    if (editTitleInput.value.length < 3) {
        const messageToShow = qs('#editSectionTitleContainer')
        messageToShow.innerHTML = `<p> El título debe contener al menos 3 caracteres </p>`
        messageToShow.style.textAlign = "center"
        const formToPrevent = qs('#formToEdit');
        formToPrevent.addEventListener('click', ev => {
            ev.preventDefault()
        })
    } else {
        const messageToShow = qs('#editSectionTitleContainer')
        messageToShow.innerHTML = "" 
        const formToPrevent = qs('#formToEdit');
        formToPrevent.addEventListener('click', ev => {
            
        })
    }
})

editImageInput.addEventListener('change', (e) => {
    console.log(editImageInput.value.split('.')[1])
    if (editImageInput.value.split('.')[1] != "jpg" || editImageInput.value.split('.')[1] != "jpeg" || editImageInput.value.split('.')[1] != "png") {
        const messageToShow = qs('#editSectionImageContainer')
        messageToShow.innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
        messageToShow.style.textAlign = "center"
    } else {
        const messageToShow = qs('#editSectionTitleContainer')
        messageToShow.innerHTML = "" 
    }
})

createTitleInput.addEventListener('change', (e) => {
    if (createTitleInput.value.length < 3) {
        const messageToShow = qs('#sectionTitleContainer')
        messageToShow.innerHTML = "<p> El título debe contener al menos 3 caracteres </p>" 
        messageToShow.style.textAlign = "center"
        const formToPrevent = qs('#formToEdit');
        formToPrevent.addEventListener('click', ev => {
            ev.preventDefault()
        })
    } else {
        const messageToShow = qs('#sectionTitleContainer')
        messageToShow.innerHTML = "" 
        const formToPrevent = qs('#formToEdit');
        formToPrevent.addEventListener('click', ev => {
            
        })
    }
})

createImageInput.addEventListener('change', (e) => {
    console.log(createImageInput.value.split('.')[1])
    if (createImageInput.value.split('.')[1] != "jpg" || createImageInput.value.split('.')[1] != "jpeg" || createImageInput.value.split('.')[1] != "png") {
        const messageToShow = qs('#editSectionImageContainer')
        messageToShow.innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
        messageToShow.style.textAlign = "center"
    } else {
        const messageToShow = qs('#editSectionTitleContainer')
        messageToShow.innerHTML = "" 
    }
})