---
sidebar_position: 11
---

# Loading Data into R

One way to use R is by typing your data directly into R.
But what if you already had data local on your computer or online?
**Let's learn how to load pre-existing data into R!**

## Data Types

First, we will learn how to import CSV, TXT, Excel, JSON, and XML data files into R.
These are commonly used data types.  

## Importing a CSV File

**CSV** (**C**omma-**S**eparated **V**alues) is a plain-text file that contains data.
As the name reveals, CSV files use a comma to separate values.

:::note example dataset `patient_data.csv`
```
Name, Sex, Age, Blood.type
Joe J., m, 34, A+
Laura M., f, 56, AB+
Isobel P., f, 23, 0+
Nina W., f, 18, B-
```
:::
The first row of the file contains the column names.

:::tip
With `dir()`, you can list existing files in your working directory.
:::

### `utils` & `read.csv()`

To import a CSV file, you can use the `read.csv()` function.
It is included with the `utils` package, which is loaded by default when you start R, so you don't need to install anything.

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

## Importing a TXT File

**TXT** files are plain text documents with no predetermined formatting.
They can be used to store notes, instructions, manuscripts, or other text-based information. 

### `read.delim()`

To import TXT files, use the `read.delim()` function.
By default, the `sep` argument is set to `"\t"` (fields are separated by tabs) and the `header` argument to `TRUE` (the first row contains the field names).

In the following example, we will import `medication.txt`, which contains 3 variables, but the variable names are *not* headed in the first line.
That means, we will have to set the argument `header` to `FALSE`. The file also uses tabs as field separators.

:::note example dataset `pain_medication.txt`
```
Ibuprofen	p.o.	400mg
Paracetamol	p.o.	500mg
Aspirin	p.o.	100mg
Tramadol	p.o.	50mg
Tilidine/Naloxone	p.o.	50/4mg
```
:::

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

### `read.table()`

For more complex TXT files, you can use the `read.table()` function.
It allows you to specify tons of different arguments.  
Unlike `read.csv()` and `read.delim()`, the `header` argument is set to `FALSE` by default and the `sep` argument is `""`. 

:::tip
With the argument `col.names = c()` within the `read.table()` function, you can name the different columns.
:::

```r
# Path to the pain_medication.txt file: path
path <- file.path("data", "pain_medication.txt")

# Import the pain_medication.txt file: medication
medication <- read.table(path, col.names = c("drug", "application", "dose"))

# Call head() on medication
head(medication)

output:
               drug application   dose
1         Ibuprofen        p.o.  400mg
2       Paracetamol        p.o.  500mg
3           Aspirin        p.o.  100mg
4          Tramadol        p.o.   50mg
5 Tilidine/Naloxone        p.o. 50/4mg
```

## Importing Data from Excel

**Excel** is a software program that uses spreadsheets to organize numbers and data with formulas and functions. 

