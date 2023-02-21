---
sidebar_position: 6
---
# Factors

A factor is a data type used to store categorical variables. **Categorical** variables only have a limited number of categories, such as eye colour. In contrast, a **continuous** variable can have an infinite number of values, such as heights of different people. It is important to differentiate between these because statistical models treat them differently. The categories that data sets can take are referred to as **factor levels** in R.

## Creating a factor

Use the `factor()` function to create a factor. Before creating a factor, first generate a vector that contains all the data that belong to a limited number of categories. That vector will be an argument in the `factor()` function.

```r
# create a vector that contains all the data that belong to a limited number of categories

eye_colour <- c("brown", "grey", "blue", "green", "blue", "blue", "brown", "green", "brown", "brown", "brown")

factor_eye_colour <- factor(eye_colour)

factor_eye_colour 
```

This will create the following output:

```r
 [1] brown grey  blue  green blue  blue  brown green brown brown brown
Levels: blue brown green grey
```

Notice the last line: `Levels: blue brown green grey`.
R has identified the categories of the data and has listed them as "levels".

## Ordering factors

Categorical factors can be further divided into **nominal** and **ordinal** categorical variables. A **nominal categorical variable** has data that cannot be put into an order, such as eye colour. An **ordinal categorical variable** contains data that has natural ordering, such as the quality of pain on a numerical scale.

By default, R will set any factor into a nominal categorical variable, meaning that the data cannot be ordered. However, if you want to create an ordered factor (containing ordinal categorical variables), you require two additional arguments: `order` and `levels`:
- The `order` parameter is a logical clue. By default, R will not order the values factor.  However, by setting the `order = TRUE`, the values will be sorted.
- The `levels` argument is a vector which contains the values in the correct order.

```r
# create a vector that contains all the data that belong to a limited number of categories
pain_vector <- c("strong pain", "little pain", "little pain","very strong pain", "no pain", "strong pain", "strong pain")

# create an ordered factor
factor_pain_vector <- factor(pain_vector, order = TRUE, levels = c("no pain", "little pain", "strong pain", "very strong pain"))
factor_pain_vector
```

This will give the following output:
```r
[1] strong pain      little pain      little pain      very strong pain no pain          strong pain     
[7] strong pain     
Levels: no pain < little pain < strong pain < very strong pain
```

### The `levels()` function

The `levels()` function can also be used standalone to print out the categories of a factor.

```r
levels(factor_pain_vector)
```
R will only output the categories and not the entire data set:
```r
[1] "no pain"          "little pain"      "strong pain"      "very strong pain"
```

In addition, the `levels()` function is used to change the names of the categories to increase the clarity of the data.

:::note Example
You are conducting an experiment to find out the lethal dose of a new pharmaceutical drug. As part of your observation, you note down whether the experimental mice died from the given dose.
To save time, you abbreviate your findings with "D" (Dead) or "ND" (Not dead) and save them into a vector in R:

```r
lethal_dose_vector <- c("D", "ND", "ND", "ND","D", "ND", "D", "D", "D", "D", "D", "D", "ND", "ND", "D")

factor_lethal_dose_vector <- factor(lethal_dose_vector)
```
The abbreviation may lead to confusion when working with the data in R, you can change the factor levels to different names using the `levels()` function:

```r
levels(factor_lethal_dose_vector) <- c("dead", "not dead")

factor_lethal_dose_vector
```
The output will now show a factor with the data being converted from `"D"` and `"ND"` to `"dead"` and `"not dead"`:
```r
 [1] dead     not dead not dead not dead dead     not dead dead     dead     dead     dead     dead     dead    
[13] not dead not dead dead    
Levels: dead not dead
```
:::

:::tip

The order in which you assign the new factor levels is important, as R may otherwise not correctly map the data!

:::

## Selecting factors

You can select elements from the factor using the square brackets.
If the factor is ordered, you can compare different values, using the operators:

```r
factor_pain_vector[2] <  factor_pain_vector[5]
[1] FALSE
```

To change a value of a specific item in a factor, use the index number and assign the new value using `<-`.
```r
factor_pain_vector[5] <- "little pain"
```
This will change the value in position 5 of the `factor_pain_vector` from `"no pain"` to `"little pain"`:
```r
[1] strong pain      little pain      little pain      very strong pain little pain      strong pain     
[7] strong pain     
Levels: no pain < little pain < strong pain < very strong pain
```

:::caution
💡 You cannot change the value of a factor to an undefined level.

```r
factor_pain_vector[5] <- "excruciating pain"
```

You will receive a warning message:
```r
Warning message:
In `[<-.factor`(`*tmp*`, 5, value = "excruciating pain") :
  invalid factor level, NA generated
```
:::

## `Summary()` function

The `Summary()` function is a very convenient tool in R to get a quick overview of the content.
You can use the function on a vector:

```r
# Summary for a vector
summary(lethal_dose_vector)
```
R will print out the following output:
```r
   Length     Class      Mode 
       15 character character 
```
You can also use the `Summary()` function on a factor:
```r
# Summary for a factor
summary(factor_lethal_dose_vector)

```
The output for a factor will be a little different: 
```r
   dead not dead 
       9        6 
```

:::info
the `summary` function is a generic function which can be used across various data structures!

:::