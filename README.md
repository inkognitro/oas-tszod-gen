[![CI](https://github.com/inkognitro/oas-to-code/actions/workflows/ci.yml/badge.svg)](https://github.com/inkognitro/oas-to-code/actions?query=workflow%3Aci)

![Functions](./badges/jest/coverage-functions.svg)
![Lines](./badges/jest/coverage-lines.svg)
![Total](./badges/jest/coverage-total.svg)

# oas-to-code
A code generator to convert [OpenApiV3](https://swagger.io/specification/) specifications into endpoint caller functions for [TS](https://www.typescriptlang.org/) and [Zod](https://zod.dev).

## Why yet another library for this task?
Before you consider using this library, I suggest having a look at [Zodios](https://www.zodios.org/)
and [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) first.

This code generator serves as a standalone alternative to the two libraries mentioned above.

I coded my own solution because I wanted to
- have full ownership over the code which is generated for production (inspired by [Shadcn](https://ui.shadcn.com/))
- be able to easily test these endpoint caller functions with exchangeable `RequestHandler` implementations
- have separated functions and type definitions for each API endpoint in a single file located in a folder of its context
- have automatically generated [Zod](https://zod.dev) schemas for endpoint DTOs
- have the possibility to only generate TypeScript definitions and opt-in Zod schema generation

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
    ['core'],
    // For outputs having an `OutputPath` starting with ['core']:
    // Variables and type definitions are put in the `{outputFolderPath}/core` folder
    
    ['util', 'foo'],
    // For outputs having an `OutputPath` starting with ['util', 'foo']:
    // Variables and type definitions are put in the `{outputFolderPath}/util/foo` folder
  ],
  
  logger: {
    log: (content) => {
      console.log(content);
    },
  },
  
  withZod: true, // optional
  // By default or in case of `false`, only TypeScript types are generated without Zod schemas
  
  requestHandlers: ['AxiosRequestHandler', 'AuthRequestHandler'], // optional
  // This will add only the defined RequestHandler implementations.
  // An empty array results in no added implementations.
  // By default, all available RequestHandler implementations are added.
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

The same principles that apply to dots `.` also apply to slashes `/`.

## Usage of generated code
Following example demonstrates:
1. How a `RequestHandler` instance is created with different nested implementations (onion-like)
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

You can write your own implementations or just combine some of the existing ones below, according to your needs.
The `RequestHandler` interface for custom implementations can be found
[here](https://github.com/inkognitro/oas-to-code/blob/main/src/templates/ts/core/core.ts).

#### `AxiosRequestHandler`
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object.
It requires the installation of the `axios` library in your code base
and serves as a more widely supported alternative to the `FetchApiRequestHandler`.

This implementation has the dependencies below which you have to install by yourself.
For more information have a look at the peer dependencies section of the `package.json` file of this project.
```
npm install axios --save
```

#### `FetchApiRequestHandler`
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object
and uses the built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

This implementation has the dependencies below which you have to install by yourself.
For more information have a look at the peer dependencies section of the `package.json` file of this project.
```
npm install qs --save && npm install @types/qs --save-dev
```

:warning: The `defaultConfig` of the FetchApiRequestHandler does not support cookies which will be passed
in the `request.cookies` property. If explicit cookies are required for your use-case you should either consider using
the `AxiosRequestHandler` or implement your own [CreateWithCookiesEnrichedRequestInit function](
https://github.com/inkognitro/oas-to-code/blob/main/src/templates/ts/core/fetchApiRequestHandler.ts#L4
) when calling `new FetchApiRequestHandler(ownConfig)`.

#### `AuthRequestHandler`
This implementation can be taken for automatic `Authorization` request header enrichment.
As of the time of writing this only `httpBearer` and `httpBasic` authentication headers are supported.

#### `ScopedRequestHandler`
With this implementation you are able to make sure that the methods `cancelRequestById` and `cancelAllRequests` do only
cancel the requests which were made through the `execute` method of exactly that `ScopedRequestHandler` instance.

This might be useful when you want to provide a separate `ScopedRequestHandler` instance for React components.
Anyway, React stuff is out-of-scope of this package.

#### `ZodValidationRequestHandler` :warning: not available yet
This implementation is responsible for validating the request and response data through their Zod schemas.
This one is only available when Zod schemas are generated due to the `withZod: true` configuration.