There is a multitude of packages for xlsx import, here we will choose one at random.
To import data from Excel, you can use the [`readxl` package](https://readxl.tidyverse.org/) first.
You can simply do this by entering `install.packages("readxl")` into the R console.
Then you can load the `readxl` package by using `library(readxl)`:

```r
install.packages("readxl")
library(readxl)
```

Before you start importing data from Excel, it can be useful to first print out the names of the sheets in the Excel document.
For this, you can use the function `excel_sheets()`.

With the function `read_excel()`, you can actually import data into R.   

:::note 
- By default, the first sheet of the Excel document will be imported.
- With `read_excel("excelname.xlsx", sheet = 2)`, you can import the second sheet.
- Alternatively, you could use `read_excel("excelname.xlsx", sheet = "nameofsheet")`.
:::

**Example:**

:::note example dataset `patient_data.xlsx`, sheet 2
|Name     |Sex|Age|Blood type|
|---------|---|---|----------|
|Hannah P.|f  |25 |B+        |
|Josh T.  |m  |33 |B+        |
|Emmett G.|m  |46 |AB+       |
|Wesley R.|m  |66 |0-        |
:::

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

## Importing Data from a JSON File

**JSON** is short for **J**ava**S**cript **O**bject **N**otation.
It is a free, universally accepted file format and method of exchanging data.

Before importing data from a JSON file, you need to load the `rjson` or the `jsonlite` package first.
Both methods will be explored in the next sections.

### `rjson`

Install and load the `rjson` package:

```r
install.packages("rjson")
library(rjson)
```

To convert a JSON object into R, you can use the `fromJSON()` function:

```r
# Import the databases.json file: patient_data
patient_data <- fromJSON(file = "databases.json")

# Print out patient_data
patient_data

output:
$databases
$databases[[1]]
$databases[[1]]$name
[1] "Joey P."

$databases[[1]]$age
[1] "67"


$databases[[2]]
$databases[[2]]$name
[1] "Max C."

$databases[[2]]$age
[1] "49"


$databases[[3]]
$databases[[3]]$name
[1] "Selena M."

$databases[[3]]$age
[1] "36"
```

### `jsonlite`

Install and load the `jsonlite` package:

```r
install.packages("jsonlite")
library(jsonlite)
```

The `fromJSON()` function is also available in `jsonlite`:

```r
# Import the databases.json file: patient_data
patient_data <- fromJSON("databases.json")

# Print out patient_data
patient_data

output:
$databases
       name age
1   Joey P.  67
2    Max C.  49
3 Selena M.  36
```

As you can see, `jsonlite` appears to be more user-friendly than `rjson`.

:::tip
Instead of a filename, you can also import URLs with `fromJSON()`.
:::

## Importing Data from XML

The E**x**tensible **M**arkup **L**anguage (short **XML**) is an extended markup language similar to HTML.
XML specifies the rules for document creation.
It provides context for information in a document, but it doesn't define how to provide this.

To begin, install and load the `XML` as well as the `xml2` package by typing the following commands into the R console:

```r
install.packages("XML")
library(XML)

install.packages("xml2")
library(xml2)
```

### `read_xml()`

The XML data may be read via a URL link to the XML site or the file name.
For this, use the `read_xml()` function:

```r
# Import the databases.xml file: patient_data
patient_data <- read_xml("databases.xml")

# Print out patient_data
patient_data

output:
{xml_document}
<databases>
[1] <database>\n  <name>Joey P.</name>\n  <age>67</age>\n</database>
[2] <database>\n  <name>Max C.</name>\n  <age>49</age>\n</database>
[3] <database>\n  <name>Selena M.</name>\n  <age>36</age>\n</database>
```

To make the data accessible, you can either parse the entire page or read elements separately.

### `xmlParse()`

Let's start by investigating the parsing option.
Call `xmlParse()` and pass `patient_data` as an argument.

```r
# Parse patient_data: patient_xml
patient_xml <- xmlParse(patient_data)

# Print out patient_xml
patient_xml

output:
<?xml version="1.0" encoding="UTF-8"?>
<databases>
  <database>
    <name>Joey P.</name>
    <age>67</age>
  </database>
  <database>
    <name>Max C.</name>
    <age>49</age>
  </database>
  <database>
    <name>Selena M.</name>
    <age>36</age>
  </database>
</databases>
```

Now, the contents resemble our source file.

### Read Elements Separately

If you want to read elements separately, you have the following options:

- The `xml_find_all()` function may be used to get all items that share a tag.
Any material included between the opening and closing tags is also provided.
  ```r
  # Find all names in patient_data
  xml_find_all(patient_data, ".//name")

  output:
  {xml_nodeset (3)}
  [1] <name>Joey P.</name>
  [2] <name>Max C.</name>
  [3] <name>Selena M.</name>
  ```

- If you merely require the content, you can use the `xml_text()`, `xml_integer()`, or `xml_double()` functions, depending on the underlying data type.
In our case, the first option makes the most sense.
  ```r
  # Find all names in patient_data (content only)
  xml_text(xml_find_all(patient_data, ".//name"))

  ouput:
  [1] "Joey P."   "Max C."    "Selena M."
  ```

## Sources & Further Reading

- [`jsonlite` package](https://www.rdocumentation.org/packages/jsonlite/versions/1.8.4)
- [`readxl` package](https://readxl.tidyverse.org/)
- [`rjson` package](https://www.rdocumentation.org/packages/rjson/versions/0.2.21)
- [`utils` package](https://www.rdocumentation.org/packages/utils/versions/3.6.2)
- [`XML` package](https://www.rdocumentation.org/packages/XML/versions/3.99-0.14)
- [`xml2` package](https://www.rdocumentation.org/packages/xml2/versions/1.3.3)