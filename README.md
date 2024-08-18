[![CI](https://github.com/inkognitro/oas-to-code/actions/workflows/ci.yml/badge.svg)](https://github.com/inkognitro/oas-to-code/actions?query=workflow%3Aci)

![Functions](./badges/jest/coverage-functions.svg)
![Lines](./badges/jest/coverage-lines.svg)
![Total](./badges/jest/coverage-total.svg)

# oas-to-code
A tool to convert [OpenApi](https://swagger.io/specification/) specifications into callable endpoint functions in [TS](https://www.typescriptlang.org/).

## Why should I use `oas-to-code`?
- to use your [OAS3](https://swagger.io/specification/) specification as a single-source-of-truth for your endpoint definitions
- to have the possibility for an automatic compatibility check of your api endpoints with your TS frontends
- to write less code that could lie, leading to fewer bugs and improved customer satisfaction

## Why did you write yet another library for this task?
Before you consider using this library, I suggest having a look at [Zodios](https://www.zodios.org/)
and [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) first.

I coded my own solution because I wanted to
- have fine-grained and separated functions and type definitions for each API endpoint
- be able to easily test these endpoint caller functions with exchangeable `RequestHandler` implementations
- have automatically generated [Zod](https://zod.dev) schemas for every endpoint to be able to use them for future form validations

## Semantic versioning
**Worried about different code generation outputs after updating this library?**

As long as the API contract on the backend side was not violated through breaking changes,
you don't have to worry about breaking changes in generated code output after migrating to the next **minor** version.
