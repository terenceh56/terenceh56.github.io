---
title: "Gemini: Mapping and Architecture Co-exploration for Large-scale DNN Chiplet Accelerators"
date: 2025-11-26
venue: "IEEE International Symposium on High-Performance Computer Architecture (HPCA)"
year: 2024
doi: "10.1109/HPCA57654.2024.00022"
tags: ["paper"]
pdf: ""
mathjax: true
---

## Introduction

As chiplet technology is giving us some advantages, there are trade offs. The advantages includes: Higher yield, Larger scale, Heterogeneous integration, and Reuse for multiple chips. And the disadvantages includes: Package cost, D2D (Die to Die) area costs, Worst power usage and performance.

The main reason of the worst power usage and performance is due to the limited bandwidth of D2D communication. The challenges on developing large-scale DNN (Deep Neural Network) chiplet accelerators are mainly on chiplet architecture and mapping the layers with the cores.

For architecture design, the main challenge is to determine the *optimal chiplet granularity*.

> A trade-off arises between using more smaller chiplets for better yield and fewer larger chiplets for lower Chiplet Costs.

For mapping, the challenges are from the larger scale that made by chiplet technology, which current heuristic strategies with a not clearly defined and limited space. Another challenge is from the D2D links, which are more energy consuming and providing lower bandwidth with on-chip lines.

MC includes area, yield, and packaging costs.

## Scalable Hardware Template

The research team proposed a scalable hardware template. With IO chiplets and computing chiplets. A mesh NoC (Net on Chip) connects between cores-cores, and DRAM-cores. As shown in the picture below.

![figure of the hardware template](/papers/paper-2/1.png)

Each computation core includes communication unit, control unit, global buffer, PE array and vector unit. The communication unit is controlled by the control unit, and the control unit is also responsible for managing computation tasks based on statically compiled instructions and task progress information. The global buffer, which is between the communication unit and the communication unit and the computing area (PE array and vector unit), is able to be read and write by all the computing cores.

## LP Spatial Mapping Encoding

Layer-Pipeline Spatial Mapping (LP-SPM) scheme includes two key information: Which layer to which core and Data sources and destinations of the workload on each core.

Each layer $i$ has three attributes: Partition ($Part_i = (H_i, W_i, B_i, K_i)$), which represents the height, width, batch (how many to be done at once), and kernel weight. Core Group ($CG_{i, n}$), which layer $i$ and number of core $n$. Flow data ($FD_i = (IF_i, WGT_i, OF_i), -1 \leq IF_i, WGT_i, OF_i \leq D$), input feature, weight, output feature, and D is the DRAM count.

