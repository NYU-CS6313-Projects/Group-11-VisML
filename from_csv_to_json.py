import pandas as pd
import json

df = pd.read_csv('data/Sample02_n1000_ProcessedData.csv')
out = {}
l = []


for ix in df.index:
    d = {}
    d['PC1'] = "%0.3f" % df.loc[ix]['PC1']
    d['PC2'] = "%0.3f" % df.loc[ix]['PC2']
    d['Prediction'] = "%s" % df.loc[ix]['Prediction']
    d['features'] = []
    for i in df.columns[4:14]:
        y = df.loc[ix][i]
        f = {}
        if y == d['Prediction'] and y == 1:
            f['name'] = u"%s" % i
            f['value'] = [1, 0, 0, 0]
        elif y == d['Prediction'] and y == 0:
            f['name'] = u"%s" % i
            f['value'] = [0, 0, 1, 0]
        elif y != d['Prediction'] and y == 1:
            f['name'] = u"%s" % i
            f['value'] = [0, 0, 0, 1]
        elif y != d['Prediction'] and y == 0:
            f['name'] = u"%s" % i
            f['value'] = [0, 1, 0, 0]
        d['features'].append(f)
    l.append(d)

out['features'] = l
with open('data/final.json', 'w+') as f:
    json.dump(out, f)
