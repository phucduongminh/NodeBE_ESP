const sentences = [
  'turn on the first air conditioner',
  'turn off the second light',
  'invalid sentence example',
  'hello',
  'hi',
  '',
  'turn on the second air conditioner',
  // Add more sentences...
];

const labels = [
  'valid',
  'valid',
  'invalid',
  'invalid',
  'invalid',
  'invalid',
  'valid'
  // Add more labels...
];

const vocabulary = ['turn', 'on', 'off', 'first', 'second', 'air', 'conditioner', 'light', 'floor', 'help', 'me', 'please'];
const wordIndex = {};
vocabulary.forEach((word, index) => {
  wordIndex[word] = index + 1; // start indexing from 1
});

module.exports = { sentences, labels, vocabulary, wordIndex };