Then, assign $PW((P W = (h, w, b, k), h ∈ [0, H_i), w ∈ [0, W_i), b ∈ [0, B_i), k ∈ [0, K_i))$, which is a unique ID based on its location, then based on $PW$, we assign a NID (Numerical ID), with $NID = h\times W_i\times B_i\times K_i+w\times B_i\times K_i+b\times K_i +k$. And the $NID$ workload corresponds to $(NID+1)$th core in $CG_i$.

> The optimization space of mapping N layers onto an accelerator with a core group containing M cores and D DRAMs is considerably large and extremely complex to calculate. Therefore, we conservatively approximate its lower bound size at $m!\sum_{i=0}^{N-1}\binom{N}{i}\binom{M-N-1}{N-i-1}4^{N-i}$ schemes.

There are still multiple optimization opportunities, like different $Part$ attributes of each layer, can make impact on: NoC communication volume and Intra-core optimization space. Also, number and position of cores can vary in each CG attribute. At last, different $FD$ attributes affect the bandwidth utilization and access patterns of different DRAMs, and NoC communication.

## Gemini Framework

Gemini is a mapping and architecture co-exploration framework for DNN inference chiplet accelerators. The input includes: Architecture parameters, Framework settings like optimization goals, DNN models, which supports exploring for $n$ DNNs.

There is the goal of $MC^\alpha \times E^\beta \times D^\gamma$ where MC (Monetary Cost), E (Energy consumption), and D (Delay) have their importance marked by $\alpha, \beta, \gamma$. The $E$ and $D$ are not only effected by the architecture, but also specific DNN workload and mapping strategy. When $MC$ isn't.

The mapping engine uses a Simulated-Annealing based (SA-based) LP-SPM exploration to optimize the mapping of $i$th DNN onto the architectural candidate, and the overall Energy consumption and overall Delay are determined by $\left(\prod_{i=1}^{n} E_{i}\right)^{\frac{1}{n}}$ and $\left(\prod_{i=1}^{n} D_{i}\right)^{\frac{1}{n}}$.

First, the Parser of the framework generates DNN topology graph and layer features, then through the Graph partition engine, which is DP-based, same as the heuristic Tangram, it becomes layer groups.

When are layer groups, the SA controller randomly selects a layer group, with a chance $\propto$ their optimization size calculated. Then, it swap *one of the five special designed OPs* with the chosen one. And turns in to the evaluator to see if the move is optimal, if its cost is lower, accept. if higher, accept with decreasing probability.

> Gemini not only can explore the optimization space to balance the trade-offs introduced in Sec IV-C, but also automatically optimize D2D link communication.

For the evaluator, there is one for intra-core and one for global performance.

The intra-core one calculates the operations of each parts. And the overall energy consumption can be calculated by this multiplying the unit energy consumption.

And the global one evaluate through analyzing the data communication volume on each on-chip network link and D2D link, access patterns of DRAM, memory access times for different-level buffers within each core, and operation counts for various-precision computation units.

For Monetary Cost Evaluator, the area of analog IPs, can be obtained directly from the datasheets, and for logic modules, it can be done on Verilog code and development process of the chip.

## Evaluation and Discussion (Generated by Notebooklm)

### VI. Evaluation

The evaluation section compares the architecture and mapping scheme co-optimized by **Gemini (G-Arch + G-Map)** against the state-of-the-art (SOTA) Simba architecture (S-Arch) utilizing the SOTA Tangram Layer-Pipeline (LP) Mapping (T-Map).

- **Experimental Setup:** Design Space Exploration (DSE) was conducted for DNN accelerators ranging from 72 TOPs to 512 TOPs, using models such as Transformer, ResNet-50, and Inception-ResNet. The DSE targeted optimization objectives like Monetary Cost (MC) $\cdot$ Energy (E) $\cdot$ Delay (D).
- **Gemini vs. Simba:** Across various DNNs and batch sizes, Gemini's co-optimized architecture and mapping achieved, on average, a **1.98× performance improvement** and **1.41× energy efficiency improvement** simultaneously, with only a 14.3% increase in Monetary Cost (MC) compared to S-Arch with T-Map.
- **Architectural Insights from Comparison:** The G-Arch explored for the 72 TOPs scenario significantly reduced the number of chiplets compared to S-Arch, which helped decrease the proportion of expensive Die-to-Die (D2D) links, resulting in a substantial reduction in network energy consumption and allowing area to be converted into improved interconnect bandwidth and on-chip storage resources.
- **Gemini vs. Grayskull:** When compared to an accelerator using Tenstorrent Grayskull architecture parameters (T-Arch) and T-Map, G-Arch + G-Map achieved 1.74× performance and 1.13× energy efficiency, while reducing MC by 40.1%, demonstrating Gemini's universality.

### VII. Discussion

This section reveals intriguing insights derived from the design space exploration using the Gemini framework.

- **Chiplet Granularity:** The key insight is that **moderately partitioning DNN accelerators into chiplets** can effectively strike a balance among MC, energy consumption, and performance. Conversely, adopting an **excessively fine-grained** approach to chiplet partitioning simultaneously worsens MC, performance, and energy efficiency.
- **Core Granularity:** Monetary Cost tends to increase as the granularity of computing cores becomes finer (more cores). However, Energy Delay Product (EDP) first decreases and then experiences a slight decline. This initial decrease is attributed to the fact that an increased number of cores facilitates longer LP pipelines, which reduces costly DRAM accesses by enabling more dependency data to be transferred on-chip. The decline occurs because diminishing returns from extending the pipeline and escalating costs eventually reach an equilibrium.
- **Chiplet Reuse for Multiple Accelerators:** Directly repurposing chiplets from one computing platform to build another of a significantly different scale is generally ill-advised and results in less-than-ideal outcomes ("one-size-fits-all" failure). However, with the support of the Gemini framework for **joint architecture exploration** across multiple power levels, **employing a single chiplet for multiple accelerators becomes an effective approach** for DNN inference accelerators. This strategy offers a substantial reduction in Non-Recurring Engineering (NRE) costs, with an acceptable overhead in MC $\cdot$ E $\cdot$ D (around 34% higher on average compared to individually optimal designs).
- **Spatial Mapping Properties:** Analyzing actual Spatial Mapping (SPM) examples revealed that the widely used clustered core allocation strategy is often suboptimal. Instead, the crucial factor is **gathering clusters with heavy data transfer together**. By automatically exploring the vast optimization space, Gemini mapping achieved a 34.2% reduction in total hop count (including a 74% reduction on intermediate D2D links) compared to Tangram, demonstrating its ability to optimize D2D communication and network congestion.
