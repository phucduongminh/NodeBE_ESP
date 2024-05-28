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
  
  module.exports = { sentences, labels };