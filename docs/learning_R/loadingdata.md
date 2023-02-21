---
sidebar_position: 9
---

# Loading Data into R

One way to use R is by typing your data directly into R.
But what if you already have data local on your computer or maybe online?
**Let's learn how do load existing data into R!**

## Data types

First, we will learn how to import CSV, TXT, Excel, JSON, Database, and XML/HTML data files into R.
These are commonly used data types.  
Afterwards, we will have a look at uncommon data types, such as SAS, SPSS, Stata, Matlab, and Binary.

## Importing a CSV file

**CSV** (**C**omma-**S**eperated **V**alues) is a plain-text file that contains data.
As the name reveals, CSV files use a comma to seperate values.

In the following example, we will use `patient_data.csv`.
The first row of the file contains the column names.

> :bulb: **Tip:** With `dir()` you can list existing files in your working directory.

### `utils` & `read.csv()`

To import a CSV file, you need the `read.csv()` function.
It comes with the `utils` package, which is loaded by default when you start R, so you don't need to install anything.

```r
# Import patient_data.csv: patients
patients <- read.csv("patient_data.csv")

# Print the structure of patients
str(patients)

output:
'data.frame':	4 obs. of  4 variables:
 $ Name      : chr  "Joe J." "Laura M." "Isobel P." "Nina W."
 $ Sex       : chr  "m" "f" "f" "f"
 $ Age       : int  34 56 23 18
 $ Blood.type: chr  "A+" "AB+" "0+" "B-"
```

### `stringsAsFactors`

`stringsAsFactors` can be used to tell R whether it should convert strings in the CSV file to factors.

By default, the functions in the `utils` package set the argument as `TRUE`, so you import strings as factors.
But this only makes sense if you want to import categorial variables.   
By setting `stringsAsFactors` to `FALSE`, the data frame columns corresponding to strings in your CSV file will be imported as characters, not as factors.

```r
# Import patient_data.csv correctly: patients
pools <- read.csv("patient_data.csv", stringsAsFactors = FALSE)

# Check the structure of patients
str(patients)

output:
'data.frame':	4 obs. of  4 variables:
 $ Name      : chr  "Joe J." "Laura M." "Isobel P." "Nina W."
 $ Sex       : chr  "m" "f" "f" "f"
 $ Age       : int  34 56 23 18
 $ Blood.type: chr  "A+" "AB+" "0+" "B-"
```

## Importing a TXT file

**TXT** files are plain text documents with little to no formatting.
They can be used to store notes, instructions, manuscripts, or other text-based information. 

### `read.delim`

To import TXT files, use the `read.delim()` function.
By default, the `sep` argument is set to `"\t"`(fields are seperated by tabs) and the `header` argument to `TRUE` (the first row contains the field names).

In the following example, we will import `medication.txt`, which contains 3 variables, but the variable names are *not* headed in the first line.
That means, we will have to set the argument `header` to `FALSE`. The file also uses tabs as field seperators.

```r
# Import pain_medication.txt.: medication
medication <- read.delim("pain_medication.txt", header = FALSE)

# Summarize medication
summary(medication)

output:
      V1                 V2                 V3           
 Length:5           Length:5           Length:5          
 Class :character   Class :character   Class :character  
 Mode  :character   Mode  :character   Mode  :character  
```

### `read.table`

For more complex TXT files, you can use the `read.table()` function.
It allows you to specify tons of different arguments.  
Unlike `read.csv()` and `read.delim()`, the `header` argument is set to `FALSE` by default and the `sep` argument is `""`. 

> :bulb: **Tip:** With the argument `col.names = c()` within the `read.table()` function you can name the different columns.

```r
# Path to the pain_medication.txt file: path
path <- file.path("data", "pain_medication.txt")

# Import the pain_medication.txt file: medication
medication <- read.table(path, col.names = c("drug", "application", "dose"))

# Call head() on medication
head(medication)

output:
                  drug application dose
Paracetamol       p.o.         500   mg
Aspirin           p.o.         100   mg
Tramadol          p.o.          50   mg
Tilidine/Naloxone p.o.        50/4   mg
```

# Importing data from Excel

**Excel** is a software program that uses spreadsheets to organize numbers and data with formulas and functions. 

To import data from Excel, you have to install the [readxl package](https://readxl.tidyverse.org/) first.
You can simply do this by typing `install.packages("readxl")` into R.
Then you can load the `readxl` package by using `library(readxl)`:

```r
install.packages("readxl")
library(readxl)
```

Before you start importing data from Excel, it can be useful to first print out the names of the sheets in the Excel document.
For this, you can use the function `excel_sheets()`.

With the function `read_excel()`, you can actually import data into R.   

> :memo: **Note:** 
> - By default, the first sheet of the Excel document will be imported.
> - With `read_excel("excelname.xlsx", sheet = 2)` you can import the second sheet.
> - Alternatively, you could use `read_excel("excelname.xlsx", sheet = "nameofsheet")`.

Example:
```r
# Import patient_data.xlsx, sheet 2: patients
patients <- read_excel("patient_data.xlsx", sheet = 2)

# Check the structure of patients
str(patients)

output:
tibble [4 × 4] (S3: tbl_df/tbl/data.frame)
 $ Name      : chr [1:4] "Hannah P." "Josh T." "Emmett G." "Wesley R."
 $ Sex       : chr [1:4] "f" "m" "m" "m"
 $ Age       : num [1:4] 25 33 46 66
 $ Blood type: chr [1:4] "B+" "B+" "AB+" "0-"
```