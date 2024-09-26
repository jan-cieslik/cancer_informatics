---
sidebar_position: 3
---
# NGS: From FastQ to BAM

In this chapter we aim to explain the journey from raw FASTQ data to clinically relevant information on single-nucleotide polymorphism (SNPs).
Our example data is purely for illustration purposes and mimics Illumina short read sequencing data from the MiSeq platform.

## File Formats

We describe the file formats you will encounter in detail, as many beginners have never encountered them and some more experienced users have never opened a raw file.
You don't need to understand the specifications in full, you just need to get a general understanding which information is stored.

### FASTQ: Raw Sequencing Reads
FASTQ files encode (nucleotide) sequences coupled with quality values.
This is typically the starting point of an in silico analysis in NGS (although some sequencers create files in a proprietary data format which must be converted into FASTQ beforehand).
Each sequenced DNA molecule (also called a "read") is written separately into the file and spreads over four lines.
1. Line: Encodes the sequence identifier, which stores information about the type of machine used, the ID of the run and information about the location of the read (inside the flow cell).
2. Line: The raw (nucleotide) sequence
3. Line: '+' character
4. Line: Quality scores; each character corresponds with the same character from the sequence in line 2.

```
@M02092:100:000000000-C9F6R:1:1101:13338:2973 2:N:0:41
TAGTTAAGCAAAATACTAGATTTGAGGCACACAAACTCCTCTCCCTGCAGATTCATCATGCGGAACCGAGATGATGTAGCCAGCAGCATGTCGAAGATCTCCACCATGCCCTCTACACATTTTCCCTGGTTCCTATGAAAACATAGCAAAA
+
CCCRREFFEFFEGGGAFGGGGGHHHGHGGHHHGGHHHHHHHHHHHHHHHHHHHHHHHHHHGDGGGGGGGGGGHHHHHHHHHHHGHHHHHHHHHHGGGHHHHHHHHHGHHHHHHHHHHHHHHHHHHHHHHHHHHHGHHGHGHHHHHHHHFHG
```

### Sequence Alignment Map (SAM)

After alignment of a FASTQ file to a reference genome, we receive a sequence alignment map (SAM) file or a binary alignment map (BAM) file.
Both file types are interchangeable, while the binary file is optimized for faster access speed and not readable by a human eye.

<details>
    <summary>Detailed Structure</summary>
    
Each line consists of at least 11 mandatory columns:

| # | Column |           Description           |
|:---:|:-----:|:-------------------------------------:|
| 1   | QNAME | Query template NAME (e.g., sequence identifier)  |
| 2   | FLAG  | bitwise FLAG (e.g., if read is paired) |
| 3   | RNAME | References sequence NAME (e.g., chromosome name) |
| 4   | POS   | leftmost mapping position   |
| 5   | MAPQ  | mapping Quality |
| 6   | CIGAR | Concise Idiosyncratic Gapped Alignment Report (CIGAR) string |
| 7   | RNEXT | ref. name of the mate/next read |
| 8   | PNEXT | position of the mate/next read  |
| 9   | TLEN  | observed Template length   |
| 10  | SEQ   | segment sequence |
| 11  | QUAL  | quality score |

.
</details>

Each line corresponds with an aligned read.
The following sequence example is the same read as in the FASTQ example.
It only spans one line in a SAM file, line breaks were inserted artificially for readability.
```
M02092:100:000000000-C9F6R:1:1101:13338:2973 99 chr6 152060961 42 151M 152060972 162
TATTTATTTATTTTTGCTATGTTTTCATAGGAACCAGGGAAAATGTGTAGAGGGCATGGTGGAGATCTTCGACATGCTGCTGGCTACATCATCTCGGTTCCGCATGATGAATCTGCAGGGAGAGGAGTTTGTGCCTCAAATCTATTATT
BECCCFFFFFFFGGGGGGGGGGHHHHHHHHHHHHGHHGGGHhhhhhhhhhhhhggghhhhhghhhhhhhhhhggghunhhhhhghnuuuuhhhhHhgggghggggghtthhhhhHhhhhgggggghghhh
handranaaaaaaaaaaaahAs:i:0 XN:1:0 XM:i:0 XO:1:0 XG:1:0 NM:1:0 MD:Z:151 YS:i:-13 YT:Z:CP
```
### Variant Call Format (VCF)
The variant call format stores information about deviations from the reference genome, which were encountered in our sample.

<details>
    <summary>Detailed Structure</summary>
There are eight mandatory columns.

| # | Description |  |
|:---:|:---:|---|
| 1 | CHROM | Chromosome |
| 2 | POS | leftmost 1-based position |
| 3 | ID | identifier, e.g., a dbSNP rs identifier; if unknown a "." |
| 4 | REF | reference base(s) |
| 5 | ALT | list of alternative allele(s) |
| 6 | QUAL | quality score |
| 7 | FILTER | "PASS" or reason of failure; "." if unknown |
| 8 | INFO     | list of key-value pairs (fields) describing the variation |
| 9 | FORMAT | (optional) list of fields for describing the samples|
| + | SAMPLEs | For each (optional) sample described in the file, values are given for the fields listed in FORMAT |

.

</details>

Each line contains information about a single variant.


```
chr6	152011739	.	C	A	0.0	.	AS_SB_TABLE=34,31|19,35;DP=120;ECNT=9;MBQ=38,39;MFRL=205,205;MMQ=60,60;MPOS=64;POPAF=7.30;TLOD=199.26;ANN=A|structural_interaction_variant|HIGH|ESR1|ENSG00000091831|interaction|2B23:B_353-B_394:ENST00000206249|protein_coding|5/8|c.1180C>A||||||	GT:AD:AF:DP:F1R2:F2R1:SB	0/1:65,54:0.456:119:65,54:0,0:34,31,19,35
```

## Processing Steps

Our analysis journey begins with raw NGS reads in the FASTQ file format.
At first, we need to align the reads with a reference genome (e.g., hg38) to understand where the raw reads may be positioned inside the human genome.
After mapping we receive a SAM or BAM file, which stores our original reads together with a position information.
Next, pre-processing steps are usually performed such as read deduplication and base quality score recalibration.
These steps increase the reliability of the data and reduce biases.
The resulting file is an analysis-ready BAM file.

These analysis-ready BAM files then undergo variant calling, which yields a VCF file which lists all deviations from the reference genome.
Afterwards the raw variants are filtered and annotated to produce a list of candidate variants which are then analysed by a clinician or geneticist.

##  Sources & Further Reading
- Kappelmann-Fenzl, M. (Ed.). (2021). Next Generation Sequencing and Data Analysis. Springer International Publishing. https://doi.org/10.1007/978-3-030-62490-3
- Li, H., Handsaker, B., Wysoker, A., Fennell, T., Ruan, J., Homer, N., Marth, G., Abecasis, G., Durbin, R., & 1000 Genome Project Data Processing Subgroup. (2009). The Sequence Alignment/Map format and SAMtools. Bioinformatics, 25(16), 2078–2079. https://doi.org/10.1093/bioinformatics/btp352
- VCF specification https://samtools.github.io/hts-specs/VCFv4.3.pdf