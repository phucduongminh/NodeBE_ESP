const speech = require("@google-cloud/speech"); //Sử dụng thư viện google-cloud/speech
require("dotenv").config();

const client = new speech.SpeechClient(); //Không cần thêm key vì đã có file key.json

exports.transcribe = async (req, res) => {
  const audioContent = Buffer.from(req.body.audio, "base64"); //Lấy chuỗi base64 của file audio
  if (!audioContent) {
    console.log("No audio content provided");
    res
      .status(400)
      .json({ success: false, error: "No audio content provided" });
    return;
  }
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000, //16k Hz
    languageCode: "en-US", //Hiện tại, chưa xử lý được điều khiển bằng tiếng Việt
    //languageCode: "vi-VN",
  };
  const audio = {
    content: audioContent.toString("base64"), // Ensure this is in base64
  };
  const request = {
    config: config,
    audio: audio,
  };

  const [response] = await client.recognize(request);
  if (response.results.length === 0) {
    console.log("No speech was detected");
    res.status(400).json({ success: false, error: "No speech was detected" });
    return;
  } else {
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    console.log(`Transcription: ${transcription}`);
    res.status(200).json({ success: true, text: transcription });
  }
};
