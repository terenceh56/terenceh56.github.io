---
title: "An Arbitrary High Order SETD Method With Local Time-Stepping: Exponential Convergence and Computational Efficiency for Multiscale Electromagnetic Analysis"
date: 2025-11-28
venue: "IEEE Transactions on Microwave Theory and Techniques"
year: 2025
doi: "10.1109/TMTT.2025.3586676"
tags: ["paper"]
pdf: ""
mathjax: true
---

⚠️**Quick Note**: This is a personal reading note and interpretation. The content is not guaranteed to be fully accurate or comprehensive. Always refer to the original paper for definitive information.

## Prior knowledge

In the standard Finite Element Method, there are basis functions defined on a mesh. Hierarchical basis functions are a set of basis functions constructed from a sequence of nested subspaces: $V_1 \subset V_2 \subset V_3 \subset \dots \subset V_h$, each space $( V_n )$ is spanned by a set of basis functions, and the hierarchical basis for the finest space $( V_h )$ is formed by the union of all the basis functions from each level $( V_n, n=1, 2, 3, ..., h )$.

### Key points

- **Nested Structure**: Coarse space basis functions are contained in finer spaces
- **Progressive Detail**: Higher levels add finer details to the approximation
- **Basis Union**: The complete basis is the union of all level basis functions

## Introduction

Because the hierarchical basis functions are continuous on the interface of elements, the integration of the basis functions are creating many non-zero entries in the off-diagonal part of the global mass matrix, and this is making the computation a lot more complex.

The research proposed a Spectral-Element Time-Domain (SETD) method, which is a special kind of (Fine-Element) FETD, includes a step using Gauss-Lobatto-Legendre polynomial-based basis function, which's orthogonality only allows the integration to be non-zero within the elements and forces it to be zero when across elements.

The existing SETD methods in electromagnetic (EM) have two categories: first order Maxwell equation and second order wave equation. Generally, the second order wave equation based method is more efficient for computation.

When it comes to *explicit* timing schemes, there are mainly two, the Central Difference (CD) scheme and the Ruhge-Kutta (RK) scheme. The CD scheme has only second order accuracy in time, and the RK scheme has a massive drop on computation performance when the order is greater than 4.

> Furthermore, the time increment of the transient solver with an explicit time-stepping scheme is constrained by the Courant-Friedrichs–Lewy (CFL) stability condition on the minimum element.

Due to the limitation, a hybrid explicit-implicit scheme combines explicit CD scheme and implicit Newmark $\beta$ scheme was proposed, however, the introduction of the implicit time-stepping scheme decreases the SETD method's ability to be efficiently parallelized.

> Recently, the ADER explicit time discretization scheme with local time-stepping (LTS) has been developed to solve the first-order Maxwell’s equations with a discontinuous Galerkin time-domain (DGTD) solver. In contrast to the high-order RK scheme, the ADER time integration approach is a one-step scheme, without the need for storing intermediate stages.

This research proposed a LTS-ADER-SETD method using Auxiliary Differential Equation (ADE) to solve the EM problems in RF domains.

## Formulation

For a linear, isotropic, lossless medium, EM waves can be modeled by:
$$
\nabla \times \nabla \times \vec{E} + \mu \varepsilon \frac{\partial^{2} \vec{E}}{\partial t^{2}} = 0
$$

### Semi-Discrete SETD with ADAR Time Integragion

$N_s$th order GLL polynomial-based basis function can be expressed as:
$$
\hat{\Phi}_{rst}^a = \mathbf{\hat{a}}\phi_r^{(N_s)}(\xi)\phi_s^{(N_s)}(\eta)\phi_t^{(N_s)}(\zeta)
$$
The ($N_s$)th-order spatial basis functions $\vec{N}$ for a general element in the physical domain:
$$
\vec{N} = \mathbf{J}^{-1}\mathbf{\hat{\Phi}}\\
\nabla \times \vec{N} = \frac{1}{|\mathbf{J}|}\mathbf{J}^T\mathbf{\hat{\nabla}} \times \mathbf{\hat{\Phi}}
$$
Expend the EM wave function above with spatial basis functions, we can get the following semi-discrete SETD matrix equation:

> $$
> \mathbf{T}\frac{\partial^2 e}{\partial t^2} + \mathbf{S}e = 0
> $$
>
>

Where $\mathbf{T}$ and $\mathbf{S}$ have elements:

> $$
> T_{ij} = \varepsilon \iiint \vec{N}_i \cdot \vec{N}_j dV
> $$
>
> $$
> S_{ij} = \frac{1}{\mu} \iiint \nabla \times \vec{N}_i \cdot \nabla \times \vec{N}_j dV
> $$
>
>

