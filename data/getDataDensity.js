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
  var months = murder.filter(d=> R.prop('year',d)===2014)
  .map(R.prop('month'))
  return R.uniq(months)
}

const getSex=murder=>{
  var sex= murder.map(R.prop('sex'))
  return R.uniq(sex)
}


const getAccidentPerMen  = (murder,month)=>{
  var murders =  murder
  .filter(d=> R.prop('month',d)===month)
  .filter(d=> R.prop('sex',d)==="M")
  return murders
}

const getAccidentPerWomen  = (murder,month)=>{
  var murders =  murder
  .filter(d=> R.prop('month',d)===month)
  .map(R.prop('sex'))
  return murders
}

const formatData = murder => {

  const months = getMonths(murder);
  var sex = getSex(murder);

  return months
  .map(month => ({
    month,
    numberOfAccidentsMen: getAccidentPerMen(murder, month),
    numberOfAccidentsWomen: getAccidentPerWomen(murder, month),

  }))
  .map(d => ({ 
   mois: Number(d.month),
   sum_men: d.numberOfAccidentsMen.length,
   sum_women: d.numberOfAccidentsWomen.length
 }))

}


var data = (formatData(file));
saveJSON(data);
