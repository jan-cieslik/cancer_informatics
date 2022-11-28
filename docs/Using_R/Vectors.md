# Vectors

A vector is defined as a place to hold a sequence of elements of the same data type. It is one of the data structures used in R programming. 

Vectors can be divided into two types:

- Atomic vectors
- Lists

:::note


The elements inside an atomic vector **must** be of the same data type and separated by a comma! If you create a vector with different data types, all non-character values will be coerced into a character type element, if one of them is character.


Lists, on the other hand, can contain elements of different data types. 

:::

To create an atomic vector, use the `c()` function:

```r

# In the following vector the names of 10 students in a classroom are stored

names_class <- c("Pia", "Mia", "Tia", "Kevin", "Rock", "Sam", "Richard", "Sara", "Tim")

```
Just like variables, you can simply type out the name of the vector, to display its contents. For the above example, the output would be:

![Vector1](./Images/Vector1.png)



## Selecting elements from vectors

### Method 1
You can choose specific elements from a vector through vector indexing. To do this, use square brackets (e.g. vector[1]) after the vector name and type in the index number that represents the position of the element inside the vector.

:::info Index in R

Each element inside a vector has an index:

![Vector2](./Images/Vector2.png)

Note that the first element in a vector has index 1, not 0 as in many other programming languages, like Python.

:::

```r

# In the following vector the names of 10 students in a classroom are stored

names_class <- c("Pia", "Mia", "Tia", "Kevin", "Rock", "Sam", "Richard", "Sara", "Tim")

# Selecting the third element inside this vector using vector indexing

names_class[3]

```
The above code would give the following output:

![Vector3](./Images/Vector3.png)


:::tip

Vector indexing is especially useful when you want to change an element from a specific vector. You can simply refer to the location of the current element using the index number and then assign a new element:

```r
# change the first name of names_class to Ria
names_class[1] <- "Ria"
```
This will change the first element of `names_class` from "Pia" to "Ria":

![Vector19](./Images/Vector19.png)

:::

You can also select multiple elements from a vector, using `:` or `c(,)`. 

```r

# Selecting the third, fourth, fifth, sixth and seventh element from the names_class vector:

names_class[3:7]
names_class[c(3, 4, 5, 6, 7)]

```
Both lines would give the following output:

![Vector4](./Images/Vector4.png)

:::caution

While the `:` will select all the elements from the first specified index to the last specified index, the `c(,)` will only select the elements for which you wrote the index! (Etwas umschreiben!)

:::

:::info

You can also access elements through the use of negative indexing. By giving a negative value in the index, R will drop that element from the result:

```r

names_class <- c("Pia", "Mia", "Tia", "Kevin", "Rock", "Sam", "Richard", "Sara", "Tim")

# Select all elements from the vector, except the second element

names_class[c(-2)]

```
R will omit the element at index 2 in its output:


![Vector11](./Images/Vector11.png)


:::

### Method 2

 Rather than using indices, you can also select elements by their names. For this, you need to name each individual element inside a vector using the `names()` function:



 ```r

# Creating a vector that stores the pulse rate of a patient that was measured consecutively every day for a week

pulse_rate <- c(78, 68, 74, 59, 64, 61, 57)

# to have a clear view of the data, name the above elements after the weekday on which they were measured

names(pulse_rate) <- c("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")

# print out the pulse_rate vector

pulse_rate

```

The output to the above code would be:

![Vector5](./Images/Vector5.png)

Now, to  select an element from the `pulse_rate` vector, use the designated name:

```r
# Select the pulse rate that was measured on Thursday

pulse_rate["Thursday"]

```

The output will be the element that corresponds to the name `"Thursday"`:

![Vector6](./Images/Vector6.png)


Similar to the first method, you can also select multiple elements using their names:


```r
# Select the pulse rate that was measured on Monday, Tuesday and Friday

pulse_rate[c("Monday", "Tuesday", "Friday")]

```
The output will be the elements that correspond to the names "Monday", "Tuesday", "Friday":

![Vector7](./Images/Vector7.png)

:::caution

When using names to select elements from a vector, you cannot use the `:` to select multiple elements!


:::


### Method 3
This method requires the use of the logical operator that were introduced before. 

You will first need to write down a logical argument:

```r
# Write a command that will print out all elements in pulse_rate that are above 65

pulse_rate <- c(78, 68, 74, 59, 64, 61, 57)

logical_pulse_rate <- pulse_rate > 65

logical_pulse_rate

```
The above code tests if the condition stated by the logical operator is `TRUE` or `FALSE` for every element inside `pulse_rate`: 

![Vector8](./Images/Vector8.png)

You can select the elements that correspond to `TRUE` in `pulse_rate` by putting the logical vector in square brackets that follow the `pulse_rate` vector:

