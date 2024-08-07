import React, { useState, useEffect, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef(null); // Use a ref to store mediaRecorder instance

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder; // Store the instance in ref
    let chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      setAudioBlob(blob);
      // Send the blob to transcription service
      transcribeAudio(blob);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Use the ref to access mediaRecorder instance
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    // Example function to send audio blob to a transcription service
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    try {
      const response = await fetch('https://your-transcription-service-url.com/transcribe', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setTranscription(result.transcription); // Update with appropriate field based on response
    } catch (error) {
      console.error('Error during transcription:', error);
    }
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <p>{transcription}</p>
    </div>
  );
};

export default AudioRecorder;
