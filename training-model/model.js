const tf = require('@tensorflow/tfjs-node');
const { sentences, labels, vocabulary, wordIndex } = require('./data');
const { tokenizeSentence, padSequences } = require('./tokenizer');

const maxLen = 10; // Define maxLen here for consistency

async function createClassificationModel() {
  const tokenizedSentences = sentences.map(tokenizeSentence);
  const paddedSentences = padSequences(tokenizedSentences, maxLen);

  const sentencesTensor = tf.tensor2d(paddedSentences, [paddedSentences.length, maxLen]);
  const labelsTensor = tf.tensor1d(labels.map(label => label === 'valid' ? 1 : 0), 'int32');

  const model = tf.sequential();
  model.add(tf.layers.embedding({ inputDim: vocabulary.length + 1, outputDim: 50, inputLength: maxLen }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({ loss: 'binaryCrossentropy', optimizer: 'rmsprop', metrics: ['accuracy'] });

  await model.fit(sentencesTensor, labelsTensor, { epochs: 10 });

  await model.save('file://./classification_model');
}

createClassificationModel();
