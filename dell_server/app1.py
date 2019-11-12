#!/usr/bin/env python
# coding: utf-8

# In[17]:


#data preprocessing

#importing the libraries
from IPython.display import display

import sys
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import sklearn
from sklearn import model_selection
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
# from sklearn.linear_model import LogisticRegression
# from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
# from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
# from sklearn.naive_bayes import GaussianNB
# from sklearn.svm import SVC
from sklearn.metrics import confusion_matrix
import warnings; warnings.simplefilter('ignore')


# In[27]:


testset = pd.read_csv('Test.csv',header=None)
testset.drop(columns=[4,8],inplace=True)
myrow= testset
dataset = pd.read_csv('Dataset.csv',header=None)
dataset.drop(columns=[4,8],inplace=True)
#display(dataset.shape)
frames = [dataset, myrow]
dataset = pd.concat(frames)
dataset.columns = range(dataset.shape[1])
#display(dataset)


# In[19]:


pd.options.display.max_columns=1000
pd.options.display.max_rows=1000
#importing the dataset
dataset = dataset.iloc[1:, :]
y= dataset.iloc[:-1,-1:]
dataset = dataset.iloc[:, :-1]
# display(dataset)
#display(set(dataset[9]))
#display(len(set(dataset[9])))

x = dataset.values
#encoding categorical data
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
#first applying label encoding to convert strings to number.
#display(x[:,2])
labelencoder_x_1 = LabelEncoder()
labelencoder_x_2 = LabelEncoder()
labelencoder_x_3 = LabelEncoder()
labelencoder_x_4 = LabelEncoder()
x[:, 2] = labelencoder_x_1.fit_transform(x[:, 2])
x[:, 4] = labelencoder_x_2.fit_transform(x[:, 4])

#display(set(x[:,2]))
#display(set(x[:,4])) 


# In[20]:


#display(dataset.describe(include='all'))# Now applying one-hot-encoding to map the numbers to appropiate weights.
onehotencoder_1 = OneHotEncoder(categorical_features = [2])
x = onehotencoder_1.fit_transform(x).toarray()

df=pd.DataFrame(x)
#display(df.head(n=100))
#display(df.describe())


onehotencoder_2 = OneHotEncoder(categorical_features = [7])
x = onehotencoder_2.fit_transform(x).toarray()

#df=pd.DataFrame(x)
#display(df.describe())

#onehotencoder_3 = OneHotEncoder(categorical_features = [12])
#x = onehotencoder_3.fit_transform(x).toarray()
#df=pd.DataFrame(x)
#display(df.describe())

#onehotencoder_4 = OneHotEncoder(categorical_features = [19])
#x = onehotencoder_4.fit_transform(x).toarray()
#df=pd.DataFrame(x)
#display(df.describe())


# In[21]:


#Run This Cell Only for Training Purpose

dataset_train= x


# In[22]:


#Run This Cell Only for Training Purpose

dataset_train1 = dataset_train[:-1]
x_train =  dataset_train1
y_train = y
for i in x_train:
    print(i)

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(dataset_train1, y, test_size = 0.25, random_state = 0)
#spliutting in 70% and 30%

# featudisplayre scaling
# from sklearn.preprocessing import StandardScaler
# sc_x = StandardScaler()
# x_train = sc_x.fit_transform(x_train)
# x_test = sc_x.transform(x_test)

# df2 = pd.DataFrame(x_train)


# KNN Classifier
classifier = KNeighborsClassifier(weights = 'distance', n_neighbors=5)
name = 'K nearest neighbour'
classifier.fit(x_train, y_train)


# In[23]:


# Predicting the Test set results
y_pred = classifier.predict(x_test)

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score


accuracy_score(y_pred, y_test)




# cm = confusion_matrix(y_test, y_pred)
# # Applying k-Fold Cross Validation
# from sklearn.model_selection import cross_val_score
# accuracies = cross_val_score(estimator = classifier, X = x_train, y = y_train, cv = 10)
# accuracies.mean()
# accuracies.std()
    
# print()
# print("For {0} The Performance result is: ".format(name))
# print()

