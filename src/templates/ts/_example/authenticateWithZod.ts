import {
  createRequest,
  Request,
  RequestExecutionConfig,
  RequestHandler,
  RequestResult,
  Response,
} from '../core';
import {z} from 'zod';

export const authenticateEndpointId = {
  method: 'post',
  path: '/v1/auth/authenticate',
};

const okAuthenticateResponseBodyZodSchema = z.object({});
const badRequestAuthenticateResponseBodyZodSchema = z.object({});

type OkAuthenticateResponse = Response<
  200,
  z.infer<typeof okAuthenticateResponseBodyZodSchema>
>;
type BadRequestAuthenticateResponse = Response<400>;

export type AuthenticateResponse =
  | OkAuthenticateResponse
  | BadRequestAuthenticateResponse;

export type AuthenticateRequestResult = RequestResult<
  Request,
  AuthenticateResponse
>;

const authenticatePayloadZodSchema = z.object({
  headers: z.object({
    foo: z.string(),
  }),
  body: z.object({
    emailOrUsername: z.string(),
    password: z.string(),
  }),
});

export type AuthenticatePayload = z.infer<typeof authenticatePayloadZodSchema>;

export function authenticate(
  requestHandler: RequestHandler,
  payload: AuthenticatePayload,
  config?: RequestExecutionConfig
): Promise<AuthenticateRequestResult> {
  const request = createRequest({
    endpointId: authenticateEndpointId,
    headers: {
      ...payload.headers,
      'Content-Type': 'application/json',
    },
    body: payload.body,
    zodSchema: {
      requestPayload: authenticatePayloadZodSchema,
      responseByStatusCode: {
        '200': {
          body: okAuthenticateResponseBodyZodSchema,
        },
        '400': {
          body: badRequestAuthenticateResponseBodyZodSchema,
        },
      },
    },
  });
  return requestHandler.execute(request, config);
}
