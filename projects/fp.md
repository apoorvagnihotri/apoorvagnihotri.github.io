---
title: Floating Point Processor

---

https://github.com/apoorvagnihotri/FPProcessor/blob/master/Report.pdf
https://github.com/apoorvagnihotri/FPProcessor
https://github.com/apoorvagnihotri/FPProcessor/blob/master/PPT.pdf

# The Idea
The main motivation behind taking up this project was to get a better understanding of Processors and their workings. Implementing a design of a basic processor that could perform `addition`, `subtraction`, `multiplication`, and `division` on floating point numbers.

## Basic Details
The numbers, instructions that need to be performed on these numbers were stored in a file `instructs` that would represent the memory. Our Control Unit would read the file `instructs` (instructions were of the form: `Operator`, `Operand_in1`, `Operand_in2`, and `Operand_out`), and give out control signals to ALU with the address of the data that needs to be operated upon with the address where the output needs to be stored. This data storage was mimicked by another file `data`.

Below is a sample run of our design.

![](https://i.imgur.com/oqZPraV.jpg)

### Support for Halt
We also provided basic support for the halt instruction, where a particular instruction read would halt the Contol Unit and stop the program from going to the next instruction.

## Learnings
This project helped us a lot to understanding the nuances of a basic synchronous processor and how we can model it. It was a really nice experience that introduced me to a set of talented teammates that collectively worked on the project.