```r
# Show the pulse rate that were above 65 bpm

pulse_rate[logical_pulse_rate]


```

R will automatically only show the elements that correspond to `TRUE` in `logical_pulse_rate`:


![Vector9](./Images/Vector9.png)

:::tip

To make the data even clearer, you can name the elements inside `pulse_rate` as seen in Method 2. That way you will also see on which day the pulse rate was above 65 bpm:

```r
pulse_rate <- c(78, 68, 74, 59, 64, 61, 57)

names(pulse_rate) <- c("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")

logical_pulse_rate <- pulse_rate > 65

pulse_rate[logical_pulse_rate]

```
The output will be:

![Vector10](./Images/Vector10.png)

This gives a much better overview, right? 😉

:::

## Working with vectors

### Merging different vectors together

You can not only use `c()` to create a new vector, but you can also use it to merge existing vectors into one:

```r
# create vector that that stores patient A's temperature over a week

temperature_week1 <- c(36, 35.9, 36.6, 36.2, 36.0, 37.1, 36.9)

# create another vector that stores patient A's temperature over a week 

temperature_week2 <- c(36.4, 36.9, 35.6, 37.2, 36.7, 35.3, 36.2)

# merge the above vectors together

temperature_overall <- c(temperatur_week1, temperatur_week2)

temperature_overall 

```
The output of `temperature_overall` is:

![Vector12](./Images/Vector12.png)


### Arithmetic operations

You can perform any arithmetic operation on vectors by using the arithmetic operators that were introduced a few chapters earlier. Note that R works element-wise, e.g. when adding two vectors, the first element in each vector is added together, then the second element in each vector is added together and so on:

```r
vector_1 <- c(3, 3, 3)
vector_2 <- c(1, 2, 3)

# Take the sum of vector_1 and vector_2

sum_vector <- vector_1  + vector_2

# Subtract vector_2 from vector_1

subtract_vector <- vector_1  - vector_2

# divide vector_1 with vector_2

divide_vector <- vector_1  / vector_2

sum_vector
subtract_vector
divide_vector
```
This will give the following output:

![Vector13](./Images/Vector13.png)



### The `sum()` function

You can calculate the sum of all elements in a vector (given that the elements are all numbers of some kind) using the sum() function:

```r

number_of_erythrocytes <- c(54, 23, 46, 62, 43, 59, 57, 50, 62)

# calculate the sum of the values in the vector (Neubauer Zählkammer)

total_erythrocytes <- sum(number_of_erythrocytes)

```
R will output the sum of the elements in vector `number_of_cells`

![Vector14](./Images/Vector14.png)

### Relational operations

You can also compare the values of different vectors by using the relational operators `< ` and` >`:

```r

number_of_leukocytes <- c(12, 28, 8, 18, 21, 19, 27, 12, 20)
total_leukocytes <- sum(number_of_leukocytes)

# compare total_leukocytes with total_erythrocytes

total_erythrocytes < total_leukocytes

```
The output will be:

![Vector15](./Images/Vector15.png)

### The `mean()` function

To calculate the average of values of a vector, you can use the mean() function:

```r

number_of_leukocytes <- c(12, 28, 8, 18, 21, 19, 27, 12, 20)

# calculate the average number of leukocytes

mean(number_of_leukocytes)
```

The output will be:

![Vector16](./Images/Vector16.png)

### The `seq()` function

We can also create a vector with numerical values in a sequence. To do so, we require the `seq()` function as well as three parameters:
- ` from ` = number at which the sequence begins
- ` to` = number at which the sequence ends
- ` by `  = interval of the sequence

```r
# create a vector with a numerical sequence that begins at 0 and ends at 50 and goes up in intervals of 10

numbers <- seq(from = 0, to = 50, by = 10)

numbers

```
The output will be:

![Vector17](./Images/Vector17.png)

:::tip

You can also write the above line of code in a shorter form:

```r
numbers <- seq( 0,50, by = 10)
```

:::

### The `sort()` function

You can sort the elements in a vector using the `sort()` in alphabetical order or (if it is numerical) from the smallest to the largest number:

```r
numbers_1 <- c(2,218,-64, 5.2,0,441, -19, 329)
names_class <- c("Pia", "Mia", "Tia", "Kevin", "Rock", "Sam", "Richard", "Sara", "Tim")

# Sort the elements of numbers_1 in order of the smallest to the largest
numbers_1_sorted <- sort(numbers_1)


# Sort the elements of names_class in alphabetical order
names_class_sorted <- sort(names_class)

numbers_1_sorted
names_class_sorted
```
The output will show the following:

![Vector18](./Images/Vector18.png)


:::tip

To sort the elements in reverse order, use the additional parameter `decreasing = TRUE`. This can be used for both numerical and character vectors!

:::




