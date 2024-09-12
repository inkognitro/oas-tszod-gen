[![CI](https://github.com/inkognitro/oas-to-code/actions/workflows/ci.yml/badge.svg)](https://github.com/inkognitro/oas-to-code/actions?query=workflow%3Aci)
![Total](./badges/jest/coverage-total.svg)

# oas-to-code
A code generator to convert [OpenApiV3](https://swagger.io/specification/) specifications into endpoint caller functions for [TS](https://www.typescriptlang.org/) and [Zod](https://zod.dev).

## Why yet another library for this task?
Before you consider using this library, I suggest having a look at [Zodios](https://www.zodios.org/)
and [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) first.
This code generator serves as a standalone alternative to the two libraries.
I coded my own solution because I wanted to:
- have full ownership of my production code
- have the possibility to go with other implementations under the hood than [Axios](https://axios-http.com/docs/intro)
  (e.g. with [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)) having a uniform adapter API
- have generated [Zod](https://zod.dev) schemas as an opt-in possibility
- have the possibility to explicitly set cookies
- have separated functions and type definitions for each endpoint in a single file, located in its context folder
- be able to easily test these endpoint caller functions with exchangeable `RequestHandler` implementations
- have a uniform way as an alternative to [Axios' interceptors](https://axios-http.com/docs/interceptors)
through different `RequestHandler` implementations

> :bulb:
> It seems insane to challenge the usage of the [Axios](https://axios-http.com/docs/intro) library despite all its advantages.
> But one might have PWAs and [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
> in mind where [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API) is out of scope.
> Others just want to use `fetch` for backend stuff of their [NextJs](https://nextjs.org/docs/app/api-reference/functions/fetch)
> app and profit from optimized caching. There are lots of articles out there which discuss things like
> [Axios Vs Fetch](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/).

# Generator: Setup and usage
First install the package with the script below as a dev dependency:
```
npm install oas-to-code --save-dev
```

After installing the package you will be able to generate TS code out from your OAS3 specification
with the script below. Please don't forget to adding your specification.json file and adjusting the
path of the `require` statement.

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

**Important:**
It is recommended to add your output folder in the `.gitignore` file and to regenerate the output in your CI pipeline
because on every execution of the `generateOas3ToTs` function, the output folder will be deleted and the generated
output is built from scratch again. Not commiting the generated output into the repository will make sure, that no
custom changes are committed which could get lost after another execution of `generateOas3ToTs`.

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

## A simple login example
Following example demonstrates how a `RequestHandler` instance is created with two different implementations.
In order to process a login, a request is triggered by calling the generated `authenticate` method.
The previously created requestHandler instance is passed as a first argument to the `authenticate` function.
After receiving the `RequestResult` and the check of the according response status 200, TypeScript automatically 
knows how the delivered response body looks like.
Now the received access token can be stored in the `exampleAuthAccessToken` variable.

```typescript
import {
  AxiosRequestHandler,
  AxiosRequestHandlerExecutionConfig,
} from './axiosRequestHandler';
import {
  AuthRequestHandler,
  AuthRequestHandlerExecutionConfig,
  HttpBearerAuthenticationProvider,
} from './authRequestHandler';
import {authenticate} from './my-output-folder/auth';

declare global {
  interface RequestHandlerExecutionConfig
    extends AxiosRequestHandlerExecutionConfig,
      AuthRequestHandlerExecutionConfig {}
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
    refineAxiosRequestConfig: (currentConfig) => ({
      ...currentConfig,
      onUploadProgress: progressEvent => console.log('uploadProgressEvent', progressEvent)
    })
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
[here](https://github.com/inkognitro/oas-to-code/blob/main/src/templates/ts/core/core.ts#L176).

### AxiosRequestHandler
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object.
It requires the installation of the [Axios](https://axios-http.com/docs/intro) library in your code base
and serves as a more widely supported alternative to the `FetchApiRequestHandler`.
Some dependencies need to be installed for this type of request handler.
For the recommended version have a look at the `peerDependencies` in the `package.json` of this project.
```
npm install axios --save
```

### FetchApiRequestHandler
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object
and uses the built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

This request handler implementation requires a custom `stringifyQueryParams` function to convert an object
of type `QueryParams` into a `string`.
At time of writing this, the [qs](https://www.npmjs.com/package/qs) package is the most commonly used library
for such tasks and is therefore recommended.
Creating a FetchApiRequestHandler instance comes with the following two steps.

Install the [qs](https://www.npmjs.com/package/qs) library like so:
```
npm install qs --save

npm install @types/qs --save-dev
```

Create a FetchApiRequestHandler instance as written below:
```typescript
import { FetchApiRequestHandler } from './my-output-folder/core';
import { stringify } from 'qs';

const fetchApiRequestHandler = new FetchApiRequestHandler({
  // This one is required
  stringifyQueryParams: queryParams => {
    return stringify(queryParams);
  },

  // Following is optional stuff
  baseUrl: 'http://localhost:8000',
  generalRequestInit: {
    credentials: 'include', // Send credential headers
    mode: 'cors', // Enable CORS
  },
});
```

### AuthRequestHandler
This implementation can be taken for automatic `Authorization` request header enrichment.
As of the time of writing this, only `httpBearer` and `httpBasic` authentication headers are supported.

### ScopedRequestHandler
With this implementation you are able to make sure that the methods `cancelRequestById` and `cancelAllRequests` do only
cancel the requests which were made through the `execute` method of exactly that `ScopedRequestHandler` instance.
This might be useful when you want to provide a separate `ScopedRequestHandler` instance for React components.
Anyway, React stuff is out-of-scope of this package.

### ZodValidationRequestHandler
**:warning: not available yet**

This implementation is responsible for validating the request and response data through their Zod schemas.
This one is only available when Zod schemas are generated due to the `withZod: true` configuration.

## Promises: `resolve` vs `reject`
The provided `RequestHandler` implementations distinguish between "expected" and
"unexpected" events: An "expected" event is for example a response which could not be received due to cancellation or network issues.
A response with no 2xx status code is considered to be "expected" as well.
In such cases, the Promise which was delivered by the `requestHandler.execute` method, is going to be `resolved`.
On the other hand, things like programming errors or other runtime errors due to wrong source code are considered
to be "unexpected" and will result in a `rejected` Promise. This applies to all provided RequestHandler implementations.

This behaviour should lead to a better developer experience because thrown errors must only be caught at a root level
of an application then.

## Semantic versioning
**Worried about different code generation outputs after updating this library?**
As long as the API contract on the backend side was not violated through breaking changes,
you don't have to worry about breaking changes in generated code output when upgrading to the next **minor** version.
