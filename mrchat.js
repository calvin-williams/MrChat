var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

function contains(words, word) {
  return words.indexOf(word) + 1;
}

function containsAny(words, list) {
  return list.find(function (word) {
    return contains(words, word);
  });
}

function containsAll(words, list) {
  var matches = list.filter(function (word) {
    return contains(words, word);
  });
  return matches.length === list.length;
}

rl.setPrompt('> ');

var person = {};

console.log('Tell me someting about you?');

rl.prompt();

rl.on('line', function (line) {
  // get the words they typed
  var words = line.toLowerCase().split(/[\W_]/);

  // find any numbers in the words
  var numbers = words.map(function (word) {
    return parseInt(word, 10);
  }).filter(function (number) {
    return !isNaN(number);
  });

  // did they tell us how old they are?
  if (contains(words, 'google') === 1 && words.length > 1) {
    words.shift();
    console.log('http://www.google.com/?q=' + words.join('+'))
  } else if (containsAny(words, ['wiki', 'wikipedia']) === 1 && words.length > 1) {
    words.shift();
    console.log('https://www.wikipedia.org/wiki/' + words.join('_'))
  } else if (contains(words, 'youtube') === 1 && words.length > 1) {
    words.shift();
    console.log('https://www.youtube.com/results?search_query=' + words.join('+'))
  } else if (contains(words, 'help')) {
    console.log('type help to open the help interface,');
    console.log('type google and what you want to search after google,');
    console.log('type youtube to and what you want to search on youtube after youtube,');
    console.log('type wiki or wikipedia and what you want to search on wikipedia after wiki or wikipedia,');
    console.log('');
    console.log('');
  } else if (containsAny(words, ['boy', 'male', 'man'])) {
    person.gender = 'male';
    console.log('So you are male!')
  } else if (containsAny(words, ['girl', 'lady', 'female'])) {
    person.gender = 'female';
    console.log('So you are female!')
  } else if (contains(words, 'am') && numbers.length === 1) {
    person.age = numbers[0];
    console.log('So you are ' + person.age + ' years old!')
  } else if (containsAll(words, ['name', 'is']) && contains(words, 'name') + 1 === contains(words, 'is')) {
    person.name = words[contains(words, 'is')];
    console.log('So your name is ' + person.name);
  } else if (contains(words, 'am')) {
    person.name = words[contains(words, 'am')];
    console.log('So your name is ' + person.name + '!');
    //this is a simple Knock Knock joke
  }  else if (contains(words, 'joke')) {
    console.log('Knock, Knock');
  } else if (containsAll(words, ['who', 'there'])) {
    console.log('pasture.');
  } else if (contains(words, 'pasture')) {
    console.log("pasture bed time isn't it?");
  } else if (contains(words, 'hello')) {
    if (person.name){
      console.log('hello, ' + person.name);
    } else {
      console.log('hello. what is your name?');
    }
  } else {
    // we didn't learn anything
    console.log("Sorry I'm pretty stupid, so I didn't understand what you just said.");
  }

  console.log('Things I know about you:', person);

  rl.prompt();
}).on('close', function() {
  console.log('good bye!');
  process.exit(0);
});
