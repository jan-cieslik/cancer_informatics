---
sidebar_position: 3
---
# Survival: Ovarian Cancer

:::info
This resource is available as an [R Markdown Notebook](/notebooks/ovarian_cancer.Rmd) and as a [PDF](/notebooks/ovarian_cancer.pdf).
:::

## Introduction

Ovarian cancer (OS) can be subdivided into three main types: epithelial ovarian cancer, germ cell tumours, and stromal tumours with epithelial ovarian cancer being the most common type.
In this article, we will focus on the early stage serous epithelial ovarian cancer, which is the most common type of ovarian cancer.
Upon first diagnosis of early OS a staging laparotomy is performed to determine the extent of the disease.
One well known study (ICON1) compared immediate adjuvant chemotherapy after surgery vs no adjuvant chemotherapy (see sources below).
We provide a simulated dataset based on the ICON1 study, which can be used to perform survival analysis in R.
**Please note that this dataset is simulated and for educational purposes only and should not be used for clinical decision-making.**

## Ovarian Cancer and Use Cases in R

Here are some examples of how R can be used in ovarian cancer research:

**1. Data Preprocessing:** R can be used for data preprocessing, which is an essential step in any bioinformatics workflow.
This step involves cleaning, transforming, and organizing data before analysis.
You can choose to use base R functions or packages for data preprocessing.
A popular suite of tools is [**tidyverse**](https://cran.r-project.org/web/packages/tidyverse/index.html) which contains a lot of useful functions for data manipulation.
In our article we try to stick to base R functions as much as possible.

**2. Survival Analysis:** Survival analysis is a statistical method used to analyse the time it takes for an event to occur, such as death or disease progression.
R has several packages that can be used for survival analysis in ovarian cancer, including [**survivalAnalysis**](https://cran.r-project.org/web/packages/survivalAnalysis/index.html), [**survival**](https://cran.r-project.org/web/packages/survival/index.html) or [**survminer**](https://cran.r-project.org/web/packages/survminer/index.html).

**3. Data Visualization:** R is an excellent tool for data visualization, which is essential in cancer informatics.
Popular examples include [**ggplot2**](https://cran.r-project.org/web/packages/ggplot2/index.html) and [**lattice**](https://cran.r-project.org/web/packages/lattice/index.html), both can be used to create informative and visually appealing plots and graphs.

## Used Packages
We will use the following packages in this article.
Keep in mind that you might need to install the packages first before you can use them.

```r
# Install the Required Packages (example for the survivalAnalysis package)
install.packages("survivalAnalysis")
# Load the Required Packages
library(survivalAnalysis) #For survival analysis
library(ggplot2) # For plotting
library(ggsurvfit) # For plotting
library(ggsci) # Provides color palettes for plotting e.g., scale_color_jco (optional)
```

## Load Data

First we need to obtain the data.
Our mock dataset can be found under https://cancer-informatics.org/datasets/ovarian.csv
You can either download the csv file first and reference the local file or point R directly to the url:
```r
# Load the data from a local file
data <- read.csv("ovarian.csv", header = TRUE, sep = ",")
# Load the data from a url
data <- read.csv("https://cancer-informatics.org/datasets/ovarian.csv", header = TRUE, sep = ",")
```

You can deduct the parameters `header = TRUE` and `sep = ","` from the csv file.
Here are the first 5 lines of the csv file:
```csv
"Treatment",    "HighRisk", "Time",           "Status"
1,              1,          42.4503750028979, 1
0,              0,          18.3782004531846, 1
0,              1,          12.1239407387935, 1
0,              1,          10.1788407434407, 1
```
As you can see we provide the column names in the first line and use a comma as a separator.

## Data preprocessing

First we examine the structure and content of the ovarian dataset to understand its variables and format:
```r
# Explore the Dataset:
str(data)
summary(data)
```
This should result in the following output:

```r
> str(data)
'data.frame':	600 obs. of  4 variables:
 $ Treatment: int  1 0 0 0 1 0 1 1 1 0 ...
 $ HighRisk : int  1 0 1 1 1 1 1 1 0 1 ...
 $ Time     : num  42.45 18.38 12.12 10.18 4.81 ...
 $ Status   : int  1 1 1 1 1 1 0 1 0 1 ...
> summary(data)
   Treatment      HighRisk           Time            Status   
 Min.   :0.0   Min.   :0.0000   Min.   : 0.215   Min.   :0.0  
 1st Qu.:0.0   1st Qu.:0.0000   1st Qu.: 9.575   1st Qu.:0.0  
 Median :0.5   Median :0.0000   Median :14.766   Median :0.0  
 Mean   :0.5   Mean   :0.4833   Mean   :16.417   Mean   :0.4  
 3rd Qu.:1.0   3rd Qu.:1.0000   3rd Qu.:22.985   3rd Qu.:1.0  
 Max.   :1.0   Max.   :1.0000   Max.   :44.737   Max.   :1.0  
```

The ovarian dataset contains information on 4 variables related to ovarian cancer, including survival time, survival status, treatment, and high-risk status.

:::tip Explaining the variables in the ovarian dataset
- **Treatment:** This variable indicates whether the patient received no adjuvant chemotherapy (0) or adjuvant chemotherapy (1).
- **HighRisk:** This variable indicates whether the patient is considered low-risk (0) or high-risk (1).
- **Time:** This variable represents the survival time. As this is a mock dataset we do not define the unit of time. In a real-world scenario this would be days, months or years.
- **Status:** This variable indicates whether an event (death) occurred: the patient is alive (0) or dead (1).
:::

It might be helpful to convert some columns into different data types.
For instance, you might convert the treatment variable from numeric to factor with adequate labels:
```r
#Convert to named factors
data$Treatment <- factor(data$Treatment, levels=c(0,1), labels=c("No CTX", "Adj. CTX"))
data$HighRisk <- factor(data$HighRisk, levels=c(0,1),
                           labels=c("Low Risk",
                                    "High Risk"))
#Adjust column names
colnames(data)[2] <- "RiskGroup"
```

Next, we can perform any necessary data cleaning and transformation steps. 
Please note that our example already utilizes a fairly clean dataset, so we do not need to perform any additional data cleaning steps.
For instance, you might need to check for missing values in the selected variables and handle them appropriately.
In this example, we'll remove any rows with missing values.
```r
# Check for missing values. The result is zero as there are no missing values in the selected dataset.
sum(is.na(data))

# Remove rows with missing values; In our example this step is redundant as we already know that there are no missing values in the dataset. 
data_filtered <- na.omit(data)
``` 

## Multivariate Analysis

In our example we have two independent variables (treatment and high-risk status) and one dependent variable (survival time).
To calculate the impact of the independent variables on the dependent variable we can use a Cox proportional hazards model.

```r
#run multivariate analysis
result <- analyse_multivariate(data_filtered,
                               c("Time", "Status"),
                               covariates = c("Treatment", "RiskGroup")) 
```

Let's take a look at a part of the results by inspecting `result$summary`:
```r
> result$summary
Call:
coxph(formula = Surv(Time, Status) ~ Treatment + RiskGroup, data = data)

  n= 600, number of events= 240 

                      coef exp(coef) se(coef)      z Pr(>|z|)    
TreatmentAdj. CTX  -0.6837    0.5048   0.1338 -5.110 3.22e-07 ***
RiskGroupHigh Risk  0.5102    1.6657   0.1313  3.886 0.000102 ***
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

                   exp(coef) exp(-coef) lower .95 upper .95
TreatmentAdj. CTX     0.5048     1.9812    0.3883    0.6561
RiskGroupHigh Risk    1.6657     0.6003    1.2877    2.1546

Concordance= 0.61  (se = 0.019 )
Likelihood ratio test= 41.4  on 2 df,   p=1e-09
Wald test            = 40.24  on 2 df,   p=2e-09
Score (logrank) test = 41.46  on 2 df,   p=1e-09
```

Our results show that both treatment and high-risk status have a significant impact on survival time.
The hazard ratio for treatment is 0.5048, which means that patients receiving adjuvant chemotherapy have a 50% lower risk of death compared to patients receiving no adjuvant chemotherapy.
The hazard ratio for high-risk status is 1.6657, which means that patients with high-risk status have a 66% higher risk of death compared to patients with low-risk status.

## Forest Plot
In the next step we can visualize the results using a forest plot.
```r
#this is required to adjust the labels in the forest plot
#try creating the plot without this helper variable to see why we use it
covariates_labels <-   c(
  "RiskGroup:High Risk" = "High Risk",
  "Treatment:Adj. CTX" = "Adjuvant Chemotherapy"
)

#create forest plot from multivariate analysis
forest_plot(result,
            factor_labeller = covariates_labels,
            endpoint_labeller = c(futime="OS"),
            orderer = ~order(HR),
            labels_displayed = c("endpoint", "factor", "n"),
            HR_x_breaks = c(0.25, 0.5, 1, 1.5, 2, 3),
            HR_x_limits = c(0.25,3)
)

#save the plot as a svg and a pdf
ggsave("ovarian_forest_plot.pdf", width=300, height=100, units = "mm", device = cairo_pdf)
ggsave("ovarian_forest_plot.svg", width=300, height=100, units = "mm")
```

![](./Images/ovarian_forest_plot.svg "Forest Plot")

We first create a helper variable `covariates_labels` to adjust the labels in the forest plot.
Next, we create the forest plot using the `forest_plot()` function from the survivalAnalysis package.
It accepts our previously generated multivariate analysis result as input.
Finally, we save the plot as a pdf and svg file. 

## Survival Analysis

Survival data is typically shown using Kaplan-Meier survival curves.

```r
#create a kaplan meier plot
surv_obj <- survfit2(Surv(Time, Status) ~ Treatment+RiskGroup, data = data_filtered) 
ggsurvfit(surv_obj, linewidth = 1) + add_pvalue()+
  scale_color_jco() + add_censor_mark() +
  labs(
    y = "OS",
    x = "Time"
  ) + ylim(0,1)+add_risktable()

ggsave("code_along/plots/ovarian_kaplan_meier.pdf", width=200, height=150, units = "mm", device = cairo_pdf)
ggsave("code_along/plots/ovarian_kaplan_meier.svg", width=200, height=150, units = "mm")
```

![](./Images/ovarian_kaplan_meier.svg "Kaplan Meier Plot")

In our example we use the `survfit2()` function to create the survival object by utilizing a formula (`dependent variable (outcome) ~ independent variable(s)`).
Our formula defines `Treatment` and `RiskGroup` as independent variables.


:::info Detailed explanation of the Kaplan-Meier survival curves above
The Kaplan-Meier survival curves provide a graphical representation of the survival probabilities over time for a group of individuals.
Let's explain the Kaplan-Meier survival curves created in the example above:

The survival curves display the estimated probability of survival over time based on the ovarian cancer dataset.
The x-axis represents time, usually measured in days or months, while the y-axis represents the probability of survival.

The curves themselves show the estimated survival probability at each time point. The line drops or "steps down" whenever an event (death) occurs, indicating a decrease in the survival probability.
If a patient is censored (i.e., lost to follow-up or still alive at the end of the study), the line remains flat until an event occurs or until the end of the study period.


If you perform a group-specific Kaplan-Meier analysis (as demonstrated in our example with `survfit2(Surv(Time, Status) ~ Treatment+RiskGroup, ...)`), separate survival curves are generated for each treatment group.
These curves allow for the comparison of survival between different subgroups, such as patients receiving standard treatment versus experimental treatment.

The plots generated by `ggsurvfit()` also include a risk table, which provides information on the number of events (deaths) and censored observations at different time points.
Additionally, p-values for log-rank tests are displayed, which compare the survival between different groups (if applicable).

The Kaplan-Meier survival curves are widely used in survival analysis to visualize and compare survival probabilities between groups.
They provide valuable insights into the survival patterns and can help identify potential differences in survival outcomes based on various factors, such as treatment groups, clinical characteristics, or other variables of interest.
:::

## Sources & Further Reading

- S3-Leitlinie Diagnostik, Therapie und Nachsorge maligner Ovarialtumoren https://register.awmf.org/de/leitlinien/detail/032-035OL

- Colombo N et al.; International Collaborative Ovarian Neoplasm (ICON) collaborators. International Collaborative Ovarian Neoplasm trial 1: a randomized trial of adjuvant chemotherapy in women with early-stage ovarian cancer. J Natl Cancer Inst. 2003 Jan 15;95(2):125-32. doi: 10.1093/jnci/95.2.125. PMID: 12529345.

- Roett MA, Evans P. Ovarian cancer: an overview. Am Fam Physician. 2009;80(6):609-616.

- Stewart C, Ralyea C, Lockwood S. Ovarian Cancer: An Integrated Review. Semin Oncol Nurs. 2019;35(2):151-156. doi:10.1016/j.soncn.2019.02.001

- Morand S, Devanaboyina M, Staats H, Stanbery L, Nemunaitis J. Ovarian Cancer Immunotherapy and Personalized Medicine. Int J Mol Sci. 2021;22(12):6532. Published 2021 Jun 18. doi:10.3390/ijms22126532

- Johann DJ Jr, McGuigan MD, Tomov S, et al. Novel approaches to visualization and data mining reveals diagnostic information in the low amplitude region of serum mass spectra from ovarian cancer patients. Dis Markers. 2003;19(4-5):197-207. doi:10.1155/2004/549372

- Temkin SM, Smeltzer MP, Dawkins MD, et al. Improving the quality of care for patients with advanced epithelial ovarian cancer: Program components, implementation barriers, and recommendations. Cancer. 2022;128(4):654-664. doi:10.1002/cncr.34023

- Yu JS, Ongarello S, Fiedler R, et al. Ovarian cancer identification based on dimensionality reduction for high-throughput mass spectrometry data. Bioinformatics. 2005;21(10):2200-2209. doi:10.1093/bioinformatics/bti370