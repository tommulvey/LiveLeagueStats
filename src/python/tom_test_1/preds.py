import numpy as np
import pandas as pd
import joblib

lr = joblib.load('logistic_regression.pkl')
lrs = joblib.load('scaled_logistic_regression.pkl')
demo_game = pd.read_csv('final.csv')

pd.set_option('max_columns', demo_game.shape[1])
pd.set_option('max_rows', demo_game.shape[0])

demo_game.head()

np.set_printoptions(suppress=True)

preds = pd.DataFrame(np.round(lr.predict_proba(demo_game.iloc[:, 1:]) * 100, 2))
preds.columns = ['Purp_Pct', 'Blue_Pct']

preds = pd.concat([demo_game.iloc[:, :1], preds], axis=1)

preds.to_csv('preds.csv', index=False)