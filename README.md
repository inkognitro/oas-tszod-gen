[![CI](https://github.com/inkognitro/oas-to-code/actions/workflows/ci.yml/badge.svg)](https://github.com/inkognitro/oas-to-code/actions?query=workflow%3Aci)
[![License](https://github.com/inkognitro/oas-to-code/tree/main/badges/license.svg)]


Current development test coverage:

[![Functions](https://github.com/inkognitro/oas-to-code/tree/main/badges/jest/coverage-functions.svg)]
[![Lines](https://github.com/inkognitro/oas-to-code/tree/main/badges/jest/coverage-lines.svg)]
[![Total](https://github.com/inkognitro/oas-to-code/tree/main/badges/jest/coverage-total.svg)]

# oas-to-code
A tool to convert [OpenApi](https://swagger.io/specification/) specifications into callable endpoint functions in [TS](https://www.typescriptlang.org/).

## Why should I use `oas-to-code`?
Easy one to answer:
- to have a single-source-of-truth for endpoint definitions
- to have the possibility for an automatic compatibility check of your api endpoints with your TS frontends
- to write less code that could lie
- to reduce the need for integration tests due to early type checks in a CI pipeline
- to have a bigger customer satisfaction due to fewer bugs

## Why did you write yet another library for this task?
Good question. The aim of this library is not only to guarantee type-safety but also to generate
endpoint caller functions with standalone types which then can be used in your code base.

> **Worried about different generated outputs after this library was updated?**
> 
> As long as the API contract on the backend site was not violated through breaking changes,
> there is no need to worry about different generated code outputs from the same **major version** of this library.
