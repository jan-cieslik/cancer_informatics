---
sidebar_position: 8
---
# Lists

In the programming language R, a list is a versatile and powerful data structure that allows you to store and organize different types of data elements.
Unlike vectors that hold elements of the same type, lists can contain elements of different types.

## Creating a list
To create a list, use the `list()` function.
The arguments inside the function can be any other data structure.

```r
# create a list with diffenent data structures:
example_list <- list(vector_component, matrix_component, factor_component)
```
## Naming Lists

The components of the list can be named.
This can be done in two ways.
The first way involves assigning the name to the components inside the `lists()` function:

```r
# create a list with names components
first_list <- list("first"  = component_1,
                "second" = component_2)
```                
The second way is to use the `names()` function, similar to the vectors. 

```r
my_list <- list(component_1, component_2)
names(my_list) <- c("first", "second")
```

:::note

The order in which you assign the names need to align with the components of the list, e.g. the first name of the `names()` function will be assigned to the first component of the list, the second name will be assigned to the second component of the list, and so on.

:::

## Selecting from a List

Since a list is made of a number of components, which each may have elements of their own, selecting them may get tricky.

One way to select a component is to use the index of the component. However, rather than inserting the index in single square brackets `[]`, you will need double square brackets `[[ ]]`:

```r
# the following will select the first component of the list
selecting_list[[1]]
```

You can also refer to the names of the components, with `[[ ]]` or with the `$` sign.
Both will select the component representing the reviews:
```r
# both lines of code will select the component "example"
selecting_list[["example"]]
selecting_list$example
```

If you want to select an element within a component of a list, you will need to use additional single square brackets:
```r
# the following will select a the fourth element within the second component of the list
selecting_list[[2]][4]

# the following will select the sixth element within a component named "countries"
selecting_list$countries[6]
```

If you want to select an element from a component that is two-dimensional (such as a matrix) you can also specify the column and the row:
```r
# the following will select the element on the third column and fourth row from the second component of the list
selecting_list[[2]][4,3]
```

## Deleting Components from a List

To delete a component from a list, you need to select the component using its index and then assign the value NULL to it.
```r
# delete the fifth component of the list
deleting_list[[5]] <- NULL
```

:::info

Alternatively, you can use a negative index inside the brackets:
```r
deleting_list[[-5]]
```
:::

## Adding Components to a List

You can only add elements at the end of a list, to do this you need to add the component to the next index available in a list.
So if a list has 3 components, and you want to add another component, it will be added to the fourth index of the list:

```r
# add a new vector to an existing list at the fourth position
new_vector <- c(2:9)
adding_list[[4]] <- new_vector
```

:::tip

```r
adding_list[[length(adding_list)+1]] <- new_vector
```

The above notation is convenient, when you do not know how many components are stored inside the list.
With `length()` we determine the number of components inside the list and add "1" to it.

:::

## Converting a List to a Vector

Sometimes a list needs to be converted to a vector to allow for further analysis, such as arithmetic calculations. To convert, we use the `unlist()` function:
```r
#this will convert all components of the list into one vector
unlist(new_list)
```

You can also specify that only a specific element should be turned into a vector:
```r
# this will convert the second component of the list into a vector
unlist(new_list[[2]])
```