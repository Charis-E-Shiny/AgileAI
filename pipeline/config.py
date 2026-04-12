import os

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESULTS_DIR = os.path.join(BASE_DIR, 'results')
CHARTS_DIR = os.path.join(BASE_DIR, 'charts')

# Ensure directories exist
os.makedirs(RESULTS_DIR, exist_ok=True)
os.makedirs(CHARTS_DIR, exist_ok=True)

# Dataset settings
KAGGE_DATASET = "camnugent/sandp500"

# Hyperparameters
ML_PARAMS = {
    'rf_estimators': 100,
    'xgb_learning_rate': 0.1,
    'svm_kernel': 'rbf'
}

DL_PARAMS = {
    'epochs': 10,
    'batch_size': 32,
    'learning_rate': 0.001
}

QML_PARAMS = {
    'n_qubits': 4,
    'n_layers': 2
}
