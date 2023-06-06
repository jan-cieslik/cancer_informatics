---
sidebar_position: 9.1
---
# Dataframe
In R, a dataframe is a fundamental data structure used for storing and manipulating tabular data.
It is similar to a table in a relational database or a spreadsheet in other software.
Dataframes are commonly used in data analysis, data manipulation, and statistical modelling tasks.

A dataframe is a collection of vectors of equal length, where each vector represents a column of the dataframe. The vectors can be of different data types, such as numeric, character, factor, or logical. This flexibility allows dataframes to handle diverse types of data.

## Creating a Dataframe

1. Create vectors that contain the information you want inside your dataframe.
Bear in mind that the name of the vector will be the name of the variables in your dataframe and all the information inside each vector will be the observations.
2. Use the **`data.frame()`** function and use the vectors as arguments of the function.
3. Assign a name to the dataframe.

```r
# Definition of vectors
progestins <- c("Drospirenone", "Cyproteronacetate",
 "Chlormadinonacetate", "Levonorgestrel", "Gestodene", "Dienogest", 
"Norgestimate", "Desogestrel", "Danozol")
derivative <- c("progesterone", "progesterone", 
"progesterone", "nortestosterone", "nortestosterone", "nortestosterone", 
"nortestosterone", "nortestosterone", "testosterone")
pro_gesteronic <- c(TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
pro_androgenic <- c(FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE)
anti_mineralocorticoidic <- c(TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE)
half_life_hours <- c(32.0, 45.0, 34.0, 26.0, 17.0, 10.0, 27.0, 1.5, 10.0)

# Create a dataframe from the vectors
progestins_df <- data.frame (progestins, derivative, 
pro_gesteronic, pro_androgenic, anti_mineralocorticoidic, half_life_hours)
progestins_df

```

The dataframe will look like this:
```r
          progestins      derivative    pro_gesteronic     pro_androgenic  anti_mineralocorticoidic   half_life_hours
1        Drospirenone    progesterone           TRUE          FALSE           TRUE                         32.0
2   Cyproteronacetate    progesterone           TRUE          FALSE           FALSE                        45.0
3 Chlormadinonacetate    progesterone           TRUE          FALSE           FALSE                        34.0
4      Levonorgestrel nortestosterone           TRUE           TRUE           FALSE                        26.0
5           Gestodene nortestosterone           TRUE           TRUE           TRUE                         17.0
6           Dienogest nortestosterone           TRUE          FALSE           FALSE                        10.0
7        Norgestimate nortestosterone           TRUE           TRUE           FALSE                        27.0
8         Desogestrel nortestosterone           TRUE           TRUE           FALSE                        1.5
9             Danozol    testosterone           TRUE           TRUE           FALSE                        10.0

```

## Getting an Overview of your Data

Dataframes are often used to hold extremely large datasets.
To make it easier to develop an understanding of the data presented, you can choose to only show the first few observations of the dataframe.
You can do this using the `head()` function:

```r
# use the head function to display the upper part of the dataframe
head(progestins_df)

         progestins      derivative    pro_gesteronic     pro_androgenic  anti_mineralocorticoidic   half_life_hours
1        Drospirenone    progesterone           TRUE          FALSE           TRUE                         32.0
2   Cyproteronacetate    progesterone           TRUE          FALSE           FALSE                        45.0
3 Chlormadinonacetate    progesterone           TRUE          FALSE           FALSE                        34.0
4      Levonorgestrel nortestosterone           TRUE           TRUE           FALSE                        26.0
5           Gestodene nortestosterone           TRUE           TRUE           TRUE                         17.0
6           Dienogest nortestosterone           TRUE          FALSE           FALSE                        10.0

```

On the other hand, if you only want to see the last data sets in a dataframe, use the `tail()` function:
```r
tail(progestins_df)

         progestins      derivative    pro_gesteronic     pro_androgenic  anti_mineralocorticoidic   half_life_hours
4      Levonorgestrel nortestosterone           TRUE           TRUE           FALSE                        26.0
5           Gestodene nortestosterone           TRUE           TRUE           TRUE                         17.0
6           Dienogest nortestosterone           TRUE          FALSE           FALSE                        10.0
7        Norgestimate nortestosterone           TRUE           TRUE           FALSE                        27.0
8         Desogestrel nortestosterone           TRUE           TRUE           FALSE                        1.5
9             Danozol    testosterone           TRUE           TRUE           FALSE                        10.0
```

Both functions will also print out the column names of the dataframe.

:::tip For advanced users:

