import random
import json
out = {}
l = []
for e in range(1000):
    d = {}
    d['PC1'] = "%0.2f" % random.random()
    d['PC2'] = "%0.2f" % random.random()
    d['Prediction'] = (random.random() < 0.5) * 1
    d['features'] = []
    for i in range(5):
        y = (random.random() < 0.5) * 1
        f = {}
        if y == d['Prediction'] and y == 1:
            f['roc'] = [1, 0, 0, 0]
        elif y == d['Prediction'] and y == 0:
            f['roc'] = [0, 0, 1, 0]
        elif y != d['Prediction'] and y == 1:
            f['roc'] = [0, 0, 0, 1]
        elif y != d['Prediction'] and y == 0:
            f['roc'] = [0, 1, 0, 0]
        d['features'].append(f)
    l.append(d)

out['features'] = l
with open('fake.json', 'w+') as f:
    json.dump(out, f)
