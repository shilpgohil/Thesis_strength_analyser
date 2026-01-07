import axios from 'axios';

// Hardcoded for production stability
const API_BASE = 'https://thesis-strength-analyser.onrender.com/api';
// const API_BASE = 'http://localhost:8000/api'; // Uncomment for local dev

export const analyzeThesis = async (thesisText) => {
    // Backend expects a file upload (UploadFile), so we convert text to a Blob
    const formData = new FormData();
    const blob = new Blob([thesisText], { type: 'text/plain' });
    formData.append('file', blob, 'thesis.txt');

    const response = await axios.post(`${API_BASE}/analyze`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const healthCheck = async () => {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
};
