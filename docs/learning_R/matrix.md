---
sidebar_position: 9
---

# Matrix

A matrix is a two-dimensional data structure that allows you to store data in a grid-like format
Matrices are an essential data type in R and are widely used for various mathematical and statistical operations.
A matrix in R is a rectangular arrangement of elements organized in rows and columns.
All elements within a matrix must be of the same data type, such as numeric, character, or logical.


## Syntax

Matrices are created using the matrix() function, which takes the data elements and the desired dimensions of the matrix as arguments. 

### The `data` Parameter
The first argument in the `matrix()` function includes all the elements, that will be arranged into a matrix.
The data can be supplied via a vector:

```r
# define a vector directly inside the function
first_matrix <- matrix(c(1, 2, 3, 4, 5, 6))

# using a pre existing vector
example_vector <- 1:6
first_matrix <- matrix(data_matrix)
```

Both examples will result in the same output:

```r
>first_matrix

     [,1]
[1,]    1
[2,]    2
[3,]    3
[4,]    4
[5,]    5
[6,]    6
```

:::note 

`1:6` is a shortcut for `c(1, 2, 3, 4, 5, 6)`.
The colon operator `a:b` will create a sequence of numbers from `a` to `b`.

:::

### The `nrow` and `ncol` Parameter

R will create a matrix of one column and as many rows as the length of the vector by default.
However, you can also specify how many columns and rows should be used.

The `nrow` parameter indicates how many rows (left to right) the matrix should have, while the `ncol` parameter indicates how many columns (top to bottom) a matrix should have:

```r
colour_vector <- c("yellow", "red", "blue", "purple", "green", "brown" )

# create a matrix with 3 rows and 2 columns
colour_matrix <- matrix(colour_vector, nrow = 3, ncol = 2)
```

The above line of code will yield a matrix consisting of 3 rows and 2 columns:

```r
>colour_matrix

    [,1]     [,2]    
[1,] "yellow" "purple"
[2,] "red"    "green" 
[3,] "blue"   "brown" 
```
:::caution

You need to make sure, that the number of rows and columns corresponds to the number of elements that you want to store in the matrix. 

For example, if you have 7 elements, but specified 4 rows and 7 columns, R will reuse some elements:
```r
colour_matrix_2 <- matrix(colour_matrix, nrow = 4, ncol = 7)
```

R will repeat the elements until they fill out all rows and columns:

```r
>colour_matrix_2

     [,1]     [,2]     [,3]     [,4]     [,5]     [,6]     [,7]    
[1,] "yellow" "green"  "blue"   "yellow" "green"  "blue"   "yellow"
[2,] "red"    "brown"  "purple" "red"    "brown"  "purple" "red"   
[3,] "blue"   "yellow" "green"  "blue"   "yellow" "green"  "blue"  
[4,] "purple" "red"    "brown"  "purple" "red"    "brown"  "purple"
```
R will also leave a warning along the lines of: *Data length is not a divisor or multiple of the number of lines.*

:::

### The `byrow` Parameter

The `byrow` parameter is a boolean option.
By default, R will order the values column-wise (column by column).
However, by setting the `byrow = TRUE`, the values will be inserted by rows.

```r
data_matrix <- 1:6
first_matrix <- matrix(data_matrix, nrow = 2, ncol = 3, byrow = TRUE)
second_matrix <- matrix(data_matrix, nrow = 2, ncol = 3, byrow = FALSE)
```
The elements will now be sorted by rows:

```r
>first_matrix

     [,1] [,2] [,3]
[1,]    1    2    3
[2,]    4    5    6

>second_matrix

     [,1] [,2] [,3]
[1,]    1    3    5
[2,]    2    4    6
```
### The `rownames()` and `colnames()` Function

Using the `rownames()` function you can assign names to the rows of the matrix and using the `colnames()` function, you can assign the names to the columns of the matrix.

:::note Example
You measured the temperature at three different places (New Delhi, Berlin and Rio de Janeiro) at three different times of the day (morning, noon, evening): 
- 12°C, 23°C and 24°C in New Delhi
- 5°C, 5°C and 3°C in Berlin
- 23°C, 26°C and 25°C in Rio de Janeiro

The following code snippet illustrates how to display the information in a matrix in R:

