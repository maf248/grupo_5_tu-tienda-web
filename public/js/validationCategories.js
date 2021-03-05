const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const category1Name = qs('#category1Name');
const category2Name = qs('#category2Name');
const category3Name = qs('#category3Name');
const categoryImage1 = qs('#categoryImage1');
const categoryImage2 = qs('#categoryImage2');
const categoryImage3 = qs('#categoryImage3');
const transactionCost1 = qs('#transactionCost1');
const transactionCost2 = qs('#transactionCost2');
const transactionCost3 = qs('#transactionCost3');
const sections1 = qs('#sections1');
const sections2 = qs('#sections2');
const sections3 = qs('#sections3');
const price1 = qs('#price1');
const price2 = qs('#price2');
const price3 = qs('#price3');

const categoryNames = qsa('#categoryNames')
console.log(categoryNames);
let messageToShow = qsa(`#categoryNameError`)

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
            
            messageToShow[i].innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
            messageToShow[i].style.textAlign = "center"
            messageToShow[i].style.color = "red"
            messageToShow[i].style.margin = "15px"
            messageToShow[i].style.fontSize = "0.5em"
    
        } else {
            messageToShow[i].innerHTML = "" 
        }
    })
 
}



categoryImage1.addEventListener('change', (e) => {
    if (categoryImage1.value.split('.')[1] != "jpg" && categoryImage1.value.split('.')[1] != "jpeg" && categoryImage1.value.split('.')[1] != "png") {   
        let messageToShow = qs('#categoryImage1Error')
        messageToShow.innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"
        messageToShow.style.fontSize = "0.5em"

    } else {
        let messageToShow = qs('#categoryImage1Error')
        messageToShow.innerHTML = "" 
        
    }
})
transactionCost1.addEventListener('change', (e) => {
    if (transactionCost1.value < 0 || transactionCost1.value > 100) {
        let messageToShow = qs('#transactionCost1Error')
        messageToShow.innerHTML = `<p> Debe ingresar un numero entre 0 y 100 </p>`
        messageToShow.style.textAlign = "center"
        messageToShow.style.color = "red"
        messageToShow.style.margin = "15px"
        messageToShow.style.fontSize = "0.5em"

    } else {
        let messageToShow = qs('#transactionCost1Error')
        messageToShow.innerHTML = "" 
    }
})

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