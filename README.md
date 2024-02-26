# oas2ts
A tool to convert [OpenApi](https://swagger.io/specification/) specifications into callable endpoint functions in [TS](https://www.typescriptlang.org/).

## Why should I use `oas2ts`?
Easy one to answer:
- to have a single-source-of-truth for endpoint definitions
- to have the possibility for an automatic compatibility check of your api endpoints with your TS frontends
- to write less code that could lie
- to reduce the need for integration tests due to early type checks in a CI pipeline
- to have more a bigger customer satisfaction due to fewer bugs