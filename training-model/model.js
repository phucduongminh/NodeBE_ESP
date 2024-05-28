const tf = require('@tensorflow/tfjs-node');
const { sentences, labels } = require('./data');
const { tokenize } = require('./tokenizer');

async function createClassificationModel() {
  const sentencesTensor = tf.tensor(sentences); // Convert the sentences to a tensor
  const labelsTensor = tf.tensor(labels.map(label => label === 'valid' ? 1 : 0));

  const model = tf.sequential();
  model.add(tf.layers.embedding({inputDim: sentencesTensor.shape[1], outputDim: 50}));
  model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

  model.compile({loss: 'binaryCrossentropy', optimizer: 'rmsprop', metrics: ['accuracy']});

  await model.fit(sentencesTensor, labelsTensor, {epochs: 10});

  await model.save('./classification_model.json');
}

async function createTokenizationModel() {
  const validSentences = sentences.filter((sentence, index) => labels[index] === 'valid');
  const tokenizedSentences = tokenize(validSentences);

  const inputTensor = tf.tensor(validSentences);
  const outputTensor = tf.tensor(tokenizedSentences);

  const model = tf.sequential();
  model.add(tf.layers.embedding({inputDim: inputTensor.shape[1], outputDim: 50}));
  model.add(tf.layers.lstm({units: 100, returnSequences: true}));
  model.add(tf.layers.timeDistributed(tf.layers.dense({units: outputTensor.shape[1]})));

  model.compile({loss: 'sparseCategoricalCrossentropy', optimizer: 'rmsprop'});

  await model.fit(inputTensor, outputTensor, {epochs: 10});

  await model.save('./tokenization_model.json');
}

createClassificationModel().then(() => createTokenizationModel());