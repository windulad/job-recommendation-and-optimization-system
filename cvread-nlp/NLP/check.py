import spacy
from spacy.tokens import DocBin
from tqdm import tqdm
import json
from sklearn.model_selection import train_test_split
import sys
import fitz

nlp=spacy.load('model/output/model-best')
fname='test/test.pdf'
doc=fitz.open(fname)
text=" "
for page in doc:
    text=text+str(page.get_text())
doc=nlp(text)
for ent in doc.ents:
    print(ent.text,"->>>>>>",ent.label_)