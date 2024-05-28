const sentences = [
  'turn on the first air conditioner',
  'turn off the second light',
  'invalid sentence example',
  'hello',
  'hi',
  '',
  'turn on the second air conditioner',
  'on first conditioner',
  'on second air',
  'turn on first air conditioner',
  'please turn on the first air conditioner',
  'turn on air conditioner first',
  // Add more sentences...
];

const labels = [
  'valid',
  'valid',
  'invalid',
  'invalid',
  'invalid',
  'invalid',
  'valid',
  'valid',
  'invalid',
  'valid',
  'valid',
  'valid'
  // Add more labels...
];

const vocabulary = ['turn', 'on', 'off', 'first', 'second', 'air', 'conditioner', 'light', 'floor', 'help', 'me', 'please', 'the', 'a', 'an'];
const wordIndex = {};
vocabulary.forEach((word, index) => {
  wordIndex[word] = index + 1; // start indexing from 1
});

module.exports = { sentences, labels, vocabulary, wordIndex };
