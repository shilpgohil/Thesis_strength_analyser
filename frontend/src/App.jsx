import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeThesis } from './api/analyzer';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import Dashboard from './components/Dashboard';
import LoadingState from './components/LoadingState';

function App() {
    const [view, setView] = useState('upload'); // upload | loading | dashboard
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async (thesisText) => {
        setView('loading');
        setError(null);

        try {
            const result = await analyzeThesis(thesisText);
            setAnalysisResult(result);
            setView('dashboard');
        } catch (err) {
            console.error('Analysis failed:', err);
            setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
            setView('upload');
        }
    };

    const handleReset = () => {
        setAnalysisResult(null);
        setError(null);
        setView('upload');
    };

    return (
        <div className="min-h-screen gradient-bg">
            <AnimatePresence mode="wait">
                {view === 'upload' && (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Hero />
                        <UploadSection onAnalyze={handleAnalyze} error={error} />
                    </motion.div>
                )}

                {view === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LoadingState />
                    </motion.div>
                )}

                {view === 'dashboard' && analysisResult && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Dashboard result={analysisResult} onReset={handleReset} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
