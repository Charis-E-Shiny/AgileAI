from pipeline.data_loader import download_dataset, load_sp500_data
from pipeline.feature_engineering import add_technical_indicators, prepare_data_for_modeling
from pipeline.ml_models import train_ml_models
from pipeline.dl_models import train_dl_models
from pipeline.qml_models import train_qml_models
from pipeline.chart_generator import generate_charts
import sys

def main():
    try:
        # 1. Data Loading
        path = download_dataset()
        df = load_sp500_data(path)
        
        # 2. Feature Engineering
        df = add_technical_indicators(df)
        X, y = prepare_data_for_modeling(df)
        
        # 3. Model Training
        ml_results, y_test, models = train_ml_models(X, y)
        dl_results = train_dl_models(X, y)
        qml_results = train_qml_models(X, y)
        
        # 4. Chart Generation
        generate_charts(ml_results, dl_results, qml_results)
        
        print("Pipeline completed successfully!")
        
    except Exception as e:
        print(f"Error in pipeline: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
