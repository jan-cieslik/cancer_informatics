---
sidebar_position: 13
---

# Joining Data

## Joining Data with `data.table`

This chapter will teach you how to integrate data from *two* data tables into a *single* data table.
Make sure you have both installed and loaded the [`data.table` package](https://www.rdocumentation.org/packages/data.table/versions/1.14.8).

Before we get into the details, you should learn what table keys are.
They are columns that are required in every data table to match rows for a link.

### The `merge()` Function

In this chapter, you will learn how to use the `merge()` function to perform *inner*, *full*, *left*, and *right* joins.
This function is a built-in R function, but is upgraded in the `data.table` package.

We will go through the different types of joins step by step using the following two data tables:

:::note patients
```r
        name sex age
1:    Joe J.   m  34
2:  Laura M.   f  56
3: Isobel P.   f  23
4:   Nina W.   f  18
```
:::

:::note patients_id
```r
       name id
1: Laura M.  1
2:  Nina W.  2
3:   Joe J.  3
4:   Max C.  4
```
:::

#### Inner Join

- An inner join only keeps observations with information in both data tables.
- By default, the `merge()` function does an inner join.
- It requires two data tables as inputs: one for the `x` argument and one for the `y` arguments, together with the names of the key columns in each data table (`by.x` and `by.y` arguments).

```r
merge(x = patients, y = patients_id, by.x = "name", by.y = "name")

output:
       name sex age id
1:   Joe J.   m  34  3
2: Laura M.   f  56  1
3:  Nina W.   f  18  2
```

:::tip
To avoid entering the same column name repeatedly, use `by` if the key columns in both data tables share the same name.
:::

#### Full Join

- A full join contains all observations from both data tables.
- Observations found only in one data table will have missing values (= `NA`) in the columns of the other data table.
- Set the argument `all` to `TRUE` to perform a full join.

```r
merge(x = patients, y = patients_id, by = "name", all = TRUE)

output:
        name  sex age id
1: Isobel P.    f  23 NA
2:    Joe J.    m  34  3
3:  Laura M.    f  56  1
4:    Max C. <NA>  NA  4
5:   Nina W.    f  18  2
```

#### Left Join

- A left join keeps just data from the left data table (= set to the `x` argument) and adds data from the right data table (= set to the `y` argument) to the left one.
- Set the argument `all.y` to `TRUE` to perform a left join.

```r
merge(x = patients, y = patients_id, by = "name", all.x = TRUE)

output:
        name sex age id
1: Isobel P.   f  23 NA
2:    Joe J.   m  34  3
3:  Laura M.   f  56  1
4:   Nina W.   f  18  2
```

#### Right Join

- A right join keeps just data from the right data table (= set to the `y` argument) and adds data from the left data table (= set to the `x` argument) to the right one.
- Set the argument `all.y` to `TRUE` to perform a right join.

```r
merge(x = patients, y = patients_id, by = "name", all.y = TRUE)

output:
       name  sex age id
1:   Joe J.    m  34  3
2: Laura M.    f  56  1
3:   Max C. <NA>  NA  4
4:  Nina W.    f  18  2
```

### Joins with the `data.table` Syntax

In order to use the `data.table` syntax for joining data, you must first create table keys with the `setkey()` function.

```r
# Set the key to "name"
setkey(patients, "name")
setkey(patients_id, "name")
```

There are different ways to inspect existing table keys in your R session:
- `tables()`: This function lists all the data tables loaded in your R session, together with the number of their rows, the number and names of their columns, and how much memory they need.
It also lists all the columns you have chosen as their keys.
- `str(x)`: This function displays the type of each column in a single data table, as well as the types and first elements for each column.
It will also show you the keys.
- `key(x)`: This function shows you only the keys set in a data table.
- `haskey(x)`: This function allows you to check whether a data table has a key or not.
It returns `TRUE` or `FALSE`.

:::note
`x` = a `data.table` name
:::

To remove keys from a data table, use the argument `NULL` within the `setkey()` function as seen below:

```r
# Remove keys from "patients"
setkey(patients, NULL)
```

The syntax for a join is `X[Y]`.
The creator of `data.table`, *Matt Dowle*, described the format as follows: "*`X[Y]` looks up `X` rows using `Y` as an index*".
This means that matching rows from `X` will be added to `Y`.

#### Left Join

- For a left join, you have to put the left data table (= `patients`) inside the square brackets and the right data table (= `patients_id`) outside.
- This will add matching rows from `patients_id` to `patients`.

```r
patients_id[patients]
```

#### Right Join

- For a right join, you have to put the right data table (= `patients_id`) inside the square brackets and the left data table (= `patients`) outside.
- This will add matching rows from `patients` to `patients_id`.
- You could also see this as a left join, where `patients_id` is the left data table and `patients` is the right data table.

```r
patients[patients_id]
```

#### Inner Join

- In order to perform an inner join, insert the argument `nomatch = 0` into the square brackets' syntax.
- This filters out rows without matches.
- This time it does not matter which data table is inside and which is outside the brackets.

```r
patients[patients_id, nomatch = 0]
# Same as
patients_id[patients, nomatch = 0]
```

#### Anti-Join

- An anti-join retains rows from the left data table and skips data that does not match the right data table.
In our example, this means that rows from `patients`, that do not match `patients_id`, are displayed.
- To perform an anti-join, enter the left data table outside the brackets and put an exclamation mark inside the square brackets, followed by the right data table.

```r
patients[!patients_id]

output:
     name id
1: Max C.  4
```

- You can also do this the other way round to display rows from `patients_id` that do not match `patients`.

:::info
If you do not want to specify the keys in advance, you can simply use the following syntax:

```r
X[Y, on = "key"]
```

In this way, the data tables are still connected via the column without having to set the key.
Note, however, that this only works if both data tables have the same column name!

If they do not have the same column name, you can use `c()` or `.()` inside the `on` argument:

```r
X[Y, on = c("key1", "key2")]
# Same as
X[Y, on = .(key1, key2)]
```
:::

## Joining Data with `dplyr`

In this chapter, you will learn how to merge data with the [`dplyr` package](https://dplyr.tidyverse.org/) provided by [Tidyverse](https://www.tidyverse.org/index.html).
Make sure you have installed and loaded the `dplyr` package.

### Join Functions

In the following, we will learn about the join functions of `dplyr` and how they can be used.
We will use the data we used in the previous chapter, with the difference that we are now dealing with *data frames* and no longer with data tables.

:::info Overview of the Join Functions
- [Mutating joins](https://dplyr.tidyverse.org/reference/mutate-joins.html) merge information from two different data sources:
   - Inner joins
   - Left joins
   - Right joins
   - Full joins
- [Filtering joins](https://dplyr.tidyverse.org/reference/filter-joins.html) keep information from the left data source and use the right data as filter:
   - Semi-joins
   - Anti-joins
:::

#### `inner_join()`

- To perform an inner join with this function, we only need to specify the names of our two data frames and the column we want to combine over (with the `by` argument).
- Another way to join data is to use the pipe operator (`%>%`).
Enter the name of the first data frame followed by `%>%` and the `inner_join()` function including the second data frame and the key variable.
- With an inner join, non-matching rows are excluded from the result.

```r
inner_join(patients2, patients2_id, by = "name")
# Same as
patients2 %>% inner_join(patients2_id, by = "name")
```

#### `left_join()`

- Left joins can be done with the `left_join()` function.
- All rows from the data frame that is first inserted into the function are retained.
Matching rows from the second data frame are added to it.

```r
left_join(patients2, patients2_id, by = "name")
# Same as
patients2 %>% left_join(patients2_id, by = "name")
```

#### `right_join()`

- Right joins can be done with the `right_join()` function.
- All rows from the second/right data frame are retained while matching rows from the first/left data frame are added.

```r
right_join(patients2, patients2_id, by = "name")
# Same as
patients2 %>% right_join(patients2_id, by = "name")
```

#### `full_join()`

- This function returns all rows and columns of the two input data frames and inserts `NA` for missing data.

```r
full_join(patients2, patients2_id, by = "name")
# Same as
patients2 %>% full_join(patients2_id, by = "name")
```

#### `semi_join()`

- This function returns all rows from the first/left data set with a match in the second/right data set.
- Only columns of the left data set are retained!

```r
semi_join(patients2, patients2_id, by = "name")
# Same as
patients2 %>% semi_join(patients2_id, by = "name")

output:
      name sex age
1   Joe J.   m  34
2 Laura M.   f  56
3  Nina W.   f  18
```

#### `anti_join()`

- This function is the opposite to a *semi-join*.
- It returns all rows from the first/left data set with*out* a match in the second/right data set.
- This means that only rows that are not present in the right data set are returned and that only columns of the left data are retained!

```r
anti_join(patients2, patients2_id, by = "name")
# Same as
patients2 %>% anti_join(patients2_id, by = "name")

output:
       name sex age
1 Isobel P.   f  23
```

### Joining Multiple Data Sets

To demonstrate joins of multiple data sets, we add a third data frame:

:::note patients2_occ
```r
       name id       occasion
1 Isobel P.  5        anaemia
2    Joe J.  3           cold
3    Max C.  4 abdominal pain
4  Laura M.  1     depression
```
:::

In the following example, we perform a full join, but you can also use other functions for multiple joining.

First, we have to merge the first two data frames and enter the pipe operator (`%>%`) afterwards.
Then we merge this newly created data frame, represented by the dot (`.`), with the third.

```r
full_join(patients2, patients2_id, by = "name") %>% full_join(., patients2_occ, by = "name")

output:
       name  sex age id.x id.y       occasion
1 Isobel P.    f  23   NA    5        anaemia
2    Joe J.    m  34    3    3           cold
3  Laura M.    f  56    1    1     depression
4   Nina W.    f  18    2   NA           <NA>
5    Max C. <NA>  NA    4    4 abdominal pain
```

As you can see, the column `id` has been duplicated because it exists in both data frames at the same time.
We will learn how to solve this problem in the next chapter.

### Joining by Multiple Columns

If we want to combine two data frames based on several columns, we can select several joining variables for the `by` argument at the same time:

```r
full_join(patients2, patients2_id, by = "name") %>% full_join(., patients2_occ, by = c("name", "id"))

output:
       name  sex age id       occasion
1 Isobel P.    f  23 NA           <NA>
2    Joe J.    m  34  3           cold
3  Laura M.    f  56  1     depression
4   Nina W.    f  18  2           <NA>
5    Max C. <NA>  NA  4 abdominal pain
6 Isobel P. <NA>  NA  5        anaemia
```

As you can see, there is now only one `id` column.
*Note*: The row `Isobel P.` has been duplicated because it contained different values in the data frames.

### Joining by Different Column Names

If you want to link a variable in the first data set with another variable in the second data, you can equate them in the `by` argument as follows:

```r
# Rename "id" to "id_new"
patients2_occ <- patients2_occ %>% rename(id_new = id)

# Full join
patients2_occ %>% full_join(patients2_id, by = c("id_new" = "id"))

# Avoid duplicating the column "name"
patients2_occ %>% full_join(patients2_id, by = c("id_new" = "id", "name"))

output:
       name id_new       occasion
1 Isobel P.      5        anaemia
2    Joe J.      3           cold
3    Max C.      4 abdominal pain
4  Laura M.      1     depression
5   Nina W.      2           <NA>
```

:::caution Incompatible Data Types
Note that when joining via different column names, the columns must contain the same data type!

**Example:**

```r
full_join(patients2, patients2_id, by = c("name" = "id"))
```

*This would cause the following error:*

```r
Error in `full_join()`:
! Can't join `x$name` with `y$id` due to incompatible
  types.
ℹ `x$name` is a <character>.
ℹ `y$id` is a <integer>.
```
:::

### Customizing Your Join

Suppose you want to create the following data frame:

```r
patients2_occ %>% full_join(patients2_id, by = c("id_new" = "id"))

output:
     name.x id_new       occasion   name.y
1 Isobel P.      5        anaemia     <NA>
2    Joe J.      3           cold   Joe J.
3    Max C.      4 abdominal pain   Max C.
4  Laura M.      1     depression Laura M.
5      <NA>      2           <NA>  Nina W.
```

As you can see, the output gives two *name* columns, `name.x` and `name.y`.
In some cases you might not want to merge these columns as I did in the previous chapter, e.g. if they contain different patient names.

In this case, you could easily customize your join for a more readable name by renaming the column names with a `suffix`:

```r
patients2_occ %>% full_join(patients2_id, by = c("id_new" = "id"), suffix = c("_new", "_old"))

output:
   name_new id_new       occasion name_old
1 Isobel P.      5        anaemia     <NA>
2    Joe J.      3           cold   Joe J.
3    Max C.      4 abdominal pain   Max C.
4  Laura M.      1     depression Laura M.
5      <NA>      2           <NA>  Nina W.
```

## Joining Data Summary

### `data.table`

|Join Type |`merge()` Function                            |`data.table` Syntax|
|----------|----------------------------------------------|-------------------|
|Inner Join|`merge(x = x, y = y, by = "xy")`              |`x[y, nomatch = 0]`|
|Full Join |`merge(x = x, y = y, by = "xy", all = TRUE)`  |/                  |
|Left Join |`merge(x = x, y = y, by = "xy", all.x = TRUE)`|`y[x]`             |
|Right Join|`merge(x = x, y = y, by = "xy", all.y = TRUE)`|`x[y]`             |
|Anti-Join |/                                             |`x[!y]`            |
|Semi-Join |/                                             |/                  |

### `dplyr`

|Join Type |Join Functions               |Pipe Operator Way               |
|----------|-----------------------------|--------------------------------|
|Inner Join|`inner_join(x, y, by = "xy")`|`x %>% inner_join(y, by = "xy")`|
|Full Join |`full_join(x, x, by = "xy")` |`x %>% full_join(y, by = "xy")` |
|Left Join |`left_join(x, y, by = "xy")` |`x %>% left_join(y, by = "xy")` |
|Right Join|`right_join(x, y, by = "xy")`|`x %>% right_join(y, by = "xy")`|
|Anti-Join |`anti_join(x, y, by = "xy")` |`x %>% anti_join(y, by = "xy")` |
|Semi-Join |`semi_join(x, y, by = "xy")` |`x %>% semi_join(y, by = "xy")` |

## Sources & Further Reading

- [`data.table`](https://www.rdocumentation.org/packages/data.table/versions/1.14.8)
- [`dplyr`](https://dplyr.tidyverse.org/)
   - [Filtering joins](https://dplyr.tidyverse.org/reference/filter-joins.html)
   - [Mutating joins](https://dplyr.tidyverse.org/reference/mutate-joins.html)
- [Tidyverse](https://www.tidyverse.org/index.html)