- Use the `str()`function to inspect the structure of a dataframe.
- This function displays a number of important basic information about the dataframe in question:
    - the number of observations: how many rows are there
    - the number of variables: how many columns are there.
    - a list of all the variable names: the names of the columns.
    - the data type of each column
    - The first few observations of each variable.

```r
# Investigate the structure of progestins_df
str(progestins_df)
'data.frame':	9 obs. of  6 variables:
 $ progestins              : chr  "Drospirenone" "Cyproteronacetate" "Chlormadinonacetate" "Levonorgestrel" ...
 $ derivative              : chr  "progesterone" "progesterone" "progesterone" "nortestosterone" ...
 $ pro_gesteronic          : logi  TRUE TRUE TRUE TRUE TRUE TRUE ...
 $ pro_androgenic          : logi  FALSE FALSE FALSE TRUE TRUE FALSE ...
 $ anti_mineralocorticoidic: logi  TRUE FALSE FALSE FALSE TRUE FALSE ...
 $ half_life_hours         : num  32 45 34 26 17 10 27 1.5 10

```

:::

## Subsetting Dataframes

To select elements from a dataframe, use square brackets `[ ]`. Just like with matrixes, you can use a comma to indicate the rows and columns you want to select from. Number before the comma will select from rows and numbers after the comma will select from columns. 

For example:

- `the_dataframe[1,2]` selects the value of the first row and second column in `the_dataframe`.
- `the_dataframe[1:3,2:4]` selects rows 1, 2, 3 and columns 2, 3, 4 in `the_dataframe`.
- If you want to select all elements of a row or a column:
    - `the_dataframe[,1]` selects all elements of the first column.
    - `the_dataframe[1,]` selects all elements of the first row.
- Sometimes you may not know the index of the column; instead you can also select elements by using the name of the variable:

```r
progestins_df[1:3,"half_life_hours"]
```

If you want to select an entire column (so the data of one entire variable), you can also use $, e.g. `progestins_df$half_life_hours`.
It will yield the same result:

```r
> progestins_df$half_life_hours
[1] 32.0 45.0 34.0 26.0 17.0 10.0 27.0  1.5 10.0
```

## Subset Function

The **`subset()`** function is used to select out your data set based on certain conditions.
For instance, let's assume we want to access all information about pro-androgenic compounds from the previously generated dataframe.
You could do this by using the following code:

```r
subset(progestins_df, subset = pro_androgenic)
```

You would get the following result:

```r
         progestins      derivative pro_gesteronic pro_androgenic anti_mineralocorticoidic half_life_hours
4 Levonorgestrel nortestosterone           TRUE           TRUE              FALSE               26.0
5      Gestodene nortestosterone           TRUE           TRUE              TRUE                17.0
7   Norgestimate nortestosterone           TRUE           TRUE              FALSE               27.0
8    Desogestrel nortestosterone           TRUE           TRUE              FALSE                1.5
9        Danozol    testosterone           TRUE           TRUE              FALSE             
```

## `order()` Function

`order()` is a function that gives you the ranked position of each element when it is applied on a variable, such as a vector for example:

```r
number_vector <- c(19, 3, 84)
order(number_vector)
[1] 2 1 3
```
The `order()` function can also be used to rank elements in data structures from smallest to largest:

```r
number_vector[order(number_vector)]
[1]   3  19 84
```

We can apply this to the dataframe created earlier. For instance, we can sort the compounds according to their half-life using the code below:

```r
# Use order() to create the ranking order and assign it to the ranking vector
ranking <-  order(progestins_df$half_life_hours)

# Use the ranking vector to sort progestins_df
progestins_df[ranking,]

          progestins      derivative     pro_gesteronic    pro_androgenic   anti_mineralocorticoidic  half_life_hours
8         Desogestrel nortestosterone           TRUE           TRUE                    FALSE               1.5
6           Dienogest nortestosterone           TRUE          FALSE                    FALSE              10.0
9             Danozol    testosterone           TRUE           TRUE                    FALSE              10.0
5           Gestodene nortestosterone           TRUE           TRUE                     TRUE              17.0
4      Levonorgestrel nortestosterone           TRUE           TRUE                    FALSE              26.0
7        Norgestimate nortestosterone           TRUE           TRUE                    FALSE              27.0
1        Drospirenone    progesterone           TRUE          FALSE                     TRUE              32.0
3 Chlormadinonacetate    progesterone           TRUE          FALSE                    FALSE              34.0
2   Cyproteronacetate    progesterone           TRUE          FALSE                    FALSE              45.0

```