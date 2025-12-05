---
title: "Electrical Performance of Chiplet Interconnect Channels Under Thermal Conditions"
date: 2025-12-05
venue: "2025 IEEE International Conference on Electron Devices and Solid-State Circuits (EDSS)"
year: 2025
doi: "10.1109/EDSSC64492.2025.11182727"
tags: ["paper"]
pdf: ""
mathjax: true
---

⚠️**Quick Note**: This is a personal reading note and interpretation. The content is not guaranteed to be fully accurate or comprehensive. Always refer to the original paper for definitive information.

## Introduction

Temperature distribution caused by system head dissipation is always omitted due to EDA tools limitations. But the temperature fluctuations always impact both the physical properties of materials and the RC along the signal transmission path, which is affecting signal integrity and transmission speed.

The research investigates effects of different temperature distribution on the electrical performance of chiplet interconnect channels.

## Experiments

The research conducted three simulation experiments:

1. The base line, with no temperature variations
2. Linearly uniform temperature gradient ranging form 50$\degree C$ to 100 $\degree C$ $\bot$ to signal channel
3. Linearly uniform temperature gradient ranging form 50$\degree C$ to 100 $\degree C$ $\parallel$ to signal channel

## Analysis

The optimal scenario of the results are: return loss $\rarr$ 0, and insertion loss $\rarr$ 1.

Results of the second experiment comparing to the baseline, is indication a lower return loss and a higher insertion loss, which is indication worse performance relative to the baseline. And for the third experiment, the result is even lower and higher on return loss and insertion loss, which indicating a worse performance than the second one.

And for the eye diagram with a 16Gbps data transmit, the eyes are always open no matter if crosstalk or not for the baseline experiment. For the second experiment, the eyes are smaller on the eye diagram with no crosstalk, and even more smaller on the crosstalk one. For the third one, the eyes are smaller than the second experiment's result, with a closed eye on the crosstalk eye diagram.

## Conclusion

The results indicates that the temperature gradient $\parallel$ to the signal channel has the **greatest** impact on performance of chiplet interconnect channels.