Because the second-order derivative term in equation $\mathbf{T}\frac{\partial^2 e}{\partial t^2} + \mathbf{S}e = 0$ makes ADER not straightforward to implement SETD, $\frac{\partial e}{\partial t}=\gamma$, then we can get $\mathbf{T}\frac{\partial \gamma}{\partial t} = -\mathbf{S}e$, combine those, we can get $\frac{\partial u}{\partial t} = \mathbf{M}^{-1}\mathbf{L}u$, where $\mathbf{M}$ and $\mathbf{L}$ are:

> $$
> \mathbf{M} = \begin{bmatrix}
> \mathbf{T} & \mathbf{0} \\
> \mathbf{0} & \mathbf{I}
> \end{bmatrix},\quad \mathbf{L} = \begin{bmatrix}
> \mathbf{0} & -\mathbf{S} \\
> \mathbf{I} & \mathbf{0}
> \end{bmatrix}
> $$
>
>

$\mathbf{I}$ for identity matrix. Define $u=[\gamma, e]^T$, we have expanded Taylor series:

> $$
> u(t_0 + \Delta t) = u(t_0) + \sum_{i=1}^{N_t} \frac{\Delta t^i}{i!} \left. \frac{\partial^i u}{\partial t^i} \right|_{t=t_0}
> $$
>
>

As $\mathbf{M}^{-1}\mathbf{L}$ is time independent, we have:

> $$
> u(t_0 + \Delta t) = u(t_0) + \sum_{i=1}^{N_t} \frac{\Delta t^i}{i!} (\mathbf{M}^{-1}\mathbf{L})^i u(t_0)
> $$
>
>

From the Taylor series, we can know that a ($N_t$)th order ADER-SETD requires $N_t$ operations, thus, it's a strictly linear time in computation time with accuracy.

We have stability criterion:

> $$
> |Z| = \left| 1 + \sum_{i=1}^{N_t} \frac{(\lambda\Delta t)^i}{i!} \right| \leq 1
> $$
>
>

Higher order ADER time stepping method can allow larger $\Delta t$.

Empirical formula:

> $$ \Delta t \leq C \frac{l_{min element}}{v} $$
>
> $C$ is the Courant number, $l_{min element}$ is the characteristic size of the smallest element, and $v$ is the speed of light in the element.

### LTS Scheme

This section describes an ingenious method to overcome the bottleneck of multiscale simulations, where a very small feature dictates the time step for the entire computational domain.

#### 1.The Core Problem: The Stability Constraint

In traditional explicit time integration methods, the stability of the entire system is governed by the smallest element in the mesh.

> If the smallest cell size is $\Delta x_{\min}$, the maximum time step $\Delta t$ must be proportional to $\Delta x_{\min}$ across all regions. This leads to massive inefficiency in multiscale problems where large, smooth regions are forced to take tiny time steps.

#### 2.The Solution: Local Time-Stepping (LTS)

The LTS scheme partitions the domain into two regions based on their mesh size:

- **Coarse Region ($\Omega_c$)**: Uses a large time step $\Delta t_c$.
- **Fine Region ($\Omega_f$)**: Uses a small time step $\Delta t_f$.

The time steps are related by an integer factor $N_{LTS}$:
$$
\Delta t_c = N_{LTS} \cdot \Delta t_f
$$

#### 3.The Key Innovation: High-Order Coupling

The central challenge in LTS is accurately transferring data across the interface when the fine grid is taking its $N_{LTS}$ intermediate steps while the coarse grid is "waiting" for its next major update.

The paper solves this by leveraging the features of the **ADER-SETD** method:

> The ADER scheme naturally computes the high-order time derivatives of the solution (up to order $P$). These derivatives are used to *predict* the coarse grid's state at the intermediate time points required by the fine grid.

The high-order prediction uses the Taylor series expansion:
$$
u_c(t^{n}+t) \approx \sum_{k=0}^{P} \frac{(\Delta t)^k}{k!} \frac{\partial^k u_c}{\partial t^k} \mid_{t^{n}}
$$
where $u_c$ is the solution vector for the coarse grid.

The numerical procedure is:

1. The coarse grid solution is advanced from time $t^n$ to $t^{n+1}$.
2. The intermediate boundary data for the fine grid are obtained via the Taylor series prediction (interpolation) using the coarse grid's derivatives.
3. The fine grid then advances *local* to its $\Omega_f$ region $N_{LTS}$ times, using the predicted values as boundary conditions.

#### 4.Summary

This LTS-ADER-SETD method provides an exponentially accurate and stable way to run different parts of the simulation at different speeds. By avoiding temporal synchronization constraints and utilizing the high-order derivatives available from the ADER scheme for interpolation, it achieves significant computational efficiency for complex multiscale electromagnetic analysis.
