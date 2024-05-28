const speech = require('@google-cloud/speech');
require('dotenv').config();

const client = new speech.SpeechClient();

exports.transcribe = (async (req, res) => {
  const audioContent = Buffer.from(req.body.audio, 'base64');
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const audio = {
    content: audioContent.toString('base64'), // Ensure this is in base64
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