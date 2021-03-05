const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const benefitsNames = qsa('input.benefitsNames');
let messageBenefitsErrors = qsa(`div.messageBenefitsErrors`);

let benefitsNamesOk = []
let checkboxesOk = []
for(let i=0; i < benefitsNames.length; i++) {
    console.log(`checkboxes${i}`)

    checkboxesOk[i] = qsa(`checkbox.checkboxes${i}`);
    console.log(checkboxesOk)
    benefitsNames[i].addEventListener('change', (e) => {
        if (benefitsNames[i].value.length < 3) {
    
            messageBenefitsErrors[i].innerHTML = `<p> Debe contener al menos 3 caracteres</p>`
            benefitsNamesOk[i] = false

    
        } else {
            messageBenefitsErrors[i].innerHTML = "" 
            benefitsNamesOk[i] = true
        }
    })
    checkboxesOk[i].addEventListener('change', (e) => {
            if(checkboxesOk[i][0].value != 'true' &&  checkboxesOk[i][1].value != 'true' && checkboxesOk[i][2].value != 'true'){
    
                messageBenefitsErrors[i].innerHTML = `<p> Debe estar asosiado al menos a una categoria</p>`
                benefitsNamesOk[i] = false
    
        
            } else {
                messageBenefitsErrors[i].innerHTML = "" 
                benefitsNamesOk[i] = true
            }
        })
    
}

if (window.location.pathname.includes('edit')) {

    formToEdit.addEventListener('submit', (e) => {

        if( benefitsNamesOk.includes(false)) {
    
            e.preventDefault()
    
        }
    
    })

} else {
    
    formToCreate.addEventListener('submit', (e) => {

        if(benefitsNamesOk.includes(false)) {
    
            e.preventDefault()
    
        }
    
    })
}