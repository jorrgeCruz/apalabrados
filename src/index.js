// importando dependencias
const Express = require("express");
const { connect } = require("mongoose");
// llamando al
const { numero } = require("./schema.js");
const { texto } = require("./schema.js");
const { caracter } = require("./schema.js");

const FakeData = require("./fake.json");
const typeTable = [numero,texto,caracter];

const Server = Express();
let counterN=0;
let counterT=0;
let counterC=0;

// Parametros de conexion
const USER = "root";
const PASSWORD = "SE8k2edZ5zM7jKoc";
const DATA_BASE = "workshop";

// Preparando cadena de conexion
const CONECTOR = `mongodb+srv://${USER}:${PASSWORD}@mydb.1gbmb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

function saveData(schema, response){
    return schema.save((error,data)=>{
        if (error) {
            response.status(404);
            response.json(error);
        } else {
            // en caso de que todo salga correcto enviamos la respuesta.
            response.status(200);
            response.json(data);
        }
    });
}
// Router para crear datos de manera aleatoria
Server.use("/random", (request, response) => {
    // Se consiguen los nodos del archivo FakeData
    const { numeros, acumulados } = FakeData;
    const { textos, inicios, finals } = FakeData;
    const { caracters } = FakeData;
    let op=Math.floor(Math.random() * 3);

    switch(op){
        case 0:
            const DATAN = {
                numero: numeros[counterN],
                acumulado: acumulados[counterN]
            }
            // Se indica que se crea un nuevo registro
            const NUMERO = new numero(DATAN);
            saveData(NUMERO, response);
            counterN = (counterN+1)%5;
            break;
        case 1:
            const DATAT = {
                texto: textos[counterT],
                inicio: inicios[counterT],
                final: finals[counterT]
            }
            // Se indica que se crea un nuevo registro
            const TEXT = new texto(DATAT);
            saveData(TEXT, response);
            counterT = (counterT+1)%5;
            break;
        case 2:
            const DATAC = {
                caracter: caracters[counterC],
            }
            // Se indica que se crea un nuevo registro
            const CARACTER = new caracter(DATAC);
            saveData(CARACTER, response);
            counterC = (counterC+1)%5;
            break;
    }
});

function useRoute(route){
    return Server.use(route, (request, response) => {
        // Generamos una busqueda completa.
        console.log(route)
        let index=0;
        if(route === "/numero")
            index=0;
        else if(route === "/texto")
            index = 1;
        else if(route === "/caracter")
            index = 2;    
        typeTable[index].find({}, (error, data) => {
            // En caso de error mostramos el problema
            if (error) {
                response.status(404);
                response.json(error);
            } else {
                // en caso de que todo salga correcto enviamos la respuesta.
                response.status(200);
                response.json(data);
            }
        });
    });
}

useRoute("/numero");
useRoute("/texto");
useRoute("/caracter");
// Routere para consultar todos los datos generados.

// Routere para consultar todos los datos generados.
/*Server.use("/texto", (request, response) => {
    // Generamos una busqueda completa.
    texto.find({}, (error, data) => {
        // En caso de error mostramos el problema
        if (error) {
            response.status(404);
            response.json(error);
        } else {
            // en caso de que todo salga correcto enviamos la respuesta.
            response.status(200);
            response.json(data);
        }
    });
});*/

// Abriendo la conexión a mongoDB Atlas
connect(
    CONECTOR,
    OPTIONS,
    MongoError => {
        // si algo sale mal mostramos el error y paramos el servidor
        if (MongoError) {
            console.error(MongoError);
            process.exit(1);
        }
        // se inicia el servidor
        Server.listen(8080, error => {
            // En caso de error indicamos el problemas
            if (error) {
                console.error(error);
                process.exit(1);
            }
            console.log("Conexión establecida con MongoDB Altas");
            console.log("Servidor listo");
        });
    }
);

/*
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
        
        //test // // // / / / / / / / /
        const DATAN = {
            numero: 10,
            acumulado: 20
        }
        // Se indica que se crea un nuevo registro
        //const AGEMDA = new agenda(DATA);
        const NUMERO = new numero(DATAN);
        NUMERO.save((error,data)=>{
            if (error) {
                response.status(404);
                response.json(error);
            } else {
                // en caso de que todo salga correcto enviamos la respuesta.
                response.status(200);
                response.json(data);
            }
        })
        
        //end testtest // // // / / / / / / / /
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

document.getElementById("calcular").addEventListener("click", calcularValores, false);*/
