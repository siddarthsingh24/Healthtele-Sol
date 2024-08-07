// src/transcriptionService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/transcribe'; // Replace with your server URL

export const transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.text; // Adjust based on server response format
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};
