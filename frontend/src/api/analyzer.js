import axios from 'axios';

const API_BASE = import.meta.env.PROD
    ? '/api'
    : 'http://localhost:8000/api';

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
