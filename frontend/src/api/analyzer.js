import axios from 'axios';

// Auto-detect environment based on browser URL
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000/api'
    : 'https://thesis-strength-analyser.onrender.com/api';

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
