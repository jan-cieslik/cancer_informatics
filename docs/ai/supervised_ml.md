# Supervised Machine Learning

Supervised machine learning is used to categorize unknown data with the use of models which were trained with a labeled dataset. In this context "labeled" means, that for example images of breast cancer cells are already classified as benign or malignant.

In Python there are various libraries that can be used to build a machine learning model. In the following we will use [scikit-learn](https://scikit-learn.org/stable/index.html) to implement a supervised machine learning model that can classify breast cancer cells as benign or malignant.

First, we will need a dataset that is already labeled. Because it is simple to work with we can use the [Breast Cancer Wisconsin dataset](https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic) in the beginning. For every image of this dataset features of the cell nuclei were measured and put into a list together with the label "benign" or "malignant". If the label is "benign", the list contains `0`, which stands also for `false` and for "malignant" it contains `1` for `true`.

To implement a machine learning model in Python we first need to import all dependencies with the following code:

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn import tree
import matplotlib.pyplot as plt
```

## Load and access data

The dataset we want to work with is already integrated in scikit-learn. We can load it to use it further.

```python
dataset = load_breast_cancer()
```

The dataset also contains metadata, which is not needed for our machine learning model. The only parts we will need are the labels and the data itself. Because this dataset is organized as a dictionary, it consists of key-value pairs. An example of an arbitrary dictionary you can see here:

```python
dataset = {"data": [[0.3, 0.04, ...], 
                    [0.5, 0.06, ...], 
                    ...],
           "target": [0, 0, 1, ...],
           "feature_names": ["radius", "area", ...]
          }
```

This dictionary has similar key-value pairs as the one that we use. The labels "benign" and "malignant" can be found under the key "target". To access these labels and the data, the following code is used:

```python
data = dataset["data"]
targets = dataset["target"]
```

## Split dataset

A machine learning needs to be trained and tested. In order to test our model after we train it, we will need data, that wasn't seen by the model before. For that reason we have to split our original dataset in two seperate datasets. We can use the function `train_test_split()` for that:

```python
X_train, X_test, y_train, y_test = train_test_split(data, targets, test_size = 0.2, shuffle = False)
```

Normally the test dataset is smaller than the one for training, so we use the parameter `test_size = 0.2` to use 20 percent of the original dataset as testing data. The parameter `"shuffle = False"` makes sure that we will get the same splits if we run the programm multiple times.
`X_train` refers to the training data and `y_train` to the training labels, whereas `X_test` and `y_test` represent the data and labels of the testing set.

## Define model

There are different kinds of algorithms we can use to define a supervised machine learning model. The choice depends on the underlying data and the task, which can be classification or regression. Classification algorithms are used to categorize data, whereas regression algorithms can predict new data.
Popular methods are for example decision trees, random forests and logistic regression. 

In this case we want our model to classify the data with the labels "benign" or "malignant". Our method of choice will be a decision tree. To define our model we use `DecisionTreeClassifier()`:

```python
model = tree.DecisionTreeClassifier(random_state = 0, max_depth = 4)
```

`random_state` must be set to an integer to prevent that the results of the training randomly change when the programm runs again. The parameter `max_depth` determines the depth of the decision tree.


## Train model

Now, after we defined our model, we can train it. In order to do that, we use the training data and training labels as parameters for the `fit()` function. 

```python
model.fit(X_train, y_train)
```

The model parameters should now be fitted to predict the correct labels from the data.

To visualize the created tree we can use the following code:

```python
tree.plot_tree(model)
```

Output:

TODO: include tree

## Test model

To test the performance of our machine learning model we use the function `score()` on the training and test data and compare the results. Ideally the results should be nearly the same.

```python
print(f"Training accuracy:  {model.score(X_train, y_train)}")
print(f"Testing accuracy:  {model.score(X_test, y_test)}")
```

Output:
```
Training accuracy:  0.9912087912087912
Testing accuracy:  0.8947368421052632
```

As you can see there is a big difference between the two results which would indicate overfitting. That means the model memorized the training data and doesn't perform well on unseen data. You can imagine it like you would memorize physics tasks with the exact numbers but can't solve new similar tasks with different numbers.

To solve this problem we could change the `max_depth` parameter of `DecisionTreeClassifier()` to a smaller number. For every model you individually need to adjust `max_depth` to avoid overfitting.


TODO: include graphic max_depth variation


## References

<https://scikit-learn.org/stable/modules/tree.html>

<https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic>