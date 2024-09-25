[![CI](https://github.com/inkognitro/oas-tszod-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/inkognitro/oas-tszod-gen/actions?query=workflow%3Aci)
![Total](./badges/jest/coverage-total.svg)

# oas-tszod-gen
A code generator to convert [OpenApi version 3 (OAS3)](https://swagger.io/specification/) specifications into endpoint caller functions for [TS](https://www.typescriptlang.org/) and [Zod](https://zod.dev).

## Why yet another library for this task?
Before you consider using this library, I suggest having a look at the combination of [Zodios](https://www.zodios.org/)
and [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) or [OpenApi Typescript](https://openapi-ts.dev/) (if you are OK with just Typescript). This code generator serves as a combined alternative for these three libraries.
However, I coded my own solution because I wanted to:

- have full ownership of my production code without any additional package dependency
- have the possibility to go with other implementations under the hood than [Axios](https://axios-http.com/docs/intro)
  (e.g. with [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)) having a uniform adapter API
- have generated [Zod](https://zod.dev) schemas as an opt-in possibility, with runtime validation of requests and responses
- have separated functions and type definitions for each endpoint in a single file, located in its context folder
- be able to easily test these endpoint caller functions with exchangeable `RequestHandler` implementations
- have a uniform way as an alternative to [Axios' interceptors](https://axios-http.com/docs/interceptors)
through different `RequestHandler` implementations

> :bulb: [Axios](https://axios-http.com/docs/intro) is great. It offers a lot and it works with
> [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API) under the hood.
> But one might have PWAs and [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
> in mind where XMLHttpRequest is out of scope.
> Others just want to use `fetch` for backend stuff in their [NextJs](https://nextjs.org/docs/app/api-reference/functions/fetch)
> app to benefit from automatic caching. There are lots of articles out there which discuss things like
> [Axios Vs Fetch](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/).

## Generator: Setup and usage
First, install the package as a dev dependency:
```
npm install oas-tszod-gen --save-dev
```

If you also want to use [Zod](https://zod.dev) (see `withZod: true` configuration below) and it is not yet installed
as a dependency of your project:
```
npm install zod --save
```

Now create a new file `api.specs.json` in the root folder of your project and paste your OAS3 specification into it.
The next step is to create a file `api.generate.js` - also in the root folder of your project - and paste the following
code into it:

```typescript
// api.generate.js

import { generateOas3ToTs } from 'oas-tszod-gen';
const oas3Specification = require('./api.specs.json');

generateOas3ToTs({
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(oas3Specification);
    });
  },
  
  outputFolderPath: './generated-api',
  
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

  ignoreEndpointsWithoutOperationId: false, // optional
  // In case of `true`, endpoints whithout an "operationId" are ignored for code output. Default is `false`.
});
```

Finally run the script to generate the output files into the `./generated-api` folder:
```
node api.generate.js
```

**Important:**
It is recommended to add your output folder in the `.gitignore` file and to regenerate the output in your CI pipeline.
On every call of the `generateOas3ToTs` function, the output folder is going to be deleted and the code will be rebuilt
from scratch.

> :bulb: Node version `>= 18.0.0` is required to support
> the [Blob](https://nodejs.org/docs/v20.17.0/api/globals.html#class-blob) class
> if you want to use the generated code on the backend side.

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

After generating endpoint caller functions from an OAS3 specification into your codebase,
it's time to understand how the generated code can be used. The following sections should bring some clarity.

## Usage of the generated code by example
The following example shows how to create a `RequestHandler` instance by composing two different `RequestHandler` implementations.
In order to process a login, a request is triggered by calling the generated `authenticate` endpoint caller function.
The previously created requestHandler instance is now passed as a first argument to the `authenticate` function.
After receiving the `RequestResult` followed by the check of the according response status 200, TypeScript recognizes
the type of the received response body. Finally, the received access token is stored in the `myJwtAuthAccessToken` variable.

```typescript
import {
  AuthRequestHandler,
  AuthRequestHandlerExecutionConfig,
  AxiosRequestHandler,
  AxiosRequestHandlerExecutionConfig,
  HttpBearerAuthenticationProvider,
} from './generated-api/core';
import { authenticate } from './generated-api/auth';

declare global {
  interface RequestHandlerExecutionConfig
    extends AxiosRequestHandlerExecutionConfig,
      AuthRequestHandlerExecutionConfig {}
}

let myJwtAuthAccessToken: null | string = null;

const myJwtAuthenticationProvider: HttpBearerAuthenticationProvider = {
  type: 'httpBearer',
  
  findToken: (): string | null => {
    return myJwtAuthAccessToken;
  },
  
  securitySchemeName: 'myJwtAuth',
  // This is the name of one of your security definition in your OAS3 specification
};

const myAxiosInstance = axios.create({
  baseURL: 'https://api.acme.com',

  withCredentials: true,
  // In case of browsers:
  // Allow cookies to be passed along with the request for a different api (sub-)domain (CORS)
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
});

const axiosRequestHandler = new AxiosRequestHandler({
  axios: myAxiosInstance,
  urlDecodeQueryString: (queryString: string) => {
    return parse(queryString);
  },
});

const requestHandler = new AuthRequestHandler(
  [myJwtAuthenticationProvider],
  // In case of multiple authentication providers, the order does NOT matter here.
  // The order of prioritized authentication providers is taken from the "request.endpointSchema.supportedSecuritySchemas"
  // array, which has the same order as the defined security schemes in the OAS3 specification of that endpoint.
  // The first found token received from the "findToken" method of a supported authentication provider is
  // then added to the request headers.
  
  axiosRequestHandler
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
    {
      contentType: 'application/json',
      body: {
        usernameOrEmail: 'inkognitro',
        password: '12345678'
      },
    },
    optionalConfig
  );

  if (!requestResult.response || requestResult.response.status !== 200) {
    console.log('Something went wrong!');
    return;
  }

  // The following check is only required if the response with
  // the status code 200 can have arbitrary content types,
  // according to the given OAS3 specification
  if (rr.response.contentType !== 'multipart/form-data') {
    console.log('unsupported response body content of type FormData');
    return;
  }

  const body = await requestResult.response.revealBody();
  myJwtAuthAccessToken = body.accessToken;
  
  console.log('Successfully logged in!');
}

await login();
```

## RequestHandler implementations
The decision of having a `RequestHandler` interface with granular implementations was made with different environments
in mind: `server` vs `client` | `prod` vs `test` | custom "middleware" behaviour.
You can write your own implementations or just combine some of the existing ones below, according to your needs.
The `RequestHandler` interface for custom implementations can be found
[here](https://github.com/inkognitro/oas-tszod-gen/blob/main/src/templates/ts/core/core.ts#L176).

### AxiosRequestHandler
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object.
It requires the installation of the [Axios](https://axios-http.com/docs/intro) library in your code base.
For the recommended Axios version have a look at the `peerDependencies` in the `package.json` of this project.
Creating an AxiosRequestHandler instance comes with the following steps:

```
npm install axios --save
```

To support `application/x-www-form-urlencoded` response bodies, this request handler implementation requires
a custom `decoding` function to decode url encoded data.
The [qs](https://www.npmjs.com/package/qs) library currently is the most commonly used library
for such tasks and therefore recommended:

```
npm install qs --save

npm install @types/qs --save-dev
```

And finally:

```typescript
const requestHandler = new AxiosRequestHandler({
  axios: axios.create({
    baseURL: `http://localhost:${port}`,
  }),
  urlDecodeQueryString: (queryString: string) => {
    return parse(queryString);
  },
});
```

> :bulb: The AxiosRequestHandler forces Axios to always receive response bodies in form of an `ArrayBuffer`.
> This is achieved through setting `responseType: 'arraybuffer'` inside
> the [AxiosRequestConfig](https://axios-http.com/docs/req_config).
> A preconfigured `responseType` property is therefore always overwritten by the request handler.
> The same applies to `cancelToken`.

### FetchApiRequestHandler
This implementation is responsible for executing your requests through the http(s) protocol.
It is usually the most inner implementation of an onion bootstrapped request handler object
and uses the built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

To support `application/x-www-form-urlencoded` request and response bodies, this request handler implementation requires
custom `decoding` and `encoding` functions to convert data from and to query string format.
The [qs](https://www.npmjs.com/package/qs) library currently is the most commonly used library
for such tasks and therefore recommended:
```
npm install qs --save

npm install @types/qs --save-dev
```

Create a FetchApiRequestHandler instance as written below:
```typescript
import { FetchApiRequestHandler } from './generated-api/core';
import { stringify } from 'qs';

const fetchApiRequestHandler = new FetchApiRequestHandler({
  // These two functions are required
  urlEncodeQueryString: plainObject => stringify(queryParams),
  urlDecodeQueryString: (queryString: string) => {
    return parse(queryString);
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
As of time of writing this, only `httpBearer` and `httpBasic` authentication headers are supported.

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

## Lacking OAS3 support
- Although `default` is supported for response status codes,
status code pattern matching (e.g. [5XX](https://swagger.io/docs/specification/describing-responses/))
is ignored by the generator and will not get recognized by TS.
As of right now, it is added as a possible response having `any` status code.
- The generated code for the ["not" keyword](https://swagger.io/docs/specification/data-models/oneof-anyof-allof-not/#not)
is `any` for TS and `z.any()` for Zod.
- Only **Local References** are supported for [$ref syntax](https://swagger.io/docs/specification/using-ref/).
One might collect all external `$ref` definitions and modify the specs accordingly to have only local references
when passing them to the generator.
- The `discriminator.mapping` property as described [here](https://swagger.io/docs/specification/data-models/inheritance-and-polymorphism/)
is ignored. It is recommended to define a single literal value in the discriminating property of these schemas which are
used in a `oneOf` or `anyOf` schema definition having a discriminator.
- The `writeOnly` property described [here](https://swagger.io/docs/specification/data-models/data-types/) is ignored.
It is recommended to have separate definitions for read and write objects, especially with changing requirements
(see also [CQRS pattern](https://martinfowler.com/bliki/CQRS.html)).

## Out of scope
Linting is out of scope of this package. The generator is responsible to generate valid TypeScript (and Zod) definitions.
That's what it does. Your code setup should be responsible for linting your code, so it might make sense for you to run
Eslint right after the `generateOas3ToTs` function was executed, e.g. with a script in your `package.json` like so:
```json
"scripts": {
  "api:generate": "node api.generate.js && eslint --fix ./generated-api"
}
```

## Pull request
If you think an unsupported feature needs to be implemented, feel free to open a new pull request.
Please refer to the existing pull request criteria defined [here](.github/pull_request_template.md).
