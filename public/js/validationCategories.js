const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const categoryNames = qsa('input.categoryNames');
let categoryNameErrors = qsa(`div.categoryNameErrors`);
let categoryNamesOk = []

const categoryImages = qsa('input.categoryImages');
let categoryImageErrors = qsa(`div.categoryImageErrors`);
let categoryImagesOk = []

const transactionCosts = qsa('input.transactionCosts');
let transactionCostsErrors = qsa(`div.transactionCostsErrors`);
let transactionCostsOk = []

const sectionsWeb = qsa('input.sectionsWeb');
let sectionsWebErrors = qsa(`div.sectionsWebErrors`);
let sectionsWebOk = []

const priceSubscription = qsa('input.priceSubscription');
let priceSubscriptionErrors = qsa(`div.priceSubscriptionErrors`);
let priceSubscriptionsOk = []

const formToEdit = qs('#formToEdit');
const formToCreate = qs('#formToCreate');
const formButton = qs('#formButton');

if (window.location.pathname.includes('create')) {
    categoryNamesOk = [false, false, false]
    transactionCostsOk = [false, false, false]
    sectionsWebOk = [false, false, false]
    priceSubscriptionsOk = [false, false, false]
}


for(let i=0; i < categoryNames.length; i++) {   
    categoryNames[i].addEventListener('change', (e) => {
        if (categoryNames[i].value.length < 3) {

            categoryNameErrors[i].innerHTML = `<p> Debe contener al menos 3 caracteres </p>`
            categoryNamesOk[i] = false

        } else {
            categoryNameErrors[i].innerHTML = ""
            categoryNamesOk[i] = true
        }
    })
 
}
for(let i=0; i < categoryImages.length; i++) {   
    categoryImages[i].addEventListener('change', (e) => {
        if (categoryImages[i].value.split('.')[1] != "jpg" && categoryImages[i].value.split('.')[1] != "jpeg" && categoryImages[i].value.split('.')[1] != "png") {
            
            categoryImageErrors[i].innerHTML = `<p> La imagen debe estar en formato JPG, JPEG o PNG </p>`
            categoryImagesOk[i] = false

        } else {
            categoryImageErrors[i].innerHTML = ""
            categoryImagesOk[i] = true
        }
    })
 
}
for(let i=0; i < transactionCosts.length; i++) {   
    transactionCosts[i].addEventListener('change', (e) => {
        if (transactionCosts[i].value < 0 || transactionCosts[i].value > 100) {
            
            transactionCostsErrors[i].innerHTML = `<p> Debe ingresar un numero entre 0 y 100 </p>`
            transactionCostsOk[i] = false
    
        } else {
            transactionCostsErrors[i].innerHTML = ""
            transactionCostsOk[i] = true
        }
    })
 
}
for(let i=0; i < sectionsWeb.length; i++) {   
    sectionsWeb[i].addEventListener('change', (e) => {
        if (sectionsWeb[i].value < 1 || sectionsWeb[i].value > 500) {
            
            sectionsWebErrors[i].innerHTML = `<p> Debe ingresar un numero entre 1 y 500 </p>`
            sectionsWebOk[i] = false
    
        } else {
            sectionsWebErrors[i].innerHTML = ""
            sectionsWebOk[i] = true
        }
    })
 
}
for(let i=0; i < priceSubscription.length; i++) {   
    priceSubscription[i].addEventListener('change', (e) => {
        if (priceSubscription[i].value < 0 || priceSubscription[i].value > 16777215) {
            
            priceSubscriptionErrors[i].innerHTML = `<p> Debe ingresar un numero mayor o igual a 0</p>`
            priceSubscriptionsOk[i] = false
    
        } else {
            priceSubscriptionErrors[i].innerHTML = ""
            priceSubscriptionsOk[i] = true
        }
    })
 
}


if (window.location.pathname.includes('edit')) {

    formToEdit.addEventListener('submit', (e) => {
        console.log(categoryNamesOk.includes(false));
        console.log(categoryImagesOk.includes(false));
        console.log(transactionCostsOk.includes(false))
        console.log(sectionsWebOk.includes(false));
        console.log(priceSubscriptionsOk.includes(false));
        if(categoryNamesOk.includes(false) || categoryImagesOk.includes(false) || transactionCostsOk.includes(false) || sectionsWebOk.includes(false) || priceSubscriptionsOk.includes(false)) {
    
            e.preventDefault()
    
        }
    
    })

} else {
    
    formToCreate.addEventListener('submit', (e) => {
        console.log(categoryNamesOk.includes(false));
        console.log(categoryImagesOk.includes(false));
        console.log(transactionCostsOk.includes(false))
        console.log(sectionsWebOk.includes(false));
        console.log(priceSubscriptionsOk.includes(false));
        if(categoryNamesOk.includes(false) || categoryImagesOk.includes(false) || transactionCostsOk.includes(false) || sectionsWebOk.includes(false) || priceSubscriptionsOk.includes(false)) {
    
            e.preventDefault()
    
        }
    
    })
}