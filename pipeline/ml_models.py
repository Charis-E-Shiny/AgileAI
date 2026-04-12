from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, f1_score, roc_auc_score
import json
import os
from pipeline.config import RESULTS_DIR

def train_ml_models(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100),
        'SVM': SVC(probability=True),
        'Logistic Regression': LogisticRegression(max_iter=1000)
    }
    
    results = {}
    
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        y_prob = model.predict_proba(X_test)[:, 1]
        
        results[name] = {
            'accuracy': float(accuracy_score(y_test, y_pred)),
            'precision': float(precision_score(y_test, y_pred)),
            'f1': float(f1_score(y_test, y_pred)),
            'auc': float(roc_auc_score(y_test, y_prob))
        }
    
    # Save results
    with open(os.path.join(RESULTS_DIR, 'ml_results.json'), 'w') as f:
        json.dump(results, f, indent=4)
        
    return results, y_test, models
