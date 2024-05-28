const tf = require('@tensorflow/tfjs-node');

function tokenize(sentences) {
  return sentences.map(sentence => {
    return sentence.split(' ').map(word => {
      switch (word) {
        case 'turn on':
          return 'ON';
        case 'turn off':
          return 'OFF';
        case 'air conditioner':
          return 'AC';
        case 'light':
          return 'LIGHT';
        case 'first':
          return '1';
        case 'second':
          return '2';
        default:
          return word;
      }
    }).join(' ');
  });
}

module.exports = { tokenize };