import axios from 'axios';

// Hardcoded for production stability
const API_BASE = 'https://thesis-strength-analyser.onrender.com/api';
// const API_BASE = 'http://localhost:8000/api'; // Uncomment for local dev

export const analyzeThesis = async (thesisText) => {
    const response = await axios.post(`${API_BASE}/analyze`, {
        thesis_text: thesisText
    });
    return response.data;
};

export const healthCheck = async () => {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
};
