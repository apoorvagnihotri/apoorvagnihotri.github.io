---
title: A Case for Rejection in Low Resource ML Deployment
year: 2022
venue: NeurIPS workshop
kind: Publication
authors: Jerome White, Pulkit Madaan, Nikhil Shenoy, Apoorv Agnihotri, Makkunda Sharma, and Jigar Doshi
description: A practical investigation of sample rejection for object-detection systems when training data is limited and seasonal deployment shifts make standard rejection methods difficult to apply.
tags:
  - selective prediction
  - computer vision
  - deployment
links:
  - label: Paper
    href: https://arxiv.org/abs/2208.06359
  - label: Related code
    href: https://github.com/WadhwaniAI/pest-monitoring
hero:
  src: ../../assets/work/rejection-figure-5.png
  alt: Three charts showing mean absolute error falling as a larger fraction of uncertain samples is rejected across three cotton-growing seasons.
  caption: Seasonal rejection results from Figure 5 of the paper.
draft: false
---

Using seasonal data from a deployed cotton-pest application, the paper studies a simple confidence-distribution rule for withholding unreliable recommendations while retaining samples for later model improvement.
