const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const productName = qs('#productName');
const productImage = qs('#productImage');
const bannerTitle = qs('#bannerTitle');
const bannerSubtitle = qs('#bannerSubtitle');
const formToEdit = qs('#formToEdit');
const formToCreate = qs('#formToCreate');

const formButton = qs('#formButton');

let productNameOK = false;
let productImageOK = true;
let bannerTitleOK = false;
let bannerSubtitleOK = false;

if (window.location.pathname.includes('edit')) {
    productName.addEventListener('change', (e) => {
        if (productName.value.length < 3) {
            let messageToShow = qs('#productNameError')
            messageToShow.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            productNameOK = false;
    
        } else {
            let messageToShow = qs('#productNameError')
            messageToShow.innerHTML = "" 
            productNameOK = true;
        }
    })
    
    productImage.addEventListener('change', (e) => {
        if (productImage.value.split('.')[1] != "jpg" && productImage.value.split('.')[1] != "jpeg" && productImage.value.split('.')[1] != "png") {   
            let messageToShow = qs('#productImageError')
            messageToShow.innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            productImageOK = false

        } else {
            let messageToShow = qs('#productImageError')
            messageToShow.innerHTML = "" 
            productImageOK = true
            
        }
    })
    bannerTitle.addEventListener('change', (e) => {
        if (bannerTitle.value.length < 3) {
            let messageToShow = qs('#bannerTitleError')
            messageToShow.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            bannerTitleOK = false;
    
        } else {
            let messageToShow = qs('#bannerTitleError')
            messageToShow.innerHTML = "" 
            bannerTitleOK = true;
        }
    })

    bannerSubtitle.addEventListener('change', (e) => {
        if (bannerSubtitle.value.length < 3) {
            let messageToShow = qs('#bannerSubtitleError')
            messageToShow.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            bannerSubtitleOK = false;
    
        } else {
            let messageToShow = qs('#bannerSubtitleError')
            messageToShow.innerHTML = "" 
            bannerSubtitleOK = true;
        }
    })

    formToEdit.addEventListener('submit', (e) => {

        if(productNameOK == false || productImageOK == false || bannerTitleOK == false || bannerSubtitleOK == false) {
    
            e.preventDefault()
    
        }
    
    })
} else {
    productName.addEventListener('change', (e) => {
        if (productName.value.length < 3) {
            let messageToShow = qs('#productNameError')
            messageToShow.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            productNameOK = false;
    
        } else {
            let messageToShow = qs('#productNameError')
            messageToShow.innerHTML = "" 
            productNameOK = true;
        }
    })
    
    productImage.addEventListener('change', (e) => {
        if (productImage.value.split('.')[1] != "jpg" && productImage.value.split('.')[1] != "jpeg" && productImage.value.split('.')[1] != "png") {   
            let messageToShow = qs('#productImageError')
            messageToShow.innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            productImageOK = false

        } else {
            let messageToShow = qs('#productImageError')
            messageToShow.innerHTML = "" 
            productImageOK = true
            
        }
    })
    bannerTitle.addEventListener('change', (e) => {
        if (bannerTitle.value.length < 3) {
            let messageToShow = qs('#bannerTitleError')
            messageToShow.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            bannerTitleOK = false;
    
        } else {
            let messageToShow = qs('#bannerTitleError')
            messageToShow.innerHTML = "" 
            bannerTitleOK = true;
        }
    })

    bannerSubtitle.addEventListener('change', (e) => {
        if (bannerSubtitle.value.length < 3) {
            let messageToShow = qs('#bannerSubtitleError')
            messageToShow.innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
            messageToShow.style.textAlign = "center"
            messageToShow.style.color = "red"
            messageToShow.style.margin = "15px"
            bannerSubtitleOK = false;
    
        } else {
            let messageToShow = qs('#bannerSubtitleError')
            messageToShow.innerHTML = "" 
            bannerSubtitleOK = true;
        }
    })

    formToCreate.addEventListener('submit', (e) => {

        if(productNameOK == false || productImageOK == false || bannerTitleOK == false || bannerSubtitleOK == false) {
    
            e.preventDefault()
    
        }
    
    })
}