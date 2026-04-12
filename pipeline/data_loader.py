import kagglehub
import pandas as pd
import os
import glob
from pipeline.config import KAGGE_DATASET

def download_dataset():
    print(f"Downloading dataset {KAGGE_DATASET}...")
    path = kagglehub.dataset_download(KAGGE_DATASET)
    print("Path to dataset files:", path)
    return path

def load_sp500_data(path):
    # The dataset usually contains multiple CSVs. We'll look for the individual stocks or the combined one.
    # For simplicity, let's try to find 'all_stocks_5yr.csv'
    csv_files = glob.glob(os.path.join(path, "*.csv"))
    
    # Try to find a specific file or just load the first one for demonstration
    target_file = None
    for f in csv_files:
        if 'all_stocks_5yr' in f:
            target_file = f
            break
    
    if not target_file and csv_files:
        target_file = csv_files[0]
        
    if target_file:
        df = pd.read_csv(target_file)
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values(['Name', 'date'])
        return df
    else:
        raise FileNotFoundError("No CSV files found in the dataset path.")

if __name__ == "__main__":
    path = download_dataset()
    df = load_sp500_data(path)
    print(df.head())
