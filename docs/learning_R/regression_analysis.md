---
sidebar_position: 13
---

# Regression Analysis

**Regression analysis** is a statistical method of analysis.
Regression can be used to test how effectively you can predict the values of one variable (= *dependent variable*) based on the values of one or more other variables (*independent variables*).
To do this, you examine the correlation of the variables and develop a prediction function on this basis.
The higher the correlation between the variables, the better one variable can be predicted by the other.

There are different types of regression analysis.
In this article we will discuss **linear regression** as well as **logistic regression**.

## Linear Regression

Linear regression is a regression model that describes the relationship between variables using a straight line.
It determines the best fit line for your data by looking for the value of the regression coefficient(s) that minimizes the overall error of the model.

Linear regression is divided into two types:
- **Simple linear regression**: looks at only one independent variable
- **Multiple linear regression**: looks at two or more independent variables

### Simple Linear Regression

Simple linear regression is used to evaluate the relationship between two quantitative variables.

In this chapter, we will work with the [Heights and weights](https://www.kaggle.com/datasets/tmcketterick/heights-and-weights) data set.
"*This data set gives average masses for women as a function of their height in a sample of American women of age 30–39*."


We will analyse the relationship between the `Height` (*m*, independent variable) and the `Weight` (*kg*, dependent variable).

#### 1. Load the Data Set

In order to load the data set, we have to [import the CSV file](./loadingdata.md#importing-a-csv-file) as follows:

```r
# Import the data set
hwd <- read.csv("hwd.csv")

# Look at the structure
str(hwd)

'data.frame':	15 obs. of  2 variables:
 $ Height: num  1.47 1.5 1.52 1.55 1.57 1.6 1.63 1.65 1.68 1.7 ...
 $ Weight: num  52.2 53.1 54.5 55.8 57.2 ...
```

To make it easier to work with this data set, you can attach it to the search path as follows:

```r
attach(hwd)
```

This allows you to refer to the variables in the data set by their names alone, rather than as components of the data frame (e.g. `Height` rather than `hwd#Height`).

#### 2. Visualize the Data Set

We should first visualize the data to understand it before running a simple linear regression.

First, we need to make sure that the relationship between `Height` and `Weight` is generally linear.
We can do this by creating a simple **scatter plot** with R's built-in function `scatter.smooth()`:

```r
 scatter.smooth(Height, Weight)
```

![](./Images/hwd_scatterplot.png "hwd Scatter Plot")

This plot shows that there is a linear relationship between `Height` and `Weight`.
The higher the `Height`, the higher the `Weight`.

Next, we can create a **box plot** to visualize the distribution of `Weight` and check for outliers.
By default, R will create a tiny circle if an observation is an outlier.

```r
boxplot(Weight)
```

![](./Images/hwd_boxplot.png "hwd Box Plot")

There are no tiny circles in the box plot, which means there are no outliers in our dataset.

#### 3. Simple Linear Regression Analysis

Now that we have established that the relationship between our variables is linear and that there are no outliers, we can design a simple linear regression model with the `lm()` function.

```r
# Compute a simple linear regression model
hwd_model <- lm(Weight ~ Height)

# Look at the summary
summary(hwd_model)

Call:
lm(formula = Weight ~ Height)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.88171 -0.64484 -0.06993  0.34095  1.39385 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  -39.062      2.938  -13.29 6.05e-09 ***
Height        61.272      1.776   34.50 3.60e-14 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 0.7591 on 13 degrees of freedom
Multiple R-squared:  0.9892,	Adjusted R-squared:  0.9884 
F-statistic:  1190 on 1 and 13 DF,  p-value: 3.604e-14884 
F-statistic:  1190 on 1 and 13 DF,  p-value: 3.604e-14
```

According to the model summary, the **fitted regression equation** to our model is `Weight = -39.062 + 61.272 x Height`.
There are many other values that you can read from the linear regression outcome:
- **Pr(>|t|)**: This is the p-value corresponding to the model coefficients.
If it is below 0.05, there is a statistically significant relationship between the variables.
- **Multiple R-squared**: The coefficient of determination is a value between 0 and 1 that indicates how well a statistical model predicts an outcome.
The higher the value, the better the explanatory factors predict the value of the response variable.
- **Residual standard error**: This is the average distance between the observed values and the regression line.
The lower this number, the better a regression line agrees with the observed data.
- **F-statistic & p-value**: The F-statistic and the associated p-value indicate the overall significance of the regression model, i.e. whether the explanatory variables of the model can explain the variance of the response variables.

#### 4. Checking Assumptions of the Model

One of the basic assumptions of linear regression is that the residuals of a regression model are essentially normally distributed and homoscedastic at each level of the explanatory variable.
If these assumptions do not apply to our model, the results of may be misleading.

To ensure that these assumptions are met, we can create the residual diagrams shown below.

##### 4.1. Residual vs. Fitted Values Plot

```r
# Define the residuals
hwd_res <- resid(hwd_model)

# Create a residual vs. fitted plot
plot(fitted(hwd_model), hwd_res)

# Add a horizontal line
abline(0,0)
```

![](./Images/hwd_residuals.png "hwd Residual vs. Fitted Values Plot")

We can assume that homoscedasticity is not broken as long as the residuals appear to be randomly and uniformly scattered across the graph around the number zero.

##### 4.2. Q-Q Plot

```r
# Create a Q-Q plot for the residuals
qqnorm(hwd_res)

# Add a diaganol line 
qqline(hwd_res)
```

![](./Images/hwd_qqplot.png "hwd Q-Q Plot")

The data is normally distributed when the numbers on the graph fall along a relatively straight line at a 45-degree angle.

From the two residual plots, we can conclude that our model is normally distributed and homoscedastic.

#### 5. Visualize the Results

The last step, visualizing the results, is optional and can be done as follows:

```r
library(ggplot2)

# Plot the data points on a graph
hwd_graph <- ggplot(hwd, aes(x = Height, y = Weight)) + geom_point()

# Add the linear regression line to the plotted data
hwd_graph <- hwd_graph + geom_smooth(method = "lm", col = "black")

# Look at the graph
hwd_graph
```

![](./Images/hwd_graph.png "hwd Graph")

### Multiple Linear Regression



## Sources & Further Reading

- [Heights and weights](https://www.kaggle.com/datasets/tmcketterick/heights-and-weights)