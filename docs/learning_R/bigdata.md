---
sidebar_position: 16
---
# Big Data

## Introduction

Big data refers to extremely large and complex datasets that cannot be easily processed, managed or analysed using traditional data processing techniques or tools. Big data is characterized by three main attributes - volume, velocity, and variety:

- Volume: Refers to the vast amount of data generated from various sources such as social media, sensors, devices, and more. The volume of data is so huge that traditional data storage and processing technologies cannot handle it.

- Velocity: Refers to the speed at which data is generated, processed, and analysed. Big data is constantly flowing in real-time, making it difficult for traditional systems to keep up with the pace.

- Variety: Refers to the various forms of data such as structured, semi-structured, and unstructured data that are generated from different sources in different formats.

To handle big data, organizations use advanced data processing technologies such as [**Hadoop**](https://hadoop.apache.org/), [**Spark**](https://spark.apache.org/), [**NoSQL**](hhttps://de.wikipedia.org/wiki/NoSQL), and more. 
These tools help to store, process, and analyse large volumes of data, and extract valuable insights and patterns from it. 
The insights obtained from big data can be used to make informed decisions, improve business processes, and gain a competitive advantage.

## cBioPortal

[**cBioPortal**](https://www.cbioportal.org/) is an open-source web-based platform that provides researchers with access to a large collection of genomic data from various cancer studies. 
It is a Big Data platform that allows researchers to analyse and explore large datasets of genomic data and extract valuable insights that can be used to understand the genetic basis of cancer.

cBioPortal provides a user-friendly interface that allows researchers to interact with the data and perform various types of analysis, such as exploring genetic alterations in cancer patients, identifying potential cancer targets, and visualizing genomic data. 
The platform is designed to be flexible and customizable, allowing researchers to upload their own data, perform custom analyses, and share their findings with the scientific community.

The platform provides access to a large collection of cancer genomics data, including data from [**The Cancer Genome Atlas**](https://www.cancer.gov/ccg/research/genome-sequencing/tcga) (TCGA), [**Cancer Cell Line Encyclopedia**](https://sites.broadinstitute.org/ccle/) (CCLE), and many other sources. 
The data is constantly updated, and new studies are added regularly to ensure that researchers have access to the latest and most comprehensive cancer genomics data.

Overall, cBioPortal is a powerful Big Data platform that enables researchers to analyse and explore large datasets of cancer genomics data, helping to advance our understanding of the genetic basis of cancer and ultimately leading to better cancer treatments.

### Use-Case

Here's an example of how to use and set up cBioPortal in R.
First, install and load the [**cbioportal package**](https://bioconductor.org/packages/release/bioc/html/cBioPortalData.html) in R by running the following command:
```r
# Install the package
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")

BiocManager::install("cBioPortalData")
# Load the package
library(cBioPortalData)
```
Next you want to use the cBioPortal() function to connect to the cBioPortal API in R. The function takes several parameters, including:

- **hostname**: The hostname of the cBioPortal server (default: "www.cbioportal.org").
- **protocol**: The protocol to use when connecting to the cBioPortal server (default: "https").
- **api**: The path to the API documentation (default: "/api/v2/api-docs").
- **token**: An optional authentication token to use when connecting to the cBioPortal server.

```r
# Connect to the cBioPortal API
cBioPortal(
  hostname = "www.cbioportal.org",
  protocol = "https",
  api. = "/api/v2/api-docs",
  token = character())
# Stores the connection in the cbio object.  
cbio <- cBioPortal()
```
Call the `getStudies()` function to retrieve a list of the available cancer studies from the cBioPortal API and store them in the studies object. 
The api argument specifies the API URL to use, which in this case is set to the default cBioPortal API URL.
```r
# Full list of available cancer studies
getStudies(api., buildReport = FALSE)
# Stores the data
studies <- getStudies(api = cbio)
```
Call the `searchOps()` function to search for available data types and options based on a keyword. 
For example, to search for options related to "molecular" data, run:

```r
# Summary of the availaible studies with the keyword molecular
searchOps(api = cbio, keyword = "molecular")
```
Next retrieve clinical data for the ACC study from the cBioPortal API and store it in the acc_clin object.
```r
## obtain clinical data
acc_clin <- clinicalData(api = cbio, studyId = "acc_tcga")
acc_clin
```
You can then further analyse the dataset. In the following example we create a histogram showing the age when the Adrenocortical carcinoma where first diagnosed.

```r
#To check the format of the AGE variable use the `class()` function
class(acc_clin$AGE)
# The class of the AGE variable is not "numeric", so you need to convert it to a numeric format. You can use the `as.numeric()` function to do this:
acc_clin$AGE <- as.numeric(acc_clin$AGE)
# After converting the AGE variable to numeric format, you should be able to create a histogram using the hist() function:
hist(acc_clin$AGE)
```

This will create a histogram of the distribution of ages in the clinical data:

![](./Images/BigDataAge.png "BigDataAge")

:::tipFive Tips using cBioPortal
**1. Check the size of the data:** cBioPortal can provide large amounts of data, so it's important to check the size of the data you're downloading before you begin. 
This can help you estimate how long the download will take, as well as how much disk space you'll need to store the data.

**2. Use the correct study ID:** Make sure you're using the correct study ID for the data you want to download. You can find the study ID in the cBioPortal interface or by using the cbioportal_get_cancer_studies() function in R.

**3. Check the data format:** By default, cBioPortalData() will download the data in TSV (tab-separated values) format. 
However, you can also download the data in other formats, such as MAF (Mutation Annotation Format) or JSON (JavaScript Object Notation), by specifying the format argument.

**4. Use filters to limit the data:** If you only need a subset of the data, you can use filters to limit the data that is downloaded. 
For example, you can filter by specific genetic alterations, clinical features, or patient demographics.

**5. Be patient:** cBioPortal can provide a large amount of data, so it may take some time to download. 
Be patient and allow the function to complete its work. 
You may also want to consider running the function in the background or on a separate machine if you're dealing with a large dataset.
:::

## NCBI GEO 

[**NBCI GEO**](https://www.ncbi.nlm.nih.gov/geo/) (Gene Expression Omnibus) is a public database and repository that stores a large amount of gene expression data. 
Gene expression data refers to the measurement of the activity of genes in a biological sample, such as cells or tissues. 
The data in GEO includes microarray, next-generation sequencing, and other high-throughput genomic data generated by researchers from all over the world. 
The primary goal of NCBI GEO is to enable researchers to access and use these gene expression datasets for their own research. 
By making the data publicly available, it facilitates scientific discoveries and advances in the field of genomics. NCBI GEO has several features that make it useful for researchers, including:

- A large collection of gene expression datasets: NCBI GEO contains a massive amount of gene expression data from a variety of organisms, tissues, and experimental conditions.

- Easy data access: The data in NCBI GEO can be easily accessed and downloaded through the NCBI website or programmatically using APIs or R packages.

- Metadata: NCBI GEO provides detailed metadata for each dataset, including experimental design, sample information, and data processing information. This information is critical for proper interpretation of the data.

- Data analysis tools: NCBI GEO provides various tools and resources to help researchers analyse and visualize gene expression data. For example, [**GEO2R**](https://www.ncbi.nlm.nih.gov/geo/geo2r/) is a web-based tool that allows researchers to perform differential expression analysis on their data.

Overall, NCBI GEO is a valuable resource for researchers studying gene expression and genomics. Its large collection of datasets, easy data access, and useful tools make it an essential tool for those in the field.

### Use-Case

Here's an example of how to use NBCI Geo in R. First, you'll need to install and load the [**GEOquery package**](https://bioconductor.org/packages/release/bioc/html/GEOquery.html) in R. You can do this by running the following code:
```r
# This will download and install the GEOquery package
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")

BiocManager::install("GEOquery")
library(GEOquery)
```
Next, you can use the` getGEO()` function to download data from a specific GEO dataset. 
For example, let's say you want to download the GEO dataset GSE109169, which contains gene expression data from breast cancer patients before and after treatment with the drug **ribociclib**. 

:::infoinfo Ribociclib
Ribociclib is an oral, small-molecule inhibitor of cyclin-dependent kinase (CDK) 4 and 6 that is under development by Novartis for the treatment of cancer. CDKs play an important role in cell cycle progression and cellular proliferation, and inhibition of these kinases with ribociclib results in G1 phase cell-cycle arrest. Ribociclib, in combination with an aromatase inhibitor, was recently approved in the USA for the first-line treatment of advanced breast cancer and has been submitted for approval in the EU for this indication.
:::

You can do this by running the following code:
```r
# This will load the GSE109169 dataset
gse <- getGEO("GSE109169")
```
Some datasets on GEO may be derived from different microarray platforms. 
Therefore, the object gse is a list of different datasets. 
You can find out how many were used by checking the length of the gse object. 
Usually there will only be one platform and the dataset we want to analyse will be the first object in the list.
```r
## Check how many platforms used
length(gse)
# Extracts the first object in the list - the dataset we want to further analyse
gse <- gse[[1]]
gse
```

Next, you can extract the expression data for the samples using the `exprs()` function. For example, to extract the expression data for the first 10 genes in the dataset, you can run the following code.
```r
# Displays the first 10 genes in the dataset
exprs(gse)[1:10,]
```

Furthermore, you can also create sample metadata by using the following code:
```r
# Extract sample metadata and perform exploratory data analysis:
sample_metadata <- pData(gse[[1]])
table(sample_metadata$`characteristics_ch1.2`)
```
Overall, analysing the GSE109169 data in R can provide insights into the molecular mechanisms involved in breast cancer development and identify potential biomarkers or therapeutic targets for breast cancer therapy. 
You can then run further analysis which will be explained in the section **using_R**.

## Sources & Further Reading

- Borges do Nascimento IJ, Marcolino MS, Abdulazeem HM, et al. Impact of Big Data Analytics on People's Health: Overview of Systematic Reviews and Recommendations for Future Studies. J Med Internet Res. 2021;23(4):e27275. Published 2021 Apr 13. doi:10.2196/27275

- Ristevski B, Chen M. Big Data Analytics in Medicine and Healthcare. J Integr Bioinform. 2018;15(3):20170030. Published 2018 May 10. doi:10.1515/jib-2017-0030

- Zhang Z. Data management by using R: big data clinical research series. Ann Transl Med. 2015;3(20):303. doi:10.3978/j.issn.2305-5839.2015.11.26

- Cerami E, Gao J, Dogrusoz U, et al. The cBio cancer genomics portal: an open platform for exploring multidimensional cancer genomics data [published correction appears in Cancer Discov. 2012 Oct;2(10):960]. Cancer Discov. 2012;2(5):401-404. doi:10.1158/2159-8290.CD-12-0095

- Barrett T, Suzek TO, Troup DB, et al. NCBI GEO: mining millions of expression profiles--database and tools. Nucleic Acids Res. 2005;33(Database issue):D562-D566. doi:10.1093/nar/gki022

- Syed YY. Ribociclib: First Global Approval. Drugs. 2017;77(7):799-807. doi:10.1007/s40265-017-0742-0