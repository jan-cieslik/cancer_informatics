# Data frames
- **Data frames** (two-dimensional objects): can hold numeric, character or logical values. Within a column all elements have the same data type, but different columns can be of different data type.
- Data frames differ from matrices in the sense that the latter can only work with data of the same type. Data frames, on the other hand, can include various data types.
- The data inside a data frame is expressed as a two-dimensional table, where each column contains the value of one variable and each row contains the observations of each individual variable.

## Creating a data frame

1. Create vectors that contain the information you want inside your data frame. Bear in mind that the name of the vector will be the name of the variables in your data frame and all the information inside each vector will be the observations.
2. Use the **`data.frame()`** function and use the vectors as arguments of the function.
3. Assign a name to the data frame.

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

# Create a data frame from the vectors
progestins_df <- data.frame (progestins, derivative, 
pro_gesteronic, pro_androgenic, anti_mineralocorticoidic, half_life_hours)
progestins_df

```

The data frame will look like this:
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

## Getting a fast overview of your data

- Data frames are often used to hold extremely large datasets. To make it easier to develop an understanding of the data presented, you can choose to only show the first few observations of the data frame. You can do this using the `head()` function:

```r
# use the head function to display the upper part of the data frame
head(progestins_df )

         progestins      derivative    pro_gesteronic     pro_androgenic  anti_mineralocorticoidic   half_life_hours
1        Drospirenone    progesterone           TRUE          FALSE           TRUE                         32.0
2   Cyproteronacetate    progesterone           TRUE          FALSE           FALSE                        45.0
3 Chlormadinonacetate    progesterone           TRUE          FALSE           FALSE                        34.0
4      Levonorgestrel nortestosterone           TRUE           TRUE           FALSE                        26.0
5           Gestodene nortestosterone           TRUE           TRUE           TRUE                         17.0
6           Dienogest nortestosterone           TRUE          FALSE           FALSE                        10.0

```

- On the other hand, if you only want to see the last data sets in a data frame, use the tail() function:
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

Both functions will also print out the top line of the data frame which contains all the names of the different variables.

:::tip For advanced users:

- A better approach to get a better understanding of your data frame is to use the `str()`function.
- This function displays a number of important basic information about the data frame in question:
    - the number of observations: how many rows are there
    - the number of variables: how many columns are there.
    - a list of all the variable names: the names of the columns.
    - the data type of each variable (of each column)
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

## Selecting from data frames

To select elements from a data frame, use square brackets `[ ]`. Just like with matrixes, you can use a comma to indicate the rows and columns you want to select from. Number before the commas will select from rows and numbers after the comma will select from columns. 

For example:

- `the_dataframe[1,2]` selects the value at the first row and second column in `the_dataframe`.
- `the_dataframe[1:3,2:4]` selects rows 1, 2, 3 and columns 2, 3, 4 in `the_dataframe`.
- If you want to select all elements of a row or a column:
    - `the_dataframe[,1]` selects all elements of the first column.
    - `the_dataframe[1,]` selects all elements of the first row.
- Sometimes you may not know the number of the column; instead you can also select elements using the name of the variable:

```r
progestins_df[1:3,"half_life_hours"]
```

- If you want to select an entire column (so the data of one entire variable), you can also use $, e.g. `progestins_df$half_life_hours`. It will give you the same result:

```r
> progestins_df$half_life_hours
[1] 32.0 45.0 34.0 26.0 17.0 10.0 27.0  1.5 10.0
```

## Subset function

The **`subset()`** function is used to select out your data set based on certain conditions. For instance, from the above data frame`progestins_df` you want to all information about the compounds that are pro-androgenic, meaning you want to sell all columns relating to the compounds that are pro-androgenic. You could do this using the following code:

```r
subset(progestins_df, subset = pro_androgenic)
```

you would get the following result:

```r
         progestins      derivative pro_gesteronic pro_androgenic anti_mineralocorticoidic half_life_hours
4 Levonorgestrel nortestosterone           TRUE           TRUE              FALSE               26.0
5      Gestodene nortestosterone           TRUE           TRUE              TRUE                17.0
7   Norgestimate nortestosterone           TRUE           TRUE              FALSE               27.0
8    Desogestrel nortestosterone           TRUE           TRUE              FALSE                1.5
9        Danozol    testosterone           TRUE           TRUE              FALSE             
```

## `Order()`function

`Order()` is a function that gives you the ranked position of each element when it is applied on a variable, such as a vector for example:

```r
number_vector <- c(19, 3, 84
order(number_vector)
[1] 2 1 3
```

The order function gives you the indices of the elements in the vector in the order of the smallest to largest value.

The `Order()`function can also be used to rank elements in data structures from smallest to largest:

```r
number_vector[order(number_vector)]
[1]   3  19 84
```

We can apply this to the data frame created earlier. For instance, we can sort the compounds according to their half-life using the below code:

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