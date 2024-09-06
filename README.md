[![CI](https://github.com/inkognitro/oas-to-code/actions/workflows/ci.yml/badge.svg)](https://github.com/inkognitro/oas-to-code/actions?query=workflow%3Aci)

![Functions](./badges/jest/coverage-functions.svg)
![Lines](./badges/jest/coverage-lines.svg)
![Total](./badges/jest/coverage-total.svg)

# oas-to-code
A code generator to convert [OpenApiV3](https://swagger.io/specification/) specifications into endpoint caller functions for [TS](https://www.typescriptlang.org/) and [Zod](https://zod.dev).

## Why should I use `oas-to-code`?
- to use your [OAS3](https://swagger.io/specification/) specification as a single-source-of-truth for your endpoint definitions
- to have the possibility for an automatic compatibility check of your api endpoints with your TS frontends
- to write less code that could lie, leading to fewer bugs and improved customer satisfaction

## Why yet another library for this task?
Before you consider using this library, I suggest having a look at [Zodios](https://www.zodios.org/)
and [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) first.

I coded my own solution because I wanted to
- have separated functions and type definitions for each API endpoint in a single file located in a folder of its context
- be able to easily test these endpoint caller functions with exchangeable `RequestHandler` implementations
- have automatically generated [Zod](https://zod.dev) schemas for any endpoint request data that can be used for form validations

## Semantic versioning
**Worried about different code generation outputs after updating this library?**

As long as the API contract on the backend side was not violated through breaking changes,
you don't have to worry about breaking changes in generated code output after migrating to the next **minor** version.


## Usage of the generator
The following script can be used in the development process of your application.
This will generate several files and folders depending on your OAS3 specification.

```typescript
import { generateOas3ToTs } from 'oas-to-code';
const myOas3Specification = require('./path/to/my/oas3Specification.json');

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(myOas3Specification);
    });
  },
  outputFolderPath: './my-output-folder',
  predefinedFolderOutputPaths: [
    ['core'], // puts variables and type definitions in the `./core` folder for generated outputs which have an `OutputPath` starting with ['core']
    ['util', 'foo'], // puts variables and type definitions in the `./util/foo` folder for generated outputs which have an `OutputPath` starting with ['util', 'foo']
  ],
  logger: {
    log: (content) => {
      console.log(content);
    },
  },
  shouldGenerateWithZod: true, // In case of `false`, only TypeScript output is generated without Zod schemas
});
```

### What is an OutputPath?
Variables, functions and type definitions which are generated by this generator come in form of an `output`.
A `output` is an object which has a `path` property in it. This property is of type `OutputPath` (= `string[]`).
The first few entries of the `OutputPath` array do represent the filepath in which the variables and type definitions are going to be put in.
The remaining entries of this array are used for the type or the variable name.

Let's consider some example endpoints which might be defined in your OAS3 specification under the `paths` variable:

1. The outputs for the endpoint with the operationId `auth.authenticate` will be put into `./auth/authenticate.ts`
2. The outputs for the endpoint with the operationId `userManagement.getUsers` will be put into `./user-management/getUsers.ts`
3. The outputs for the endpoint with the operationId `userManagement.admin.getUsers` will be put into `./user-management/admin/getUsers.ts`

## Usage of generated code
Following example demonstrates:
1. How the `requestHandler` object gets created like an onion, with different implementations of the `RequestHandler` interface
2. How to trigger a request from an endpoint which has the operationId `auth.authenticate` in the OAS3 specification

 ```typescript
import {
  AxiosRequestHandler,
  AxiosRequestHandlerExecuteConfig,
} from './axiosRequestHandler';
import {
  AuthRequestHandler,
  AuthRequestHandlerExecuteConfig,
  HttpBearerAuthenticationProvider,
} from './authRequestHandler';
import {authenticate} from './my-output-folder/auth';

declare global {
  interface RequestExecutionConfig
    extends AxiosRequestHandlerExecuteConfig,
      AuthRequestHandlerExecuteConfig {}
}

const exampleAuthenticationProvider: HttpBearerAuthenticationProvider = {
  type: 'httpBearer',
  findToken: () => {
    return 'my-access-token';
  },
  securitySchemeName: 'example', // this is the name of one of your security definitions in your OAS3 specification
};

const requestHandler = new AuthRequestHandler(
  [exampleAuthenticationProvider],
  new AxiosRequestHandler({baseURL: 'https://my-api.com'})
);

const optionalConfig: RequestExecutionConfig = {
  onUploadProgress: progress => console.log('uploadProgress', progress),
};

const requestResult = await authenticate(
  requestHandler,
  {usernameOrEmail: 'inkognitro', password: '12345678'},
  optionalConfig
);

console.log(requestResult);
```

### RequestHandler
The decision of having a `RequestHandler` interface with granular implementations was made with different environments
in mind: `server` vs `client` | `prod` vs `test` | custom app requirements | combination of whatever.
You can write your own implementations or just combine some of the existing ones, according to your needs:

#### `FetchApiRequestHandler` :warning: not available yet
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object.

#### `AxiosRequestHandler`
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object.
It requires the installation of the `axios` library in your code base
and serves as an alternative to the `FetchApiRequestHandler`.

#### `AuthRequestHandler`
This implementation can be taken for automatic `Authorization` request header enrichment.
As of the time of writing this only `httpBearer` and `httpBasic` authentication headers are supported.

#### `ScopedRequestHandler`
With this implementation you are able to make sure that the methods `cancelRequestById` and `cancelAllRequests` do only
cancel the requests which were made through the `execute` method of exactly that `ScopedRequestHandler` instance.

This might be useful when you want to provide a separate `ScopedRequestHandler` instance for React components.
This can be achieved by a custom `useScopedRequestHandler` hook which calls the `cancelAllRequests` method as soon as
the component gets unmounted.
