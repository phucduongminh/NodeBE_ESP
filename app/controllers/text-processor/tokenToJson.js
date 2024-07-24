exports.tokenToJson = (token) => {
  const parts = token.split("-");
  const decoded = {};

  // Improved command building
  decoded.command = parts
    .filter((part) => {
      return isNaN(part) && !part.includes("h"); // Filter out numbers and time parts
    })
    .join("-"); // Join remaining parts to form the command

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (!isNaN(part) && !part.includes("h")) {
      decoded.ordinal = parseInt(part);
    } else if (part.includes("h")) {
      decoded.hour = parseInt(part);
    }
  }

  return decoded;
};

exports.convertTimeExpressions = (inputSentence) => {
 // Check if there's a number in the sentence
 if (!/\d/.test(inputSentence)) {
  return inputSentence; // No numbers, return as is
}

// Regular expression to match time patterns (e.g., 6 p.m., 8:00)
const timeRegex = /(\d{1,2})(?::00)?\s*(?:p\.m\.|a\.m\.|o'clock)?/i;

// Replace matching time patterns with word equivalents
const convertedSentence = inputSentence.replace(timeRegex, (match, hour, minutes) => {
  const hourWord = numberToWord(hour);

  // Handle special cases
  if (minutes) {
    return `${hourWord} o'clock`; // Format time like "eight o'clock"
  } else {
    return `${hourWord} ${match.replace(hour, '').trim()}`; // e.g., "six p.m."
  }
});

return convertedSentence;
}

// Helper function to convert numbers to words (up to 12)
function numberToWord(num) {
const numberWords = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"
];
return numberWords[num] || num; // Return word or original number if out of range
}