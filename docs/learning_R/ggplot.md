---
sidebar_position: 10
---
# Plotting in ggplot

## What is ggplot2?
ggplot2 is a powerful and flexible data visualization package for R. It is built on top of the ***grammar of graphics***, which is a system for describing and building complex plots from simple components.

ggplot2 allows you to create a wide range of visualizations, including scatter plots, line charts, bar charts, and more. It also provides a lot of customization options, such as changing axis labels, fonts, colors, and themes.

## Getting started


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



## The building blocks of a plot 

To plot a graph in ggplot2, you need to familiarize yourself with the 7 elements that are used to build all kinds of plots. ggplot2 constructs plots by layering these grammatical elements on top of each other, almost like a pyramid:

| Element:     | What it does:     | 
|--------------|-----------|
| **Data**      | Is the data that you want to visualize     | 
| **Aesthetics**   | Used to map (or link) information from your data set to the visible part of a graph  | 
|  **Geometries**  |  The way that the visible part of the data is presented on a plot, such scatter plot, line plots, histogramms,  etc.  | 
| **Themes**       |  All things in a plot that are not part of the actual data, such as labels, fonts, background, titles, legends, etc. | 
|  **Statistics**  |  statistical transformation of the data for better visualisation  | 
|  **Coordinates** |  provides axes and gridlines for the data to be mapped to a graphic plane  | 
|  **Facets**      |   breaks up subsets of data to display them on separate planes | 

Using these 7 elements, it is possible to create any graph you can think of. However, for a simple plot you only need the first three elements: ***data, aesthetics and geometries***. The four other elements can be used additionally to create even more complex graphs

:::info

The key components for a plot in ggplot2 are the data, aesthetics and the geometry!! Without these components, R will not be able to produce a plot!

:::

Below is a code template that includes all seven elements. The individual parts of the code will be addressed in the upcoming chapters:

```r
ggplot(<DATA>, aes(<MAPPINGS>), stat = <STAT>, position =<POSITION>) + 
    <GEOM_FUNCTION> +
    <COORDINATE_FUNCTION> +
    <THEME_FUNCTION> +
    <FACET_FUNCTION>
```

It is useful to look up the [ggplot cheat sheet](https://www.maths.usyd.edu.au/u/UG/SM/STAT3022/r/current/Misc/data-visualization-2.1.pdf), which has all important information summarized together!


