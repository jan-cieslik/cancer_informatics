---
sidebar_position: 2
---
# NGS: Technology

## DNA, RNA, Proteins

Deoxyribonucleic acid (DNA) encodes the genomic information inside the nucleus of (human) cells.
It is made up from four distinct nucleotides (A/C/G/T) and structured as a helix forming two strands (_sense_ and _antisense_).
Genomic DNA can be transcribed into ribonucleic acid (RNA), which is a single strand molecule which also consists of four nucleotides but swaps T for U.
The transcript of a gene is called messenger RNA (mRNA) and can be extensively modified after it leaves the nucleus.
For instance, introns are removed through (alternative-)splicing.
Finally, the RNA is translated into a chain of amino acids to form a protein.

## Sequencing Targets

Depending on the scientific or clinical question, we can sequence different parts of the DNA/RNA molecules.
Sequencing of the genomic DNA (gDNA) can be broadly categorized into whole genome sequencing (WGS), whole exome sequencing (WES) and targeted sequencing.
Further, DNA expression can be analysed through RNA sequencing (RNA-Seq).
Other examples include sequencing of DNA methylation and analysis of transcription factor binding through Chromatin ImmunoPrecipitation (ChIP-Seq).

## Sequencing Workflow

The samples have to under a "library preparation" which depends on the utilized kit but generally includes fragmentation and the ligation of adapters (tagmentation).
In case of RNA-Seq the RNA molecule is converted into DNA.
Samples can be labelled with sample-specific DNA adapters, this enables the pooling of multiple samples.
After sequencing the samples can then be virtually separated by the previously attached adapter sequence.

### Sequencing by Synthesis (SBS)

One popular approach for NGS is Sequencing by Synthesis (SBS), which was initially developed by Illumina and is still in use today.
After library preparation the (pooled) sample is loaded onto a flow cell, which is a glass slide with attached DNA probes which each capture a single DNA strand.
After capturing a DNA strand, the DNA is replicated inside a monoclonal cluster.
Fluorescent nucleotides are utilized to decode the DNA base sequence of the cluster.
The fluorescent values are measured and saved as raw data (together with per base quality metrics).
Each cluster forms an NGS "read", which represents a singular DNA molecule from the original sample.
Most commonly, raw NGS reads are stored in FASTQ file format (some manufactures use custom formats which require conversion to FASTQ).

##  Sources & Further Reading
- Kappelmann-Fenzl, M. (Ed.). (2021). Next Generation Sequencing and Data Analysis. Springer International Publishing. https://doi.org/10.1007/978-3-030-62490-3
- YouTube - "Illumina Sequencing by Synthesis" https://youtu.be/fCd6B5HRaZ8
