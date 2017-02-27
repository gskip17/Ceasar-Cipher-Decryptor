var fs = require("fs")
var path = require('path');
var commander = require("commander");
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('dictionary.txt')
});

var fs = require("fs");
var text = fs.readFileSync("english3.txt").toString('utf-8').split("\n");

const args = process.argv;
var word = args[2].toString();
var totalTests = 0;
var variations = 0;

// removes unecessary punctuation. Crazy regex, credit goes to stack overflow - regex saves a lot of time that manual comparators.
var scrubbedArg = word.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"").replace(/(\r\n|\n|\r)/gm," ");

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

// it is a lot easier to iterate ascii code in java. In javascript
// strings are immutable, so I just decided to break the string apart and
// manually to the conversion. There isnt really a 'char' type in java, although
// it does have the capability to manipulate ascii code - it isnt worth it in case.
var nextLetter = function(char){
  switch(char){
    case "a": return "b";
    case "b": return "c";
    case "c": return "d";
    case "d": return "e";
    case "e": return "f";
    case "f": return "g";
    case "g": return "h";
    case "h": return "i";
    case "i": return "j";
    case "j": return "k";
    case "k": return "l";
    case "l": return "m";
    case "m": return "n";
    case "n": return "o";
    case "o": return "p";
    case "p": return "q";
    case "q": return "r";
    case "r": return "s";
    case "s": return "t";
    case "t": return "u";
    case "u": return "v";
    case "v": return "w";
    case "w": return "x";
    case "x": return "y";
    case "y": return "z";
    case "z": return "a";
    // if not a letter then return it
    default: return char;
  }
}

// runs each word of a cipher against the dictionary. I optimized this
// by declaring a threshold the decryption has to meet to pass.
// initially I tested every word, but that isnt very efficient if we know lot
// of words have already failed.
//
// If > 25% of the words tested so far fail, then we immedietly return FALSE.
//
// A decryption is passable if > 75% of the words pass.
//
// This way we can accommadate for name or strange words being apart of the cipher.
// We also dont need to keep a big array to keep track of which string scored the highest,
// since it is highly unlikely two ceasar cipher encrypted messages both score over 75%
var decrypt = function(cipher){
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
  if(score/array.length >= .75){
    return true;
  }
}

// the 'main' function.
//
// scrubs the message a little beffer iterating through each possible letter and testing
// the message against the decrytion comparator.
//
// when a message passes the decrytion function then it is a success and the program terminates.
var ceasar = function(cipher){
  cipher = cipher.toLowerCase();
  console.log(decrypt(cipher));
  var length = cipher.length;
  
  console.log("Original Encryption: " + cipher + "\n");

  for(var i = 0; i < 25; i++){
    var string = cipher.split('');
    for(var k = 0; k < length; k++){
      var currentChar = cipher.charAt(k);
      string[k] = nextLetter(currentChar);
    }

    cipher = string.join('');
    var result = decrypt(cipher);
    if(result === true){
      printSpace(10);
      console.log('\n');
      console.log('\n');
      console.log("Pass " + (i+1) + " SUCCESS \n\n");
      console.log("DECRYPTED: " + cipher + "\n \n");
      console.log("Message encypted " + (i+1) + " letter shifts down or " + (26-(i+1)) +" letter shifts up. \n \n" );
      console.log(totalTests + " tests were made against the dictionary. \n \n");
      console.log(variations + " possible word variations were tested. \n \n");
      return printSpace(2);
    }
    console.log("Pass " + (i+1) + ": " + cipher + "\n");
  }
  printSpace(10);
  console.log("Unable to decrypt. If the message is very short and made up of more irregular/non-english \nwords then normal words, the program will not be able to decrypt it. \n\n");
}

var printSpace = function(lines){
  for(var i = 0; i < lines; i++){
    console.log("..\n");
  }
}

ceasar(scrubbedArg);
