const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const sections1 = qs('#sections1');
const sections2 = qs('#sections2');
const sections3 = qs('#sections3');
const price1 = qs('#price1');
const price2 = qs('#price2');
const price3 = qs('#price3');

const categoryNames = qsa('input.categoryNames');
console.log(categoryNames);
let messageNameErrors = qsa(`div.categoryNameErrors`);
console.log(messageNameErrors);

const categoryImages = qsa('input.categoryImages');
console.log(categoryImages);
let messageImageErrors = qsa(`div.categoryImageErrors`);
console.log(messageImageErrors);

const transactionCosts = qsa('input.transactionCosts');
console.log(transactionCosts);
let transactionCostsErrors = qsa(`div.transactionCostsErrors`);
console.log(transactionCostsErrors);

const formToEdit = qs('#formToEdit');
const formToCreate = qs('#formToCreate');
const formButton = qs('#formButton');

// let productNameOK = false;
// let productImageOK = true;
// let bannerTitleOK = false;
// let bannerSubtitleOK = false;

for(let i=0; i < categoryNames.length; i++) {   
    categoryNames[i].addEventListener('change', (e) => {
        if (categoryNames[i].value.length < 3) {
            
            messageNameErrors[i].innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
    
        } else {
            messageNameErrors[i].innerHTML = "" 
        }
    })
 
}
for(let i=0; i < categoryImages.length; i++) {   
    categoryImages[i].addEventListener('change', (e) => {
        if (categoryImages[i].value.split('.')[1] != "jpg" && categoryImages[i].value.split('.')[1] != "jpeg" && categoryImages[i].value.split('.')[1] != "png") {
            
            messageImageErrors[i].innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
    
        } else {
            messageImageErrors[i].innerHTML = "" 
        }
    })
 
}
for(let i=0; i < transactionCosts.length; i++) {   
    transactionCosts[i].addEventListener('change', (e) => {
        if (transactionCosts[i].value < 0 || transactionCosts[i].value > 100) {
            
            transactionCostsErrors[i].innerHTML = `<p> Debe ingresar un numero entre 0 y 100 </p>`
    
        } else {
            transactionCostsErrors[i].innerHTML = "" 
        }
    })
 
}


sections1.addEventListener('change', (e) => {
    if (sections1.value < 1 || sections1.value > 500) {
        let messageToShow = qs('#sections1Error')
        messageToShow.innerHTML = `<p> Debe ingresar un numero entre 1 y 500 </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"
        messageToShow.style.fontSize = "0.5em"

    } else {
        let messageToShow = qs('#sections1Error')
        messageToShow.innerHTML = "" 
    }
})

price1.addEventListener('change', (e) => {
    if (price1.value < 0 || price1.value > 16777215) {
        let messageToShow = qs('#price1Error')
        messageToShow.innerHTML = `<p> Debe ingresar un numero mayor o igual a 0 </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"
        messageToShow.style.fontSize = "0.5em"

    } else {
        let messageToShow = qs('#price1Error')
        messageToShow.innerHTML = "" 
    }
})


if (window.location.pathname.includes('edit')) {

    formToEdit.addEventListener('submit', (e) => {

        if(productNameOK == false || productImageOK == false || bannerTitleOK == false || bannerSubtitleOK == false) {
    
            e.preventDefault()
    
        }
    
    })

} else {
    
    formToCreate.addEventListener('submit', (e) => {

        if(productNameOK == false || productImageOK == false || bannerTitleOK == false || bannerSubtitleOK == false) {
    
            e.preventDefault()
    
        }
    
    })
}