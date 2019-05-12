const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');
const fs = require('fs');

const file = require('./data.json');

const saveJSON = data => {
  // data est la liste d'objets créés avec "formatData"
  fs.writeFile(
    'finalData.json', // le nom du fichier
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

const getMonth=cause=>{
    var delit = delit.filter(d=> d.month)
  return delit
}


const getYear = delit=>{
  var delit = delit.filter(d=> d.year)
}

const formatData = cause => {

  const month = getMonth(cause);
  const year = getYear (cause);

  const results = causes.map(d=>({
    Mois: month,
    Année: year

  }))
  return results
 /**
  .map(country=>({
    country, 
    affected: sumAffectedByCountry(file,country),
  }))
  .sort((a, b) => b.affected - a.affected);**/
}


var data = (formatData(file));
saveJSON(data);
// var test= sumAffectedByCountry('Canada',list)
//saveJSON(test);