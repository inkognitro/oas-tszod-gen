# oas2ts
A tool to convert [OpenApi](https://swagger.io/specification/) specifications into callable endpoint functions in [TS](https://www.typescriptlang.org/).

## Why should I use `oas2ts`?
Easy one to answer:
- to have a single-source-of-truth for endpoint definitions
- to have the possibility for an automatic compatibility check of your api endpoints with your TS frontends
- to write less code that could lie
- to reduce the need for integration tests due to early type checks in a CI pipeline
- to have a bigger customer satisfaction due to fewer bugs

## Why did you write yet another library for this task?
Good question. There are a lot of libraries out there which try to achieve the very same:
Type safe calls to API endpoints.

The aim of this library is not only to guarantee type-safety but also to generate
endpoint caller functions with standalone types which can be used in your code base.

> **Worried?**
> 
> As long as the API contract on the backend site was not violated through breaking changes,
> there is no need to worry about different code generation outputs,
> generated from the same **major version** of this library.
