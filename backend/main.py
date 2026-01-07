"""
Thesis Strength Analyzer - FastAPI Backend
Provides REST API for thesis analysis.
"""

import os
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

# Import analyzer
try:
    from backend.analyzer import StrengthAnalyzer
    from backend.models import StrengthReport as AnalysisResult
except ImportError:
    from analyzer import StrengthAnalyzer
    from models import StrengthReport as AnalysisResult
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Thesis Strength Analyzer API",
    description="Analyze investment theses using hybrid ML + LLM approach",
    version="1.0.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000", 
        "https://thesis-strength-analyser-5jby.vercel.app"
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    thesis_text: str


class AnalyzeResponse(BaseModel):
    overall_score: float
    grade: str
    component_scores: dict
    quick_stats: dict
    ml_features: dict
    sentence_analyses: list
    synthesis: dict
    audit_table: list
    logic_chain: list
    weakness_report: dict
    consistency_issues: list
    bias_analysis: dict


@app.get("/")
async def root():
    logger.info("Health check endpoint called")
    return {"status": "ok", "service": "Thesis Strength Analyzer API"}


@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_thesis(file: UploadFile = File(...)):
    """
    Analyze a thesis and return comprehensive strength report.
    """
    
    try:
        logger.info("Starting analysis for uploaded file")
        contents = await file.read()
        text = contents.decode("utf-8")

        if not text or len(text.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="Thesis text must be at least 50 characters long"
            )
        
        analyzer = StrengthAnalyzer(verbose=True)
        result = await analyzer.analyze(text)
        
        logger.info("Analysis completed successfully")
        return result
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
