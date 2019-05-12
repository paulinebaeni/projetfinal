const fetch = require('node-fetch');
const d3 = require('d3');
const R = require('ramda');
const fs = require('fs');

const file = require('./data.json');

const saveJSON = data => {
  // data est la liste d'objets créés avec "formatData"
  fs.writeFile(
    'dataDensity.json', // le nom du fichier
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

const getMonths=murder=>{
  var months = murder.map(R.prop('month'))
  .filter(d=> R.prop('year',d)===2014)
  return R.uniq(months)
}


const getAccidentPerMonths  = (accident,months)=>{
  return accident
  .map(R.prop('intent'))
  .filter(d=> R.prop('month',d)===month)
}

const formatData = murder => {

  const months = getMonths(murder);

  return months
  .map(month => ({
    month,
    numberOfAccidents: getAccidentPerMonths(accident, month),
  }))
  .map(d => ({ 
   mois: d.month
   sum: d.accidents.length,
 }))

  .sort((a, b) => a.sum > b.sum ? -1 : 1)
}


var data = (formatData(file));
saveJSON(data);
