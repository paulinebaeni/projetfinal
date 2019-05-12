const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');
const fs = require('fs');

const file = require('./data.json');

const saveJSON = data => {
  // data est la liste d'objets créés avec "formatData"
  fs.writeFile(
    'dataCause.json', // le nom du fichier
    JSON.stringify(data, null, 2), // les données transformées en chaîne de charactères
    'utf-8', // l'encodage du fichier
    err => err ? console.log(err) : console.log('Saved file')
    // cette fonction est appelée quand le fichier a été sauvé
    // ou si une erreur est survenue
    // elle prends un argument "err" qui est l'erreur s'il y en a une
    // si "err" existe, nous écrivons l'erreur dans la console
    // sinon nous disons que le fichier a été sauvé
    )
}

const getCauses=cause=>{
    var causes = cause.map(R.prop('intent'))
  return R.uniq(causes)
}


const getNumberByCause  = (nombre,cause)=>{
  return nombre
  .filter(d=> R.prop('intent',d)===cause)
  .map(R.prop('year'))
}

const formatData = nombre => {

  const causes = getCauses(nombre);

  return causes
    .map(cause => ({
      cause,
      nombre: getNumberByCause(nombre, cause)
    }))
    .map(d => ({ 
     sum: d.nombre.length,
     test: d.cause
   }))

    .sort((a, b) => a.sum > b.sum ? -1 : 1)
}


var data = (formatData(file));
saveJSON(data);
