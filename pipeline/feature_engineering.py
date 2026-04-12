import pandas as pd
import numpy as np

def add_technical_indicators(df):
    # Group by stock name to calculate indicators per stock
    df = df.copy()
    
    # Simple Moving Averages
    df['SMA_20'] = df.groupby('Name')['close'].transform(lambda x: x.rolling(window=20).mean())
    df['SMA_50'] = df.groupby('Name')['close'].transform(lambda x: x.rolling(window=50).mean())
    
    # Relative Strength Index (RSI)
    def calculate_rsi(series, period=14):
        delta = series.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        return 100 - (100 / (1 + rs))
    
    df['RSI'] = df.groupby('Name')['close'].transform(calculate_rsi)
    
    # Volatility (Standard Deviation)
    df['Volatility'] = df.groupby('Name')['close'].transform(lambda x: x.rolling(window=20).std())
    
    # Target: Predict if next day's close is higher than today's
    df['Target'] = df.groupby('Name')['close'].transform(lambda x: (x.shift(-1) > x).astype(int))
    
    # Drop rows with NaN values from indicators
    df = df.dropna()
    
    return df

def prepare_data_for_modeling(df, ticker='AAPL'):
    # Filter for a specific ticker for demo purposes
    stock_df = df[df['Name'] == ticker].copy()
    
    features = ['open', 'high', 'low', 'close', 'volume', 'SMA_20', 'SMA_50', 'RSI', 'Volatility']
    X = stock_df[features]
    y = stock_df['Target']
    
    return X, y
