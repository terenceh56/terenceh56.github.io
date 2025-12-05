---
title: "Efficient Thermal Simulation Method for 3-D Chiplets Heterogeneous Integrated Systems"
date: 2025-12-05
venue: "2024 IEEE MTT-S International Microwave Workshop Series on Advanced Materials and Processes for RF and THz Applications (IMWS-AMP)"
year: 2024
doi: "10.1109/IMWS-AMP62793.2024.10966579"
tags: ["paper"]
pdf: ""
mathjax: true
---

⚠️**Quick Note**: This is a personal reading note and interpretation. The content is not guaranteed to be fully accurate or comprehensive. Always refer to the original paper for definitive information.

## Introduction

The research introduced a set of full-process modeling techniques under Fine Element Method (FEM) to improve the thermal analysis efficiency of Chiplet Heterogeneous Integration (CHI) systems. Including Via Thermal Resistance Model, Trace Network Equivalent Model, and Thin layer Boundary Model.

## Methodology

Consider the equation:
$$
\nabla \cdot (k \nabla T) + Q = 0
$$
where $Q$ is the volume heat source, to make the FEM computation, discretize it to matrix:
$$
\mathbf{K} \cdot \mathbf{T} = g
$$
where $\mathbf{K}$ is the stiff matrix, $\mathbf{T}$ for the vector of temperature, and $g$ for the heat source and boundary conditions.

But when modeling CHI package systems, there are many structures with extremely small size relative to the overall size. This makes the matrix $\mathbf{K}$ overly large, which isn't efficient for computation. Thus, the following techniques are proposed.

### A.  Via Thermal Resistance Model

Because most vias given has a $r << h$, the heat conduction can be approximated by an one dimensional function:
$$
k_{via} \nabla T = 0, \hspace{1em} k_{via} = (k_{metal}-k_{dielectric}) \times A_{via}
$$

### B.  Trace Network Equivalent Model

For this method, the research represent the original trace by the simpler elements with equivalent thermal conductivity $k_{eq}$, where $k_{eq}$:
$$
\frac{1}{k_{eq}} = \frac{m}{k_{metal}} + \frac{1-m}{k_{dielectric}}
$$

### C.  Thin Layer Boundary Model

For power and GND layers, they can be treated as thin layer boundary models [1], the governing equation $\Gamma_{TLM}$ is described:
$$
\kappa \left(\frac{\partial T_{TLM}}{\partial n}\bigg|_ { \Gamma_{TLM} }\right) = \nabla \cdot \left[d_s \kappa_s \nabla T_{TLM}(t)\right]
$$

## Numerical Results

### A. Single-Die Integration Systems

First the research performed a full scale modeling method and simulation, then a system level method. From the result we can see that the mesh generation time, simulation time, and memory usage are all significantly reduced, but with just **0.8%** relative error in the maximum and minimum temperature.

### B. Multi-Die CHI Systems

After the process similar to single-die systems, the result is similar, a significant reduced computation time and resources with just **0.9%** relative error.

## Conclusion

The results shows a substantial improvements in computational efficiency with 26× speed up, while maintaining accuracy comparing to traditional full-scale simulation.

## References

**[1]** B. Li, M. Tang, H. K. Yue, Y. Tang, and J. F. Mao, “Efficient transient thermal simulation of ICs and packages with Laguerre-based finite-element method,” *IEEE Trans. Compon. Packag. Manuf. Technol.*, vol.10, no. 2, pp. 203–211, Feb. 2020
