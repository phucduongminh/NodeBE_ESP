const sentences = [
  'turn on the first air conditioner',
  'turn off the second fan',
  'invalid sentence example',
  'hello',
  'hi',
  '',
  'turn on the second air conditioner',
  'on first conditioner',//
  'on second air',
  'turn on first air conditioner',//
  'please turn on the first air conditioner',//
  'turn on air conditioner first',//
  'turn on projector',//
  'say something',
  'test mic',
  'test mic again',//
  'make the air conditioner turn on',//
  'make the air conditioner turn off',//
  'make conditioner turn on',//
  'make conditioner turn off',//
  'make the air conditioner cooler',//
  'turn left',
  'oh no',//
  'turn on the TV',//
  'turn on the television',//
  'turn on the projector',
  'turn off the TV',
  'turn off the television',
  'turn off the projector',
  'oh my god',
  'how',
  'turn on',
  'turn off',
  'turn on the',
  'turn off the',
  'turn on fan', 
  'turn on air',
  // Add more sentences...
];

const labels = [
  'valid',
  'valid',
  'invalid',
  'invalid', //
  'invalid', //
  'invalid', //
  'valid', //
  'valid',//
  'invalid',//
  'valid',//
  'valid',
  'valid',
  'valid',
  'invalid',
  'invalid',
  'invalid',
  'valid',
  'valid',
  'valid',
  'valid',
  'valid',
  'invalid',
  'invalid',
  'valid',
  'valid',
  'valid',
  'valid',
  'valid',
  'valid',
  'invalid',
  'invalid',
  'invalid',
  'invalid',
  'invalid',
  'invalid',
  'valid',
  'invalid',
  // Add more labels...
];

const vocabulary = ['turn', 'on', 'off', 'first', 'second', 'air', 'conditioner', 'fan', 
'floor', 'help', 'me', 'please', 'the', 'a', 'an', 'TV', 'television', 'projector', 'make', 
'at', 'o\'clock', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
'eleven', 'twelve', 'a.m', 'p.m'];
const wordIndex = {};
vocabulary.forEach((word, index) => {
  wordIndex[word] = index + 1; // start indexing from 1
});

module.exports = { sentences, labels, vocabulary, wordIndex };