# #the performance of the classification model
# print("the Accuracy is: "+ str((cm[0,0]+cm[1,1])/(cm[0,0]+cm[0,1]+cm[1,0]+cm[1,1])))
# recall = cm[1,1]/(cm[0,1]+cm[1,1])
# print("Recall is : "+ str(recall))
# print("False Positive rate: "+ str(cm[1,0]/(cm[0,0]+cm[1,0])))
# precision = cm[1,1]/(cm[1,0]+cm[1,1])
# print("Precision is: "+ str(precision))
# print("F-measure is: "+ str(2*((precision*recall)/(precision+recall))))
# from math import log
# print("Entropy is: "+ str(-precision*log(precision)))


# display(y_test.transform)
# display(y_pred)


# In[34]:


# Run this cell, while giving a test input for prediction
import csv
import pandas as pd
x_test= dataset_train[-1:,:]
#display(x_test.shape)
x_train= dataset_train[:-1,:]
y_train = y
from sklearn.model_selection import train_test_split
with open('ttest.csv', 'w') as f:
    w = csv.writer(f, quoting=csv.QUOTE_ALL) 
    warranty=sys.argv[1] 
    screensize =sys.argv[2]
    cpu=sys.argv[3]
    ram=sys.argv[4]
    gpu=sys.argv[5]
    wind=sys.argv[6]
    weight=sys.argv[7]
    price=sys.argv[8]
    Category=sys.argv[9]
    w.writerow([warranty, screensize, cpu, ram, gpu, wind, weight, price, Category])
df2=pd.read_csv('ttest.csv',header=None)
df2.drop(columns=[4,8],inplace=True)
df3= df2
dataset11 = pd.read_csv('Dataset.csv',header=None)
dataset11.drop(columns=[4,8],inplace=True)
#display(dataset11)
frames1 = [dataset11, df3]
dataset4 = pd.concat(frames1)
dataset4 = dataset4.iloc[1:, :]
y1= dataset4.iloc[:-1,-1:]
dataset4=dataset4.iloc[:, :-1]
# display(dataset)
#display(set(dataset[9]))
#display(len(set(dataset[9])))
x1 = dataset4.values
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
#first applying label encoding to convert strings to number.
#display(x[:,2])
labelencoder_x_5 = LabelEncoder()
labelencoder_x_6 = LabelEncoder()

x1[:, 2] = labelencoder_x_5.fit_transform(x1[:, 2])
x1[:, 4] = labelencoder_x_6.fit_transform(x1[:, 4])
onehotencoder_5 = OneHotEncoder(categorical_features = [2])
x1 = onehotencoder_5.fit_transform(x1).toarray()

df4=pd.DataFrame(x1)
#display(df.head(n=100))
#display(df.describe())


onehotencoder_6 = OneHotEncoder(categorical_features = [7])
x1 = onehotencoder_6.fit_transform(x1).toarray()

dataset_train2= x1
dataset_train3 = dataset_train2[:-1]
x_train1 =  dataset_train3
y_train1 = y1
from sklearn.model_selection import train_test_split
x_train1, x_test1, y_train1, y_test1 = train_test_split(dataset_train3, y1, test_size = 0.25, random_state = 0)
# KNN Classifier
classifier1 = KNeighborsClassifier(weights = 'distance', n_neighbors=5)
name1 = 'K nearest neighbour'
classifier1.fit(x_train1, y_train1)
x_test1= dataset_train2[-1:,:]
x_train1= dataset_train2[:-1,:]
y_train1 = y1
from sklearn.model_selection import train_test_split

classifier1 = KNeighborsClassifier()
name1 = 'K nearest neighbour'

classifier1.fit(x_train1, y_train1)
# Predicting the Test set results
y_pred1 = classifier.predict(x_test1)

print(y_pred1[0])

#feature scaling
# from sklearn.preprocessing import StandardScaler
# sc_x = StandardScaler()
# x_train = sc_x.fit_transform(x_train)
# x_test = sc_x.transform(x_test)

# df2 = pd.DataFrame(x_train)
# display(df2.head())
