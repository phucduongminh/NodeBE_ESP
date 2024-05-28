const tf = require("@tensorflow/tfjs-node");

let classificationModel;
let tokenizationModel;

tf.loadLayersModel("../../../training-model/classification_model.json").then((loadedModel) => {
  classificationModel = loadedModel;
});

tf.loadLayersModel("../../../training-model/tokenization_model.json").then((loadedModel) => {
  tokenizationModel = loadedModel;
});

exports.process = ((req, res) => {
  const { text } = req.body;
  if (!text) {
    return res
      .status(400)
      .json({ error: 'Missing "text" property in request body' });
  }

  const inputTensor = tf.tensor([text]);
  const classificationResult = classificationModel.predict(inputTensor);

  if (classificationResult.dataSync()[0] < 0.5) {
    return res
      .status(400)
      .json({ error: 'Invalid command' });
  }

  const tokenizationResult = tokenizationModel.predict(inputTensor);
  const tokenizedText = tokenizationResult.dataSync();

  res.json({ result: tokenizedText });
});