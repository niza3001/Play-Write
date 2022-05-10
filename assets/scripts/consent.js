mode = false;
mode2 = false;

function transENG(){
    pdf = document.getElementById("pdf-frame");
    text1 = document.getElementById("guiding-text");
    text2 = document.getElementById("checkmark-text");
    link = document.getElementById("goal");
    
    text1.innerHTML = "";
    text2.innerHTML = "";
    link.innerHTML = "";
    
    console.log("translating to english");
    text1.innerHTML = "Dear parent, in order to proceed, please read the following consent form containing information about this study, and confirm your approval at the bottom of this page.<br>"; 

    link.innerHTML = "Para español, haga clic aquí.";

    text2.innerHTML = "I have read the consent form and agree to allow my child to participate in this study."

    pdf.src = "assets/PDF/ParentConsent.pdf";
    
    mode = !mode; 
}

function transENGAssent(){
    pdf = document.getElementById("pdf-frame2");
    text1 = document.getElementById("guiding-text2");
    text2 = document.getElementById("checkmark-text2");
    link = document.getElementById("goal2");
    
    text1.innerHTML = "";
    text2.innerHTML = "";
    link.innerHTML = "";
    
    console.log("translating to english")
    text1.innerHTML = "Dear participant, please read the following information about this study, and confirm at the bottom of this page.<br>" 

    link.innerHTML = "Para español, haga clic aquí."

    text2.innerHTML = "I have read the information and I agree to participate in this study."

    pdf.src = "assets/PDF/Assent.pdf";
    
    mode2 = !mode2; 
}


function transSPN(){
    pdf = document.getElementById("pdf-frame");
    text1 = document.getElementById("guiding-text");
    text2 = document.getElementById("checkmark-text");
    link = document.getElementById("goal");
    
    text1.innerHTML = "";
    text2.innerHTML = "";
    link.innerHTML = "";
    
    console.log("translating to spanish")
    text1.innerHTML = "Estimado padre, para continuar, lea el siguiente formulario de consentimiento que contiene información sobre este estudio y confirme su aprobación al final de esta página. <br>";

    link.innerHTML = "For English, click here."

    text2.innerHTML = "He leído el formulario de consentimiento y acepto permitir que mi hijo participe en este estudio.";

    pdf.src = "assets/PDF/ParentConsentSpanish.pdf";
    
    mode = !mode;
    
}

function transSPNAssent(){
    pdf = document.getElementById("pdf-frame2");
    text1 = document.getElementById("guiding-text2");
    text2 = document.getElementById("checkmark-text2");
    link = document.getElementById("goal2");
    
    text1.innerHTML = "";
    text2.innerHTML = "";
    link.innerHTML = "";
    
    console.log("translating to spanish")
    text1.innerHTML = "Estimado participante, lea la siguiente información sobre este estudio y confirme al final de esta página. <br>";

    link.innerHTML = "For English, click here."

    text2.innerHTML = "He leído la información y acepto participar en este estudio.";

    pdf.src = "assets/PDF/AssentSpanish.pdf";
    
    mode2 = !mode2;
    
}

function showTranslation(mode) {  
    if (!mode){
        transSPN();      
    } else {
        transENG();
    }    
}

function showTranslationAssent(mode) {  
    if (!mode2){
        transSPNAssent();      
    } else {
        transENGAssent();
    }    
}


function checkmark(){
    check = document.getElementById("defaultUnchecked")
    document.getElementById('next1').disabled = !check.checked;
}

function checkmarkChild(){
    check = document.getElementById("defaultUnchecked2")
    document.getElementById('next2').disabled = !check.checked;
}



