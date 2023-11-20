# Supervised Machine Learning

Supervised machine learning is used to categorize unknown data with the use of models which were trained with a labeled dataset. In this context "labeled" means, that for example images of breast cancer cells are already classified as benign or malignant.

In Python there are various libraries that can be used to build a machine learning model. In the following we will use [scikit-learn](https://scikit-learn.org/stable/index.html) to implement a supervised machine learning model that can classify breast cancer cells as benign or malignant.

First, you will need a dataset that is already labeled. Because it is simple to work with you can use the [Breast Cancer Wisconsin dataset](https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic) in the beginning. For every image of this dataset features of the cell nuclei were measured and put into a list together with the label "benign" or "malignant". If the label is "benign", the list contains `false` or `0` and for "malignant" it contains `true` or `1`. 

The dataset we want to use is already integrated in scikit-learn. We can import and load it to use it further. 

```python

from sklearn.datasets import load_breast_cancer

dataset = load_breast_cancer()

```

The dataset also contains metadata, which is not needed for our machine learning model. The only parts we will need are the labels and the data itself.