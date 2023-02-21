---
sidebar_position: 10
---
# Plotting in ggplot
## Getting started

ggplot is a free R library that allows you to design almost any kind of plot.
To use ggplot, you first have to install it via the function `install.packages()`.
Afterwards, you can call the package with `library(ggplot2)`.
```r
install.packages("ggplot2")
library(ggplot2)
```

## Loading your data

Let's assume your data is stored as a .csv file.
There are two basic ways of reading csv files: `read.table()` and `read.csv()`.
The default settings of both functions differ slightly.
If you created a RStudio project beforehand (see ["Setting up the environment"](environment.md)), then your working directory will be automatically setup for you and you can refer to your .csv file relative to your working directory.
Otherwise you may need to use an absolute path to your file.
The whole function could look like this, assuming your file contains a header row and the values are separated by a semicolon:
```r
data <- "read.table("data/ngs.csv", sep=";", header=TRUE)
```
We do not have to define column names for a file with a header row as R will automatically name the columns after their header value.
If the data file does not have a header, we can define column names with `colnames(data)` and assign a vector of column names to it:
`colnames(data) <- c("gene", "expression")`
Alternatively, you can create your data frame directly in R.
We do not recommend this however, as it is usually more convenient to use .csv files.

## Calling ggplot
To initiate a plot, we need to call `ggplot()` and can assign it to a variable e.g., `p`.
```r
p <- ggplot()
```
We earlier assigned our NGS data to the variable "data", so we specify `data` as our first argument in `ggplot()`:
`p <- ggplot(data)`

## ggplot aesthetics
ggplot needs "aesthetics" to know which data to show on which axis. We can define them with the "ggplot" call: 
```r
p <- ggplot(data, aes(x=gene, y=expression))
```

## Defining the representation of data points
ggplot offers several kinds of representation for your data that are all explained in separate documents.
You can also look them up on the [ggplot cheat sheet](https://www.maths.usyd.edu.au/u/UG/SM/STAT3022/r/current/Misc/data-visualization-2.1.pdf).
The plot types can be called by functions such as `geom_line()` (for a line plot), `geom_point()` (for a dot plot), `geom_boxplot()` (for a box plot) or `geom_col()` (for a bar chart).
Your code could look like this:
```r
p <- ggplot(data, aes(x=gene, y=expression)) + geom_point() + geom_line()
```
Our plot is now a dot plot with a line connecting the dots.

## Colours
When defining the aesthetics of our plot, we can also define colours.
This works with "fill" and "colour", with colour defining the outlines of a visualization whereas fill usually defines the colour inside a box or bar.
Please note that some visuals such as geom_point() do not have a "fill" aesthetic.
To define colours, we tell R the variable that defines it: `fill=expression`.
R will set default colours, but we can change them with "scale_colour_manual".
