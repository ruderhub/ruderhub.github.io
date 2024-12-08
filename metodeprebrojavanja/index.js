var racunaj = document.getElementById("izracunaj");
var ispis = document.getElementById("ispis");
var trigger;

function rijesi(){
    try{
        var s = document.getElementById("skup").value;
        var skup = s.split(",").map(broj => parseInt(broj.trim()));;
        var n = document.getElementById("znamenke").value;

        if (isNaN(n) || skup.some(isNaN)) {
            rezultatElement.textContent = "Molimo unesite ispravne podatke.";
            return;
        }

        if(document.getElementById("ponDa").checked){
            var rez = brojSaPonavljanjem(skup, n);
        }
        else if(document.getElementById("ponNe").checked){
            var rez = brojBezPonavljanja(skup, n);
        }else{
            alert("Polja ne smiju biti prazna");
        }

        localStorage.setItem("rezultat", rez);
        trigger = false;

    }catch(error){
        alert("Upisao si krivo jednadzbu:", error.message);
        trigger = true;
    }

}

racunaj.addEventListener("submit", function(event){
    event.preventDefault();

    rijesi();
    
    var pohrana = localStorage.getItem("rezultat");
    
    if(pohrana && !trigger){
        ispis.style.visibility = "visible";
        if(pohrana == 0){
            ispis.innerHTML = "<h3>Ne postoji niti jedna kombinacija kako se broj može ispisati.</h3>"
        }else{
            ispis.innerHTML = "<h3>Postoji " + pohrana + " kombinacija kako se broj može zapisati.</h3>"
        }
    }
});

function brojSaPonavljanjem(S, N) {
    const prveZnamenke = S.filter(broj => broj !== 0);

    return prveZnamenke.length * Math.pow(S.length, N - 1);
}

function brojBezPonavljanja(S, N) {
    if (N > S.length) return 0; 

    const prveZnamenke = S.filter(broj => broj !== 0); 

    if (prveZnamenke.length === 0) return 0; 

    let kombinacije = 0;
    for (let i = 0; i < prveZnamenke.length; i++) {
        const preostaleZnamenke = S.filter(broj => broj !== prveZnamenke[i]);
        kombinacije += faktorijel(preostaleZnamenke.length) / faktorijel(preostaleZnamenke.length - (N - 1));
    }
    return kombinacije;
}

function faktorijel(n) {
    if (n <= 1) return 1;
    return n * faktorijel(n - 1);
}