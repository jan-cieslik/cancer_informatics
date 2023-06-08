---
sidebar_position: 15.1
---

# Manipulating and Saving Data

## Manipulating Data with `data.table`

The [`data.table`](https://www.rdocumentation.org/packages/data.table/versions/1.14.8) package offers a powerful version of R's `data.frame` with syntax and feature improvements for greater convenience, programming efficiency, and ease of use.

Data tables use a columnar data structure, which means that each column must have the same number of rows but can be of different types.
The general syntax of a data table is `DT[i, j, by]`.
It provides three arguments in that order: `rows`, `columns`, and `groups`.

To get started, install and load the `data.table` package:

```r
install.packages("data.table")
library(data.table)
```

### Creating a `data.table`

To construct a data table from scratch, use the `data.table()` function the same way you would use the `data.frame()` function.
To do this, you only have to supply it with vectors of the same length.

:::note example data table 1
```r
# Create a data.table
patients_dt1 <- data.table(id = 1:4, name = c("Joe J.", "Laura M.", "Isobel P.", "Nina W."))
patients_dt1

output:
   id      name
1:  1    Joe J.
2:  2  Laura M.
3:  3 Isobel P.
4:  4   Nina W.
```
:::

If you already have an existing R object and want to convert it into a data table, you can easily use the `as.data.table()` function.

:::note example data table 2
```r
# Create a list of patient names
patients_list <- list(id = 1:3, name = c("Joey P.", "Max C.", "Selena M."))
patients_list

output:
$id
[1] 1 2 3

$name
[1] "Joey P."   "Max C."    "Selena M."

# Convert the list to a data.table
patients_dt2 <- as.data.table(patients_list)
patients_dt2

output:
   id      name
1:  1   Joey P.
2:  2    Max C.
3:  3 Selena M.
```
:::

A data table does not immediately convert characters into factors, thus avoiding unexpected behaviour.
When you print a data table, a colon (`:`) is inserted after the row number to visually distinguish it from the first column.

:::tip
Since a data table *is* a data frame, all the functions you would use for a data frame can also be used for data tables.
Here are some examples:
- `nrow()`
- `ncol()`
- `dim()`
:::

### Filtering Rows

- In data tables, rows can be filtered by row numbers in the same way as a data frame, except that the first parameter is always treated as a row operation, regardless of whether a comma is present.

```r
# Filter the 2nd and 3rd row
patients_dt1[2:3]
# Or
patients_dt1[2:3,]

output:
   id      name
1:  2  Laura M.
2:  3 Isobel P.
```

- You can use the exclamation mark or the negative sign to exclude a number of rows.

```r
# Exclude the first 2 rows
patients_dt1[-(1:2)]
# Or
patients_dt1[!(1:2)]

output:
   id      name
1:  3 Isobel P.
2:  4   Nina W.
```

- The integer vector `.N` provides the number of rows in the data table.
When used in the `i` argument, it returns the last row in the data table.

:::tip reminder
The general form of a data table is `DT[i, j, by]`.
:::

```r
# Return the last row
patients_dt1[.N]

output:
   id    name
1:  4 Nina W.

# Return all rows except the last 2
patients_dt1[1:(.N-2)]

output:
   id     name
1:  1   Joe J.
2:  2 Laura M.
```

- The `i` argument can also contain logical expressions that create a logical vector.
This only returns those rows that evaluate to `TRUE`.
- Columns within the parameters of a data table, i.e. within the two square brackets, are treated as variables.
When creating expressions, this avoids the unnecessary repetition of the dollar sign when referring to column names, preventing subtle and hard-to-find errors.

:::note example data table 3
```r
# Create patients_dt3
patients_dt3 <- data.table(id = 1:7,
   name = c("Joe J.", "Laura M.", "Isobel P.", "Nina W.", "Joey P.", "Max C.", "Selena M."),
   sex = c("m", "f", "f", "f", "m", "m", "f"),
   age = c(34, 56, 23, 18, 67, 49, 36))
patients_dt3

output:
   id      name sex age
1:  1    Joe J.   m  34
2:  2  Laura M.   f  56
3:  3 Isobel P.   f  23
4:  4   Nina W.   f  18
5:  5   Joey P.   m  67
6:  6    Max C.   m  49
7:  7 Selena M.   f  36
```
:::

```r
# Subset rows where sex is "f"
patients_dt3[sex == "f"]

output:
   id      name sex age
1:  2  Laura M.   f  56
2:  3 Isobel P.   f  23
3:  4   Nina W.   f  18
4:  7 Selena M.   f  36

# If patients_dt3 was only a data frame
patients_dt3[patients_dt3$sex == "f"]
```


#### Helper Functions for Filtering

- You can use the filtering function `%like%` to find rows in a character or factor vector that match a certain *pattern*.
   - Used as: `col %like% pattern`

```r
# Subset all rows where sex starts with "m"
patients_dt3[sex %like% "^m"]

output:
   id    name sex age
1:  1  Joe J.   m  34
2:  5 Joey P.   m  67
3:  6  Max C.   m  49
```
:::note
At the beginning of a string, you can specify the pattern you are looking for with the meta-character caret (`^`).
:::

- With `%between%`, you can search for values within the closed interval `[val1, val2]`.
It only works for *numeric* columns.
   - Used as: `numeric_col %between% c(val1, val2)`

```r
# Subset all patients with ages between 40 and 60
patients_dt3[age %between% c(40, 60)]

output:
   id     name sex age
1:  2 Laura M.   f  56
2:  6   Max C.   m  49
```

- In R, the `%in%` operator determines whether an element belongs to a vector or a data frame.
   - Used as: `col %in% c(val1, val2)`

```r
patients_dt3[sex %in% c("f")]

output:
   id      name sex age
1:  2  Laura M.   f  56
2:  3 Isobel P.   f  23
3:  4   Nina W.   f  18
4:  7 Selena M.   f  36
```

- `%chin%` is similar to `%in%`, except that it is faster and only works with *character* vectors.
It may be used to search for certain strings within a vector.
   - Used as: `character_col %chin% c("val1", "val2", "val3")`

```r
# Subset all rows where sex is "m"
patients_dt3[sex %chin% c("m")]

output:
   id    name sex age
1:  1  Joe J.   m  34
2:  5 Joey P.   m  67
3:  6  Max C.   m  49
```

### Filtering Columns

- To select columns from a `data.table`, you can supply a *character* vector with column names as the second argument for `DT[i, j, by]`, similar to data frames.
- The difference between data frames and data tables is that when you select a single column from a data frame you get a vector instead of a data frame, but when you select a single column from a data table you get a data table.
This avoids unintentional coding errors.
- You can also select columns by using column numbers.

```r
# Select the 1st and 2nd column
patients_dt3[, c(1, 2)]

output:
   id      name
1:  1    Joe J.
2:  2  Laura M.
3:  3 Isobel P.
4:  4   Nina W.
5:  5   Joey P.
6:  6    Max C.
7:  7 Selena M.
```

:::caution
If the column order changes over time, the outcome will be wrong!
To avoid this, you should always use column names and not the column numbers.
This ensures that the outcome is correct regardless of the order.

```r
patients_dt3[, c("id", "name")]
```
:::

- To exclude a group of columns from your result, you may use a negative sign or the exclamation mark with a *character* vector.

```r
# Select all columns except "sex" and "age"
patients_dt3[, -c("sex", "age")]
# Or
patients_dt3[, !c("sex", "age")]

output:
   id      name
1:  1    Joe J.
2:  2  Laura M.
3:  3 Isobel P.
4:  4   Nina W.
5:  5   Joey P.
6:  6    Max C.
7:  7 Selena M.
```

- You can also select columns via a *list of variables* (column names).

```r
# Select the columns "name" and "sex" and rename them to "n" and "s"
patients_dt3[, list(n = name, s = sex)]

output:
           n s
1:    Joe J. m
2:  Laura M. f
3: Isobel P. f
4:   Nina W. f
5:   Joey P. m
6:    Max C. m
7: Selena M. f
```

:::note
- There is no need for quotes (`""`) around column names.
- You can rename columns when filtering because `j` allows a list.
:::

- If you only want to select one column, you can return the results as either a data table or a vector.
   - If you include the column name in `list()`, a data table is returned.
   - If you enter only one column name in `j`, a vector is returned.

```r
# Select the column "name" and return a data table
patients_name <- patients_dt3[, list(name)]
head(patients_name, 2)

output:
       name
1:   Joe J.
2: Laura M.

# Select the column "name" and return a vector
patients_name <- patients_dt3[, name]
head(patients_name, 2)

output:
[1] "Joe J."   "Laura M."
```

:::tip
You may also use `.()` instead of `list()`.
This saves time and allows you to focus on the selected columns.

```r
# Select the column "age" with .()
patients_age <- patients_dt3[, .(age)]
```
:::

### Computing on Columns

Since columns are like variables, you can directly calculate with them in `j`.
The output will be a vector because `j` is not included within `list()`.

```r
# Compute the mean of "age"
patients_dt3[, mean(age)]

output:
[1] 40.42857
```

#### Computing on Rows and Columns

You can easily combine the `i` and `j` arguments because `j` is calculated from the rows returned by the filtering.

```r
# Compute the mean of "age" for "men"
patients_dt3[sex == "m", mean(age)]

output:
[1] 50
```

#### Integer Vector `.N` in `j`

`.N` can also be used in `j` and is handy to get the number of rows after filtering in `i`.
Since `j` is computed using the result of `i`, the total number of rows in the filtered data table is obtained.

```r
# Compute the number of "women"
patients_dt3[sex == "f", .N]

output:
[1] 4
```

### Computing by Groups

The `by` argument enables calculations for any value of the (grouping) columns provided in `by`.
`by` accepts *character* vectors of column names and *lists* of variables/expressions.
You can use `list()` or `.()` again.

```r
# How many patients per sex?
patients_dt3[, .N, by = "sex"]
# Or
patients_dt3[, .N, by = list(sex)]
# Or
patients_dt3[, .N, by = .(sex)]

output:
   sex N
1:   m 3
2:   f 4
```

:::note
- Within a grouping operation, `.N` represents the number of rows in each group.
- The column containing the total number of rows calculated with `.N` is automatically called "N".
- The result includes the column used in `by`.
- The column in which your data is grouped is always returned as the first column.
:::

With the `by` argument, you can easily rename grouping columns.

```r
# Rename "sex" to "gender", and "N" to "number"
dt3 <- patients_dt3[, .(number = .N), by = .(gender = sex)]
head(dt3)

output:
   gender number
1:      m      3
2:      f      4
```

The operators `list()` or `.()` in `by` allow the straightforward computation of grouping variables.

#### Chaining Expressions

By chaining `data.table` expressions, you can perform operations on outputs instead of assigning the output data table to an intermediate object and then performing an operation on it.

```r
# Find the 3 youngest patients and order them
patients_dt3[age < 40][order(age)][1:3]

output:
   id      name sex age
1:  4   Nina W.   f  18
2:  3 Isobel P.   f  23
3:  1    Joe J.   m  34
```

#### `uniqueN()`

The helper function `uniqueN()` returns an integer value indicating the number of values in the input object.
It supports *vectors*, *data frames*, and *data tables*.
By default, all columns are checked when you pass a data table to `uniqueN()`.
The `by` argument in `uniqueN()` can be used to get the number of values in a column of a data table.

```r
# Return the number of values in "sex"
uniqueN(patients_dt3, by = "sex")

output:
[1] 2
```

The output means that there are two values in sex, namely *male* and *female*.

#### `.SD`

The special symbol `.SD` (short for *Subset of Data*) contains a subset of data for each group, which means that `.SD` is a data table by itself.
By default, it includes all columns except the grouping column itself.
It is used in the argument `j`.

`.SD[1]` returns the first row for each group and `.SD[.N]` the last row.
In both cases all columns are returned.

```r
# Return the first row for each "id"
patients_dt3[, .SD[1], by = "id"]

# Return the last row for each "id"
patients_dt3[, .SD[.N], by = "id"]
```

If you want to select the columns to be returned, you can use `.SDcols`.

```r
# Return the first row for each "id", but only the column "name"
patients_dt3[, .SD[1], by = "id", .SDcols = c("name")]
```

:::tip
To return all columns except those specified in `.SDcols`, prefix the character vector with a negative sign.
:::

### Adding and Updating Columns

`data.table` updates columns by reference with the new operator `:=`.
This allows columns to be added, updated, or deleted.
It makes adding and changing columns much faster.

The operator `:=` can be used in two ways:
- **Left-hand side `:=` right-hand side form**: On the left-hand side of the `:=` operator, it receives a character vector, and on the right-hand side, it takes a list of values, one for each column name.

```r
# Add the columns "age" and "sex"
patients_dt1[, c("age", "sex") := list(c(55, 29, 65, 44), c("m", "f", "f", "f"))]
patients_dt1

output:
   id      name age sex
1:  1    Joe J.  55   m
2:  2   Lara M.  29   f
3:  3 Isobel P.  65   f
4:  4   Nina W.  44   f
```

:::note
If only one column is added or changed, you can remove the quotation marks around the column names on the left-hand side.

```r 
patients_dt1[, age := c(55, 29, 65, 44)]
```
:::

:::tip
When you change a data table by reference, nothing is output directly to the console.
Just chain a pair of empty brackets to see the results as soon as you change the data table.

```r
patients_dt1[, c("age", "sex") := list(c(55, 29, 65, 44), c("m", "f", "f", "f"))][]
```
:::

- **Functional form `:=()`**: The inputs in the function are in the form `col1 = val1`, `col2 = val2` etc.
   - You can delete a column by assigning it the value `NULL`.

```r
# Add the column "age" and delete the column "id"
patients_dt1[, `:=`(age = c(55, 29, 65, 44), id = NULL)]

output:
        name age
1:    Joe J.  55
2:   Lara M.  29
3: Isobel P.  65
4:   Nina W.  44
```

:::note
When operators are used as functions, they must be enclosed in backticks!
:::

### Importing Data with `fread()`

The `fread()` function of the `data.table` package is similar to `read.table()` but more efficient and convenient.
All controls such as `sep`, `colClasses` and `nrows` are recognized automatically.

`fread()` can read local files, URLs, and strings.

```r
# Import newdata.csv
imported_dt <- fread(newdata.csv)
```

:::note
`fread()` detects the header automatically.
If there is no header, `fread()` names them `V1`, `V2` etc.
:::

`fread()` contains various arguments.
Here, we will only discuss some of them.

- `nrows`: Sets the maximum number of lines to be read.
- `skip`: Skips a number of lines before attempting to parse the file.
- `select`: Keeps the specified column, drops the rest.
- `drop`: Deletes the specified column, keeps the rest.

For more information about `fread()` click [here](https://www.rdocumentation.org/packages/data.table/versions/1.14.8/topics/fread).

## Manipulating Data with `dplyr`

[`dplyr`](https://dplyr.tidyverse.org/) is a data manipulation grammar by [Tidyverse](https://www.tidyverse.org/index.html) that provides a consistent collection of verbs to help you solve the most typical data manipulation problems.

To get started, install and load the `dplyr` package:

```r
install.packages("dplyr")
library(dplyr)
```

In this chapter, we will be using the [Malignant Glioma Pilot Study](https://search.r-project.org/CRAN/refmans/exactRankTests/html/glioma.html).
It is included in the `exactRankTests` package and may be loaded using the `data()` function:

```r
data(glioma, package = "exactRankTests")
```

:::note example data set glioma
"*A non-randomized pilot study on malignant glioma patients with pretreated adjuvant radioimmunotherapy using Yttrium-90-biotin.*
*A data frame with 37 observations on the following 7 variables.*"

- No.: patient number
- Age: patients ages in years
- Sex: a factor with levels F(emale) and M(ale)
- Histology: a factor with levels GBM (grade IV) and Grade3 (grade III)
- Survival: survival times in month
- Cens: censoring indicator: 0 censored and 1 dead
- Group: a factor with levels Control and RIT
:::

### Exploring & Transforming Data

This chapter will teach you how to use `dplyr` functions to examine and transform a data set.

#### `select()`

- This function allows you to select variables of interest.
- Enter the name of the data set followed by the pipe operator (`%>%`).
Call `select()` and pass the variables separated by a comma.
- You can specify columns that you do not need by using the negative symbol (`-`) as a prefix in front of the variable.
- For advanced selecting you can use [selection helpers](https://dplyr.tidyverse.org/reference/select.html#overview-of-selection-features), but we will not discuss them here.
- You can save this new table with the assignment operator (`<-`).
From now on you can work with the new table.

```r
# Select "No.", "Age" & "Sex"
glioma_patients <- glioma %>% select(No., Age, Sex)

# Look at the structure
str(glioma_patients)

output:
'data.frame':	37 obs. of  3 variables:
 $ No.: int  1 2 3 4 5 6 7 8 9 10 ...
 $ Age: int  41 45 48 54 40 31 53 49 36 52 ...
 $ Sex: Factor w/ 2 levels "F","M": 1 1 2 2 1 2 2 2 2 2 ...
```

#### `filter()`

- It is used to filter a data frame and keep only the rows that meet your conditions.
- Enter the name of the data set followed by the pipe operator (`%>%`).
Call `filter()` and specify the variable to filter by.
- Some possible filtering operators are: `==`, `>`, `<`.
- You can also mix several conditions in one filter.

```r
# Filter all female patients
glioma_patients %>% filter(Sex == "F")
```

#### `arrange()`

- This function sorts the rows of a data frame based on the values of selected columns.
- Enter the name of the data set followed by the pipe operator (`%>%`).
Call `arrange()` and pass the variable to be sorted by.
- By default, the variables are arranged in ascending order.
To sort in descending order, include the variable to sort by in `desc()`.

```r
# Sort in ascending order by "Age"
glioma_patients %>% arrange(Age)

# Sort in descending order by "Age"
glioma_patients %>% arrange(desc(Age))
```

:::caution
`arrange()`, unlike other `dplyr` functions, ignores *grouping*.
To group by variables, you must name them extra (or use `.by_group = TRUE`).
We will discover what *grouping* means [below](#group_by).
:::

#### `mutate()`

- This function creates new columns, changes them or deletes them.
- *Create a new column*: Enter the name of the data set followed by the pipe operator (`%>%`).
Call `mutate()`, enter the new column name followed by an equal sign (`=`) and the contents.
- *Modify a column*: Enter the name of the existing column to the left of the equal sign.
- *Delete a column*: Set the value to `NULL` (behind the equal sign).

```r
# Add the column "Cens2"
glioma_cens <- glioma %>% mutate(Cens2 = ifelse(Cens == 1, "dead", "uncensored"))

# Delete the column "Cens"
glioma_cens <- glioma_cens %>% mutate(Cens = NULL)
```

#### `transmute()`

- This function generates a new data frame containing only the specified computations.
It is like a combination of `select()` and `mutate()`.
- Enter the name of the data set followed by the pipe operator (`%>%`).
Call `transmute()` and pass the variables you want to keep and/or modify a variable with the equal sign (`=`).

```r
# Keep "No.", "Age", "Sex" & "Cens"
# Modify "Cens" (1 = dead, 0 = uncensored)
glioma_cens2 <- glioma %>% transmute(No., Age, Sex, Cens = ifelse(Cens == 1, "dead", "uncensored"))
```

#### `rename()`

- With this function, you can change individual variable names.
- Enter the name of the data set followed by the pipe operator (`%>%`).
Call `rename()`, enter the new column name followed by an equal sign (`=`) and the old column name.

```r
# Rename "Cens2" to "Cens"
glioma_cens <- glioma_cens %>% rename(Cens = Cens2)
```

:::tip
To explore your data, you can also combine multiple functions with another pipe operator (`%>%`).

```r
# Filter all female patients & sort in ascending order by "Age"
glioma_patients %>% filter(Sex == "F") %>% arrange(Age)
```
:::

### Aggregating Data

In this chapter you will learn how to aggregate data, i.e. combine several observations into one.

#### `count()`

- This function quickly counts the different values of one or more variables.
- Enter the name of the data set followed by the pipe operator (`%>%`).
- Call `count()` to get the total number of observations.

```r
# Count glioma observations
glioma %>% count()

output:
   n
1 37
```

- Call `count()` and pass the variable to be counted enclosed in the function to get a specific observation.

```r
# Count the number of each sex
glioma %>% count(Sex)

output:
  Sex  n
1   F 16
2   M 21
```

- Sorted count with `sort`: If set to `TRUE`, the largest groups will be displayed at the top.

```r
# Count the number of each sex & sort it
glioma %>% count(Sex, sort = TRUE)

output:
  Sex  n
1   M 21
2   F 16
```

- Weighted count with `wt`: If it is set to a variable, `count()` computes `sum(wt)` for each group instead of counting the number of rows in each group.

```r
# Add up the months of survival of each sex
glioma %>% count(Sex, wt = Survival, sort = TRUE)

output:
  Sex   n
1   M 679
2   F 462
```

#### `summarize()`

- This function combines many observations into a single observation.
- In a `summarize()` call, you can specify several variables and summarize them in different ways.
- There are many summary functions that can be used in `summarize()`: `sum()`, `mean()`, `median()`, `min()`, `may()`, `n()`.
These functions can also be combined.
- Enter the name of the data set followed by the pipe operator (`%>%`).
Call `summarize()`, enter a new variable name followed by an equal sign and the summary function containing the variable to be summarized.

```r
# Compute the mean age of patients
glioma %>% summarize(average_age = mean(Age))

output:
  average_age
1    48.48649
```

#### `group_by()`

- This function turns an existing table into a grouped table where operations are performed *by group*.
- Grouping does not affect how the data looks.
It only changes the interaction with the other `dplyr` functions.
- You may also group by two columns.
This creates one row for each combination of both columns.
- Enter the name of the data set followed by the pipe operator (`%>%`).
Call `group_by()` and pass the variable to grouped by.

```r
# Group by "Histology" and compute the mean age
glioma_histology %>% group_by(Histology) %>% summarize(average_age = mean(Age))

output:
# A tibble: 2 × 2
  Histology average_age
  <fct>           <dbl>
1 GBM              53.9
2 Grade3           42.1
```

#### `ungroup()`

- This function is useful for removing grouping.
- Enter the name of the data set followed by the pipe operator (`%>%`) and call `ungroup()`.

```r
# Ungroup glioma
glioma %>% ungroup()
```

#### `slice_max()`

- It returns the largest observation from each group, i.e. it works with a grouped table.
- Enter the name of the data set followed by the pipe operator (`%>%`).
Call `slice_max()`, pass the column on which you want the ordering to be based, and the number of observations to extract from each group (`n`).
- By default, `n` is set to `1`.
For example, with `n = 3`, the 3 largest observations are returned.

```r
# Group by "Histology"
# Return the highest survival time
glioma %>% group_by(Histology) %>% slice_max(Survival)

output:
# A tibble: 2 × 7
# Groups:   Histology [2]
    No.   Age Sex   Histology Survival  Cens Group
  <int> <int> <fct> <fct>        <int> <int> <fct>
1    16    47 F     GBM             59     0 RIT  
2     3    48 M     Grade3          69     0 RIT 
```

#### `slice_min()`

- It returns the smallest observation in each group and is used like `slice_max()`.

```r
# Group by "Histology"
# Return the lowest survival time
glioma %>% group_by(Histology) %>% slice_min(Survival)

output:
# A tibble: 2 × 7
# Groups:   Histology [2]
    No.   Age Sex   Histology Survival  Cens Group  
  <int> <int> <fct> <fct>        <int> <int> <fct>  
1    12    83 F     GBM              5     1 Control
2     3    53 F     Grade3           9     1 Control
```

## Sources & Further Reading

- [`data.table`](https://www.rdocumentation.org/packages/data.table/versions/1.14.8)
- [`dplyr`](https://dplyr.tidyverse.org/)
- [`fread()`](https://www.rdocumentation.org/packages/data.table/versions/1.14.8/topics/fread)
- [Malignant Glioma Pilot Study](https://search.r-project.org/CRAN/refmans/exactRankTests/html/glioma.html)
- [Selection helpers](https://dplyr.tidyverse.org/reference/select.html#overview-of-selection-features) for `select()`
- [Tidyverse](https://www.tidyverse.org/index.html) (collection of R packages for data science)