---
sidebar_position: 2
---
# Plotting in ggplot
## Getting started

GGplot is a free R library that allows you to design almost any kind of plot. To use ggplot, 
you first have to download it in R Studio (please refer to our article "Installing R and R Studio" for detailed instructions) and call the function "install.packages".
Afterwards, you can call the package with "library(ggplot2)".
![ggplot_1](./Images/ggplot_1.png)

## Loading your data

Your data can be stored as a .csv file. R knows two ways of loading csv files: "read.table" and "read.csv". There are minor differences in the default settings of both functions. For example, "read.table" does not use a header row in its default setting while "read.csv" does.
![ggplot_2](./Images/ggplot_2.png)
![ggplot_3](./Images/ggplot_3.png)
However, you can change these settings (for example by setting "header=TRUE" in "read.table" oder "header=FALSE" in "read.csv").
If you created a project beforehand (see "Creating a project in R"), then you can simply give R the name of your data file in this working directory. Otherwise you will need to specify the directory of your file e.g., "desktop/data/ngs.csv".
The whole function could look like this:
data <- "read.table("data/ngs.csv", sep=";", header=TRUE)"
for a csv files with a header row and semicolons as separators between values.
We do not have to define column names for a file with a header row as R will automatically name the columns after their header value. If the data file does not have a header, we can define column names with "colnames(data)" and assign a vector of column names to it:
colnames(data) <- c("gene", "expression")
Alternatively, you can create your dataframe directly in R. We created a series of articles explaining different dataframes in R. We do not recommend this however, as it is usually more convenient to use .csv files.

## Calling ggplot
To create a plot, we first give it a variable e.g., "p". We then assign the plot to it:
![ggplot_4](./Images/ggplot_4.png)
We earlier assigned our NGS data to the variable "data", so we call data in ggplot:
p <- ggplot(data)

## GGplot aesthetics
Ggplot needs "aesthetics" to know which data to show on which axis. We can define them with the "ggplot" call: 
p <- ggplot(data, aes(x=gene, y=expression))

## Defining your kind of plot
Ggplot offers several different plots that are all explained in separate documents. You can also look them up on the [ggplot cheat sheet](https://www.maths.usyd.edu.au/u/UG/SM/STAT3022/r/current/Misc/data-visualization-2.1.pdf).
You can call the plot types by functions such as "geom_line" (for a line plot), "geom_point" (for a dot plot), "geom_boxplot" (for a boxplot) or "geom_col" (for a barplot).
Your code could look like this:
p <- ggplot(data, aes(x=gene, y=expression)) + geom_point() + geom_line()
Our plot is now a dot plot with a line connecting the dots.

## Colours
When defining the aesthetics of our plot, we can also define colours. This works with "fill" and "color", with color defining the outlines of a visualisation whereas fill usually defines the color inside of a box or bar. Please note that some visuals such as geom_point() do not have a "fill" aesthetic.
To define colours, we tell R the variable that defines it: "fill=expression".
R will set default colors, but we can change them with "scale_color_manual".
