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
    print ix
    for i in df.columns[4:54]:
        y = df.loc[ix][i]
        f = {}
        f['name'] = u"%s" % i
        f['value'] = y
        d['features'].append(f)
    l.append(d)

out['features'] = l
with open('data/final.json', 'w+') as f:
    json.dump(out, f)
