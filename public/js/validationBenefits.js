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
    
            messageBenefitsErrors[i].innerHTML = `<p> - Mínimo requerido: 3 caracteres </p>`
            benefitsNamesOk[i] = false

    
        } else {
            messageBenefitsErrors[i].innerHTML = "" 
            benefitsNamesOk[i] = true
        }
    })
    checkboxesBenefit[i].forEach(checkboxBenefit => {
        checkboxBenefit.addEventListener('change', (e) => {
            if(checkboxesBenefit[i][0].checked != true && checkboxesBenefit[i][1].checked != true && checkboxesBenefit[i][2].checked != true){
    
                messageAsociationErrors[i].innerHTML = `<p> - Debe estar asosiado al menos a una categoria </p>`
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
    /*---En caso de creacion, seteamos en falso los formularios vacios por default para que funcione bien la verificacion----*/
    benefitsNamesOk[0] = false;
    checkboxesBenefitOk[0] = false;

    formToCreate.addEventListener('submit', (e) => {

        if(benefitsNamesOk.includes(false) || checkboxesBenefitOk.includes(false)) {
           
            e.preventDefault()

            if(benefitsNames[0].value.length < 3) {
                messageBenefitsErrors[0].innerHTML = `<p> - Mínimo requerido: 3 caracteres </p>`
                benefitsNamesOk[0] = false
            }
            if(checkboxesBenefit[0][0].checked != true && checkboxesBenefit[0][1].checked != true && checkboxesBenefit[0][2].checked != true) {
                messageAsociationErrors[0].innerHTML = `<p> - Debe estar asosiado al menos a una categoria </p>`
                checkboxesBenefitOk[0] = false
            }
        }
    
    })
}

/*---Sweet alert para confirmacion de DELETE BENEFIT---*/

const deleteBenefitsForms = qsa('.deleteForm');

deleteBenefitsForms.forEach( deleteForm => {
    deleteForm.addEventListener('submit', (e) => {

        e.preventDefault()

        swal({
            title: "¿Estas seguro que deseas eliminar el beneficio?",
            text: "Esta acción es irreversible",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
        .then((willDelete) => {
            
            if (willDelete) {
                swal("El beneficio ha sido eliminado", {
                    icon: "success",
                })
                .then(() => {
                    deleteForm.submit()
                })
                
                
            } else {
                swal("El beneficio NO se ha eliminado");
                
            }
        })
        
    })
})