```r
# create a vector that contains the temperatures measured 3 times a day in New Delhi, Berlin and Riod de Janeiro
temperature_vector <- c(12, 23, 24, 5, 5, 3, 23, 26, 25)

# create a matrix to show the above information in a more organised manner
temperature_matrix <- matrix(temperature_vector, nrow = 3, ncol = 3)

# create a vector for the names of the columns of the matrix. The names are the 3 different locations at which the temperature was measured
place_vector <- c("New Delhi", "Berlin", "Rio de Janeiro")

# create a vector for the names of the rows of the matrix. The names are the times of the day at which the temperature was measured
time_vector <- c("morning", "noon", "evening")

# assign the vectors containing the names to the temperature_matrix using the appropriate functions
rownames(temperature_matrix) <- time_vector
colnames(temperature_matrix) <- place_vector
```
The output will have the names of the city on top of each column and the time of the day at which the temperature was measured on the rows:

```r
> temperature_matrix

        New Delhi Berlin Rio de Janeiro
morning        12      5             23
noon           23      5             26
evening        24      3             25
```
:::
### The `rowSums()` and `colSums()` Function

To calculate the sum of a row inside a matrix, use the `rowSums()` function.
As a parameter you need to include the matrix from which the values of the rows should be added together:

```r
# create a matrix with the number of 1 to 6
data_matrix <- 1:6
first_matrix <- matrix(data_matrix, nrow = 2, ncol = 3, byrow = TRUE)

# calculate the total of each row and assign it to a vector
total_row <- rowSums(first_matrix)

```
The vector `total_row` will contain the sums of the rows of the matrix `first_matrix`:

```r
> total_row

[1]  6 15
```

To calculate the sum of each column inside a matrix, use the `colSums()` function.
The function takes a matrix as a parameter:
```r
# create a matrix with the number of 1 to 6
data_matrix <- 1:6
first_matrix <- matrix(data_matrix, nrow = 2, ncol = 3, byrow = TRUE)

# calculate the total of each column and assign it to a vector
total_column <- colSums(first_matrix)

```
The vector `total_column` will contain the sum of the columns of the matrix `first_matrix`:
```r
> total_column

[1] 5 7 9
```

### The `cbind()` and `rbind()` Function

With these functions, you can add rows and columns to your existing matrix.
If you want to add a column or multiple columns, you use the `cbind()` (column-bind) function. This will add data by columns:

```r
# add a new column with the sum of the rows, calculated above, to first_matrix

new_matrix <- cbind(first_matrix, total_row)

```
R will add a new column to the matrix. In addition, the new column will have the name of the vector in which the values were stored in:

```r
> new_matrix

           total_row
[1,] 1 2 3         6
[2,] 4 5 6        15
```

If you want to add a row or multiple rows, you can use the `rbind()` (row-bind) function.
This will add data by rows:

```r
# add a new row with the sum of the columns, calculated above, to first_matrix
new_matrix <- rbind(first_matrix, total_column)
```

R will add a new row to the matrix:

```r
> new_matrix

             [,1] [,2] [,3]
                1    2    3
                4    5    6
total_column    5    7    9
```

:::note

Both `cbind()` and `rbind()` require multiple data structures which you want to concatenate.

:::

## Selecting Elements from a Matrix

You can also select certain elements from your matrix, just like in vectors, by using `[]`.
But since matrices are two-dimensional you need to specify two indices.
The first index inside the brackets refers to the **row** you want to select.
The second index is separated by a comma from the first index and refers to the **column** which you want to select:

- `another_matrix[1,2]` selects the element of the first row and second column.
- `another_matrix[2:4, c(1,4)]` results in a matrix with the data of the rows 2, 3 and 4 and the columns 1 and 4.

If you want to select all elements of a row or a column you can leave out the index completely:
- `another_matrix[,1]` selects all elements of the first column.
- `another_matrix[1,]` selects all elements of the first row.

:::note example
```r
# create a matrix containing the number of 1 to 16
new_data_matrix<- 1:16
another_matrix <- matrix(new_data_matrix, nrow = 4, ncol = 4, byrow = TRUE)

> another_matrix

     [,1] [,2] [,3] [,4]
[1,]    1    2    3    4
[2,]    5    6    7    8
[3,]    9   10   11   12
[4,]   13   14   15   16

# select the data of the rows 2, 3 and 4 and columns 1 and 4 from another_matrix
> another_matrix[2:4, c(1,4)]

     [,1] [,2]
[1,]    5    8
[2,]    9   12
[3,]   13   16

```
:::
## Working with a Matrix

Just like with vectors, you can also perform calculations with matrices using the mathematical operators mentioned in an earlier chapter. The result will also be a matrix.

:::caution

The dimensions of the matrices involved in the calculations should be identical!

:::
