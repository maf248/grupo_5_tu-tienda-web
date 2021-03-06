const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const productName = qs('#productName');
const productImage = qs('#productImage');
const bannerTitle = qs('#bannerTitle');
const bannerSubtitle = qs('#bannerSubtitle');
const formToEdit = qs('#formToEdit');
const formToCreate = qs('#formToCreate');

const formButton = qs('#formButton');

let productImageOK = true;

productName.addEventListener('change', (e) => {
    if (productName.value.length < 3) {
        let messageToShow = qs('#productNameError')
        messageToShow.innerHTML = `<p> - Debe contener al menos 3 caracteres </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"

    } else {
        let messageToShow = qs('#productNameError')
        messageToShow.innerHTML = "" 
    }
})

productImage.addEventListener('change', (e) => {
    if (productImage.value.split('.')[1] != "jpg" && productImage.value.split('.')[1] != "jpeg" && productImage.value.split('.')[1] != "png") {   
        let messageToShow = qs('#productImageError')
        messageToShow.innerHTML = `<p> - La imagen debe estar en formato JPG, JPEG o PNG </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"
        productImageOK = false;

    } else {
        let messageToShow = qs('#productImageError')
        messageToShow.innerHTML = ""
        productImageOK = true;
    }
})
bannerTitle.addEventListener('change', (e) => {
    if (bannerTitle.value.length < 3) {
        let messageToShow = qs('#bannerTitleError')
        messageToShow.innerHTML = `<p> - Debe contener al menos 3 caracteres </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"

    } else {
        let messageToShow = qs('#bannerTitleError')
        messageToShow.innerHTML = "" 
    }
})

bannerSubtitle.addEventListener('change', (e) => {
    if (bannerSubtitle.value.length < 3) {
        let messageToShow = qs('#bannerSubtitleError')
        messageToShow.innerHTML = `<p> - Debe contener al menos 3 caracteres </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"

    } else {
        let messageToShow = qs('#bannerSubtitleError')
        messageToShow.innerHTML = "" 
    }
})

if (window.location.pathname.includes('edit')) {

    formToEdit.addEventListener('submit', (e) => {

        if(productName.value.length < 3 || productImageOK != true || bannerTitle.value.length < 3 || bannerSubtitle.value.length < 3) {
    
            e.preventDefault()
    
        }
    
    })
} else {

    formToCreate.addEventListener('submit', (e) => {

        if(productName.value.length < 3 || (productImage.value.split('.')[1] != "jpg" && productImage.value.split('.')[1] != "jpeg" && productImage.value.split('.')[1] != "png") || bannerTitle.value.length < 3 || bannerSubtitle.value.length < 3) {
    
            e.preventDefault()
    
        }
    
    })
}