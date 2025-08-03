// ========== TEXT EMOTION SUBMIT ==========
const emotionForm = document.getElementById("emotionForm");
const emotionResult = document.getElementById("emotionResult");
const resultSection = document.getElementById("resultSection");

emotionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userText = document.getElementById("emotionText").value.trim();
  if (!userText) return alert("Please describe how you're feeling.");

  // Simulated emotion detection
  const emotions = ["Happy", "Sad", "Anxious", "Calm", "Stressed", "Angry"];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];

  emotionResult.textContent = `Predicted Emotion: ${randomEmotion}`;
  resultSection.style.display = "block";
});


// ========== AUDIO RECORDING ==========
let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById("startAudio");
const stopBtn = document.getElementById("stopAudio");
const audioPlayer = document.getElementById("audioPlayer");

startBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
      const audioURL = URL.createObjectURL(audioBlob);
      audioPlayer.src = audioURL;
      audioPlayer.style.display = "block";
      audioPlayer.play();
      audioChunks = [];
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err) {
    alert("Microphone access denied or not supported.");
  }
});

stopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});


// ========== VIDEO CAMERA ==========
const video = document.getElementById("videoFeed");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    video.outerHTML = "<p>Camera access denied or not available.</p>";
  }
}

startCamera();
