# S&P 500 ML Dashboard

A comprehensive machine learning dashboard for S&P 500 stock analysis.

## Features
- **Automated Pipeline**: Data ingestion, feature engineering, and model training.
- **ML Models**: Random Forest, SVM, Logistic Regression.
- **Deep Learning**: LSTM and CNN architectures.
- **Quantum ML**: Experimental VQC and QSVM models.
- **Interactive Dashboard**: Real-time visualization of model performance.

## Structure
- `pipeline/`: Python source code for the ML pipeline.
- `results/`: JSON files containing model metrics.
- `charts/`: Generated visualization images.
- `src/`: React frontend source code.
- `server.ts`: Express backend serving APIs and static assets.

## How to Run
1. Install Python dependencies: `pip install -r requirements.txt`
2. Install Node dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Trigger the pipeline via the dashboard UI or `python3 run_pipeline.py`
