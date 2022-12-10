---
sidebar_position: 4
---
# Variant Analysis

:::info This is not medical advice

This website is for educational purposes only and does not constitute medical advice or guidance.
Guidelines are constantly changing, this is not a reference for actual clinical diagnoses, treatment or advice.
:::

The details of variant analysis and interpretations are debated.
For our short introduction, we are using the 2015 guidelines written by the American College of Medical Genetics and Genomics (ACMG) and the Association for Molecular Pathology (AMP).
Competing classifications include the 2022 ABC system, which can be applied to a broader field of genomic variants.
Both guidelines can be found in the reference section below. 

## Mutation, Polymorphism, Variant

> A mutation is defined as a permanent change in the nucleotide sequence, whereas a polymorphism is defined as a variant with a frequency above 1%.
>
> — 2015 ACMG-AMP Guidelines

The terms "mutation" and "polymorphism" are well-defined but come with a negative connotation when communicating with patients.
Thus, the ACMG-AMP guidelines recommend switching the terms to "variant" and specify the type of variant with one of five terms:

- (i) pathogenic
- (ii) likely pathogenic
- (iii) uncertain significance
- (iv) likely benign
- (v) benign

The classification is determined by a series of conditions.
For instance, one condition for a "pathogenic" classification is to combine a very strong criterion with a strong criterion.
An example for a strong criterion is a nonsense variant in a gene where a loss of function is known to cause disease.

## Variant Notation

The Human Genome Variation Society (HGVS) standardizes the notation of variants and regularly updates a list of recommendations for sequence variant nomenclature.

For instance, the current (version 20.05) recommendation for the nomenclature of a substitution contains:

- Prefix: one-letter code; examples: g., m., c. (genomic, mitochondrial, coding)
- Position
- Reference Nucleotide
- ">" to indicate a substitution
- Alternative Nucleotide

In addition to this nomenclature, a reference sequence needs to be specified.
Reference Sequences can be obtained from NCBI RefSeq, example prefixes include:

- NC_ for chromosomes (e.g., NC_000006.12 for chromosome 6 according to the hg38 assembly)
- NM_ for mRNA (e.g., NM_000125.4 for a ESR1 transcript)
- NP_ for proteins (e.g., NP_000116.2 for a ESR1 protein)

### Example

A mutation in the ESR1 gene could be described as:

```
NC_000006.12(NM_000125.4):c.1180C>A
```

The corresponding protein change (arginine to serine) is written as:

```
NM_000125.4(NP_000116.2):p.(Arg394Ser)
```
##  Sources & Further Reading

- Richards, S., Aziz, N., Bale, S., Bick, D., Das, S., Gastier-Foster, J., Grody, W. W., Hegde, M., Lyon, E., Spector, E., Voelkerding, K., & Rehm, H. L. (2015). Standards and guidelines for the interpretation of sequence variants: A joint consensus recommendation of the American College of Medical Genetics and Genomics and the Association for Molecular Pathology. Genetics in Medicine, 17(5), 405–424. https://doi.org/10.1038/gim.2015.30
- Houge, G., Laner, A., Cirak, S., de Leeuw, N., Scheffer, H., & den Dunnen, J. T. (2022). Stepwise ABC system for classification of any type of genetic variant. European Journal of Human Genetics, 30(2), 150–159. https://doi.org/10.1038/s41431-021-00903-z
- Sequence Variant Nomenclature http://varnomen.hgvs.org/
- NCBI RefSeq https://www.ncbi.nlm.nih.gov/refseq/