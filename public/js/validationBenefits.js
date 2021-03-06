const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const benefitsNames = qsa('input.benefitsNames');
let messageBenefitsErrors = qsa(`div.messageBenefitsErrors`);
let messageAsociationErrors = qsa(`div.messageAsociationErrors`);

let benefitsNamesOk = []
let checkboxesBenefit = []
let checkboxesBenefitOk = []

for(let i=0; i < benefitsNames.length; i++) {
    
    checkboxesBenefit[i] = qsa(`input[type=checkbox].checkboxes${i}`);

    benefitsNames[i].addEventListener('change', (e) => {
        if (benefitsNames[i].value.length < 3) {
    
            messageBenefitsErrors[i].innerHTML = `<p> Debe contener al menos 3 caracteres</p>`
            benefitsNamesOk[i] = false

    
        } else {
            messageBenefitsErrors[i].innerHTML = "" 
            benefitsNamesOk[i] = true
        }
    })
    checkboxesBenefit[i].forEach(checkboxBenefit => {
        checkboxBenefit.addEventListener('change', (e) => {
            if(checkboxesBenefit[i][0].checked != true &&  checkboxesBenefit[i][1].checked != true && checkboxesBenefit[i][2].checked != true){
    
                messageAsociationErrors[i].innerHTML = `<p> Debe estar asosiado al menos a una categoria</p>`
                checkboxesBenefitOk [i] = false
    
        
            } else {
                messageAsociationErrors[i].innerHTML = "" 
                checkboxesBenefitOk[i] = true
            }
        })
    })
    
    
}

if (window.location.pathname.includes('edit')) {

    formToEdit.addEventListener('submit', (e) => {

        if(benefitsNamesOk.includes(false) || checkboxesBenefitOk.includes(false)) {
    
            e.preventDefault()
    
        }
    
    })

} else {
    
    formToCreate.addEventListener('submit', (e) => {

        if(benefitsNamesOk.includes(false) || checkboxesBenefitOk.includes(false)) {
    
            e.preventDefault()
    
        }
    
    })
}