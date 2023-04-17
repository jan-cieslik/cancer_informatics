---
sidebar_position: 14
---
# Data Normalization

### Introduction

Data normalization is the process of transforming data into a standard format or scale to eliminate data redundancy, inconsistency, and improve the accuracy of the analysis. 
Normalization is typically performed on numerical data, although it can also be applied to categorical data.

The primary objective of data normalization is to bring the data into a common range or scale so that the data can be compared and analysed meaningfully. 
The normalization technique used will depend on the type of data, the characteristics of the data, and the intended use of the data.

There are several types of data normalization, including:

- **Min-max normalization:** This method scales the data to a range between 0 and 1.

- **Z-score normalization:** This method scales the data to have a mean of 0 and a standard deviation of 1.

- **Decimal scaling normalization:** This method scales the data to a range between -1 and 1.

- **Log transformation:** This method is used to normalize data that has a skewed distribution.

- **Box-Cox transformation:** This method is used to normalize data that has a skewed distribution and can handle negative values.

## Min-max normalization:

Min-max normalization is a popular data normalization technique that scales the data to a fixed range, typically between 0 and 1. The normalization formula is given by:

```r
# Min-max normalization
scaled_data <- (data - min(data)) / (max(data) - min(data))
``` 
:::note 
- **data** is the original data

- **min(data)** is the minimum value of the data

- **max(data)** is the maximum value of the data
:::
For a better comparison of the different methods, a medicine related dataset is always used in the following.
In this example, we have a dataset of three different medicines with their corresponding prices and effectiveness ratings. 

```r
# Example data
medicine <- data.frame(
  medicine_name = c("Medicine A", "Medicine B", "Medicine C"),
  price = c(20, 50, 80),
  effectiveness = c(0.3, 0.6, 0.8))
```
We first perform min-max normalization on the price and effectiveness columns using the `scale()` function. 

```r
# Min-max normalization
medicine_scaled <- as.data.frame(scale(medicine[,2:3], center = apply(medicine[,2:3], 2, min), scale = apply(medicine[,2:3], 2, max) - apply(medicine[,2:3], 2, min)))
medicine_scaled$medicine_name <- medicine$medicine_name
```

We then plot the original data and the scaled data using the `plot()` function, with medicine names displayed next to each data point using the `text()` function.

```r
# Plot the original and scaled data
par(mfrow = c(1, 2))
plot(medicine$price, medicine$effectiveness, xlim = c(0, 270), ylim = c(0, 1), main = "Original Data", xlab = "Price", ylab = "Effectiveness")
text(medicine$price, medicine$effectiveness, labels = medicine$medicine_name, pos = 4, cex = 0.8)
plot(medicine_scaled$price, medicine_scaled$effectiveness, xlim = c(0, 3), ylim = c(0, 1), main = "Min-Max Scaled Data", xlab = "Scaled Price", ylab = "Scaled Effectiveness")
text(medicine_scaled$price, medicine_scaled$effectiveness, labels = medicine_scaled$medicine_name, pos = 4, cex = 0.8)
```

![](./Images/Min-max-Normalization.png "Min-max-Normalization")

The resulting plot shows how min-max normalization scales the data to a fixed range between 0 and 1, while preserving the original relationship between the data points. 
:::info
This can be useful in cases where we want to compare medicines based on their relative price and effectiveness, without one variable dominating the other.
:::

## Z-Score Normalization

Z-score normalization (also called standardization) is a method of normalizing data that transforms the data into a standard normal distribution with a mean of 0 and a standard deviation of 1. 
It's based on the idea that data points can be represented in terms of their distance from the mean in terms of standard deviations.

To perform Z-score normalization in R, you can use the `scale()` function, which scales the data by subtracting the mean and dividing by the standard deviation. 
The `scale()` function returns a matrix or data frame of the same dimensions as the input data, with each column transformed to have a mean of 0 and a standard deviation of 1.

```r
# Z-score normalization
scaled_data <- scale(data)
```

Here's an example of using the `scale()` function to perform Z-score normalization on a simple data frame.
In this example, we first define the same medicine dataset as before.

```r
# Example data
medicine <- data.frame(
  medicine_name = c("Medicine A", "Medicine B", "Medicine C"),
  price = c(20, 50, 80),
  effectiveness = c(0.3, 0.6, 0.8))
```
We then perform Z-score normalization on the price and effectiveness columns using the `scale()` function, which centres the data at 0 and scales it based on the standard deviation of the data. 
```r
# Z-score normalization
medicine_scaled <- as.data.frame(scale(medicine[,2:3]))
```
Now we can plot the original data and the scaled data using the `plot()` function, with medicine names displayed next to each data point using the `text()` function. 
On further notice we add horizontal and vertical dashed lines at 0 to show the centre of the distribution.

```r
# Plot the original and scaled data
par(mfrow = c(1, 2))
plot(medicine$price, medicine$effectiveness, xlim = c(0, 200), ylim = c(0, 1), main = "Original Data", xlab = "Price", ylab = "Effectiveness")
text(medicine$price, medicine$effectiveness, labels = medicine$medicine_name, pos = 4, cex = 0.8)
plot(medicine_scaled$price, medicine_scaled$effectiveness, xlim = c(-2, 2), ylim = c(-2, 2), main = "Z-Score Scaled Data", xlab = "Scaled Price", ylab = "Scaled Effectiveness")
text(medicine_scaled$price, medicine_scaled$effectiveness, labels = medicine_scaled$medicine_name, pos = 4, cex = 0.8)
abline(h = 0, lty = 2, col = "gray")
abline(v = 0, lty = 2, col = "gray")
```

![](./Images/Z-Normalization.png "Z-Normalization")

The resulting plot shows how Z-score normalization scales the data based on the mean and standard deviation of the data, with negative values indicating below-average values and positive values indicating above-average values. 

:::info
This can be useful in cases where we want to compare medicines based on their relative distance from the mean, or to identify outliers in the data.
:::

## Sources & Further Reading

- Pickett B, Altieri G. Normalization: what does it really mean?. Med Dosim. 1992;17(1):15-27. doi:10.1016/0958-3947(92)90004-y

- Cao XH, Stojkovic I, Obradovic Z. A robust data scaling algorithm to improve classification accuracies in biomedical data. BMC Bioinformatics. 2016;17(1):359. Published 2016 Sep 9. doi:10.1186/s12859-016-1236-x

- Bolstad BM, Irizarry RA, Astrand M, Speed TP. A comparison of normalization methods for high density oligonucleotide array data based on variance and bias. Bioinformatics. 2003;19(2):185-193. doi:10.1093/bioinformatics/19.2.185

- Kranzusch R, Aus dem Siepen F, Wiesemann S, et al. Z-score mapping for standardized analysis and reporting of cardiovascular magnetic resonance modified Look-Locker inversion recovery (MOLLI) T1 data: Normal behavior and validation in patients with amyloidosis. J Cardiovasc Magn Reson. 2020;22(1):6. Published 2020 Jan 20. doi:10.1186/s12968-019-0595-7