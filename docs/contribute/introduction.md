# How to contribute to a Cancer Informatics Assignment

## Structure

Let's take a look at our folder structure in the GitHub repo:
```
├── logic
│   └── task_1.R
├── task_1
│   ├── task.R
│   └── solution.R
├── data
│   └── task_1.csv
├── data_create
│   └── task_1.R
├── .gitignore
├── cancer_informatics_assignments.Rproj
└── grade.R
```

To create an engaging assignment we need the following files (in chronological order):
1. `task_1.R` in `data_create` folder, this file specifies the data generation process.
Ultimately, the data will be saved as `task_1.csv` in the `data` folder.
It is crucial that our data generation process is reproducible and adaptable to modify our assignments in the future and to ensure that our students can reproduce our results.
2. `task.R` in `task_1` folder, this file specifies the task that the students have to solve.
Typically, this file contains the questions and exercises in the form of comments.
Some coding structure may be provided to guide the students.
3. `solution.R` in `task_1` folder, this file specifies the solution to the task. This file is not shared with the students and is used internally to validate our testing logic.
4. `task_1.R`in `logic` folder, this file specifies the logic to test the students' solutions.
We utilize the `testthat` package to create tests for the students' solutions.
Each test is a function that compares the students' solution to the expected solution.
5. `grade.R` in the root folder, this file is used to run the tests and grade the students' solutions.

## Data Generation
Here is an example based on https://cran.r-project.org/web/packages/TwoArmSurvSim/TwoArmSurvSim.pdf
```r
library(TwoArmSurvSim)
f1<-list(name='Treatment', N_level=2, prevalence=c(0.5,0.5), HR=c(1,0.5), strata=TRUE)
factors<-list(f1)
cov_simu(sample_size=300,factors=factors)

f1<-list(name='RiskGroup', N_level=2, prevalence=c(0.5,0.5), HR=c(1,1.7), strata=TRUE)
factors<-list(f1)
samplesize<-600
blocksize<-2
accrual_interval<-c(0,5,10)
accrual_rate<-c(5,10,20)
trtHR<-0.5
lambda<-0.03
gamma<-1.2
dropoutrate<-0.2
eventtarget<-240
N_simulation<-1
out<-run_simulation(samplesize=samplesize,blocksize=blocksize,factors=factors,
                    accrual_interval=accrual_interval,accrual_rate=accrual_rate, trtHR=trtHR, lambda=lambda,
                    gamma=gamma,dropoutrate=dropoutrate,eventtarget=eventtarget,N_simulation=N_simulation)

data <- out$Data[,1:4]
colnames(data) <- c("Treatment", "HighRisk", "Time", "Status")
write.csv(data, "data/task_1.csv", row.names = F)
```

In this example we generate a survival dataset with 300 observations and 2 independent variables (treatment and risk group [high and low risk]).
The data is saved as `task_1.csv` in the `data` folder.
```csv First 3 lines
"Treatment","HighRisk","Time","Status"
1,1,42.4503750028979,1
0,0,18.3782004531846,1
0,1,12.1239407387935,1
```

## Test Logic
Here is an example of a test logic for a different assignment:
```r
library(testthat)

#load data from data/sanger.csv into a variable called "data"
test_that("T2_1", {
  expect_equal(sum(data$dose), 267.3134, tolerance=1e-3) 
})

#create a subset called MCF7 and MDA
#containing only data from MCF7 or MDA-MB-231
test_that("T2_2", {
  expect_equal( sum(MCF7$viability), 115.4889, tolerance=1e-3) 
  expect_equal( sum(MDA$viability), 115.5877, tolerance=1e-3) 
})

#subset the data further to only contain TAMOXIFEN data with a dose of 5
#call the new variables MCF7_Tamoxifen and MDA_Tamoxifen
test_that("T2_3", {
  expect_equal( sum(MCF7_Tamoxifen$viability), 3.236021, tolerance=1e-3) 
  expect_equal( sum(MDA_Tamoxifen$viability), 4.755122, tolerance=1e-3) 
})

#calculate the mean "viability" difference between the two groups previously defined
#assign the result to viability_diff
test_that("T2_4", {
  expect_equal(abs(viability_diff), 0.1912291, tolerance=1e-3) 
})

#perform a t test using t.test() between the two groups previously defined
#save the response to viability_ttest
test_that("T2_4", {
  expect_equal(viability_ttest$p.value, 1.716086e-05, tolerance=1e-3) 
})
```
First we load the `testthat` package.
Notice that we do not load the original .csv file to run any computations.
Each task is tested separately and the expected results are hard-coded.
This is not a requirement, but it can improve the performance of the tests.

Each test is a function call to `test_that()` which contains a `name`and a `code block`.
Inside the code block, we can use functions like `expect_equal()` to compare the students' solution to the expected solution.
The documentation defines further test functions: https://cran.r-project.org/web/packages/testthat/index.html

It is important to note that (for the most part) we only test student defined variables and functions.
Let's examine the first test:
```r
test_that("T2_1", {
  expect_equal(sum(data$dose), 267.3134, tolerance=1e-3) 
})
```
We test the variable `data` (defined by the student in their solution) `dose` column in the `data` data frame is equal to 267.3134 with a tolerance of 1e-3.