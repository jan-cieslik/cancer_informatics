# Machine Learning Algorithms

The decision, which machine learning algorithm should be used, depends on the underlying problem (e.g., classification, regression or clustering) and on the type of available data.
In this chapter we will give you an overview of different machine learning algorithms as well as some advantages and disadvantages, that should be considered.

## Supervised Machine Learning

Supervised machine learning models are trained with labelled data.
The algorithms for supervised machine learning problems can be divided into classification and regression algorithms.
Classification means grouping samples into distinct classes, whereas regression is used for predicting variables, for example the trend of housing prices.
In the following, some examples of popular algorithms are shown.

|Algorithm|Description|Task|Pros & Cons|
|---------|-----------|-----------|-----------|
|Decision Trees|can be imagined as a tree, which splits <br/>from the root into leaves by making <br/>decisions based on a feature threshold|classification and regression|+ can work with various data <br/>+ easy to interpret <br/>+ missing values can be interpolated <br/>+ efficient |
|Random Forests|consists of decision trees|classification|+ efficient <br/>+ better noise tolerance <br/>- large number of trees can increase computation time|
|K-Nearest Neighbour|classifies a data point by choosing <br/>the class of its nearest neighbours|classification and regression|+ simple use <br/>+ can be used for multimodal classification <br/>- large amount of training data lowers performance <br/>- noise and irrelevant features decrease accuracy|
|Linear Regression|fits a line to the data|regression|+ simple use <br/>- can only be used for linear problems <br/>- maybe too simple for real problems|
|Logistic Regression|fits a logistic curve to the data|classification|+ simple use <br/>+ noise can be tolerated <br/>+ efficient <br/>- requires large amounts of training data|
|Naïve Bayes|classifies objects by using <br/>conditional probability|classification and <br/>clustering (unsupervised)|+ simple use <br/>+ fast training <br/>+ little data needed <br/>+ can be applied for binary & multiclass classification <br/>+ used data can be discrete or continuous <br/>- cannot be used if features are dependent (e.g., time)|
|Support Vector Machines|classifies objects with the help of <br/>hyperplanes and creating margins <br/>between the classes|classification and regression|+ high accuracy <br/>+ works well with high-dimensional data <br/>- performance is dependent on parameter selection <br/>- noise decrease accuracy <br/>- difficult to interpret|

## Unsupervised machine learning

In contrast to supervised machine learning, unlabelled data is used for unsupervised machine learning.
There are different divisions of unsupervised learning.
The following is only an example:
- **Clustering:**
    Clusters of data points are created by finding their similarities and patterns.
    Clustering can be divided into different techniques like hierarchical and partitional clustering.
- **Dimensionality reduction:**
    High dimensional data is reduced to the most import information.
- **Association rule learning:**
    This technique is often used on large datasets, e.g., for data mining.
    It is based on finding the associations of different features.

Here you can see a few examples of unsupervised machine learning algorithms:

|Algorithm|Description|Task|Pros & Cons|
|---------|-----------|-----------|-----------|
|K-Means|creates a chosen number of clusters by <br/>adjusting the cluster centroids repeatedly|partitional clustering|+ efficient <br/>+ simple to interpret and use <br/>- number of clusters must be chosen before (even if they are unknown) <br/>- sensitive to the amount of data|
|Agglomerative Clustering | clusters objects based on the distance between them|hierarchical clustering|+ number of clusters does not have to be given <br/>- high complexity (less efficient)|
|Principal Component Analysis|reduces dimensionality by computing <br/>variables of the data without losing too <br/>much information|dimensionality reduction|+ fast calculation <br/>+ lowers dimensionality to increase performance of other algorithms <br/>- can lead to information loss <br/>- difficult to interpret|
|Apriori Algorithm|identifies frequently occurring data from <br/>a database by scanning it more than once|association rule learning|+ easy to implement <br/>- may have low performance|
|Frequent Pattern Growth Algorithm|is an improvement of the _a priori_ <br/>algorithm, which needs to scan the database twice|association rule learning|+ efficient and fast <br/>- harder to implement|

## References

- Alloghani, M., Al-Jumeily, D., Mustafina, J., Hussain, A., & Aljaaf, A. (2020). A systematic review on supervised and unsupervised machine learning algorithms for data science. *Supervised and unsupervised learning for data science*, 3-21.

- Naeem, S., Ali, A., Anam, S., & Ahmed, M. (2023). An Unsupervised Machine Learning Algorithms: Comprehensive Review. *International Journal of Computing and Digital Systems*. http://dx.doi.org/10.12785/ijcds/130172

- Ray, S. (2019). A quick review of machine learning algorithms. In *2019 International conference on machine learning, big data, cloud and parallel computing (COMITCon)*, 35-39. https://doi.org/10.1109/COMITCon.2019.8862451

- Sindhu Meena, K., & Suriya, S. (2020). A survey on supervised and unsupervised learning techniques. In *Proceedings of international conference on artificial intelligence, smart grid and smart city applications: AISGSC 2019* (pp. 627-644). Springer International Publishing.

- Singh, A., Thakur, N., & Sharma, A. (2016). A review of supervised machine learning algorithms. In *2016 3rd International Conference on Computing for Sustainable Global Development (INDIACom)*, 1310-1315.

- Usama, M., Qadir, J., Raza, A., Arif, H., Yau, K., Elkhatib, Y., Hussain, A., & Al-Fuqaha, A. (2019). Unsupervised machine learning for networking: Techniques, applications and research challenges. In *IEEE Access*, vol. 7, pp. 65579-65615. https://doi.org/10.1109/ACCESS.2019.2916648