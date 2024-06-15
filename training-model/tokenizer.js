const { wordIndex } = require('./data');

const IGNORED_WORDS = ['the', 'a', 'an', 'please', 'me', 'help', 'again', 'how', 'what', 'at']; // Added 'at'
const timeWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
                  'eleven', 'twelve'];
const timePeriods = ['a.m', 'p.m'];

function tokenize(sentence) {
  const words = sentence.split(' ');
  const tokens = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    if (IGNORED_WORDS.includes(word)) {
      continue; // Skip ignored words
    }

    // Time handling
    if (timeWords.includes(word)) {
      let hour = timeWords.indexOf(word) + 1; // Convert word to hour (1-12)

      // Check for 'o'clock'
      if (words[i + 1]?.toLowerCase() === 'o\'clock') {
        i++; 
      }

      // Check for AM/PM
      let period = words[i + 1]?.toLowerCase();
      if (timePeriods.includes(period)) {
        if (period === 'p.m' && hour !== 12) {
          hour += 12; // Convert to 24-hour format
        }
        i++;
      }

      tokens.push(`${hour}h`); // Add time token
      continue; // Move to the next word
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
      case 'fan':
        tokens.push('FAN');
        break;
      case 'first':
        tokens.push('1');
        break;
      case 'second':
        tokens.push('2');
        break;
      case 'tv':
      case 'television':
        tokens.push('TV');
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
  const words = sentence.split(' ').map(word => word.toLowerCase());
  let hasDevice = false;
  const tokenized = words.map(word => {
    const token = wordIndex[word] || 0;
    if (word === 'tv' || word === 'television' || word === 'projector' || word === 'fan' || word === 'conditioner') {
      hasDevice = true;
    }
    return token;
  });

  // Check if the sentence has a device type
  if (!hasDevice) {
    return [0]; // Return an array with a single 0 to indicate invalidity
  }
  return tokenized;
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
