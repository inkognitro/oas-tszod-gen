[![continuous integration pipeline](https://github.com/inkognitro/oas-tszod-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/inkognitro/oas-tszod-gen/actions?query=workflow%3Aci)
![test coverage](https://github.com/inkognitro/oas-tszod-gen/blob/main/badges/jest/coverage-total.svg)

# oas-tszod-gen
A code generator to convert [OpenApi version 3 (OAS3)](https://swagger.io/specification/) specifications into endpoint caller functions for [TS](https://www.typescriptlang.org/) and [Zod](https://zod.dev).

[![Demo Video](https://img.youtube.com/vi/D_bG0UCHr5M/0.jpg)](https://www.youtube.com/watch?v=D_bG0UCHr5M)

## Why yet another library for this task?
Before you consider using this library, I suggest having a look at the combination of [Zodios](https://www.zodios.org/)
and [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) or [OpenApi Typescript](https://openapi-ts.dev/) (if you are OK with just Typescript). This code generator serves as a combined alternative for these three libraries.
However, I coded my own solution because I wanted to:

- have full ownership of my production code without any additional dependency
- have generated endpoint caller functions representing the reality which is given from some OAS3 specs
- be able to easily test these endpoint caller functions with exchangeable `RequestHandler` implementations
- have a uniform adapter API which passes an endpoint schema inside the request adapter object
- have separated functions and type definitions for each endpoint in a single file, located in its context folder
- be able to go with other implementations under the hood than [Axios](https://axios-http.com/docs/intro)
- have the opt-in possibility for generated [Zod](https://zod.dev) schemas with included runtime validation of requests
and responses
- have a uniform way as an alternative to [Axios' interceptors](https://axios-http.com/docs/interceptors)
through different `RequestHandler` implementations

> :bulb: [Axios](https://axios-http.com/docs/intro) is great. It offers a lot, and it works with
> [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API) under the hood by default.
> But one might have PWAs and [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
> in mind where XMLHttpRequest is out of scope. There are lots of articles out there which discuss things like
> [Axios Vs Fetch](https://blog.logrocket.com/axios-vs-fetch-best-http-requests/).
> Even though, since version 1.7.0 Axios does natively support a
> [fetch adapter](https://github.com/axios/axios?tab=readme-ov-file#-fetch-adapter).

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

const {generateOas3ToTs} = require('oas-tszod-gen');
const oas3Specification = require('./api.specs.json');

generateOas3ToTs({
  // required:
  getSpecification: () => {
    return new Promise(resolve => {
      resolve(oas3Specification);
    });
  },
  
  // required:
  outputFolderPath: './generated-api',

  // optional:
  // The list of separators which should be considered for the outputPath creation from a
  // component name. The outputPath itself is an array of strings (see explanation in one
  // of the sections below). By default, the following configuration is taken:
  // ['.', '/', '\\']
  componentOutputPathSeparators: ['.', '/', '\\', '_'],
  
  // optional:
  // Same as "componentOutputPathSeparators" but in the context of defined "operationId" properties
  // of an endpoint
  operationIdOutputPathSeparators: ['.', '/', '\\', '_'],
  
  // optional:
  // The folder structure is generated from resulting outputPaths of the given operationIds.
  // If some additional sub folders are required the configuration can be done as follow:
  predefinedFolderOutputPaths: [
    // For outputs having an `OutputPath` starting with ['core']:
    // Variables and type definitions are put in the `{outputFolderPath}/core` folder
    ['core'],
    
    // For outputs having an `OutputPath` starting with ['util', 'foo']:
    // Variables and type definitions are put in the `{outputFolderPath}/util/foo` folder
    ['util', 'foo'],
  ],
  
  // required:
  logger: {
    log: (content) => {
      console.log(content);
    },
  },
  
  // optional:
  // By default or in case of `false`, only TypeScript types are generated without Zod schemas
  withZod: true,
  
  // optional:
  // The following will add only the defined templates.
  // An empty array results in no added templates.
  // By default, all available templates will be added to your codebase.
  templates: [
    'AxiosRequestHandler',
    'AuthRequestHandler',
    'ResponseExtractors',
    'ZodValidationRequestHandler'
  ],

  // optional: Modify output paths which result from an operation
  createOperationOutputPath: (_path, _method, _endpointSchema, defaultOutputPath) => {
    return defaultOutputPath[0] === 'v1' ? defaultOutputPath.slice(1) : defaultOutputPath;
  },
  
  // optional: Whether a specific operation (endpoint respectively) should be added
  shouldAddOperation: (_path, _method, _endpointSchema) => {
    return true; // adjust according to your needs
  },
  
  // optional: Whether a specific content type request body should be added
  shouldAddRequestBodyContent: (contentType, bodyByContentTypeMap) => {
    const lowerCaseContentType = contentType.toLowerCase();
    if (lowerCaseContentType.match(/application\/[^+]*[+]?(json);?.*/)) {
      return true;
    }
    const hasJsonAlternative = Object.keys(bodyByContentTypeMap).find(ct =>
      ct.toLowerCase().match(/application\/[^+]*[+]?(json);?.*/)
    );
    if (hasJsonAlternative) {
      return false;
    }
    return !!lowerCaseContentType.match(/multipart\/form-data;?.*/);
  },
  
  // optional: Whether a specific content type response body should be added
  shouldAddResponseBodyContent: (contentType, _bodyByContentTypeMap) => {
    return ['multipart/form-data', 'application/json'].includes(contentType);
  },
});
```

Finally run the script to generate the output files into the `./generated-api` folder:
```
node api.generate.js
```

**Important:**
It is recommended to regenerate the output in your CI pipeline. On every call of the `generateOas3ToTs` function,
the output folder is going to be deleted and the code will be generated from scratch.

> :bulb: Node version `>= 18.0.0` is required to support
> the [Blob](https://nodejs.org/docs/v20.17.0/api/globals.html#class-blob) class
> if you want to use the generated code on the backend side.

## What is an OutputPath?
Variables, functions and type definitions which are generated by this generator come in form of an `output`.
A `output` is an object which has a `path` property in it. This property is of type `OutputPath` (= `string[]`).
The first few entries of the `OutputPath` array do represent the filepath in which the variables and type definitions are going to be put in.
The remaining entries of this array are used for the type or the variable name.

Let's consider some example endpoints which might be defined in your OAS3 specification under the `paths` property:

1. The generated code for the endpoint with the operationId `auth.authenticate` will be put into `./auth/authenticate.ts`
2. The generated code for the endpoint with the operationId `userManagement.getUsers` will be put into `./user-management/getUsers.ts`
3. The generated code for the endpoint with the operationId `userManagement.admin.getUsers` will be put into `./user-management/admin/getUsers.ts`

The same principles that apply to dots `.` do also apply to slashes `/` and backslashes `\` by default.
This can be configured with the configuration prop `operationIdOutputPathSeparators` for operationIds and
with `componentOutputPathSeparators` for component names (see above).

After generating endpoint caller functions from an OAS3 specification into your codebase,
it's time to understand how the generated code can be used. The following sections should bring some clarity.

## Usage of the generated code by example
The following example code parts do illustrate a login process.
In order to process this, a request is triggered by calling the generated `authenticate` endpoint caller function.
After receiving the `RequestResult` followed by the check of the according response status 200, TypeScript recognizes
the according types of the received response.

The following code shows how to create a `RequestHandler` instance, which ideally is provided as a service in your app.
Different `RequestHandler` implementations are composed together.
These implementations came according due to the `templates` configuration of the code generator.

```typescript
// requestHandler.ts

import {
  AuthRequestHandler,
  AuthRequestHandlerExecutionConfig,
  AxiosRequestHandler,
  AxiosRequestHandlerExecutionConfig,
  BearerAuthProvider,
  ZodValidationRequestHandler,
  ZodValidationRequestHandlerExecutionConfig,
} from './generated-api/core';
import {authenticate} from './generated-api/auth';
import axios from 'axios';
import {parse} from 'qs';
import {BearerAuthProvider} from "./authRequestHandler";

declare global {
  interface RequestHandlerExecutionConfig
    extends AxiosRequestHandlerExecutionConfig,
      AuthRequestHandlerExecutionConfig,
      ZodValidationRequestHandlerExecutionConfig {
  }
}

class MyJwtAuthProvider implements BearerAuthProvider {
  public readonly type: 'bearer';

  // This is the name of one of your security definition in your OAS3 specification
  public readonly securitySchemeName: 'myJwtAuth';

  private readonly accessToken: null | string;

  setToken(accessToken: string | null) {
    this.accessToken = accessToken;
  }

  findToken(): null | string {
    return this.accessToken;
  }
}

export const myJwtAuthProvider = new MyJwtAuthProvider();

const myAxiosInstance = axios.create({
  baseURL: 'https://api.acme.com',

  // In case of browsers:
  // Allow cookies to be passed along with the request for a different api (sub-)domain (CORS)
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
  withCredentials: true,
});

const axiosRequestHandler = new AxiosRequestHandler({
  axios: myAxiosInstance,
  urlDecodeQueryString: (queryString: string) => {
    return parse(queryString);
  },
});

const zodRequestHandler = new ZodValidationRequestHandler(axiosRequestHandler);

export const requestHandler = new AuthRequestHandler(
  // In case of multiple authentication providers, the order does not matter.
  // Multiple authentication providers are prioritized by the sorting of the names which
  // are listed in the "request.endpointSchema.supportedSecuritySchemas" array.
  // This array has the same order as the security schemes in the OAS3 specs of that operation,
  // or endpoint respectively. The first found token received from the "findToken" method of a
  // supported authentication provider is then added to the request headers.
  [myJwtAuthProvider],

  zodRequestHandler
);
```

Below are three different variants to show how an endpoint call can look like when
using a generated endpoint caller functions.

The first function does directly **reveal** the response body.
This is done by the provided extractor function `getRevealedResponseOrReject`.
With this extractor function an error is thrown in case the actual received response does not correspond
to the expected one. This happens by checking the status and the content type of the response.

```typescript
// login1.ts

import { requestHandler, myJwtAuthProvider } from './requestHandler';
import { getRevealedResponseOrReject } from './generated-api/core';
import { authenticate } from './generated-api/auth';

async function loginOrThrowError() {
  const res = await getRevealedResponseOrReject(200, 'application/json', authenticate(
    requestHandler,
    {
      contentType: 'application/json',
      body: {
        usernameOrEmail: 'inkognitro',
        password: '12345678'
      },
    },
    optionalConfig
  ));
  myJwtAuthProvider.setToken(res.body.accessToken);
}
```
This can be useful when using [@tanstack/query](https://tanstack.com/query/latest).

With the second variant one can achieve the same as in the first example without throwing an error in case of
another response than expected. This can be achieved by the `findRevealedResponse` like so:

```typescript
// login2.ts

import { requestHandler, myJwtAuthProvider } from './requestHandler';
import { findRevealedResponse } from './generated-api/core';
import { authenticate } from './generated-api/auth';

async function loginOrDoNothing() {
  const res = await findRevealedResponse(200, 'application/json', authenticate(
    requestHandler,
    {
      contentType: 'application/json',
      body: {
        usernameOrEmail: 'inkognitro',
        password: '12345678'
      },
    },
    optionalConfig
  ));
  if (!res) {
    console.log('response is ignored...');
    return;
  }
  myJwtAuthProvider.setToken(res.body.accessToken);
}
```

Last but not least, the third variant. This variant serves as an overview of what is going on under the hood in
those extractor functions from above.
```typescript
// login3.ts

import { requestHandler, myJwtAuthProvider } from './requestHandler';
import { authenticate } from './generated-api/auth';

async function loginWithExplicitResponseBodyRevealation() {
  const requestResult = await authenticate(
    requestHandler,
    {
      contentType: 'application/json',
      body: {
        usernameOrEmail: 'inkognitro',
        password: '12345678'
      },
    },
  );

  if (!requestResult.response || requestResult.response.status !== 200) {
    console.error('Something went wrong...');
    return;
  }

  // The following check is only required if the response body of the response
  // with the status code 200 can have ambiguous content types according to the
  // given OAS3 specs.
  if (requestResult.response.contentType !== 'application/json') {
    console.error('unsupported response body:', requestResult.response.body);
    return;
  }

  const body = await requestResult.response.revealBody();
  myJwtAuthProvider.setToken(body.accessToken);
}
```
There exist another two extractor functions `getResponseOrReject` and `findResponse`.
These two functions do return a response with a body which was not yet **revealed**.
Anyway, this is for convenience, so we don't have to write that much code.

> :bulb: The `response.contentType` property does not always match the exact value of the actual `response.headers['content-type']`
> which was received from the server. The `response.contentType` property's reason to exist is to make sure that we
> are able to distinguish between different response types which were defined by the OAS3 specs.
> The OAS3 content type that has the most characters matching the actual `content-type` header is adopted during runtime.

## RequestHandler implementations
The decision of having a `RequestHandler` interface with granular implementations was made with different environments
in mind: `server` vs `client` | `prod` vs `test` | custom "middleware" behaviour.
You can write your own implementations or just combine some of the existing ones below, according to your needs.
The `RequestHandler` interface for custom implementations can be found
[here](https://github.com/inkognitro/oas-tszod-gen/blob/main/src/templates/core/core.ts#L343).

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
    baseURL: `http://localhost:3000`,
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
This implementation can be taken to add authentication information to requests automatically.
This is done as defined in the [OAS Authentication specs](https://swagger.io/docs/specification/v3_0/authentication/),
according to the given
[AuthProvider](https://github.com/inkognitro/oas-tszod-gen/blob/main/src/templates/core/authRequestHandler.ts#L29)(s).
As of the time of writing this, `basic`, `bearer` and `apiKey` authentication is supported.

### ScopedRequestHandler
With this implementation you are able to make sure that the methods `cancelRequestById` and `cancelAllRequests` do only
cancel the requests which were made through the `execute` method of exactly that `ScopedRequestHandler` instance.
This might be useful when you want to provide a separate `ScopedRequestHandler` instance for React components.
Anyway, React stuff is out-of-scope of this package.

### ZodValidationRequestHandler
This implementation is responsible for validating the request and response data through their Zod schemas.
This one is only available when Zod schemas are generated due to the `withZod: true` configuration.
This request handler does `reject` the promise with the Zod error when requests or responses do not comply with the
Zod schema definitions which are defined in the requests' `endpointSchema` property.
It uses the [safeParse](https://zod.dev/?id=safeparse) method for this task.

> :bulb: In case of "multipart/form-data" requests, you are allowed to either pass a FormData instance or
> a plain object in the `body` property of the endpoint caller function payload.
> The ZodValidationRequestHandler only validates plain object request bodies and skips validation for FormData instances.
> This also applies to response bodies which come as FormData after calling the `revealBody` method of a response.

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
status code pattern matching (e.g. for [5XX](https://swagger.io/docs/specification/describing-responses/))
is ignored by the generator and will not get recognized by TS.
As of right now, it is added as a possible response having `any` status code.
- The generated code for the ["not" keyword](https://swagger.io/docs/specification/data-models/oneof-anyof-allof-not/#not)
is `any` for TS and `z.any()` for Zod.
- Only **Local References** are supported for [$ref syntax](https://swagger.io/docs/specification/using-ref/).
One might collect all external `$ref` definitions and modify the specs accordingly to have only local references
when passing the specs to the generator.
- The `discriminator.mapping` property - as described
[here](https://swagger.io/docs/specification/data-models/inheritance-and-polymorphism/) is ignored.
It is recommended to define the discriminating literal value directly in the schemas which are referenced in
`oneOf` or `anyOf` (as long as the discriminator is defined in there). This can be achieved through a string enum.
- The properties `readOnly` and `writeOnly` described [here](https://swagger.io/docs/specification/data-models/data-types/) are ignored.
It is recommended to have separate definitions for read and write objects, especially with changing requirements
(see also [CQRS pattern](https://martinfowler.com/bliki/CQRS.html)).
Anyway, this is planned to be implemented but currently has low priority to me.

## Extra
- Request `headers` and `cookies` are always optional. At the moment there is no configuration setting for this.
This is because one might avoid defining common headers for every call of an endpoint caller function and define
those in a separate underlying request handler. However, as soon as a request `headers` object is passed in to the
endpoint caller function, it must fulfill the definition of the given OAS3 specs, e.g. `required: true`
of a specific header.
- [AnyOf](https://swagger.io/docs/specification/v3_0/data-models/oneof-anyof-allof-not/#anyof) does officially support
only ObjectSchemas or ObjectSchemaComponentRefs.
However, in case of an OAS3 spec which defines another type in the `anyOf` property
(e.g. a [StringSchema](https://swagger.io/docs/specification/v3_0/data-models/data-types/#string)), the generator does
generate code which treats non-ObjectSchema types as another union option.

## Out of scope
Linting is out of scope of this package. The generator is responsible to generate valid TypeScript (and Zod) definitions.
That's what it does. Your code setup should be responsible for linting your code, so it might make sense for you to run
[ESLint](https://eslint.org/) right after the `generateOas3ToTs` function was executed, e.g. with a script in your
`package.json` like so:
```json
"scripts": {
  "api:generate": "node api.generate.js && eslint --fix --quiet ./generated-api"
}
```

## Bug report / feature request
If you think an unsupported feature needs to be implemented, feel free to open an issue or create a new
pull request. Please refer to the pull request criteria which is defined [here](.github/pull_request_template.md).
