var fs = require("fs")
var path = require('path');
var commander = require("commander");
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('dictionary.txt')
});

var fs = require("fs");
var text = fs.readFileSync("english3.txt").toString('utf-8').split("\n");

const args = process.argv;
//var word = args[2].toString();
var totalTests = 0;
var variations = 0;

// removes punctuation. Crazy regex, credit goes to stack overflow - regex saves a lot of time that manual comparators.
//var scrubbedArg = word.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"").replace(/(\r\n|\n|\r)/gm," ");

// function for comparing a word to the dictionary
// it basically iterates through the dictionary, yes its not efficient, but
// javascript doesnt bode well for filtering like java does, so eh.
var compare = function(word){
  var i = 1;
  for(var line in text){
    totalTests++;
    if(text[line].toString() == word){
      console.log("Found word at line: " + i);

      //found the word, return true
      return true;
    }
    i++;
  }
  // if we get her then no word was found
  return false;
}

var breakMessage = function(numColumns, message){

  //var message = message.replace(/\s+/g, '');

  var chunks = [];

  while (message) {
      if (message.length < numColumns) {
          chunks.push(message);
          break;
      }
      else {
          chunks.push(message.substr(0, numColumns));
          message = message.substr(numColumns);
      }
  }

  console.log("logging chunks: " + chunks);

  var newString = [];

  var currentLetter = 0;
  for(var i = 0; i < numColumns; i++){
    console.log("Starting " + i + "iteration");
    // iterate to number of columns
    if(currentLetter == numColumns){
      return newString.join('');
    }

    for(var k in chunks){
      console.log(chunks[k])
      console.log(chunks[k][currentLetter]);
      var char = chunks[k][currentLetter];
      if(char == undefined){
        newString.push(' ');
      } else{
        newString.push(char);
      }

      console.log("Logging NewString: " + newString.join(''));
    }

    currentLetter++;
  }

  var variations = chunks.join('');

  var newString = newString.join('');

  return newString;
}

var testMessage = function(cipher){
  var array = cipher.split(' ');
  var score = array.length;

  for(var i in array){
    variations++;
    console.log("SEARCHING: " + array[i]);
    if(compare(array[i]) == false){
      score--;
      console.log(array[i] + " not found...")
    }

    // if the first quarter of words are not valid then move on.
    if(score < array.length * .75){
      return false;
    }
  }
  console.log("\n");
  // if the score is greater than 75% correct, assume correct decryption
  if(score/array.length >= .90){
    return true;
  }
}

var decryptor = function(arg){

  arg = arg.toLowerCase();
  //arg = arg.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"").replace(/(\r\n|\n|\r)/gm," ");

  // test 20 column variations
  for(var i = 1; i <= 100; i++){

    console.log("BREAKING INTO " + i + " COLUMNS");
    var test = breakMessage(i, arg);
    console.log("Current String:" + test);
    var result = testMessage(test);
    console.log("MESSAGE PASSED: "+testMessage(test));

    if(result == true){
      console.log("\n\n SUCCESS");
      console.log("\n DECRYPTED: " + test);
      return console.log("DONE");
    }

  }

}



decryptor("Ahi  teogAiseesgstongre  ti histaidiwaenecooap  v sevWcis emc sntg hnu n tbleaeg hnnesnbt  in natse  iaon r eapitrlw ticaohaels hw ys   i tds ecthlstClrnuta rrd ueicinagnetfd ftim ihocnoheitmieea");
