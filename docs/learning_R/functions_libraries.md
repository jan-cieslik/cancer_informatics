---
sidebar_position: 10
---

# Functions & Libraries

A function is a collection of statements that work together to complete a certain task.
A function can accept information in the form of parameters (= input).
As a result, it can return data (= output).

R includes a vast variety of built-in functions, and users can write their own.

## Call a Function

You've already learnt how to call functions unintentionally in previous chapters.
In the following, we will use the `sd()` function to demonstrate how to call a function.
It is utilized to calculated the standard deviation.

Type the name of the function followed by parantheses, such as `sd()`, and the arguments between the parantheses (arguments are seperated by a comma):

```r
# Calculate the standard deviation of 2, 4, 5 and 8
sd(c(2, 4, 5, 8))

output:
[1] 2.5
```

:::tip
Variables can also be used as function arguments:

```r
values <- c(2, 4, 5, 8)
sd(values)

output:
[1] 2.5
```

You may also assign the function's output to a variable if you wish to reuse the function's output:

```r
my_sd <- sd(values)
my_sd

output:
[1] 2.5
```
:::

## Built-in Functions

Basic examples of built-in functions are seq(), mean(), max(), sum(), and paste(), among others.
They are directly accessed by user-written applications.

### Function information

With `help()` or `?`, you can achieve information about a function:

```r
# Find out information about sd()
help(sd)
?sd
```

:::tip
With `args()`, you can simply call the arguments of the function:

```r
# Call the arguments of sd()
args(sd)

output:
function (x, na.rm = FALSE) 
NULL
```
:::

### Argument matching

The description for `sd()` shows that the function actually takes two arguments: `sd(x, na.rm = FALSE)`.

When you enter `sd(values)` into the R console, R understands that `values` is the argument `x` and not `na.rm`.
That is because of the arguments' positioning (`values` comes first, such as `x`).

Another way to match the arguments is by using the equal sign: `sd(x = values)`.

### Default values

The second argument to the `sd()` function indicates that by default `na.rm` is set to `FALSE` (even if you do not specify this argument yourself).
This means that missing values will not be eliminated.
However, default values can be overwritten, e.g. `na.rm = TRUE`.

In contrast, `x` is not specified by default.
If you do not specify the value of an argument without default values, an error will ocur.

## Nested Functions

R allows you to use functions within functions.

:::note example
To get the absolute differences in patient ages in gynecology and dermatology, use `abs()` on `gynecology - dermatology`. To determine the mean absolute deviation, call `abs()` within `mean()`.

```r
# The gynecology and dermatology vectors have already been created for you
gynecology <- c(16, 49, 25, 20, 33, 56)
dermatology <- c(77, 56, 16, 28, 43, 64)

# Calculate the mean absolute deviation
mean(abs(gynecology - dermatology))

output:
[1] 17.16667
```
:::

## User-defined Functions

### Create a Function

You can use the preceding function construct to build your own function:

```r
function_name <- function(arguments) {
    body
}
```

- **Function name**: It should be short yet clear and meaningful, so that the person who sees our code understands exactly what this function performs.
- **Function arguments**: We have already covered what arguments are.
But it is possible for a function to have no arguments, although this is rarely practical.
- **Function body**: The function body is a collection of commands enclosed by curly braces that are executed in a preset sequence each time the function is called.
In other words, we put what we need the function to accomplish in the function body.

:::note example

:::