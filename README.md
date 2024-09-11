[![CI](https://github.com/inkognitro/oas-to-code/actions/workflows/ci.yml/badge.svg)](https://github.com/inkognitro/oas-to-code/actions?query=workflow%3Aci)
![Total](./badges/jest/coverage-total.svg)

# oas-to-code
A code generator to convert [OpenApiV3](https://swagger.io/specification/) specifications into endpoint caller functions for [TS](https://www.typescriptlang.org/) and [Zod](https://zod.dev).

## Why yet another library for this task?
Before you consider using this library, I suggest having a look at [Zodios](https://www.zodios.org/)
and [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) first.
This code generator serves as a standalone alternative to the two libraries.
I coded my own solution because I wanted to:
- have generated [Zod](https://zod.dev) schemas as an opt-in possibility only
- have the possibility to go with the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API),
[Axios](https://axios-http.com/docs/intro) or another implementation under the hood
- have also cookies typed in a uniform way for requests and responses, no matter with what underlying implementation
- have separated functions and type definitions for each API endpoint in a single file, located in context folders
- be able to easily test these endpoint caller functions with exchangeable `RequestHandler` implementations

# Generator: Setup and usage
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

## What is an OutputPath?
Variables, functions and type definitions which are generated by this generator come in form of an `output`.
A `output` is an object which has a `path` property in it. This property is of type `OutputPath` (= `string[]`).
The first few entries of the `OutputPath` array do represent the filepath in which the variables and type definitions are going to be put in.
The remaining entries of this array are used for the type or the variable name.

Let's consider some example endpoints which might be defined in your OAS3 specification under the `paths` variable:

1. The outputs for the endpoint with the operationId `auth.authenticate` will be put into `./auth/authenticate.ts`
2. The outputs for the endpoint with the operationId `userManagement.getUsers` will be put into `./user-management/getUsers.ts`
3. The outputs for the endpoint with the operationId `userManagement.admin.getUsers` will be put into `./user-management/admin/getUsers.ts`

The same principles that apply to dots `.` also apply to slashes `/`.

# Usage of generated code
After generating endpoint caller functions out of your OAS3 specification into your codebase,
you should also be able to understand how to apply the generated code.
The following sections should serve as an API documentation.

## Create and use the RequestHandler
Following example demonstrates how a `RequestHandler` instance is created with two different implementations.
Furthermore, a login process is simulated with the `exampleAuthAccessToken` variable.
In order to process the login, a request is triggered to the `authenticate` endpoint.

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

const exampleAuthAccessToken: null | string = null;

const exampleAuthenticationProvider: HttpBearerAuthenticationProvider = {
  type: 'httpBearer',
  
  findToken: (): string | null => {
    return exampleAuthAccessToken;
  },
  
  securitySchemeName: 'example',
  // The name of one of your security definitions in your OAS3 specification
};

const myAxiosInstance = axios.create();

const requestHandler = new AuthRequestHandler(
  [exampleAuthenticationProvider],
  // In case of multiple authentication providers, the order does matter:
  // The first found token by the "findToken" method is added to the request header.
  
  new AxiosRequestHandler(myAxiosInstance, {
    baseURL: 'https://api.acme.com',
    
    withCredentials: true,
    // In case of browsers:
    // Allow cookies to be passed along with the request for a different api (sub-)domain (CORS)
    // Source: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
  });
);

async function login() {
  const optionalConfig: RequestExecutionConfig = {
    onUploadProgress: progress => console.log('uploadProgress', progress),
  };

  const requestResult = await authenticate(
    requestHandler,
    {usernameOrEmail: 'inkognitro', password: '12345678'},
    optionalConfig
  );

  if (!rr.response || rr.response.statusCode !== 200) {
    console.log('Something went wrong!');
    return;
  }

  const body = await rr.response.revealBody();
  exampleAuthAccessToken = body.accessToken;
  
  console.log('Successfully logged in!');
}

login();
```

## RequestHandler implementations
The decision of having a `RequestHandler` interface with granular implementations was made with different environments
in mind: `server` vs `client` | `prod` vs `test` | custom "middleware" behaviour.

You can write your own implementations or just combine some of the existing ones below, according to your needs.
The `RequestHandler` interface for custom implementations can be found
[here](https://github.com/inkognitro/oas-to-code/blob/main/src/templates/ts/core/core.ts).

### AxiosRequestHandler
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object.
It requires the installation of the [Axios](https://axios-http.com/docs/intro) library in your code base
and serves as a more widely supported alternative to the `FetchApiRequestHandler`.

Some dependencies need to be installed for this type of request handler.
For version information have a look at the `peerDependencies` in the `package.json` of this project.
```
npm install axios --save
```

### FetchApiRequestHandler
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object
and uses the built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

Some dependencies need to be installed for this type of request handler.
For version information have a look at the `peerDependencies` in the `package.json` of this project.
```
npm install qs --save && npm install @types/qs --save-dev
```

### AuthRequestHandler
This implementation can be taken for automatic `Authorization` request header enrichment.
As of the time of writing this only `httpBearer` and `httpBasic` authentication headers are supported.

### ScopedRequestHandler
With this implementation you are able to make sure that the methods `cancelRequestById` and `cancelAllRequests` do only
cancel the requests which were made through the `execute` method of exactly that `ScopedRequestHandler` instance.

This might be useful when you want to provide a separate `ScopedRequestHandler` instance for React components.
Anyway, React stuff is out-of-scope of this package.

### ZodValidationRequestHandler :warning: not available yet
This implementation is responsible for validating the request and response data through their Zod schemas.
This one is only available when Zod schemas are generated due to the `withZod: true` configuration.

## RequestHandler - Promises: `resolve` vs `reject`
The provided `RequestHandler` implementations distinguish between "expected" and
"unexpected" events:

An "expected" event is for example a response which could not be received due to cancellation or network issues.
A response which has no 2xx status code are is considered to be "expected" too.
In such a cases the Promise which was delivered by the `requestHandler.execute` method, is going to be `resolved`.
On the other hand, things like programming errors or other runtime errors due to wrong source code are considered
to be "unexpected" and should result in a `rejected` Promise.

With this behaviour errors should only be caught at a root level of your application.
This is for developer convenience.

## Semantic versioning
**Worried about different code generation outputs after updating this library?**

As long as the API contract on the backend side was not violated through breaking changes,
you don't have to worry about breaking changes in generated code output after migrating to the next **minor** version.
