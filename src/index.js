let categorie = document.getElementById("value");

let bd = {
    numero:[],
    texto:[],
    caracteres:[]
};
let indexNumber =0;

function calcularValores(evt){
    evt.preventDefault();
    let res;
    //let ar = categorie.value.match(/([0-9]*[.])?[0-9]+/i);
    let ar = categorie.value.match(/^[0-9]+([.][0-9]+)?$/ig);
    console.log(ar);
    //if(!isNaN(res)){
    if(ar){    
        res = parseFloat(ar[0]);
        if(indexNumber===0)
            bd.numero.push({numero: res, acumulado: res});
        else
            bd.numero.push({numero: res, acumulado: res+bd.numero[indexNumber-1].acumulado});

        console.log(bd);
        document.getElementById("salida").innerHTML =  "<p><strong> es número </strong></p>";
        document.getElementById("insert-num").insertAdjacentHTML('beforeend', `<div class="item">${bd.numero[indexNumber].numero}</div>`);
        document.getElementById("insert-num").insertAdjacentHTML('beforeend', `<div class="item">${bd.numero[indexNumber].acumulado}</div>`);
        indexNumber++;
    }
    else {
        ar = categorie.value.match(/\W/ig);
        if(ar){
            ar.forEach(element => {
                bd.caracteres.push({caracter:element});
                //document.getElementById("item-text").insertAdjacentHTML('beforeend', `${element}`);
                document.getElementById("insert-car").insertAdjacentHTML('beforeend', `<div class="item">${element}</div>`);
            });
            console.log(bd);
            document.getElementById("salida").innerHTML =  "<p> <strong> es carácter </strong></p>";
        }else{
            const sal = [categorie.value.charAt(0), categorie.value.charAt(categorie.value.length-1)];
            bd.texto.push({texto:categorie.value, inicial:sal[0], final:sal[1] });
            document.getElementById("insert-tex").insertAdjacentHTML('beforeend', `<div class="item">${categorie.value}</div>
            <div class="item">${sal[0]}</div>
            <div class="item">${sal[1]}</div>
            `);
            
            console.log(bd);
            document.getElementById("salida").innerHTML =  "<p>El: <strong> es cadena </strong></p>";
        }
        
    }
    
}

document.getElementById("calcular").addEventListener("click", calcularValores, false);
