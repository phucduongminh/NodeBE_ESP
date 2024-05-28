const { wordIndex } = require('./data');

const IGNORED_WORDS = ['the', 'a', 'an', 'please', 'me', 'help']; // Add more words as necessary

function tokenize(sentence) {
  const words = sentence.split(' ');
  const tokens = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    if (IGNORED_WORDS.includes(word)) {
      continue; // Skip ignored words
    }

    switch (word) {
      case 'turn':
        if (words[i + 1]?.toLowerCase() === 'on' || words[i + 1]?.toLowerCase() === 'off') {
          tokens.push(words[i + 1].toUpperCase());
          i++;
        }
        break;
      case 'on':
        tokens.push('ON');
        break;
      case 'off':
        tokens.push('OFF');
        break;
      case 'air':
        if (words[i + 1]?.toLowerCase() === 'conditioner') {
          tokens.push('AC');
          i++;
        }
        break;
      case 'conditioner':
        tokens.push('AC');
        break;
      case 'light':
        tokens.push('LIGHT');
        break;
      case 'first':
        tokens.push('1');
        break;
      case 'second':
        tokens.push('2');
        break;
      default:
        if (wordIndex[word]) {
          tokens.push(wordIndex[word].toString());
        }
        break;
    }
  }

  return tokens.join('-');
}

function tokenizeSentence(sentence) {
  return sentence.split(' ').map(word => wordIndex[word.toLowerCase()] || 0); // Use 0 for unknown words
}

function padSequences(sequences, maxLen) {
  return sequences.map(seq => {
    if (seq.length < maxLen) {
      const padded = new Array(maxLen).fill(0);
      padded.splice(maxLen - seq.length, seq.length, ...seq);
      return padded;
    } else {
      return seq.slice(-maxLen);
    }
  });
}

module.exports = { tokenize, tokenizeSentence, padSequences };
