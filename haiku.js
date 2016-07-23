var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');
syllablesArray = makeSyllableArray(cmudictFile);

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function countSyllables(phoneme){
  if(Array.isArray(phoneme.match(/\d/g))){
      return phoneme.match(/\d/g).length;
  }
  return 0;
}

function makeSyllableArray(data){
  var lines = data.toString().split("\n"),
      lineSplit;
  var syllablesArray = [],
      syllableIndex;

  lines.pop(); //remove empty index;
  lines.forEach(function(line){
    lineSplit = line.split("  ");
    syllableIndex = countSyllables(lineSplit[1]);
    if(Array.isArray(syllablesArray[syllableIndex])){
        syllablesArray[syllableIndex].push(lineSplit[0]);
    }
    else{
      syllablesArray[syllableIndex] = [];
    }
  });
  return syllablesArray;
}

function createHaiku(structure, syllablesArray){
    var wordArray;
    return structure.map(function(line){
      return line.map(function(syllables){
        wordArray = syllablesArray[syllables];
        return wordArray[Math.floor(Math.random()*wordArray.length)];
      }).join(' ');
    }).join('\n');
}

/* Original, less-elegant, algorithm
  function createHaiku(structure, syllablesArray){
      for (var i = 0; i < structure.length; i++) {
          for (var j = 0; j < structure[i].length; j++) {
             currentSyllableArray = syllablesArray[structure[i][j]];
             haikuString += currentSyllableArray[Math.floor(Math.random()*currentSyllableArray.length)] + ' ';
          }
          haikuString += "\n";
      }
      console.log(haikuString);
  }
*/

module.exports = {
  createHaiku: createHaiku,
  syllablesArray: syllablesArray
};
