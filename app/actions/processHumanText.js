function contains(words, word) {
  return words.indexOf(word) + 1;
}

function containsAny(words, list) {
  return list.find(word => contains(words, word));
}

function containsAll(words, list) {
  const matches = list.filter(word => contains(words, word));
  return matches.length === list.length;
}

export default function processHumanText(input, state, output) {

  const response = [];
  const line = input.text;
  const human = state.get('human');
  let url;

  // get the words they typed
  const words = line.toLowerCase().split(/[\W_]/);

  // find any numbers in the words
  const numbers = words.map(word => parseInt(word, 10)).filter(number => !isNaN(number));


  // did they tell us how old they are?
  if (contains(words, 'google') === 1 && words.length > 1) {
    words.shift();
    url = 'http://www.google.com/custom?q=' + words.join('+');
  } else if (contains(words, 'wiki') === 1 && words.length > 1) {
    words.shift();
    url = 'https://www.wikipedia.org/wiki/' + words.join('_');
  } else if (contains(words, 'youtube') === 1 && words.length > 1) {
    words.shift();
    url = 'https://www.youtube.com/results?search_query=' + words.join('+');
  } else if (contains(words, 'help')) {
    response.push('type help to open the help interface,');
    response.push('type google and what you want to search after google,');
    response.push('type youtube to and what you want to search on youtube after youtube,');
    response.push('type wiki or wikipedia and what you want to search on wikipedia after wiki or wikipedia,');
    response.push('');
    response.push('');
  } else if (containsAll(words, ['what', 'is', 'name'])) {
    response.push('My name is Mr. Chat');
  } else if (containsAll(words, ['who', 'you'])) {
    response.push('I am Mr. Chat');
  } else if (containsAny(words, ['boy', 'male', 'man'])) {
    state.set(['human', 'gender'], 'male');
    response.push('So you are male!');
  } else if (containsAny(words, ['girl', 'lady', 'female'])) {
    state.set(['human', 'gender'], 'female');
    response.push('So you are female!');
  } else if (contains(words, 'am') && numbers.length === 1) {
    const age = numbers[0];
    state.set(['human', 'age'], age);
    response.push('So you are ' + age + ' years old!');
  } else if (containsAll(words, ['name', 'is']) && contains(words, 'name') + 1 === contains(words, 'is')) {
    const name = words[contains(words, 'is')];
    state.set(['human', 'name'], name);
    response.push('So your name is ' + name);
  } else if (contains(words, 'am')) {
    const name = words[contains(words, 'am')];
    state.set(['human', 'name'], name);
    response.push('So your name is ' + name + '!');
    // this is a simple Knock Knock joke
  }  else if (contains(words, 'joke')) {
    response.push('Knock, Knock');
  } else if (containsAll(words, ['who', 'there'])) {
    response.push('pasture.');
  } else if (contains(words, 'pasture')) {
    response.push("pasture bed time isn't it?");
  } else if (contains(words, 'hello')) {
    if (human.name) {
      response.push('hello, ' + human.name);
    } else {
      response.push('hello. what is your name?');
    }
  } else {
    // we didn't learn anything
    response.push("Sorry I'm pretty stupid, so I didn't understand what you just said.");
  }

  // response.push('Things I know about you:', person);


  // state.set(['human', 'name'], 'Bob');

  output({ text: response, url });

}
