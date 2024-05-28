const speech = require('@google-cloud/speech');
require('dotenv').config();

const client = new speech.SpeechClient();

exports.transcribe = (async (req, res) => {
  //const audioContent = req.body.audio;
  const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const audio = {
    //content: audioContent,
    uri: gcsUri,
  };
  const request = {
    config: config,
    audio: audio,
  };

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
    console.log(`Transcription: ${transcription}`);
  res.send(transcription);
});