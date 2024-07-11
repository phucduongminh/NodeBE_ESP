const tf = require("@tensorflow/tfjs-node");
const { tokenize, tokenizeSentence, padSequences } = require("../../../training-model/tokenizer");
const { vocabulary } = require("../../../training-model/data");
const { tokenToJson, convertTimeExpressions } = require("./tokenToJson")

let classificationModel;

async function loadModels() {
  classificationModel = await tf.loadLayersModel("file://./classification_model/model.json");
}

loadModels();

const maxLen = 10; // Use the same maxLen as during training

exports.process = async (req, res) => {
  const {text} = req.body;
  let sentence;
  if (!text) {
    return res.status(400).json({ success: false, error: 'Missing "text" property in request body' });
  } else {
    sentence = convertTimeExpressions(text);
  }

  const tokenizedInput = tokenizeSentence(sentence);
  const paddedInput = padSequences([tokenizedInput], maxLen);
  const inputTensor = tf.tensor2d(paddedInput, [1, maxLen]);

  const classificationResult = classificationModel.predict(inputTensor);
  const isValid = classificationResult.dataSync()[0] > 0.5;

  if (!isValid) {
    return res.status(400).json({ success: false, error: 'Invalid command' });
  }

  const tokenizedText = tokenize(sentence);
  if (tokenizedText === 'INVALID') {
    return res.status(400).json({ success: false, error: 'Invalid command' });
  }
  const response = await tokenToJson(tokenizedText);


  res.status(200).json({ success: true, data: response });
};
