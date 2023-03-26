---
sidebar_position: 2
---
# Using R: Breast Cancer

## Introduction

Breast cancer is a cancer entity that develops in breast cells.
It is the second most common cancer in women worldwide, and it is also possible in men.
In recent years, the use of computational methods and tools for cancer informatics has increased significantly.
R, a programming language for statistical computing and graphics, is a popular choice for cancer informatics due to its powerful data manipulation and visualization capabilities.
Here are some ways R can be used in breast cancer informatics:

**1. Data Preprocessing:** R can be used for data preprocessing, which is an essential step in cancer informatics.
This step involves cleaning, transforming, and organizing data before analysis.
In R, packages like [**tidyverse**](https://cran.r-project.org/web/packages/tidyverse/index.html) can be used for data cleaning and transformation, while [**dplyr**](https://cran.r-project.org/web/packages/dplyr/index.html) can be used for data manipulation.

**2. Survival Analysis:** Survival analysis is a statistical method used to analyse the time it takes for an event to occur, such as death or disease progression.
R has several packages that can be used for survival analysis in breast cancer, including [**survival**](https://cran.r-project.org/web/packages/survival/index.html) or [**survminer**](https://cran.r-project.org/web/packages/survminer/index.html).

**3. Gene Expression Analysis:** Gene expression analysis can help identify genes that are overexpressed or underexpressed in breast cancer.
R has several packages, including [**limma**](https://bioconductor.org/packages/release/bioc/html/limma.html) and [**DESeq2**](https://bioconductor.org/packages/release/bioc/html/DESeq2.html), which can be used for differential gene expression analysis. 
These packages can help identify genes that are differentially expressed between different subtypes of breast cancer.

**4. Machine Learning:** Machine learning algorithms can be used to identify patterns in breast cancer data that can help predict patient outcomes.
R has several packages for machine learning, including [**caret**](https://cran.r-project.org/web/packages/caret/vignettes/caret.html) or [**randomForest**](https://cran.r-project.org/web/packages/randomForest/index.html).
These packages can be used to develop predictive models based on patient data, including gene expression data, clinical data, and imaging data.

**5. Data Visualization:** R is an excellent tool for data visualization, which is essential in cancer informatics.
R has several packages, including [**ggplot2**](https://cran.r-project.org/web/packages/ggplot2/index.html) and [**lattice**](https://cran.r-project.org/web/packages/lattice/index.html), that can be used to create informative and visually appealing plots and graphs.
These packages can be used to create plots of gene expression data, survival curves, and other types of data relevant to breast cancer.

In the following, individual methods mentioned above are explained using breast cancer as an example.
Afterwards, you should be able to perform individual analyses using R and apply them to a medical problem.

## Sources & Further Reading
- Elsheakh DN, Mohamed RA, Fahmy OM, Ezzat K, Eldamak AR. Complete Breast Cancer Detection and Monitoring System by Using Microwave Textile Based Antenna Sensors. Biosensors (Basel). 2023;13(1):87. Published 2023 Jan 4. doi:10.3390/bios13010087

- Chiao JY, Chen KY, Liao KY, Hsieh PH, Zhang G, Huang TC. Detection and classification the breast tumors using mask R-CNN on sonograms. Medicine (Baltimore). 2019;98(19):e15200. doi:10.1097/MD.0000000000015200

- Akselrod-Ballin A, Chorev M, Shoshan Y, et al. Predicting Breast Cancer by Applying Deep Learning to Linked Health Records and Mammograms. Radiology. 2019;292(2):331-342. doi:10.1148/radiol.2019182622

- West M, Blanchette C, Dressman H, et al. Predicting the clinical status of human breast cancer by using gene expression profiles. Proc Natl Acad Sci U S A. 2001;98(20):11462-11467. doi:10.1073/pnas.201162998

- Finak G, Mayer B, Fulp W, et al. DataPackageR: Reproducible data preprocessing, standardization and sharing using R/Bioconductor for collaborative data analysis. Gates Open Res. 2018;2:31. Published 2018 Jul 10. doi:10.12688/gatesopenres.12832.2