---
sidebar_position: 3
---
# Unsupervised Machine Learning

Unsupervised machine learning models work with unlabeled data, which means, that the model doesn't know the correct outcome but tries to cluster the data in sensible groups (e.g. the groups "benign" and "malignant") by using the similarity or differences of the characteristics of the data.

## Download the dataset

For this example we will use a dataset with [breast ultrasound images](https://doi.org/10.1016/j.dib.2019.104863). Besides the original source, you can also download it [here](https://www.kaggle.com/datasets/aryashah2k/breast-ultrasound-images-dataset/). Although this dataset is labeled, we can still use it for our unsupervised learning model. In real settings there are domain experts who label a subset of the clustered data points after the model is trained to test, how well the clusters were chosen.

After you download the dataset, your directory, which contains the images, should contain three different subdirectories as shown in the figure below.

![](./Images/folders_dataset.png "Dataset folders")

## Import dependencies

In the beginning, we have to import the needed python packages.

```python
import os
from PIL import Image
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.cluster import KMeans
from sklearn import metrics
from sklearn import preprocessing
from sklearn.decomposition import PCA
```

## Data preprocessing

The directories of the images still contain the mask of each image, which shows where a tumor is located. We only will use the images without the masks further. Make sure, that you delete or move the images which include the masks, so only the ultrasound images remain. In Linux, you can do this for example by using the command `rm *mask*` in each of the three folders.

### Resizing the images

When you look at the images, you can see, that they don't have the same size, so we have to scale them equally first. Doing this, we first have to decide what size would be best. In this case we do not have a large number of images, so we don't have to worry about restrictions regarding our computer performance. Otherwise, with a huge amount of images we would have to lower the resolution of the images to reduce the training time.
The chosen size should fit all images included in the dataset. For this reason we look at the smallest included image, which size is 190x335 pixels. Often, square images are used for machine learning models, so we chose a size of 190x190 pixels.

We will use the [PIL library](https://pillow.readthedocs.io/en/stable/) among others to preprocess the images. With the following code we can resize them.

```python
data_path_benign = './resize/benign/' # Insert the data path to the correct directory
images_benign = os.listdir(data_path_benign)

for img in images_benign:
    image = Image.open(data_path_benign + img)
    new_image = image.resize((190, 190))
    new_image.save('./resize/190x190/benign/' +  img) # Insert the data path where the resized images should be saved
```

In this example we chose `width = 190` and `height = 190`. The variable `data_path_benign` includes the path, where you get the original (benign) images from. The variable `images_benign` contains a list of all images in this folder, so we can access them at once and do not have to access every image individually. 
To resize the images we have to load them with `Image.open()`, resize them with `resize()` and in the end save them in the desired folder with `save()`.

Make sure, you repeat this process for the directories with the malignant and normal images before you continue.

### Prepare dataset

It is important to avoid discrimination in machine learning models. This means, that the training dataset should contain an equal amount of benign, malignant and normal images, so the model does not learn to prefer one label over the others.
In the original dataset there are approximately 430 benign, 210 malignant and 130 normal images. To achieve an equal amount, we can rotate or flip the images with the following code:

```python
# Rotate malignant images to double the amount
malignant_path = "./resize/190x190/malignant/"

for img in os.listdir(malignant_path):
    image = Image.open(malignant_path + img)
    rot_image = image.rotate(180) 
    rot_image.save(malignant_path + "rotated_" + img)

# Rotate and flip normal images to triple the amount
normal_path = "./resize/190x190/normal/"

for img in os.listdir(normal_path):
    image = Image.open(normal_path + img)
    rot_image = image.rotate(180) 
    rot_image.save(normal_path + "rotated_" + img)
    flipped_image = image.transpose(Image.FLIP_LEFT_RIGHT)
    flipped_image.save(normal_path + "flipped_" + img)
```

Machine learning algorithms can't directly work with images as input. They need numerical data. Therefor we need to transfer the images in a usable form, which will be an array.

```python
# Save image data of all images in one array

dataset_array = [] # list for the data (brightness values of each pixel of the images)
label_array = [] # list for the labels (required for testing)
data_path = "./resize/190x190/"

# Append the image data to the lists
# Use enumerate to get the index and the corresponding element of a list 
for idx, directory in enumerate(os.listdir(data_path)): 
    for img in os.listdir(data_path + directory):
        image = Image.open(data_path + directory + "/" + img)
        image_array = np.array(image)[:, :, 0] # Use one RGB channel for grayscale images
        # The data of each image needs to be flattened, in order to correspond to a row in the data matrix
        dataset_array.append(image_array.flatten()) 
        label_array.append(idx) # The index of each directory encodes the corresponding label

# We need to turn our lists into arrays
dataset_array = np.array(dataset_array)
label_array = np.array(label_array)
```

The `dataset_array`, which can also be seen as a matrix, should now contain the data of every image. One row of the matrix represents the whole data of one image. The columns, on the other hand, represent the data of the first pixel of every image, the second pixel of every image and so on. These columns are called features.

To test, if the `dataset_array` has the right dimensions, we can print the shape of the array. We have a total of 1256 images with the size of 190x190 pixels, so if everything worked correctly, the array should have the shape `(1256, 36100)`. The first number is the number of images or more specifically the amount of rows in the matrix and the second number refers to the number of pixels (190 x 190) of one image or the amount of columns in the matrix.

```python
print(dataset_array.shape)
```

Output:

```
(1256, 36100)
```

As you can see, the output is correct. We can continue.

### Normaliziation

To normalize our data, we divide each element of the `dataset_array` by 255, because the brightness of a pixel of a grayscale image is stored as a number between 0 and 255. The result will be an array of values between 0 and 1 as you can see, after the first ten elements of the dataset array were printed before and after normalization below.

```python
print(dataset_array[:10]) # Print dataset array before normalization
dataset_array = dataset_array / 255
print(dataset_array[:10]) # Print dataset array after normalization
```

Output:

```
[[239 253 255 ...  46  44  43]
 [157 174 186 ...  21  15  14]
 [113 129 146 ...  31  32  35]
 ...
 [ 98  98 100 ...   9   7   8]
 [ 15  14   9 ... 152 143 129]
 [145 154 155 ...  14  11   8]]

[[0.9372549  0.99215686 1.         ... 0.18039216 0.17254902 0.16862745]
 [0.61568627 0.68235294 0.72941176 ... 0.08235294 0.05882353 0.05490196]
 [0.44313725 0.50588235 0.57254902 ... 0.12156863 0.1254902  0.1372549 ]
 ...
 [0.38431373 0.38431373 0.39215686 ... 0.03529412 0.02745098 0.03137255]
 [0.05882353 0.05490196 0.03529412 ... 0.59607843 0.56078431 0.50588235]
 [0.56862745 0.60392157 0.60784314 ... 0.05490196 0.04313725 0.03137255]]
```

### Principal Component Analysis (PCA)

Principal component analysis (PCA) is used to find the best characteristics to describe the data points while reducing the dimensionality of a dataset.
We will now use PCA on our `dataset_array`.

```python
# Principal component analysis
pca = PCA(n_components = 50) # Define the PCA and chose the amount of principal components you want to be computed
pca.fit(dataset_array) # Train the PCA on our dataset_array
dataset_array_pca = pca.transform(dataset_array) # Transform our dataset_array with the PCA

# To see the difference in dimensionality print the shape of the old and new array
print("Without PCA: " + dataset_array.shape)
print("With PCA: " + dataset_array_pca.shape)
```

Output:

```
Without PCA: (1256, 36100)
With PCA: (1256, 50)
```

As you can see, the dimensionality of the array was reduced immensely.
The amount of principal components, that is required for the task and dataset, can vary and needs to be adjusted.

## Split dataset

After we preprocessed the data, we need to split the `dataset_array_pca` into a training and testing dataset for our unsupervised machine learning model. We also split our `label_array` to make it usable for later.

```python
X_train, X_test, y_train, y_test = train_test_split(dataset_array_pca, label_array, test_size = 0.1, random_state = 0, shuffle = True)
```

As `test_size` we chose `0.1`, which means, ten percent of our dataset is used for testing. `X_train` represents the training data, whereas `y_train` refers to the corresponding labels, which will not be used for our unsupervised machine learning model itself, only for later testing. In contrast to this, `X_test` and `y_test` refer to the testing dataset.

## Define model

In this example we need an algorithm that divides our data points into three different groups. This process is called clustering. We will use the [kMeans clustering algorithm](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html#sklearn.cluster.KMeans) for our model.

```python
model = KMeans(n_clusters = 3, random_state = 0)
```

`n_clusters = 3` is chosen, because our data consists of three labels ("benign", "malignant" and "normal"). The parameter `random_state = 0` is used to avoid changing results if we run the code multiple times.

## Train model

To train our unsupervised machine learning model, we use the function `fit()` with only our training data as input and without the training labels:

```python
model.fit(X_train)
```

Now, we should have a functioning model. In the following, we will validate how precise it is.

## Test model

Our model does not know the original labels. Because of that, it can occur, that the predicted labels have other names. For example, if the original label of the benign images was `0`, the predicted one could be `2` and so on. In this case we can use the `adjusted_rand_score()` function because it can compare the labels of the predicted data to the original labels even if they are defined differently. The first parameter of the function is the vector, which contains the original (true) labels, whereas the second parameter are the predicted labels.

```python
# Save predictions (clusters) in vectors
train_prediction = model.predict(X_train)
test_prediction = model.predict(X_test)

# Calculate the adjusted rand scores
train_score = metrics.adjusted_rand_score(y_train, train_prediction)
test_score = metrics.adjusted_rand_score(y_test, test_prediction)

# Print the results
print(f"Training accuracy: {round(train_score, 4)}")
print(f"Testing accuracy: {round(test_score, 4)}")
```

Output:

```
Training accuracy: 0.0988
Testing accuracy: 0.1146
```

The [adjusted rand index](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.adjusted_rand_score.html#sklearn.metrics.adjusted_rand_score) can vary between -0.5 and 1.0. A negative value would be worse than random guessing, 0.0 would be random guessing and 1.0 would be optimal prediction. Our values are near 0.1, so our model performs slightly better than random guessing. For better results we could have used other methods for preprocessing our data. Another approach would be using an artificial neural network instead of a simple machine learning algorithm because of the complexity of the image data.

## References

- Al-Dhabyani, W., Gomaa, M., Khaled, H., & Fahmy, A. (2020). Dataset of breast ultrasound images. *Data in Brief, 28*. https://doi.org/10.1016/j.dib.2019.104863
- Cohn, R., & Holm, E. (2021). Unsupervised machine learning via transfer learning and k-means clustering to classify materials image data. *Integrating Materials and Manufacturing Innovation, 10*(2), 231-244. https://doi.org/10.1007/s40192-021-00205-8
- Jolliffe, I., & Cadima, J. (2016). Principal component analysis: a review and recent developments. *Philosophical transactions of the royal society A: Mathematical, Physical and Engineering Sciences, 374*(2065), 20150202. https://doi.org/10.1098/rsta.2015.0202
- https://pillow.readthedocs.io/en/stable/
- https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html#sklearn.decomposition.PCA
- https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html#sklearn.cluster.KMeans
- https://scikit-learn.org/stable/modules/clustering.html#
- https://scikit-learn.org/stable/modules/generated/sklearn.metrics.adjusted_rand_score.html#sklearn.metrics.adjusted_rand_score