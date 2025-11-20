---
title: "NeuralMesh: Neural Network For FEM Mesh Generation in 2.5D 3D Chiplet Thermal Simulation"
date: 2025-11-20
venue: "ACM/IEEE Design Automation Conference (DAC)"
year: 2025
doi: "10.1109/DAC63849.2025.11132601"
tags: ["paper"]
pdf: ""
mathjax: true
---

## Introduction

Main contributions of the research:

> 1. Deep-learning based thermal predictions to guide the generation of FEM (Fined Element Method) mesh
>
> 2. Segmentation network architecture
>
> 3. Unifies thermal gradient data with geometric boundary information

## Proposed Methodologies

### Model Input and  Tensor Construction

The main information sources integrated by the framework are: predicted thermal distributions and geometric boundaries.

First of all, decompose the 3D structure into critical layers based on material transitions, each layer forms a 2D plane with feature tensors P encoding seven physical properties, which will be the input of the network.

> $$
> \mathbf{p}(x_{p}, y_{p}) = \left[ M_{p},\ \rho_{p},\ k_{p},\ C_{p},\ H_{s_{p}},\ B_{c_{p}},\ Th_{p} \right]^{\top}
> $$
>
> $$
> M_{p}, \rho_{p}, k_{p}, C_{p}, H_{s_{p}}, B_{c_{p}}, Th_{p}
> $$
>
> Represents material properties, density, thermal conductivity, heat capacity, heat source, boundary conditions, and Z-axis thickness respectively.
> $$
> \mathbf{P} = \left[ \mathbf{p}(x_p, y_p) \right]_{x = 1, \ldots, W; \, y = 1, \ldots, H} \in \mathbb{R}^{W \times H \times C_f}
> $$

### Temperature Prediction based on Enhanced U-NET

The method is going to predict the accurate temperature distribution of ICs based on the feature tensor constructed on the previous section first, which is implemented through an enhanced U-NET architecture, featuring multi scale convolution and pooling. The network has three key components: encoder, decoder and the "Attention Block-based Skip connection".

#### Encoder

The encoder part of the network includes three parts: multi-scale convolution, pyramid pooling, and deformable convolution.

The difference between convolution and pooling, is that convolution includes a parameter, and make integration based on it, but pooling includes no parameter, the common ways of pooling includes Max, min, avg.

- The multi-scale convolution strategy does convolutions with various scales, this enables it to capture the features from fine to coarse.

  > This design allows the U-Net to more comprehensively understand the thermal characteristics of the integrated chip, hereby improving the representation ability of the features.

- The pyramid pooling, also applies different sizes of windows, not just improve the sensitivity of the network, but extracts more global information.

- The deformable convolution is a convolution with a deformable window.

  > enables the U-Net more flexible to the heterogeneity of integrated chips.

#### Attention Block-based Skip connection

The attention block-based skip connection includes three parts: 3D-DCT (Discrete Cosine Transformation), 3D-IDCT (Inverse), and Multi-head attention.

- First, the output feature map from encoder enters the 3D-DCT part, which will be convert to the frequency domain from spatial features, then, using "Cross Attention" method to suppress high-frequency noise and enhance useful signals. After that, the 3D-IDCT will be performed to transform it back to spatial domain.

  > The attention block with multi-head attention mechanism-based skip connection can enable the decoder to reconstruct and refine the specific details of the temperature distribution in the large temperature gradient changed area.

- For tradition skip connection, it hands all the features fairly. And with multi-head attention, it focus on different features to refine the specific details of the temperature distribution.

#### Decoder

The decoder of the network is made with two parts: Transposed Convolution (TrConv) and Attention fusion module.

- TrConv: By scaling up the window gradually (reverse of encoder), the feature map will gain resolution gradually.

  > It enables the output details of each layer to gradually closer to the high-resolution temperature map of the integrated chips.

- Performs weighted processing.

  > By fusing the attention feature from the Attention block, the attention fusion module in the decoder performs weighted processing on each feature, which can give priority to focusing and refining the areas with large temperature gradient changes and concentrated hot spots.

### Mesh Optimization

After the temperature prediction, the research utilized the predicted temperature distribution to optimize the FEM mesh.

First, because the thermal predictions are on discretized planes, the research performs an interpolation.

> $$
> T_{\left(x_{p}, y_{p}, z_{p}+\frac{Th_{p}}{n_{R}}\right)}=\left(1-\frac{1}{n_{R}}\right) T_{\left(x_{p}, y_{p}, z_{p}\right)}+\frac{1}{n_{R}} T_{\left(x_{p}, y_{p}, z_{p}+Th_{p}\right)}
> $$
>
> Where $n_R$ determines the interpolation resolution along the z-axis.

Second, bound it with the geometric features. Which means $\lambda$ = (Hot spot) $\dot$ (Regions of drastic temperature changes), so that won't ignore one of those while calculating.

> $$
> \lambda\left(x_{p}, y_{p}, z_{p}\right)=\frac{T_{\left(x_{p}, y_{p}, z_{p}\right)}-T_{\min }}{T_{\max }-T_{\min }} \cdot \frac{\left|\nabla T_{\left(x_{p}, y_{p}, z_{p}\right)}\right|}{\left|\nabla T_{\left(x_{p}, y_{p}, z_{p}\right) \max }\right|}
> $$ 

Third, take its reciprocal, it indicates that if the number is greater, make the mesh finer.

> $$
> \delta\left(x_{p}, y_{p},z_{p}\right)=\frac{1}{1-\lambda\left(x_{p}, y_{p},z_{p}\right)}
> $$

Fourth, make the thermal parameters to continuous geometric domain from discretized coordinates using neighborhood interpolation function $\wp$.

> $$
> \delta(x, y,z)=\delta\left(x_{p}, y_{p},z_{p}\right)\cdot\wp\left[\frac{\mathbf{n}p}{\mathbf{L_n}}|\mathbf{N}|\mathbf{n} _{p-1}:\mathbf{n} _{p+1} \right]
> $$

Finally we have the final refinement parameter, the numerator enhances the thermal contribution, while the denominator introduces a geometric distance term (such as the distance to the nearest boundary).

> $$
> \sigma(x, y,z)=\frac{e\cdot\delta(x, y,z)}{1+[\sqrt{\left|(x, y,z)-p_{i}\right|^{2}+\left|(x,y,z)-p_{i}^{\prime}\right|^{2}}]}
> $$

Then, to ensure smooth size transitions, we have the ceiling function $\Lambda$.

> $$
> V^{(f,g)}ni=\Lambda\left[\sigma(x,y,z)_f+\sigma(x,y,z)_g\right]
> $$

## Experiments and Results

Significantly faster than mesh generating from COMSOL and Gmsh.
